# AI/ML Concepts Taxonomy for Enterprise Technical Leaders

## Purpose & Audience

This taxonomy organizes every AI/ML concept that CTOs, VPs of Engineering, and senior
technical leaders at Series B-D / mid-market enterprises need to understand in 2026.
Each concept is rated for audience, visual explainability potential, and urgency.

**Rating keys:**

- **Audience**: C = C-suite only, EL = Engineering Leads, IC = IC Engineers, ALL = Everyone
- **Visual**: How much better an animation/interaction explains it vs. text alone (High/Medium/Low)
- **Urgency**: How critical is understanding this RIGHT NOW for enterprise decisions (High/Medium/Low)
- **Priority**: MUST-KNOW (enterprise decisions depend on it) vs NICE-TO-KNOW (deepens understanding)

---

## STREAM 1: FOUNDATION (How LLMs Actually Work)

**Stream thesis**: Most enterprise leaders skip these fundamentals and then make bad
architecture decisions downstream. This stream builds the mental model that prevents
$500K mistakes.

### Learning Sequence (strict prerequisites)

```
Tokenization --> Embeddings --> Attention/Self-Attention --> Transformer Architecture
    --> Context Windows --> Temperature & Sampling --> Decoding Strategies
```

### 1.1 Tokenization

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Animate text splitting into tokens, show BPE merging, reveal the "glue" character |
| Urgency | **Medium** - Affects cost estimation and multilingual decisions |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Every API call is billed per token. Leaders who don't
understand tokenization consistently underestimate costs by 2-5x, especially for
multilingual or code-heavy workloads. One token is NOT one word.

**Biggest CTO misconception**: "A token is basically a word." In reality, common English
words are 1 token, but technical terms, code, and non-English text can be 2-5x more
tokens. This directly impacts cost modeling.

**Existing explanations that fail**: Most explanations show a static before/after of
tokenization but never show WHY "ChatGPT" becomes 3 tokens while "the" is 1. The BPE
merging process needs step-by-step animation.

**Best existing visual**: OpenAI's tokenizer tool (but it only shows results, not process).

---

### 1.2 Embeddings

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **High** - 3D/2D vector space visualization, show similar concepts clustering, animate semantic search |
| Urgency | **High** - Core to RAG architecture, search, and recommendation decisions |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Embeddings are the foundation of RAG, semantic search,
and recommendation systems. Choosing the wrong embedding model silently degrades every
downstream system. This is the single most under-discussed architectural decision.

**Biggest CTO misconception**: "Embeddings are just a preprocessing step; any model works."
Wrong. Embedding model choice determines retrieval quality. A bad embedding model makes
even perfect RAG architecture return irrelevant results. Domain-specific embeddings vs.
general-purpose is a real tradeoff.

**Existing explanations that fail**: Static 2D scatter plots that show word clusters but
never explain what the dimensions MEAN or how similarity is computed. Need interactive
drag-and-drop where you type a query and watch vectors move in space.

---

### 1.3 Attention & Self-Attention

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **High** - Animate attention weight flows between tokens, show how "it" resolves to the right noun |
| Urgency | **Medium** - Understanding prevents misattribution of model failures |
| Priority | NICE-TO-KNOW for C-suite, MUST-KNOW for engineering leads |

**Why it matters for leaders**: Attention is why models "understand" context. When a model
gives a wrong answer about something earlier in a long document, it's an attention
problem, not a "hallucination" problem. Different failure, different fix.

**Biggest CTO misconception**: "The model reads the whole document equally." It doesn't.
Attention weights determine what the model "focuses on," and these weights aren't uniform.
Content in the middle of long contexts gets less attention (the "lost in the middle"
problem).

**Existing explanations that fail**: Most use abstract matrix multiplication diagrams.
Need a sentence-level animation showing attention beams connecting related words, with
thickness representing weight strength.

**Best existing visual**: Polo Club's Transformer Explainer (interactive GPT-2 visualization).

---

### 1.4 Transformer Architecture

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **High** - Animated data flow through encoder/decoder blocks, layer-by-layer buildup |
| Urgency | **Medium** - Foundational mental model for all architecture decisions |
| Priority | NICE-TO-KNOW for C-suite, MUST-KNOW for engineering leads |

**Why it matters for leaders**: Every major model (GPT, Claude, Gemini, Llama) is a
transformer variant. Understanding the basic architecture explains why models have
parameter counts, why larger isn't always better, and why fine-tuning works.

**Biggest CTO misconception**: "More parameters = smarter model." Parameters determine
capacity, not intelligence. A well-tuned 8B model can outperform a poorly prompted 70B
model on specific tasks. MoE architectures make this even more nuanced.

**Existing explanations that fail**: The original "Attention Is All You Need" diagram is
used everywhere but explains nothing to non-researchers. Need a progressive build-up:
start with a single neuron, add a layer, add attention, build the full block.

---

### 1.5 Context Windows

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Visualize a sliding window over a document, show what gets "forgotten," animate context stuffing vs. RAG |
| Urgency | **High** - Directly impacts architecture: RAG vs. long-context vs. summarization |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Context windows determine how much information a model can
process in a single call. This is the #1 factor in choosing between RAG, fine-tuning, and
prompt engineering. Leaders who don't understand context limits ship systems that silently
truncate critical information.

**Biggest CTO misconception**: "We have 200K context now, so we don't need RAG." Wrong on
two counts: (1) cost scales linearly with context length, (2) retrieval quality degrades
with "lost in the middle" effects even within the window. Long context is not free context.

**Existing explanations that fail**: Most just cite "128K tokens" without visualizing what
that actually MEANS in terms of document pages, code files, or conversation turns. Need
a concrete visual: "this many pages of a legal contract" or "this many Slack messages."

---

### 1.6 Temperature & Sampling

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **High** - Animate probability distributions shifting with temperature, show top-k/top-p filtering |
| Urgency | **Low** - Important for tuning but rarely a strategic decision |
| Priority | NICE-TO-KNOW |

**Why it matters for leaders**: Temperature controls how "creative" vs. "deterministic" a
model is. Setting it wrong causes either boring/repetitive output or wildly inconsistent
results. Most production systems use low temperature.

**Biggest CTO misconception**: "Temperature 0 means deterministic output." Close but not
quite -- there's still some non-determinism at the infrastructure level. More importantly,
temperature is only one of several sampling parameters, and they interact in non-obvious
ways.

**Existing explanations that fail**: Most show a single probability bar chart at two
temperatures. Need an interactive slider where you watch the output distribution change
in real-time and see actual generated text vary.

---

### 1.7 Decoding Strategies (Beam Search, Greedy, Nucleus Sampling)

