import { useEffect, useState } from "react";
import {
  ArrowRight,
  Brain,
  FileText,
  Link2,
  MessageSquare,
  PlayCircle,
  Search,
  Share2,
  Sparkles,
  StickyNote,
  Tag,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const demoDrops = [
  {
    label: "YouTube video",
    icon: PlayCircle,
    raw: "youtube.com/watch?v=2c3KvZ…",
    title: "Building AI Agents with LangGraph",
    summary:
      "Tutorial walking through how to build a multi-step AI agent using LangGraph and tool calling.",
    tags: ["ai", "agents", "langgraph", "llm"],
  },
  {
    label: "X / Twitter post",
    icon: MessageSquare,
    raw: "x.com/_/status/19038…",
    title: "On the future of context windows",
    summary:
      "A short thread arguing retrieval will matter more than raw context length for most real apps.",
    tags: ["llm", "context", "retrieval"],
  },
  {
    label: "PDF",
    icon: FileText,
    raw: "attention-is-all-you-need.pdf",
    title: "Attention Is All You Need",
    summary:
      "The original transformer paper — introduces self-attention as a replacement for recurrence.",
    tags: ["transformers", "nlp", "research"],
  },
  {
    label: "Quick note",
    icon: StickyNote,
    raw: "renew passport before trip",
    title: "Renew passport",
    summary:
      "Reminder to renew before the September trip — book the appointment online.",
    tags: ["todo", "personal"],
    due: "Due Jul 15",
  },
];

const steps = [
  {
    n: "01",
    title: "Drop something in",
    text: "Paste a link, upload a file, or jot a quick note.",
  },
  {
    n: "02",
    title: "AI reads it",
    text: "A summary and tags appear in seconds no typing required.",
  },
  {
    n: "03",
    title: "Search by feeling",
    text: "Type what you remember, even without a title, and find it.",
  },
];

const features = [
  {
    icon: PlayCircle,
    title: "YouTube videos",
    text: "Drop in a link — Mind Journal pulls the transcript and summarizes it for you.",
  },
  {
    icon: MessageSquare,
    title: "X / Twitter posts",
    text: "Save a tweet's text and ideas without losing it in your bookmarks.",
  },
  {
    icon: FileText,
    title: "Images & documents",
    text: "Upload an Image or doc the text gets extracted and distilled automatically.",
  },
  {
    icon: Link2,
    title: "Web links",
    text: "Any article or page gets scraped, summarized, and made searchable.",
  },
  {
    icon: StickyNote,
    title: "Notes & todos",
    text: "Jot a note with a due date — it shows up in your day, checkbox and all.",
  },
  {
    icon: Share2,
    title: "Share your mind",
    text: "Turn your whole vault into a public, read-only link when you want to show it off.",
  },
];

function Home() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % demoDrops.length);
    }, 3400);
    return () => clearInterval(id);
  }, []);

  const drop = demoDrops[active];
  const DropIcon = drop.icon;

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#ECE7DA]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400..600&family=Inter:wght@400;500;600;700&display=swap');
        .mj-display { font-family: 'Fraunces', serif; }
        .mj-body { font-family: 'Inter', sans-serif; }

        @keyframes mj-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mj-tag-pop {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes mj-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .mj-card-enter { animation: mj-fade-up 0.5s ease both; }
        .mj-tag-enter { animation: mj-tag-pop 0.35s ease both; }
        .mj-cursor { animation: mj-blink 1s step-end infinite; }

        @media (prefers-reduced-motion: reduce) {
          .mj-card-enter, .mj-tag-enter, .mj-cursor { animation: none !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0E14]/85 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-[#8B7CF6]" />
              <span className="mj-display text-lg font-semibold tracking-tight">
                Mind Journal
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm mj-body text-[#9AA0AE]">
              <a href="#features" className="hover:text-[#ECE7DA] transition">
                Features
              </a>
              <a
                href="#how-it-works"
                className="hover:text-[#ECE7DA] transition"
              >
                How it works
              </a>
              <a href="#about" className="hover:text-[#ECE7DA] transition">
                About
              </a>
            </div>

            <div className="flex items-center gap-3">
              <NavLink
                to="/signin"
                className="text-sm mj-body px-4 py-2 rounded-full text-[#ECE7DA] hover:bg-white/5 transition"
              >
                Sign in
              </NavLink>
              <NavLink
                to="/signup"
                className="text-sm mj-body px-4 py-2 rounded-full bg-[#8B7CF6] text-[#0B0E14] font-medium hover:bg-[#A395FF] transition"
              >
                Get started
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-6 text-xs mj-body text-[#9AA0AE]">
            <Sparkles className="w-3.5 h-3.5 text-[#F4B400]" />
            Capture once. Organized forever.
          </div>

          <h1 className="mj-display text-5xl sm:text-6xl leading-[1.05] font-medium mb-6">
            Everything you save,{" "}
            <span className="italic text-[#F4B400]">organized</span> before you
            ask.
          </h1>

          <p className="mj-body text-lg text-[#9AA0AE] max-w-md mb-10 leading-relaxed">
            Drop in a YouTube video, a tweet, a PDF, an Image, a link, or a
            quick note. Mind Journal reads it, summarizes it, and tags it, so a
            single search finds it later, even if you never typed a title.
          </p>

          <div className="flex items-center gap-5">
            <NavLink
              to="/signup"
              className="inline-flex items-center gap-2 mj-body px-6 py-3 rounded-full bg-[#8B7CF6] text-[#0B0E14] font-medium hover:bg-[#A395FF] transition"
            >
              Start free <ArrowRight className="w-4 h-4" />
            </NavLink>
            <a
              href="#how-it-works"
              className="mj-body text-sm text-[#9AA0AE] hover:text-[#ECE7DA] transition"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* SIGNATURE: live ingest demo card */}
        <div className="relative">
          <div className="mj-body text-xs text-[#9AA0AE] mb-3 flex items-center gap-2">
            <DropIcon className="w-3.5 h-3.5" />
            {drop.label}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#11151D] p-6 shadow-[0_0_60px_-15px_rgba(139,124,246,0.25)]">
            <div className="mj-body text-sm text-[#6B7280] mb-4 truncate">
              {drop.raw}
              <span className="mj-cursor">▍</span>
            </div>

            <div key={active} className="mj-card-enter">
              <h3 className="mj-display text-xl font-medium mb-2">
                {drop.title}
              </h3>
              <p className="mj-body text-sm text-[#9AA0AE] leading-relaxed mb-4">
                {drop.summary}
              </p>

              {drop.due && (
                <div className="inline-flex items-center gap-1.5 text-xs mj-body text-[#F4B400] border border-[#F4B400]/30 bg-[#F4B400]/10 rounded-full px-2.5 py-1 mb-4">
                  {drop.due}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {drop.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className="mj-tag-enter mj-body inline-flex items-center gap-1 text-xs text-[#ECE7DA] bg-white/5 border border-white/10 rounded-full px-2.5 py-1"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <Tag className="w-3 h-3 text-[#F4B400]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-t border-white/5 bg-[#0D1117]"
      >
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="mb-16 max-w-xl">
            <h2 className="mj-display text-3xl font-medium mb-3">
              How it works
            </h2>
            <p className="mj-body text-[#9AA0AE]">
              Three steps, in order capture comes first, AI handles the rest.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.n}>
                <div className="mj-display text-sm text-[#8B7CF6] mb-3">
                  {step.n}
                </div>
                <h3 className="mj-body text-lg font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="mj-body text-[#9AA0AE] text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="mb-16 max-w-xl">
            <h2 className="mj-display text-3xl font-medium mb-3">
              Drop in anything
            </h2>
            <p className="mj-body text-[#9AA0AE]">
              Six kinds of content, one search bar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-xl border border-white/10 bg-[#11151D] p-6 hover:border-[#8B7CF6]/40 transition"
                >
                  <Icon className="w-5 h-5 text-[#8B7CF6] mb-4" />
                  <h3 className="mj-body font-semibold mb-1.5">{f.title}</h3>
                  <p className="mj-body text-sm text-[#9AA0AE] leading-relaxed">
                    {f.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-white/5 bg-[#0D1117]">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <Search className="w-6 h-6 text-[#F4B400] mx-auto mb-6" />
          <h2 className="mj-display text-3xl font-medium mb-6">
            Built for thinkers who'd rather think than file.
          </h2>
          <p className="mj-body text-[#9AA0AE] leading-relaxed">
            Tagging by hand doesn't scale, and you know it the moment you go
            looking for that one video again. Mind Journal does the filing for
            you, quietly, in the background so the only thing left to do is
            remember roughly what you saved, and search.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm mj-body text-[#6B7280]">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Mind Journal
          </div>
          <p>© 2026 Mind Journal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
