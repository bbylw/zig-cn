interface ZigLogoProps {
  className?: string
  size?: number
  glow?: boolean
}

export default function ZigLogo({ className = '', size = 28, glow = false }: ZigLogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <div 
          className="absolute -inset-1 rounded-lg bg-zig-orange/30 blur-md transition-all group-hover:bg-zig-orange/50"
          style={{ width: size + 8, height: size + 8 }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative transform transition-transform group-hover:scale-105"
      >
        {/* Background rounded polygon */}
        <rect width="40" height="40" rx="8" fill="#1A1A28" stroke="#F7A41D" strokeWidth="1.5" strokeOpacity="0.4" />
        {/* Stylized Zig 'Z' and geometric teeth */}
        <path
          d="M8 11.5H32L26.5 17.5H16.5L28.5 28.5H8L13.5 22.5H23.5L11.5 11.5H8Z"
          fill="url(#zigGradient)"
        />
        <path
          d="M9 10.5L31 10.5L25 17L15 17L27 28L9 28L15 21.5L25 21.5L13 10.5"
          stroke="#FFE180"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.8"
        />
        <defs>
          <linearGradient id="zigGradient" x1="8" y1="10.5" x2="32" y2="29.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F7A41D" />
            <stop offset="0.5" stopColor="#FFAE34" />
            <stop offset="1" stopColor="#D4881A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
