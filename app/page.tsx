import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <span className="text-xl font-bold text-slate-900">ResumeAI</span>
          </div>
          <Link href="/builder">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
            Build Your Perfect Resume in Minutes
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto text-balance">
            AI-powered resume builder with ATS-optimized templates. Get professional formatting and content suggestions
            instantly.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/builder">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
                Start Building →
              </button>
            </Link>
            <button className="px-6 py-3 border border-slate-300 text-slate-900 rounded-md font-medium hover:bg-slate-50">
              View Examples
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
            <span className="text-4xl mb-4 block">✨</span>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">AI-Powered Formatting</h3>
            <p className="text-slate-600">
              Let our AI enhance your content and ensure professional formatting that impresses recruiters.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
            <span className="text-4xl mb-4 block">📋</span>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">ATS-Optimized</h3>
            <p className="text-slate-600">
              All templates are designed to pass Applicant Tracking Systems and get your resume noticed.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 border border-slate-200 hover:shadow-lg transition-shadow">
            <span className="text-4xl mb-4 block">⬇️</span>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Easy Export</h3>
            <p className="text-slate-600">Download your resume as PDF or Word document. Ready to send to employers.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
