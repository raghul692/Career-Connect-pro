import React from 'react'
import { Link } from 'react-router-dom'
import { Briefcase } from 'lucide-react'

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg'
  inverted?: boolean
  showTagline?: boolean
  className?: string
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  inverted = false,
  showTagline = true,
  className = ''
}) => {
  const iconBox = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-8 h-8 rounded-lg',
    lg: 'w-10 h-10 rounded-xl'
  }

  const iconGlyph = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const titleSize = {
    sm: 'text-sm font-bold',
    md: 'text-[17px] font-extrabold',
    lg: 'text-xl font-black'
  }

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group select-none transition-all duration-150 shrink-0 ${className}`}
      aria-label="Career Connect Pro Home"
    >
      {/* Brand Icon Mark */}
      <div
        className={`${iconBox[size]} relative bg-[#275df5] text-white flex items-center justify-center shadow-xs ring-1 ring-black/5 group-hover:bg-[#1f4ed8] group-hover:scale-[1.03] transition-all duration-150 shrink-0`}
      >
        <Briefcase className={`${iconGlyph[size]} text-white stroke-[2.2]`} />
        {/* Subtle accent dot on logo mark */}
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-white" />
      </div>

      {/* Typography & Brand Slogan */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1 leading-none">
          <span
            className={`tracking-tight ${titleSize[size]} ${
              inverted ? 'text-white' : 'text-slate-900 group-hover:text-[#275df5]'
            } transition-colors`}
          >
            CareerConnect
          </span>
          <span className="bg-[#275df5] text-white text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded leading-none shadow-2xs">
            PRO
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1 leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span
              className={`text-[9px] font-semibold tracking-wider uppercase truncate ${
                inverted ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              India&apos;s Career Network
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
