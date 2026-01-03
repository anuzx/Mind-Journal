import {
  Brain,
  Link2,
  Share2,
  Lock,
  Sparkles,
  BookOpen,
  Users,
  Zap,
} from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-900">
                Mind Journal
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-600 hover:text-slate-900 transition"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-slate-600 hover:text-slate-900 transition"
              >
                How It Works
              </a>
              <a
                href="#about"
                className="text-slate-600 hover:text-slate-900 transition"
              >
                About
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/30">
                Sign In
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/30">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                Capture, Organize, Share
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Your Ideas Deserve
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                A Better Home
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Store your thoughts, save important links, and share your
              knowledge with the world. Your personal mind journal, powered by
              simplicity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-xl shadow-blue-600/30 text-lg font-semibold w-full sm:w-auto">
                Start Journaling Free
              </button>
              <button className="bg-white text-slate-700 px-8 py-4 rounded-xl hover:bg-slate-50 transition border-2 border-slate-200 text-lg font-semibold w-full sm:w-auto">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-slate-100">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Capture Ideas
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Quickly jot down thoughts, ideas, and inspirations before they
                slip away. Your mind, organized.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-slate-100">
              <div className="bg-cyan-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Link2 className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Save Links
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Keep all your important resources in one place. Never lose that
                perfect article again.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-slate-100">
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Share2 className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Share Knowledge
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Collaborate and share your collections with others. Build
                knowledge together.
              </p>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Powerful features to help you organize your thoughts and share
                your wisdom
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-start p-6">
                <Zap className="w-10 h-10 text-yellow-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Lightning Fast
                </h3>
                <p className="text-slate-600">
                  Capture ideas in seconds. No complicated setup or learning
                  curve.
                </p>
              </div>

              <div className="flex flex-col items-start p-6">
                <Lock className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Private & Secure
                </h3>
                <p className="text-slate-600">
                  Your thoughts are yours. Keep them private or share
                  selectively.
                </p>
              </div>

              <div className="flex flex-col items-start p-6">
                <Users className="w-10 h-10 text-green-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Collaborative
                </h3>
                <p className="text-slate-600">
                  Share collections with teams, friends, or the entire
                  community.
                </p>
              </div>

              <div className="flex flex-col items-start p-6">
                <Brain className="w-10 h-10 text-purple-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Smart Organization
                </h3>
                <p className="text-slate-600">
                  Tag, categorize, and search through your ideas effortlessly.
                </p>
              </div>

              <div className="flex flex-col items-start p-6">
                <Link2 className="w-10 h-10 text-cyan-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Link Management
                </h3>
                <p className="text-slate-600">
                  Save and organize important URLs with automatic metadata
                  capture.
                </p>
              </div>

              <div className="flex flex-col items-start p-6">
                <Sparkles className="w-10 h-10 text-pink-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Beautiful Interface
                </h3>
                <p className="text-slate-600">
                  A clean, intuitive design that gets out of your way and lets
                  you focus.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-slate-600">
                Three simple steps to organize your mind
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Create Your Journal
                </h3>
                <p className="text-slate-600">
                  Sign up and start your personal mind journal in seconds. No
                  credit card required.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Add Your Ideas
                </h3>
                <p className="text-slate-600">
                  Write notes, save links, and organize everything with tags and
                  categories.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Share & Collaborate
                </h3>
                <p className="text-slate-600">
                  Make collections public, invite collaborators, or keep
                  everything private.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Organize Your Mind?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands of thinkers, creators, and learners who trust
              MindJournal with their ideas.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow-xl text-lg font-semibold">
              Start Your Free Account
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">Mind Journal</span>
              </div>
              <p className="text-sm">
                Your personal space for ideas, links, and inspiration.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Mind Journal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