| Attribute | Value |
|-----------|-------|
| Audience | IC |
| Visual | **Medium** - Tree visualization of beam search exploring paths |
| Urgency | **Low** - Rarely affects enterprise decisions directly |
| Priority | NICE-TO-KNOW |

---

## STREAM 2: ARCHITECTURE (How Models Are Built & Adapted)

**Stream thesis**: 2026 is the year enterprises stop treating models as black boxes and
start making informed build-vs-buy architecture decisions. Every concept here has a
direct line to budget allocation.

### Learning Sequence

```
RAG --> Fine-tuning vs Prompting --> Distillation --> Quantization
                                                         |
MoE (Mixture of Experts) --> Diffusion Models       (parallel)
```

### 2.1 RAG (Retrieval-Augmented Generation)

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Animate the full pipeline: query --> embed --> retrieve --> rank --> inject --> generate |
| Urgency | **Critical** - Production-critical architecture in 2026, most common enterprise pattern |
| Priority | MUST-KNOW |

**Why it matters for leaders**: RAG is the dominant enterprise AI architecture in 2026.
It's how you ground LLM responses in your company's actual data without retraining a
model. Getting it wrong is the #1 technical killer of production AI systems (Composio).

**Biggest CTO misconception**: "RAG is just search + LLM." RAG is actually a complex
pipeline with 5+ failure modes: semantic drift after chunking, embedding model mismatches,
stale data poisoning, context window overflow, and retrieval ranking decay. "Dumb RAG"
(naive implementation) is the most common reason production AI degrades silently.

**Existing explanations that fail**: Most show a clean diagram with 3 boxes and 2 arrows.
Real RAG has chunking strategy decisions, embedding model selection, vector DB choices,
re-ranking layers, and citation tracking. Need an interactive pipeline builder that shows
how each choice affects output quality.

**Connects to Week 13 content**: "RAG Done Right" in the content strategy.

---

### 2.2 Fine-tuning vs. Prompting vs. RAG (The Decision Framework)

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Interactive decision tree: "What are you trying to achieve?" leading to the right approach |
| Urgency | **Critical** - Wrong choice here wastes $100K-$1M+ and 3-6 months |
| Priority | MUST-KNOW |

**Why it matters for leaders**: This is the most expensive architectural decision
enterprises make. Most start with the wrong approach: fine-tuning when RAG would suffice,
or prompting when the task requires fine-tuning. The decision depends on whether you need
new knowledge (RAG), new behavior (fine-tuning), or just better instructions (prompting).

**Biggest CTO misconception**: "Fine-tuning makes the model smarter." Fine-tuning changes
behavior, not knowledge. It teaches the model HOW to respond (tone, format, style,
domain-specific patterns), not WHAT to know. For new knowledge, you need RAG. ICLR 2026
research shows combining both (fine-tuning WITH RAG) is the emerging best practice.

**Existing explanations that fail**: Most present a 2x2 matrix that oversimplifies.
Reality is a spectrum: prompt engineering --> few-shot prompting --> RAG --> fine-tuning
--> full retraining, and the right answer depends on data volume, latency requirements,
cost constraints, and update frequency.

---

### 2.3 Model Distillation

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **Medium** - Animate teacher model "teaching" student model, show accuracy vs. size tradeoff curve |
| Urgency | **High** - Key to cost reduction: deploy smaller models that perform like larger ones |
| Priority | MUST-KNOW for engineering leads |

**Why it matters for leaders**: Distillation is how you take a $10/1M-token frontier model
and create a $0.10/1M-token model that handles 80% of your use cases. This is the primary
lever for reducing inference costs at scale.

**Biggest CTO misconception**: "We need the biggest model for everything." Most enterprise
tasks don't need GPT-4 class intelligence. Distilled models (like DeepSeek-R1 distilled
variants) deliver 85-95% of performance at 1/100th the cost for well-defined tasks.

---

### 2.4 Quantization

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **Medium** - Visualize precision reduction (FP32 --> FP16 --> INT8 --> INT4), show quality vs. speed tradeoff |
| Urgency | **High** - Quantization reduces costs more than hardware upgrades |
| Priority | MUST-KNOW for engineering leads |

**Why it matters for leaders**: Quantization shrinks model size by reducing numerical
precision. QLoRA (4-bit quantization) lets you run a 70B parameter model on hardware that
could previously only handle 7B. This directly affects your GPU budget.

**Biggest CTO misconception**: "Quantization means worse output." For most enterprise
tasks, the quality loss from INT8 or even INT4 quantization is imperceptible. You're
trading theoretical precision for 2-4x cost savings with minimal real-world impact.

---

### 2.5 Mixture of Experts (MoE)

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **High** - Animate token routing through a gate to specialized experts, show only 2 of 8 activating |
| Urgency | **High** - Over 60% of frontier model releases in 2026 use MoE; it's the dominant architecture |
| Priority | MUST-KNOW |

**Why it matters for leaders**: MoE is why models like DeepSeek, Mistral, and Gemini can
be massive (100B+ total parameters) but fast and cheap (only 10-20B activate per query).
Understanding MoE explains the current price collapse in inference costs.

**Biggest CTO misconception**: "Bigger model = more compute = higher cost." MoE breaks this
assumption. A 600B MoE model can be cheaper to run than a 70B dense model because it only
activates a fraction of its parameters per query. This fundamentally changes the economics.

**Existing explanations that fail**: Most show a static diagram of "experts" as boxes.
Need to animate token-level routing, showing different tokens going to different experts,
revealing WHY this is faster than dense computation. NVIDIA's blog on Blackwell NVL72
has good technical detail but needs visualization.

---

### 2.6 Diffusion Models

| Attribute | Value |
|-----------|-------|
| Audience | EL |
| Visual | **High** - Animate the denoising process step by step, from pure noise to coherent image |
| Urgency | **Medium** - Relevant for image/video/audio generation decisions |
| Priority | NICE-TO-KNOW (unless your business involves media generation) |

**Why it matters for leaders**: Diffusion powers all major image generation (DALL-E,
Midjourney, Stable Diffusion) and increasingly video/audio. If your product roadmap
includes any media generation, understanding diffusion architecture helps evaluate vendors
and set realistic expectations for quality/speed/cost.

**Biggest CTO misconception**: "Image generation models work like text models." They don't.
Diffusion models iteratively refine noise, which is why generation is slow (many steps)
and why guidance/control is a fundamentally different problem than text prompting.

---

## STREAM 3: ENGINEERING (How to Build Production AI Systems)

**Stream thesis**: This is where 90% of enterprise AI value is created or destroyed.
The gap between "cool demo" and "production system" lives entirely in this stream.
In 2026, context engineering has officially replaced prompt engineering as the discipline
that matters.

### Learning Sequence

