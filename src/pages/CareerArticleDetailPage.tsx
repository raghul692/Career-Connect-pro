import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, Calendar, ChevronRight, Share2 } from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const CareerArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { articles, showNotification } = useJobContext()

  const article = articles.find((a) => a.id === id) || articles[0]

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      showNotification('Article link copied!')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/career-advice" className="hover:text-indigo-600">Career Advice</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold truncate max-w-xs">{article.title}</span>
      </nav>

      <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
        
        {/* Meta Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full text-xs">
              {article.category}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 font-semibold cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-500 border-b border-slate-100 pb-4">
            <img
              src={article.avatar}
              alt={article.author}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <div className="font-bold text-slate-900">{article.author}</div>
              <div className="text-[11px] text-slate-500">{article.authorRole}</div>
            </div>
            <span className="text-slate-300 ml-auto">&bull;</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedDate}
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Lead summary */}
        <div className="text-sm sm:text-base font-semibold text-slate-800 bg-slate-50 p-4 rounded-2xl border-l-4 border-indigo-600 leading-relaxed">
          {article.summary}
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
          {article.content.map((p, idx) => (
            <p key={idx} className="leading-7">
              {p}
            </p>
          ))}
        </div>

        {/* Tags footer */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((t, i) => (
              <span key={i} className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">
                #{t}
              </span>
            ))}
          </div>

          <Link
            to="/jobs/freshers"
            className="text-xs font-bold text-indigo-600 hover:underline"
          >
            Explore Freshers Openings &rarr;
          </Link>
        </div>

      </article>

    </div>
  )
}

