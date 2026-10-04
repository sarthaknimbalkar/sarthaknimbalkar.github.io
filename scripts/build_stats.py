"""Build data/stats.json for the homepage: contribution calendar, recent pushes, live counts.

Runs in a GitHub Action every few hours (see .github/workflows/stats.yml) and locally:
    STATS_TOKEN=$(gh auth token) python scripts/build_stats.py data/stats.json

The token must belong to the account so private contributions are counted. Repo names
are only ever shown through PUBLIC_NAMES; anything else is reported as a private repo,
so client and unreleased project names never reach the page.
"""
import json
import os
import sys
import urllib.request
from datetime import datetime, timezone

USER = "sarthaknimbalkar"
ORG = "Vervelio-Labs"
TOKEN = os.environ.get("STATS_TOKEN") or os.environ.get("GITHUB_TOKEN")

# repo (lowercase, without owner) -> name shown on the site
PUBLIC_NAMES = {
    "the-woof-back": "The Woof Back",
    "openom": "openOM",
    "nidamind": "NidaMind",
    "caelion-crm": "Caelion",
    "web-twb-caelion": "Caelion",
    "doorYard".lower(): "DoorYard",
    "dooryardapp": "DoorYard",
    "fieldwork-agency": "Fieldwork",
    "web-twb-verveliolabs": "Vervelio Labs",
    "devdjinn": "Weft",
    "anchor": "Anchor",
    "stack-swap": "stack-swap",
    "bill-tracker": "Bill Tracker",
    "dgx-spark-paddlepaddle-gpu": "Paddle on GB10",
    "sarthaknimbalkar.github.io": "this site",
    "sarthaknimbalkar": "GitHub profile",
}


def api(url, body=None):
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode() if body else None,
        headers={"Authorization": f"bearer {TOKEN}", "Accept": "application/vnd.github+json",
                 "User-Agent": "stats-builder"},
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def calendar():
    q = """{ user(login: "%s") { contributionsCollection { contributionCalendar {
            totalContributions weeks { contributionDays { date contributionCount } } } } } }""" % USER
    cal = api("https://api.github.com/graphql", {"query": q})["data"]["user"]["contributionsCollection"]["contributionCalendar"]
    days = [[d["date"], d["contributionCount"]] for w in cal["weeks"] for d in w["contributionDays"]]
    return cal["totalContributions"], days


def recent_pushes(limit=12):
    out = _recent(limit * 3)
    out.sort(key=lambda x: x["at"], reverse=True)
    return out[:limit]


def _recent(limit):
    out, seen = [], set()
    for page in (1, 2, 3):
        for e in api(f"https://api.github.com/users/{USER}/events?per_page=100&page={page}"):
            if e["type"] not in ("PushEvent", "CreateEvent", "ReleaseEvent"):
                continue
            repo = e["repo"]["name"].split("/", 1)[1].lower()
            name = PUBLIC_NAMES.get(repo)
            key = (name or "private", e["created_at"][:13])
            if key in seen:
                continue
            seen.add(key)
            verb = {"PushEvent": "pushed to", "CreateEvent": "started work on", "ReleaseEvent": "released"}[e["type"]]
            out.append({"what": f"{verb} {name}" if name else "pushed to a private repo", "at": e["created_at"]})
            if len(out) >= limit:
                return out
    return out


def repo_count():
    n = 0
    for url in (f"https://api.github.com/user/repos?affiliation=owner&per_page=100",
                f"https://api.github.com/orgs/{ORG}/repos?type=all&per_page=100"):
        n += sum(1 for r in api(url) if not r["fork"])
    return n


def main(path):
    total, days = calendar()
    data = {
        "updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "contributions_last_year": total,
        "repos": repo_count(),
        "days": days,
        "log": recent_pushes(),
    }
    # A token that can see fewer repos than last time is almost always a scope problem,
    # not mass deletion: keep the last good numbers instead of shrinking the site.
    try:
        with open(path, encoding="utf-8") as f:
            prev = json.load(f)
        if data["repos"] < prev.get("repos", 0) * 0.5:
            print(f"warning: token sees {data['repos']} repos, previously {prev['repos']}; keeping previous count")
            data["repos"] = prev["repos"]
        if len(data["log"]) < len(prev.get("log", [])) // 2:
            data["log"] = sorted(data["log"] + prev["log"], key=lambda x: x["at"], reverse=True)[:12]
    except (OSError, ValueError, KeyError):
        pass
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, separators=(",", ":"))
    print(f"{total} contributions, {data['repos']} repos, {len(data['log'])} log entries -> {path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "data/stats.json")