```
Prompt Engineering --> Context Engineering --> Tool Use / Function Calling
    --> MCP (Model Context Protocol) --> Eval Frameworks --> Guardrails
```

### 3.1 Prompt Engineering

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **Medium** - Side-by-side comparison of good vs. bad prompts with live model output |
| Urgency | **Medium** - Still necessary but increasingly subsumed by context engineering |
| Priority | MUST-KNOW (as a foundation, not a destination) |

**Why it matters for leaders**: Prompt engineering is the entry point -- how you communicate
with a model. But in 2026, it's recognized as insufficient for production systems. MIT
found 95% of gen AI pilots fail because prompts can't scale to production where
consistency, accuracy, and reliability are non-negotiable.

**Biggest CTO misconception**: "We just need better prompts." Prompt engineering is
necessary but not sufficient. At production scale, the question isn't how to phrase the
request but what information the model has access to when it generates responses. This is
context engineering.

---

### 3.2 Context Engineering

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Animate the full context assembly: system instructions + memory + retrieved data + tool results + output constraints |
| Urgency | **Critical** - Gartner recommends appointing a context engineering lead; this is THE discipline of 2026 |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Context engineering is the practice of designing the full
informational environment for AI systems -- not just the prompt, but system instructions,
memory management, external data integration, tool orchestration, and output structuring.
Gartner explicitly calls this out as requiring dedicated teams in 2026.

**Biggest CTO misconception**: "Context engineering is just advanced prompt engineering."
No. Prompt engineering shapes HOW the model is asked. Context engineering determines WHAT
the model knows when it's asked and WHY it should care. In mature enterprise systems,
prompts are assembled, constrained, and injected as part of a controlled context strategy
that includes short-term memory, long-term knowledge, tool access, and governance rules.

**Existing explanations that fail**: Most articles conflate context engineering with "better
prompting." Need a visual that shows the entire context assembly pipeline -- how a single
user query gets wrapped in system instructions, augmented with retrieved documents, enriched
with user history, constrained by guardrails, and structured for output formatting BEFORE
the model ever sees it.

---

### 3.3 Tool Use / Function Calling

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **High** - Animate an agent deciding to call a tool, show the JSON schema, API call, result injection back into context |
| Urgency | **High** - Foundation for all agentic architectures |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Function calling is how LLMs interact with the real world:
querying databases, calling APIs, executing code. Without it, models are just text
generators. With it, they become the reasoning layer of your software architecture.

**Biggest CTO misconception**: "The model calls the function directly." The model doesn't
execute anything. It generates structured output (usually JSON) that your application code
then executes. The model decides WHAT to call; your code does the actual calling. This
distinction matters for security and governance.

---

### 3.4 MCP (Model Context Protocol)

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Animate the "USB-C for AI" analogy: one protocol, many tools, any model |
| Urgency | **Critical** - 97M+ monthly SDK downloads, backed by Anthropic/OpenAI/Google/Microsoft, standardized under Linux Foundation |
| Priority | MUST-KNOW |

**Why it matters for leaders**: MCP is the open standard that eliminates the M x N
integration problem (M models x N tools = M*N custom integrations). Instead, tools
implement MCP once, and any model can use them. Organizations report 40-60% faster agent
deployment with MCP. It's now governed by the Agentic AI Foundation under the Linux
Foundation with Anthropic, OpenAI, and Block as co-founders.

**Biggest CTO misconception**: "MCP is just another API standard." MCP is specifically
designed for AI-to-tool communication, handling context passing, capability discovery, and
stateful interactions that REST APIs weren't designed for. Google is pushing gRPC support
for MCP transport (Feb 2026), signaling enterprise-grade infrastructure maturity.

**Existing explanations that fail**: Most describe MCP abstractly. Need an interactive demo
showing: (1) an agent discovering available tools via MCP, (2) selecting the right tool,
(3) passing structured context, (4) receiving typed results -- all animated step by step.

---

### 3.5 Eval Frameworks

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **Medium** - Dashboard visualization showing eval metrics across model versions, A/B test results |
| Urgency | **Critical** - "If you can't eval it, you can't ship it" -- only 37% of enterprises run online evals |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Evaluation is the single biggest gap in enterprise AI. Per
LangChain's State of Agent Engineering report: 89% have observability but only 37.3% run
online evaluations. This means most enterprises are flying blind -- they know their systems
are running but not whether they're working correctly.

**Biggest CTO misconception**: "We'll evaluate with user feedback." User feedback is
lagging, biased, and incomplete. You need automated evals that test full agent trajectories
including tool choice, reasoning quality, and output accuracy. Evals should be in your CI
pipeline, not a quarterly review.

**Existing explanations that fail**: Most eval content focuses on academic benchmarks
(MMLU, HumanEval). Enterprises need practical eval frameworks: what to measure, how to
measure it, how to set thresholds, and how to catch degradation before users do.

---

### 3.6 Guardrails

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Animate input/output filtering pipeline, show a prompt injection being caught and redirected |
| Urgency | **Critical** - Microsoft researchers broke guardrails with a single prompt (2026); guardrails must be layered |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Guardrails are the runtime safety layer that prevents AI
systems from generating harmful, off-topic, or policy-violating outputs. In 2026,
enterprises combine model-level and application-level guardrails because no single layer
is sufficient. This is not optional for production deployment.

**Biggest CTO misconception**: "The model provider's safety training is enough." Model-level
safety is the foundation, not the whole house. You need application-level guardrails
(content filtering, PII detection, topic boundaries), policy-as-code enforcement, approval
workflows for irreversible actions, and prompt injection defenses.

**Existing explanations that fail**: Most describe guardrails as a single filter. Need a
layered visualization showing pre-processing guardrails (input sanitization), in-process
guardrails (constrained decoding), and post-processing guardrails (output validation),
with different attack vectors being caught at different layers.

---

## STREAM 4: INFRASTRUCTURE (The Money Layer)

**Stream thesis**: Infrastructure is where AI strategy meets financial reality. Inference
costs consume 80-90% of total AI compute dollars. Every concept here directly impacts
your P&L. CFOs will kill more AI projects than CTOs launch in 2026.

### Learning Sequence

```
Inference Optimization --> GPU Economics & FinOps --> Model Serving Patterns
    --> Edge vs. Cloud vs. Hybrid --> Batch vs. Real-time
```

### 4.1 Inference Optimization

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **High** - Animate batching, caching, speculative decoding side by side, show throughput improvements |
| Urgency | **Critical** - Total inference spending grew 320% despite per-token costs falling 280x |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Inference (running the model on user requests) costs 15-20x
more than training over a model's lifecycle. Optimization techniques like dynamic batching,
KV-cache optimization, speculative decoding, and quantization can reduce costs 40-70%.
This is the difference between a profitable AI product and one that bleeds money.

