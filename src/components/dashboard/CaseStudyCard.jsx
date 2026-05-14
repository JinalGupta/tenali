const STATUS_CONFIG = {
  'Not Started': { label: 'Not Started', bg: 'bg-navy-800', text: 'text-cream-400', border: 'border-navy-700' },
  'In Progress': { label: 'In Progress', bg: 'bg-teal-400/10', text: 'text-teal-400', border: 'border-teal-400/30' },
  'Completed': { label: 'Completed', bg: 'bg-teal-400/20', text: 'text-teal-400', border: 'border-teal-400/50' },
}

export default function CaseStudyCard({ theorem, onClick }) {
  const statusCfg = STATUS_CONFIG['Not Started'] || STATUS_CONFIG['Not Started']

  return (
    <article
      onClick={onClick}
      className="group relative bg-navy-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer hover:border-teal-400/40 hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-teal-400/5"
    >
      {/* Illustration */}
      <div className="w-full aspect-square mb-5 rounded-2xl overflow-hidden bg-navy-950 border border-white/5 flex items-center justify-center p-4 group-hover:border-teal-400/20 transition-colors">
        {theorem.icon}
      </div>

      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}>
          {statusCfg.label}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-display text-xl text-cream-100 font-bold leading-tight group-hover:text-teal-400 transition-colors">
          {theorem.theorem}
        </h3>
        <p className="text-sm text-cream-300 leading-relaxed line-clamp-2">
          {theorem.coreIdea}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-xs font-mono text-cream-400">{theorem.illustration}</span>
        </div>
        <div className="flex items-center gap-1 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-semibold">Start</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </article>
  )
}