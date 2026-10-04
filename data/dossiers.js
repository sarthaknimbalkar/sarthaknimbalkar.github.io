// Terminal dossiers: `cat <name>` / `man <name>`. Plain data, rendered by the terminal in index.html.
// Each entry: name, url, status, line (one sentence), then ordered [heading, body] sections.
window.DOSSIERS = {
  'the-woof-back': {
    name: 'The Woof Back', url: 'https://thewoofback.com', status: 'live',
    line: 'SEO for the age of AI answers. Gets a business named by Google and by AI assistants, then shows which article brought the money in.',
    sections: [
      ['why', 'When someone asks an AI assistant who to call, they get one answer and a short list of names. That list is the whole market. Everyone else is not ranked lower, they are never mentioned. The engines re-decide constantly, so whoever feeds them this quarter writes the defaults.'],
      ['how it works', 'One pipeline, six stages, no handoffs:\n  01 research  the real questions buyers type; every fact keeps its source and date\n  02 write     answer-first pages in the owner\'s voice, evidence attached\n  03 publish   on the client\'s own site, which they keep\n  04 rank      weekly position tracking, site health, stale pages fixed\n  05 cite      every day the market\'s questions go to ChatGPT, Perplexity,\n               Gemini and Claude, and who got named is logged\n  06 convert   calls and forms arrive tagged with the page that earned them'],
      ['under the hood', 'TypeScript monorepo (pnpm workspaces + Turborepo, strict ESM). PayloadCMS 3 on the Next.js App Router over Postgres. Python services for research and the daily AI citation checks.'],
      ['the decision that matters', 'Most teams run those six stages as six tools and four people. Here they are one system, so the source that justified a sentence in stage 1 is still attached when stage 6 attributes the deal. Revenue traces back to a page, and the page traces back to its evidence.'],
    ],
  },
  'openom': {
    name: 'openOM', url: 'https://openom.app', status: 'open standard, spec v0.1 · toolchain MIT · spec CC-BY-4.0',
    line: 'An open standard that embeds verified, machine-readable deal data inside commercial real-estate offering memorandum PDFs.',
    sections: [
      ['why', 'Deals live in 40-page PDFs. Every buyer, lender and AI agent downstream re-extracts the same numbers, usually by running vision over every page. openOM extracts once at the source: the broker asserts the data, it is hashed and embedded, and everyone after that just reads it.'],
      ['numbers', '40 pages -> ~3k tokens for an AI to read the whole deal\n1 extraction, unlimited reads\n0 API keys: the server runs no model'],
      ['who uses it, and how', 'brokers     an in-browser form or the Chrome extension; never a terminal\nportals     a drop-in <openom-badge> web component and a free read API\ndevelopers  Python (openom-core) and TypeScript (openom-js): embed, read, validate\nAI builders a free public MCP endpoint at mcp.openom.app'],
      ['under the hood', 'Deterministic, inference-free core: no model sits in the verify path, so a payload either checks out or it does not. The PDF looks identical to people; the payload is mirrored as JSON-LD on the web. Spec, CLI, browser extension, MCP worker and fixtures all live in one repo with CI on every PR.'],
      ['stewardship', 'Published by Vervelio Labs as a neutral steward, so the standard can outlive any one product built on it.'],
    ],
  },
  'nidamind': {
    name: 'NidaMind', url: 'https://nidamind.com', status: 'live',
    line: 'Finds product ideas people are already begging for, from what they complain about in public.',
    sections: [
      ['numbers (from the live board)', '202,186 ideas on the board\n484,101 real signals read\n14 sources: App Store, Hacker News, Reddit, GitHub, YouTube, X,\n Stack Overflow, Upwork, Trustpilot, G2, Product Hunt, research, forums'],
      ['how it works', 'Every 8 hours, unattended:\n  collect -> normalize -> enrich -> cluster -> score -> competitive analysis\nOne frustration said a thousand different ways becomes a single idea. Each idea is scored on how many people feel it, how badly, whether they would pay, how underserved it is, and whether it is growing. Loud but trivial sinks; quiet but painful rises.'],
      ['under the hood', 'Python backend with Celery workers and beat scheduling on Fly.io, Next.js front end, Postgres with pgvector on Supabase, object storage over the S3 API. Bulk LLM work runs on a self-hosted vLLM serving Qwen3 30B on an NVIDIA GB10 box over a WireGuard tunnel; on-demand deep dives go to a hosted Qwen3 235B.'],
      ['the decision that matters', 'A hard cost rule: anything heavy, bulk or cacheable runs on owned GPU and is pre-cached. Only interactive requests ever pay per token. That is what makes reading half a million signals affordable.'],
      ['scar tissue', 'Pinned HTTP/1.1 to the GPU box after HTTP/2 went half-open under load and hung calls forever. Root-caused a recurring database "pooler wedge" to RAM starvation, not connection exhaustion. The ingestion chokepoint is fail-safe: if object storage is down, the payload is kept inline and reconciled every 15 minutes.'],
    ],
  },
  'caelion': {
    name: 'Caelion', url: 'https://caelion.app', status: 'in development · early access',
    line: 'A headless agentic CRM. A CRM you never have to open.',
    sections: [
      ['the idea', 'Dashboard CRMs are a database with a screen in front, and every fact inside was typed by someone who would rather have been selling. Caelion is the CRM as an API. Signal arrives, gets forged into records, and agents act. The console exists, but the product works with nothing open at all.'],
      ['three nouns', 'catalyst  anything that changes state: a webhook, a YAML or JSON file,\n          an API publish, a semantic-search match, a calendar invite,\n          a transcript, a paid invoice\nfoundry   a typed pipeline you declare; resolves signal against what is\n          known and forges accounts, people, deals, commitments, documents\n          (matching, enrichment, dedup and history on every signal)\nreaction  agents subscribed to state, not to a screen; they publish back\n          out through the same connectors that fed them'],
      ['example', 'stripe invoice.paid -> the foundry marks Acme\'s Q4 renewal won and the renewal promise kept -> the seller agent drafts a thank-you and a check-in for early November, waiting for approval.'],
      ['under the hood', 'TypeScript services over a Postgres state ledger. The schema is layered SQL: tenancy and actors, parties and identity, pipeline, activities and tasks, IO adapters, commerce, agentic, then triggers and row-level security. Connectors run both ways over MCP, REST and GraphQL. Infrastructure as code.'],
      ['why it is different', 'Lightfield, Attio and HubSpot ship a screen first and bolt agents on. Caelion started from the agents and the state; a screen is one optional client.'],
    ],
  },
  'dooryard': {
    name: 'DoorYard', url: 'https://dooryardapp.com', status: 'coming soon on iPhone and Android',
    line: 'Same-day home services from crews already working in your neighborhood.',
    sections: [
      ['how it works', 'When a crew has an open slot nearby, DoorYard sends opted-in households on that block a priced, same-day offer. One tap books it. The neighborhood is defined at plat level, not zip code.'],
      ['the economics', 'A crew\'s marginal cost for one more job on a route it is already driving is close to zero. Filling about two gaps a day is roughly 89% margin for the crew. DoorYard charges on booked work, never on leads.'],
      ['north star', 'Blast conversion rate: of the households that get an offer, how many book.'],
      ['under the hood', 'TypeScript monorepo (pnpm workspaces + Turborepo) with Postgres and PL/pgSQL. Privacy is a feature: a public page explains exactly how account deletion works.'],
    ],
  },
  'vervelio-labs': {
    name: 'Vervelio Labs', url: 'https://verveliolabs.com', status: 'live · taking engagements',
    line: 'An AI red team: we attack LLM apps and agents before real attackers do, then fix what we find.',
    sections: [
      ['why', 'Agents now hold real tools: they send email, query databases, export CRMs. A prompt injection hidden in a PDF is no longer a curiosity, it is an agent emailing your customer list. Most teams ship that surface untested.'],
      ['what an engagement looks like', '$ vlabs engage --target support-agent --scope tools,rag\n  map the tool surface and every retrieval source\n  probe direct and indirect injection, tool chaining, system-prompt leaks\n  e.g. CRITICAL: agent followed instructions inside a PDF and called send_email() with a CRM export\n  e.g. HIGH: tool chaining reached an over-scoped database role'],
      ['services', 'AI red-team sprint   two weeks on one LLM app or agent, ranked findings and a fix list\nagent security review map every tool and permission before launch, cut the excess\nretest + attestation re-run the attacks on your fixes, signed letter for your buyers\nretainer             quarterly testing as models, prompts and tools change'],
      ['how it runs', 'scope -> attack -> report -> retest. Real adversarial campaigns, reproduction steps for every finding, and an attestation once the fixes hold.'],
      ['the credibility', 'Every product Vervelio ships gets attacked by Labs first. We build agents for a living, so we know where they break.'],
    ],
  },
  'fieldwork': {
    name: 'Fieldwork', url: '', status: 'private beta',
    line: 'A UGC production agency run as software.',
    sections: [
      ['what it covers', 'One workspace for the whole job: scoped clients and assets, briefs, cast permissions, planning, generation-provider jobs, editing, review, delivery, cost records and recovery tooling.'],
      ['under the hood', 'Python API and workers, a TypeScript web app, built on top of the open-source ViMax video pipeline.'],
      ['the decision that matters', 'Recovery is tested, not assumed. Qualification scripts deliberately interrupt workers and perturb metadata to prove that jobs resume cleanly, and every claim of readiness is backed by recorded live evidence.'],
    ],
  },
  'weft': {
    name: 'Weft', url: '', status: 'private beta',
    line: 'A local-first developer cockpit: every repo, branch and AI agent session on your machine, in one map.',
    sections: [
      ['why', 'Real work state is scattered and mostly invisible. Uncommitted changes and stale branches live only on disk. AI coding agents do real work, then their context evaporates when the chat ends. Nothing connects a failed deploy back to the commit, task and handoff behind it.'],
      ['how it works', 'A lightweight daemon watches your repos, git state, coding-agent sessions and notes, and weaves them into one dashboard. One spine, the Project, ties it together, so "what is uncommitted everywhere?" or "what did the agent last do to auth?" is a single query.'],
      ['under the hood', 'Rust daemon packaged with Tauri, a Next.js dashboard, Postgres, and an embedded gfold scan for git state across every repo.'],
    ],
  },
  'anchor': {
    name: 'Anchor', url: 'https://github.com/sarthaknimbalkar/anchor', status: 'open source · MIT · pip install anchor-cli',
    line: 'Makes AI coding agents keep following your rules, every turn, even after their context is compacted.',
    sections: [
      ['the problem', 'You write rules once. The agent follows them, then the session grows, context gets compacted, and the rule from turn 1 is gone. It is not defiant, it genuinely cannot see the rule any more.'],
      ['numbers', 'On a real long session with real compaction: a rule stated once and then evicted held at 17-91%. With Anchor it held at 100%, with zero corrections needed.'],
      ['how', 'Close the loop: re-inject the right rules every turn, verify the agent complied, correct it in-session if not, and learn which rules it keeps breaking. Relevance comes from a local semantic model fetched once, then fully offline. No telemetry. Linux, macOS and Windows.'],
    ],
  },
  'stack-swap': {
    name: 'stack-swap', url: 'https://github.com/sarthaknimbalkar/stack-swap', status: 'open source · MIT',
    line: 'One GPU, many projects. Swap whole project stacks on a shared box with one command.',
    sections: [
      ['how', '`gswap switch project-a` stops everything else on the GPU over SSH and brings project A up. Projects are declared in projects.toml, no code changes. Standard-library Python only, zero dependencies. Built for an NVIDIA GB10, nothing specific to it.'],
    ],
  },
  'paddle-gb10': {
    name: 'PaddlePaddle on GB10', url: 'https://github.com/sarthaknimbalkar/dgx-spark-paddlepaddle-gpu', status: 'open source',
    line: 'paddlepaddle-gpu built from source for NVIDIA Grace Blackwell: aarch64, CUDA 13, sm_121.',
    sections: [
      ['why', 'There was no prebuilt wheel for aarch64 + CUDA 13 + Blackwell, and upstream did not compile cleanly on that target. This repo has a working build, a prebuilt wheel, and the exact patches upstream is missing.'],
      ['target', 'NVIDIA GB10, 128 GB unified memory · Ubuntu 24.04 aarch64 · CUDA 13.0, driver 580 · Python 3.12'],
    ],
  },
  'bill-tracker': {
    name: 'Bill Tracker', url: 'https://github.com/sarthaknimbalkar/bill-tracker', status: 'open source · Android',
    line: 'Recurring bills and subscriptions, tracked on your phone. No account, no server, no analytics.',
    sections: [
      ['what it handles', 'Recurring rules (every N days, weeks, months or years) that never drift at month end: a bill on the 31st lands on the 28th in February and back on the 31st in March. Variable amounts averaged over the last three payments, partial payments, skips and pauses. Reminders survive reboots, app updates and time-zone changes, with an in-app health check for the things Android can switch off.'],
      ['under the hood', 'Kotlin and Jetpack Compose, single module, no database library: the data is one JSON file in app-private storage.'],
    ],
  },
};
// Private work answers with a refusal, by design.
window.CLASSIFIED = ['cestus', 'taurex', 'guard402'];