**Biggest CTO misconception**: "We'll optimize later; let's get to market first." By the
time you optimize, you've locked in an architecture that may be fundamentally expensive.
PagedAttention alone reduces memory waste by 55%. Dynamic batching increases GPU utilization
from 30% to 70%. These aren't optimizations; they're architectural requirements.

**Connects to Week 7 content**: "The Inference Cost Spiral" in the content strategy.

---

### 4.2 GPU Economics & FinOps

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Interactive cost calculator: model size x request volume x optimization level = monthly cost |
| Urgency | **Critical** - 84% report AI costs hurt gross margins by 6+ points (Menlo) |
| Priority | MUST-KNOW |

**Why it matters for leaders**: The GPU landscape is fracturing. Nvidia's inference market
share is projected to fall from 90%+ to 20-30% by 2028 as TPUs and ASICs capture
production workloads. Major companies (Anthropic, Meta, Midjourney) are migrating to Google
TPUs, cutting costs by 65%. The on-prem tipping point: when cloud costs exceed 60-70% of
equivalent on-prem systems.

**Biggest CTO misconception**: "We need H100s/B200s." Most inference workloads don't need
cutting-edge GPUs. Older GPUs with quantized models often deliver better cost-per-query
than latest-gen hardware with full-precision models. The FinOps question is about matching
hardware to workload, not buying the best GPU available.

---

### 4.3 Model Serving Patterns

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **Medium** - Architecture diagram comparing serving patterns: API gateway, model router, A/B testing, canary deployment |
| Urgency | **High** - Multi-model is now standard (Anthropic 40%, OpenAI 27%, Google 21% market share) |
| Priority | MUST-KNOW for engineering leads |

**Why it matters for leaders**: The emerging pattern is model routing: fast small model for
triage, large model for complex reasoning, specialized model for domain tasks. Serving
infrastructure must support A/B testing between models, fallback chains, and latency-based
routing.

**Biggest CTO misconception**: "We'll standardize on one model." Single-vendor LLM bets
are failing. The market shifted rapidly (Anthropic went from 12% to 40% share in one year).
Your serving infrastructure needs to be model-agnostic.

**Connects to Week 15 content**: "Multi-Model Strategy" in the content strategy.

---

### 4.4 Edge vs. Cloud vs. Hybrid

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Animated decision flow: latency requirement --> data sensitivity --> volume --> recommended deployment |
| Urgency | **High** - IDC predicts 80% of CIOs will use edge services from cloud providers by 2027 |
| Priority | MUST-KNOW |

**Why it matters for leaders**: The edge vs. cloud decision is driven by one primary factor:
speed, scale, or compliance. Once a model is trained in the cloud, it can be optimized,
compressed, and deployed to the edge for sub-second inference with zero data transfer. In
2026, the focus shifts to the "connective tissue" -- networks that make edge-to-cloud
hybrid systems work for agentic workflows.

**Biggest CTO misconception**: "Edge AI means low quality." Distilled + quantized models
on modern edge hardware (Apple Silicon, Qualcomm AI Engine) deliver production-quality
results for well-scoped tasks. The question is not "can edge work?" but "which tasks
belong where?"

---

### 4.5 Batch vs. Real-time Inference

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **Medium** - Timeline visualization: batch jobs queuing vs. real-time streaming, show cost difference |
| Urgency | **Medium** - Significant cost implications but well-understood pattern |
| Priority | MUST-KNOW for engineering leads |

**Why it matters for leaders**: Batch inference (processing requests in bulk) can be 50-80%
cheaper than real-time inference. Many enterprise workloads (document processing, report
generation, data enrichment) don't need real-time and are paying real-time prices.

---

## STREAM 5: AGENTS (The Autonomous Systems Layer)

**Stream thesis**: 2026 is the year agents move from hype to constrained production use.
Gartner predicts 40% of enterprise apps will feature AI agents by end of 2026 (up from
<5%). But the biggest bottleneck isn't model performance -- it's governance. The market for
multi-agent systems saw a 1,445% surge in inquiries.

### Learning Sequence

```
ReAct Loops --> Planning & Reasoning --> Tool Use (from Stream 3)
    --> Memory (Short-term & Long-term) --> Multi-Agent Orchestration
        --> Human-in-the-Loop Patterns --> Agent Governance
```

### 5.1 ReAct Loops (Reasoning + Acting)

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **High** - Animate the Think --> Act --> Observe cycle, show multiple iterations with real tool calls |
| Urgency | **High** - Foundational pattern for all agentic systems |
| Priority | MUST-KNOW |

**Why it matters for leaders**: ReAct is the core loop that makes agents work: the model
thinks about what to do, takes an action (tool call), observes the result, and decides
the next step. Every agent framework (LangGraph, CrewAI, AutoGen) implements some variant
of this pattern. Each iteration = another API call = more cost.

**Biggest CTO misconception**: "Agents are just chatbots with tools." An agent's ReAct loop
means it makes autonomous decisions about WHICH tools to call, in WHAT order, and WHEN to
stop. This is fundamentally different from a predefined workflow. If the steps are
predetermined, it's a pipeline, not an agent.

**Existing explanations that fail**: Most show a clean 3-step loop. Real ReAct involves
error recovery, dead-end detection, cost budgets per trajectory, and timeout handling.
Need an animation that shows both the happy path AND a failure-recovery scenario.

**Connects to Week 1 content**: "AI Agents vs. Copilots vs. Chatbots" (shipped).

---

### 5.2 Planning & Reasoning

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **High** - Tree visualization of plan decomposition, show plan-then-execute vs. interleaved planning |
| Urgency | **High** - ASAPP: agents fail on multi-step tasks 70% of the time |
| Priority | MUST-KNOW for engineering leads |

**Why it matters for leaders**: Planning is why agents fail. ASAPP research shows agents
fail on multi-step tasks 70% of the time. The failure isn't in individual steps but in
decomposing complex goals into executable sub-tasks and maintaining coherence across steps.

**Biggest CTO misconception**: "Better models = better planning." Planning failures are
often architectural, not model-capability problems. Constrained planning (limiting plan
depth, providing explicit decomposition templates, adding verification checkpoints) improves
reliability far more than upgrading the model.

---

### 5.3 Memory (Short-term & Long-term)

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Animate conversation buffer, summarization window, and persistent vector store working together |
| Urgency | **High** - Memory governance is a compliance time bomb (GDPR/CCPA right-to-deletion) |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Memory is what makes agents useful over time (learning
preferences, retaining context) AND what makes them dangerous (accumulating PII, creating
compliance liability). Short-term memory (conversation context) and long-term memory
(persistent knowledge) have fundamentally different governance requirements.

