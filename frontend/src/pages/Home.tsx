import {
  Brain,
  Link2,
  Lock,
  Sparkles,
  Users,
  Zap
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-200">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-auto min-h-[4rem] flex-wrap items-center justify-between py-3">
            {/* LOGO */}
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-purple-600" />
              <span className="text-xl font-bold text-purple-600">
                Mind Journal
              </span>
            </div>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a
                href="#features"
                className="text-gray-600 hover:text-purple-600"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-purple-600"
              >
                How it works
              </a>
              <a href="#about" className="text-gray-600 hover:text-purple-600">
                About
              </a>
            </div>

            {/* AUTH BUTTONS */}
            <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              {/* SIGN IN (always purple) */}
              <NavLink
                to="/signin"
                className="text-center px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition"
              >
                Sign In
              </NavLink>

              {/* GET STARTED */}
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `text-center px-5 py-2 rounded-lg transition font-medium
                   ${
                     isActive
                       ? "bg-purple-600 text-white"
                       : "bg-purple-200 text-purple-600 hover:bg-purple-500 hover:text-white"
                   }`
                }
              >
                Get Started
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-28 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-200 text-purple-600 px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">
            Capture · Organize · Share
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-600 mb-6">
          Your Ideas Deserve <br />
          <span className="text-purple-600">A Better Home</span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 text-lg mb-12">
          A personal space to store thoughts, save links, and build knowledge —
          beautifully organized.
        </p>

        <NavLink
          to="/signup"
          className="inline-block px-8 py-4 rounded-xl text-lg font-semibold bg-purple-500 text-white hover:bg-purple-600 transition"
        >
          Start Free
        </NavLink>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-purple-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-600 mb-4">
              Features
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Everything you need to organize your thoughts without friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <Zap />, title: "Fast & Minimal" },
              { icon: <Lock />, title: "Private & Secure" },
              { icon: <Users />, title: "Collaborative" },
              { icon: <Brain />, title: "Smart Organization" },
              { icon: <Link2 />, title: "Link Management" },
              { icon: <Sparkles />, title: "Beautiful UI" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-purple-200 hover:shadow-lg transition"
              >
                <div className="text-purple-600 mb-3">{item.icon}</div>
                <h3 className="font-semibold text-purple-600 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Designed to help you think clearly and stay focused.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="py-24 bg-gradient-to-br from-white to-purple-200"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-600 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">
              Three simple steps to organize your mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: "1",
                title: "Create Account",
                text: "Sign up in seconds.",
              },
              {
                step: "2",
                title: "Add Ideas & Links",
                text: "Capture thoughts and resources.",
              },
              {
                step: "3",
                title: "Organize & Share",
                text: "Structure ideas and collaborate.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-purple-200 p-8 rounded-2xl text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-purple-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-purple-600 mb-6">
            About Mind Journal
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Mind Journal is built for thinkers, learners, and creators who want
            a calm, focused space for their ideas — no clutter, no noise.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-purple-200 py-10 text-center text-sm text-gray-600">
        © 2026 Mind Journal. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