**Biggest CTO misconception**: "Memory makes agents smarter." Memory makes agents MORE
CAPABLE but also more risky. As one HN commenter put it: "You're not building an assistant,
you're building a compliance-breaking data-processing black hole." Every piece of
information an agent remembers is potentially subject to GDPR right-to-deletion.

**Connects to Week 25 content**: "Memory Governance -- The Compliance Time Bomb."

---

### 5.4 Multi-Agent Orchestration

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **High** - Animate multiple specialized agents collaborating: coordinator assigning tasks, agents reporting back, conflict resolution |
| Urgency | **High** - Gartner: 1,445% surge in multi-agent system inquiries; Deloitte projects $8.5B market by 2026 |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Specialized agents working together outperform monolithic
systems. The pattern: task-specific agents focus on narrow domains while coordinator agents
manage handoffs, resolve conflicts, and ensure workflow continuity. This mirrors how human
teams work.

**Biggest CTO misconception**: "More agents = more capability." Adding agents adds
coordination overhead, failure modes, and cost. The right question is "what's the minimum
number of specialized agents needed?" not "how many agents can we deploy?" Most production
systems use 2-5 agents, not dozens.

**Framework guidance**: LangGraph for maximum control and production reliability, CrewAI
for fast team/role-based setup, AutoGen for conversational agents.

---

### 5.5 Human-in-the-Loop Patterns

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Flowchart showing escalation paths: agent confidence threshold --> human approval --> agent continues |
| Urgency | **Critical** - "A single hallucination can destroy trust and incur legal liability" |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Every enterprise agent system needs defined human escalation
paths. The question isn't IF humans should be in the loop but WHERE in the loop they
belong. High-stakes actions (financial transactions, customer communications, code
deployment) require human approval; low-stakes actions (data retrieval, formatting) don't.

**Biggest CTO misconception**: "Human-in-the-loop means a human approves everything."
That defeats the purpose of automation. The skill is designing confidence thresholds and
risk tiers that route only the right decisions to humans. Too many approvals = expensive
and slow. Too few = dangerous.

---

### 5.6 Agent Governance & Identity

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **Medium** - Architecture diagram showing agent identity, permissions, audit trails, and access control |
| Urgency | **Critical** - Traditional IAM/RBAC can't keep pace with dynamic agents acting across services |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Agents need identities, permissions, and audit trails just
like human employees. But traditional IAM and RBAC tools weren't designed for short-lived,
dynamic agents acting across hundreds of services. This is the biggest bottleneck for
enterprise agent deployment in 2026 -- not model performance, but governance.

**Biggest CTO misconception**: "We can use our existing IAM system for agents." Agent
permissions are fundamentally different: they're dynamic (changing per task), short-lived
(per-session), and compositional (an agent calling another agent inherits and extends
permissions). This requires a new "agent control plane" architecture.

---

## STREAM 6: GOVERNANCE & RISK (The Trust Layer)

**Stream thesis**: Governance is no longer a policy document; it's an operational capability.
Gartner predicts 80%+ of unauthorized AI transactions in 2026 will be INTERNAL violations,
not external attacks. EU AI Act full compliance required by August 2, 2026, with penalties
up to 35M EUR or 7% of global turnover.

### Learning Sequence

```
AI TRiSM Framework --> Red Teaming --> Bias Detection & Fairness
    --> Explainability (XAI) --> Compliance Frameworks (EU AI Act, NIST, ISO 42001)
        --> AI Observability & Monitoring
```

### 6.1 AI TRiSM (Trust, Risk, and Security Management)

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **Medium** - Four-layer pyramid: AI Governance --> Runtime Inspection --> Information Governance --> Infrastructure |
| Urgency | **Critical** - Gartner: organizations that operationalize TRiSM see 50% improvement in AI adoption and business goals |
| Priority | MUST-KNOW |

**Why it matters for leaders**: AI TRiSM is Gartner's framework for holistic AI governance.
It encompasses model transparency, content anomaly detection, data protection, model
monitoring, adversarial attack resistance, and application security. Organizations that
implement it see 50% better AI adoption outcomes.

**Biggest CTO misconception**: "AI governance means having an AI policy." A policy document
is 10% of governance. The other 90% is infrastructure, automation, and skilled teams that
can respond to incidents in hours, not weeks. Governance is an operational capability.

---

### 6.2 Red Teaming

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **High** - Simulate an adversarial attack: show prompt injection attempt, model response, detection, and mitigation |
| Urgency | **Critical** - EU AI Act mandates red teaming for high-risk systems; market growing at 30.5% CAGR |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Red teaming is systematic adversarial testing of AI systems.
In 2026, it's not optional -- it's mandated by the EU AI Act for general-purpose AI models
with systemic risk. Microsoft researchers demonstrated in 2026 that single-prompt attacks
can bypass guardrails, proving that red teaming must be continuous, not one-time.

**Biggest CTO misconception**: "We red teamed before launch; we're covered." Red teaming
is continuous, not a checkbox. Model behaviors change with updates, user patterns evolve,
and new attack vectors emerge. The shift to gray-box testing (partial knowledge of model
internals) is strengthening defenses in 2026.

---

### 6.3 Bias Detection & Fairness

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Interactive comparison: show model outputs for different demographic inputs, visualize distribution skew |
| Urgency | **High** - AI influences lending, hiring, and critical infrastructure; legal liability is real |
| Priority | MUST-KNOW |

**Why it matters for leaders**: As AI systems influence lending decisions, hiring practices,
and critical infrastructure, organizations must validate models behave equitably across
demographic groups. This isn't just ethical -- it's legal. Bias-related lawsuits are
increasing, and regulators are getting specific about requirements.

**Biggest CTO misconception**: "Our training data is representative, so our model is fair."
Bias is emergent. A model trained on "representative" data can still exhibit bias through
feature correlations, proxy variables, and amplification of small statistical differences.
Bias detection requires continuous monitoring of outputs, not just auditing inputs.

---

### 6.4 Explainability (XAI)

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Animate attention heatmaps, feature attribution, and counterfactual explanations |
| Urgency | **High** - Required by EU AI Act for high-risk systems; XAI market projected to reach $21B by 2030 |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Explainability is the ability to understand WHY a model made
a specific decision. For regulated industries (finance, healthcare, insurance), this isn't
optional. The EU AI Act requires explanations for high-risk AI decisions.

**Biggest CTO misconception**: "LLMs are inherently unexplainable black boxes." While full
mechanistic interpretability is still a research frontier, practical explainability
techniques exist: attention visualization, chain-of-thought prompting (model explains its
reasoning), retrieval attribution (showing which documents influenced the answer), and
confidence scores.

---

### 6.5 Compliance Frameworks (EU AI Act, NIST AI RMF, ISO 42001)

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **Medium** - Interactive compliance checker: "Does your system do X?" --> risk classification --> required actions |
| Urgency | **Critical** - EU AI Act full compliance by August 2, 2026; penalties up to 35M EUR / 7% global turnover |
| Priority | MUST-KNOW |

**Why it matters for leaders**: Three frameworks now define enterprise AI compliance:
1. **EU AI Act** -- Risk-based regulation; full compliance August 2, 2026
2. **NIST AI RMF** -- US voluntary framework for AI risk management
3. **ISO 42001** -- International standard for AI management systems

**Biggest CTO misconception**: "The EU AI Act only affects European companies." It affects
any company whose AI systems are used by EU citizens, regardless of where the company is
headquartered. Most US enterprises serving global customers must comply.

---

### 6.6 AI Observability & Monitoring

| Attribute | Value |
|-----------|-------|
| Audience | EL, IC |
| Visual | **Medium** - Dashboard visualization: output quality drift, latency shifts, tool call patterns, anomaly detection |
| Urgency | **High** - 89% have observability but only 37% run online evals; monitoring AI is NOT the same as monitoring traditional software |
| Priority | MUST-KNOW for engineering leads |

**Why it matters for leaders**: AI observability is fundamentally different from traditional
APM. You're not just monitoring uptime and latency -- you're monitoring output quality,
semantic drift, hallucination rates, tool call patterns, and memory accumulation.
Traditional monitoring tools miss 80% of AI-specific failure modes.

**Biggest CTO misconception**: "Our existing Datadog/New Relic setup covers AI." It
doesn't. Traditional observability tools monitor infrastructure health; AI observability
monitors output quality. You need trace-level visibility into every reasoning step,
tool call, and context assembly decision.

**Connects to Week 23 content**: "AI Observability" in the content strategy.

---

## STREAM 7: STRATEGY (New Stream -- The Decision Layer)

**Stream thesis**: This stream was added based on research findings. Every concept here
represents a strategic decision framework that cuts across technical streams. These are
the concepts CTOs most need but that no one explains well.

### 7.1 Build vs. Buy for AI

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Interactive decision matrix with sliders for data uniqueness, speed-to-market, competitive advantage |
| Urgency | **Critical** - MIT: purchased AI succeeds 67% vs. 22% for internal builds |
| Priority | MUST-KNOW |

**Why it matters**: 76% of AI use cases are now purchased (Menlo, up from 53% in 2024).
Custom builds only win with unique data moats, core differentiators, or regulatory
requirements. Everything else should be bought.

**Connects to Week 9 content**: "Build vs. Buy" in the content strategy.

---

### 7.2 AI Cost Modeling & Unit Economics

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **High** - Interactive calculator: chatbot ($0.001/query) vs. copilot ($0.01/query) vs. agent ($0.10-$1.00/task) |
| Urgency | **Critical** - CFOs will kill more AI projects than CTOs launch; P&L impact in quarters, not years |
| Priority | MUST-KNOW |

**Why it matters**: The agentic loop multiplier means each ReAct step = another API call.
An agent task that takes 5-50 LLM calls costs 50-500x more than a simple chatbot query.
Leaders who don't model this before architecture decisions face margin erosion.

**Connects to Week 7 content**: "The Inference Cost Spiral."

---

### 7.3 Data Readiness & Quality

| Attribute | Value |
|-----------|-------|
| Audience | ALL |
| Visual | **Medium** - Maturity assessment visualization: data silos --> unified --> quality-assured --> AI-ready |
| Urgency | **Critical** - 85% of AI project failures linked to poor data quality (Gartner) |
| Priority | MUST-KNOW |

**Why it matters**: Nearly 85% of AI project failures are linked to poor data quality,
siloed systems, or lack of scalable data infrastructure. Evaluating data readiness is a
non-negotiable foundational step before any AI investment.

---

### 7.4 Agentic Organization Design

| Attribute | Value |
|-----------|-------|
| Audience | C |
| Visual | **Medium** - Organizational transformation map showing how AI agents integrate into existing workflows |
| Urgency | **High** - Successful teams spend 70% on people/process, failing teams spend 70% on model selection |
| Priority | MUST-KNOW for C-suite |

**Why it matters**: The organizational inversion is real: successful AI teams spend 70% of
their effort on people and process, while failing teams spend 70% on model selection.
McKinsey's framework is directionally right but implementation-detail empty.

**Connects to Week 27 content**: "The Agentic Organization."

---

## CROSS-STREAM PRIORITY MATRIX

### Tier 1: URGENT -- Understand Before Your Next Board Meeting

| Concept | Stream | Why Urgent |
|---------|--------|------------|
| Context Engineering | Engineering | Gartner says appoint a lead; replaces prompt engineering |
| MCP | Engineering | Industry standard; 97M+ monthly downloads; all major vendors aligned |
| RAG | Architecture | #1 enterprise AI pattern; "dumb RAG" is the #1 technical killer |
| GPU Economics / FinOps | Infrastructure | 84% report margin erosion; CFOs are asking NOW |
| EU AI Act Compliance | Governance | August 2, 2026 deadline; penalties up to 7% of global turnover |
| Agent Governance | Agents | Biggest deployment bottleneck is governance, not model performance |
| Human-in-the-Loop | Agents | One hallucination can destroy trust and incur legal liability |
| Guardrails | Engineering | Single-prompt attacks demonstrated; must be layered |
| AI Cost Modeling | Strategy | "Can you prove this AI spend is changing outcomes, not just activity?" |

### Tier 2: IMPORTANT -- Understand Before Your Next Architecture Decision

| Concept | Stream | Why Important |
|---------|--------|---------------|
| Fine-tuning vs. Prompting vs. RAG | Architecture | Wrong choice wastes $100K-$1M+ and 3-6 months |
| Embeddings | Foundation | Wrong embedding model silently degrades all downstream systems |
| Context Windows | Foundation | Drives RAG vs. long-context vs. summarization decisions |
| MoE | Architecture | 60%+ of frontier models; explains cost collapse |
| Multi-Agent Orchestration | Agents | 1,445% surge in inquiries; $8.5B market by 2026 |
| ReAct Loops | Agents | Foundational pattern; each loop = cost |
| Inference Optimization | Infrastructure | 40-70% cost reduction with right techniques |
| Model Serving / Multi-Model | Infrastructure | Single-vendor bets are failing |
| Red Teaming | Governance | Mandated by EU AI Act; must be continuous |
| Eval Frameworks | Engineering | Only 37% run online evals; flying blind |
| Build vs. Buy | Strategy | 67% success rate for purchased vs. 22% for built |

### Tier 3: FOUNDATIONAL -- Understand for Technical Fluency

| Concept | Stream | Why Foundational |
|---------|--------|------------------|
| Tokenization | Foundation | Affects cost estimation, multilingual decisions |
| Attention / Self-Attention | Foundation | Explains model failures and "lost in the middle" |
| Transformer Architecture | Foundation | Mental model for all model decisions |
| Distillation | Architecture | Key lever for cost reduction |
| Quantization | Architecture | Reduces costs more than hardware upgrades |
| Planning & Reasoning | Agents | Why agents fail on multi-step tasks |
| Memory | Agents | Capability + compliance risk |
| Bias Detection | Governance | Legal liability for unfair AI decisions |
| Explainability (XAI) | Governance | EU AI Act requires for high-risk systems |
| AI Observability | Governance | Different from traditional APM |
| Temperature & Sampling | Foundation | Production tuning parameter |

### Tier 4: SPECIALIST -- Deep Understanding for Specific Roles

| Concept | Stream | Who Needs It |
|---------|--------|--------------|
| Diffusion Models | Architecture | Teams building media generation |
| Decoding Strategies | Foundation | ML engineers tuning output quality |
| Batch vs. Real-time | Infrastructure | Platform engineering teams |
| Edge vs. Cloud | Infrastructure | Teams with latency/compliance constraints |

---

## VISUAL EXPLAINABILITY HEAT MAP

**Concepts that DEMAND animation/interaction** (static text explanations actively mislead):

1. **Attention Mechanisms** -- Weight flows between tokens MUST be animated to be understood
2. **ReAct Loops** -- The iterative nature is invisible in static diagrams
3. **RAG Pipeline** -- 5+ stages with branching decisions; static diagrams hide complexity
4. **MoE Routing** -- Token-level routing to experts only makes sense when animated
5. **Context Engineering** -- Full context assembly is a multi-source pipeline
6. **Embeddings** -- Vector space clustering only works as interactive 2D/3D visualization
7. **Guardrails** -- Layered defense only visible when attacks flow through layers
8. **MCP** -- The "USB-C for AI" analogy needs the connection animation
9. **Temperature & Sampling** -- Probability distributions need interactive sliders
10. **Multi-Agent Orchestration** -- Agent collaboration patterns need live choreography

**Concepts where text/diagrams are sufficient** (animation is nice-to-have, not essential):

1. Compliance Frameworks -- Checklists and decision trees work well as static content
2. AI TRiSM -- Four-layer model is well-served by a static pyramid
3. Build vs. Buy -- Decision matrix works as interactive form, not animation
4. Data Readiness -- Maturity model is naturally a static assessment
5. Batch vs. Real-time -- Well-understood pattern; timeline diagram suffices

---

## BIGGEST MISCONCEPTIONS BY ROLE

### What C-Suite Gets Wrong

1. **"AI is a tooling upgrade"** -- It's a structural shift in how software is conceived,
   built, and governed. Treating it as another IDE plugin dramatically understates the change.
2. **"More spend = more capability"** -- Successful teams spend 70% on people/process.
   Failing teams spend 70% on model selection.
3. **"We'll figure out governance later"** -- Governance must be built in from day one.
   Retroactive governance is 5-10x more expensive and often impossible.
4. **"Our AI strategy is our model choice"** -- Model choice is perhaps 10% of the strategy.
   Data readiness, integration architecture, team structure, and governance are the other 90%.

### What Engineering Leads Get Wrong

1. **"Better models solve our accuracy problems"** -- Most accuracy problems are context
   engineering or data quality problems, not model capability problems.
2. **"We evaluated with benchmarks; we're ready to ship"** -- Academic benchmarks (MMLU,
   HumanEval) don't predict production performance. You need domain-specific evals on your
   actual data.
3. **"RAG is simple: embed, retrieve, generate"** -- Production RAG has 5+ failure modes
   that silently degrade quality. "Dumb RAG" is the #1 technical killer.
4. **"Our monitoring covers AI"** -- Traditional APM misses 80% of AI-specific failures
   (semantic drift, hallucination, tool call quality).

### What IC Engineers Get Wrong

1. **"The model handles context management"** -- You manage context. The model processes
   whatever you give it. Context engineering is your responsibility.
2. **"Prompt engineering is the skill to learn"** -- It's the entry point, not the
   destination. Context engineering, eval design, and guardrails architecture are the real
   production skills.
3. **"Agents are just loops with tool calls"** -- Production agents need error recovery,
   cost budgets, timeout handling, dead-end detection, memory management, and governance
   compliance.

---

## EXISTING EXPLANATIONS THAT NEED REPLACEMENT

### Hall of Shame: Popular Explanations That Actively Mislead

1. **"Attention Is All You Need" diagram** -- Used everywhere, explains nothing to
   non-researchers. The encoder-decoder diagram needs a ground-up rebuild as progressive
   animation.

2. **Any RAG diagram with 3 boxes and 2 arrows** -- Hides the complexity that causes
   production failures. Need interactive pipeline builder showing chunking, embedding,
   retrieval, re-ranking, and citation tracking.

3. **"AI vs ML vs Deep Learning" nested circles** -- The classic Venn/nested diagram is
   from 2018 and doesn't reflect the current landscape where LLMs, diffusion, and agents
   have reshaped categories entirely.

4. **Static MoE diagrams** -- Boxes labeled "Expert 1" through "Expert 8" with a "Router"
   box. Doesn't convey sparsity, token-level routing, or why this is more efficient.

5. **Temperature as a "creativity dial"** -- Oversimplifies to the point of being wrong.
   Temperature is a probability distribution parameter, not a creativity slider. The
   relationship to output quality is non-linear.

6. **"Fine-tuning teaches the model new knowledge"** -- The most damaging misconception.
   Fine-tuning changes behavior, not knowledge. This misunderstanding has caused hundreds
   of failed enterprise projects.

7. **Agent architecture as a single loop** -- The clean Think-Act-Observe triangle hides
   error recovery, cost management, and the messy reality of production agents.

---

## MAPPING TO CONTENT STRATEGY

| Content Strategy Week | Primary Concepts | Stream |
|----------------------|------------------|--------|
| Week 1 (Shipped) | ReAct, Agents, Copilots, Chatbots | Agents |
| Week 3 | Eval Frameworks, Data Readiness, Governance | Engineering, Strategy |
| Week 5 | Model Serving, MCP, Multi-Model | Infrastructure, Engineering |
| Week 7 | Inference Optimization, GPU Economics, Cost Modeling | Infrastructure, Strategy |
| Week 9 | Build vs. Buy, Fine-tuning vs RAG | Strategy, Architecture |
| Week 11 | Agent Governance, Tool Use | Agents, Engineering |
| Week 13 | RAG, Embeddings, Context Windows | Architecture, Foundation |
| Week 15 | Model Serving, MoE, Distillation | Infrastructure, Architecture |
| Week 17 | Eval Frameworks, AI Observability | Engineering, Governance |
| Week 19 | Guardrails, Code Quality | Engineering, Governance |
| Week 21 | Data Readiness, Inference Optimization | Strategy, Infrastructure |
| Week 23 | AI Observability, Monitoring | Governance |
| Week 25 | Memory, Compliance Frameworks | Agents, Governance |
| Week 27 | Agentic Organization Design | Strategy |
| Week 29 | AI TRiSM, Red Teaming, Bias Detection | Governance |
| Week 31 | All (Synthesis) | All |

---

## GLOSSARY PLATFORM DESIGN IMPLICATIONS

### Interactive Features That Research Demands

1. **Executive/Technical Toggle** (already in your components) -- Every concept needs
   two explanations: the "why it matters for your budget" version and the "how it actually
   works" version.

2. **Prerequisite Chains** -- Visual skill tree showing what to learn first. Click a concept,
   see what it unlocks.

3. **Cost Impact Calculator** -- For infrastructure concepts, always connect to dollars.
   "Understanding MoE saves you $X/month because..."

4. **Live Comparison Mode** -- Side-by-side: "What you think RAG does" vs. "What RAG
   actually does in production."

5. **Misconception Buster** -- Start each concept with the common wrong mental model,
   then animate the correction. More memorable than teaching the right thing directly.

6. **Stream Progress Tracker** -- Show which concepts in each stream a user has explored,
   with clear prerequisite indicators.

---

## RESEARCH SOURCES

- [10 AI Topics for 2026 Enterprise Leaders - TechTarget](https://www.techtarget.com/searchenterpriseai/tip/AI-topics-that-enterprise-leaders-need-to-know)
- [Enterprise AI Governance 2026 - Presidio](https://www.presidio.com/blogs/enterprise-ai-governance-in-2026/)
- [AI Agents 2026: From Hype to Enterprise Reality - Kore.ai](https://www.kore.ai/blog/ai-agents-in-2026-from-hype-to-enterprise-reality)
- [Enterprise AI Strategy 2026 - Techment](https://www.techment.com/blogs/enterprise-ai-strategy-in-2026/)
- [The Changing Role of CTOs - Mission Cloud](https://www.missioncloud.com/blog/the-changing-role-of-ctos-in-the-age-of-ai)
- [Common CTO Mistakes with AI - Medium/Derek Ashmore](https://medium.com/@derekcashmore/the-most-common-mistakes-ctos-make-when-transitioning-to-ai-assisted-development-dc4cbd735111)
- [AI Myths vs Reality - CTO Magazine](https://ctomagazine.com/the-8-most-common-ai-myths/)
- [2026: Enterprise-Ready MCP Adoption - CData](https://www.cdata.com/blog/2026-year-enterprise-ready-mcp-adoption)
- [MCP Wikipedia](https://en.wikipedia.org/wiki/Model_Context_Protocol)
- [Google gRPC MCP Transport - InfoQ](https://www.infoq.com/news/2026/02/google-grpc-mcp-transport/)
- [Enterprise Agentic AI Architecture Guide - Kellton](https://www.kellton.com/kellton-tech-blog/enterprise-agentic-ai-architecture)
- [Multi-Agent Orchestration - Kore.ai](https://www.kore.ai/blog/what-is-multi-agent-orchestration)
- [7 Agentic AI Trends 2026 - MachineLearningMastery](https://machinelearningmastery.com/7-agentic-ai-trends-to-watch-in-2026/)
- [Agent Orchestration Value - Deloitte](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/ai-agent-orchestration.html)
- [Choose Agent Design Pattern - Google Cloud](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system)
- [Context Engineering - Gartner](https://www.gartner.com/en/articles/context-engineering)
- [Context Engineering vs Prompt Engineering - DextraLabs](https://dextralabs.com/blog/context-engineering-vs-prompt-engineering/)
- [Context Engineering - Elastic](https://www.elastic.co/search-labs/blog/context-engineering-vs-prompt-engineering)
- [MoE Explained - Hugging Face](https://huggingface.co/blog/moe)
- [MoE and NVIDIA Blackwell - NVIDIA](https://blogs.nvidia.com/blog/mixture-of-experts-frontier-models/)
- [What is MoE - IBM](https://www.ibm.com/think/topics/mixture-of-experts)
- [AI Inference Costs 2026 Crisis - ByteIota](https://byteiota.com/ai-inference-costs-2026-the-hidden-15-20x-gpu-crisis/)
- [AI Infrastructure Reckoning - Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/ai-infrastructure-compute-strategy.html)
- [Compute Power and AI - Deloitte](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/compute-power-ai.html)
- [Guardrails for Agents - CIO](https://www.cio.com/article/4130922/the-agent-control-plane-architecting-guardrails-for-a-new-digital-workforce.html)
- [From Guardrails to Governance - MIT Technology Review](https://www.technologyreview.com/2026/02/04/1131014/from-guardrails-to-governance-a-ceos-guide-for-securing-agentic-systems)
- [AI TRiSM - Gartner](https://www.gartner.com/en/articles/ai-trust-and-ai-risk)
- [AI TRiSM Framework - AvePoint](https://www.avepoint.com/blog/protect/ai-trism-framework-by-gartner-guide)
- [Red Teaming Cornerstone - The Register](https://www.theregister.com/2026/01/26/red_teaming_ai_cornerstone/)
- [AI Regulations 2026 - Sombra](https://sombrainc.com/blog/ai-regulations-2026-eu-ai-act)
- [Edge vs Cloud AI TCO - CIO](https://www.cio.com/article/4109609/edge-vs-cloud-tco-the-strategic-tipping-point-for-ai-inference.html)
- [Edge AI Inference 2026 - R&D World](https://www.rdworldonline.com/2026-ai-story-inference-at-the-edge-not-just-scale-in-the-cloud/)
- [RAG in 2026 Enterprise - Techment](https://www.techment.com/blogs/rag-in-2026/)
- [Enterprise AI Readiness 2026 - Sweep](https://www.sweep.io/blog/executive-brief-what-it-means-to-be-ai-ready-in-2026/)
- [2026 Year of AI Leader - Digital Leaders](https://digileaders.com/2026-is-the-year-of-the-ai-leader/)
- [AI Leadership Skills 2026 - TalentFoot](https://talentfoot.com/ai-leadership-skills-2026/)
- [Transformer Explainer - Polo Club](https://poloclub.github.io/transformer-explainer/)
- [Visualization for AI Explainability Workshop](https://visxai.io/)
- [RAG vs Fine-Tuning Guide - Matillion](https://www.matillion.com/blog/rag-vs-fine-tuning-enterprise-ai-strategy-guide)
- [Fine-Tuning with RAG - ICLR 2026](https://www.arxiv.org/pdf/2510.01375)
