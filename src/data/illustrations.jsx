export const theoremIllustrations = {
  'pythagorean': (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="16" fill="#0f1629"/>
      {/* Right triangle */}
      <polygon points="20,90 90,90 90,30" fill="#1e3a5f" stroke="#2dd4bf" strokeWidth="2"/>
      {/* Squares on each side */}
      <rect x="20" y="90" width="70" height="70" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5"/>
      <rect x="90" y="30" width="70" height="70" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5"/>
      <rect x="20" y="20" width="70" height="70" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5"/>
      {/* Labels */}
      <text x="50" y="108" fontFamily="monospace" fontSize="10" fill="#2dd4bf" textAnchor="middle">a²</text>
      <text x="112" y="65" fontFamily="monospace" fontSize="10" fill="#f59e0b" textAnchor="middle">b²</text>
      <text x="50" y="25" fontFamily="monospace" fontSize="10" fill="#818cf8" textAnchor="middle">c²</text>
      {/* a² + b² = c² label */}
      <text x="60" y="60" fontFamily="monospace" fontSize="9" fill="#e2e8f0" textAnchor="middle">a²+b²</text>
      <text x="60" y="72" fontFamily="monospace" fontSize="9" fill="#e2e8f0" textAnchor="middle">= c²</text>
    </svg>
  ),

  'fermats-last': (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="16" fill="#0f1629"/>
      {/* x³ + y³ = z³ crossing out */}
      <text x="60" y="38" fontFamily="monospace" fontSize="14" fill="#818cf8" textAnchor="middle" fontWeight="bold">x³ + y³</text>
      <text x="60" y="56" fontFamily="monospace" fontSize="14" fill="#818cf8" textAnchor="middle" fontWeight="bold">= z³</text>
      {/* Crossed out red circle */}
      <circle cx="60" cy="82" r="18" fill="none" stroke="#f87171" strokeWidth="2.5"/>
      <line x1="46" y1="96" x2="74" y2="68" stroke="#f87171" strokeWidth="2.5"/>
      {/* n > 2 label */}
      <text x="60" y="112" fontFamily="monospace" fontSize="8" fill="#94a3b8" textAnchor="middle">n &gt; 2 ✗</text>
    </svg>
  ),

  'euler-formula': (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="16" fill="#0f1629"/>
      {/* Euler's identity: e^(iπ) + 1 = 0 */}
      <circle cx="60" cy="40" r="28" fill="none" stroke="#6366f1" strokeWidth="1.5"/>
      {/* e */}
      <text x="42" y="44" fontFamily="monospace" fontSize="13" fill="#a5b4fc" textAnchor="middle">e</text>
      {/* superscript iπ */}
      <text x="52" y="34" fontFamily="monospace" fontSize="8" fill="#a5b4fc" textAnchor="middle">iπ</text>
      {/* + 1 = 0 */}
      <text x="60" y="75" fontFamily="monospace" fontSize="20" fill="#2dd4bf" textAnchor="middle">+ 1</text>
      <text x="60" y="100" fontFamily="monospace" fontSize="22" fill="#f59e0b" textAnchor="middle">= 0</text>
      {/* Spiral hint */}
      <path d="M 30 100 Q 45 85 60 100 Q 75 115 90 100" stroke="#6366f1" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  ),

  'fundamental-theorem': (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="16" fill="#0f1629"/>
      {/* Area under curve */}
      <path d="M 10 100 Q 30 80 50 60 Q 70 40 90 50 Q 110 60 110 100 Z" fill="#2dd4bf" fillOpacity="0.15" stroke="#2dd4bf" strokeWidth="2"/>
      {/* The curve itself */}
      <path d="M 10 100 Q 30 80 50 60 Q 70 40 90 50 Q 110 60 110 100" stroke="#2dd4bf" strokeWidth="2" fill="none"/>
      {/* Integral symbol */}
      <text x="15" y="70" fontFamily="serif" fontSize="28" fill="#818cf8" fontStyle="italic">∫</text>
      {/* Derivative notation */}
      <text x="95" y="70" fontFamily="serif" fontSize="16" fill="#f59e0b" fontStyle="italic">d/dx</text>
      {/* Arrow connecting them */}
      <line x1="60" y1="105" x2="60" y2="115" stroke="#94a3b8" strokeWidth="1"/>
      <text x="60" y="114" fontFamily="monospace" fontSize="7" fill="#94a3b8" textAnchor="middle">F(b)-F(a)</text>
    </svg>
  ),

  'infinite-pi': (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="16" fill="#0f1629"/>
      {/* Leibniz series: π/4 = 1 - 1/3 + 1/5 - 1/7 + ... */}
      <text x="60" y="28" fontFamily="monospace" fontSize="11" fill="#a5b4fc" textAnchor="middle">π/4 =</text>
      {/* Alternating series */}
      <text x="60" y="46" fontFamily="monospace" fontSize="12" fill="#2dd4bf" textAnchor="middle">1 - 1/3</text>
      <text x="60" y="62" fontFamily="monospace" fontSize="12" fill="#2dd4bf" textAnchor="middle">+ 1/5 - 1/7</text>
      <text x="60" y="78" fontFamily="monospace" fontSize="12" fill="#2dd4bf" textAnchor="middle">+ 1/9 - 1/11</text>
      <text x="60" y="94" fontFamily="monospace" fontSize="10" fill="#94a3b8" textAnchor="middle">+ ··· → π/4</text>
      {/* Spiral convergence hint */}
      <path d="M 20 50 Q 35 40 50 50 Q 65 60 80 50 Q 95 40 110 50" stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.6"/>
      {/* π symbol */}
      <text x="60" y="116" fontFamily="serif" fontSize="20" fill="#f59e0b" textAnchor="middle">π ≈ 3.14159...</text>
    </svg>
  ),

  'goldbach-conjecture': (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="16" fill="#0f1629"/>
      {/* Even number = two primes */}
      <text x="60" y="25" fontFamily="monospace" fontSize="12" fill="#f59e0b" textAnchor="middle">Every even integer</text>
      {/* 4 = 2 + 2 */}
      <text x="60" y="48" fontFamily="monospace" fontSize="16" fill="#e2e8f0" textAnchor="middle">4 = 2 + 2</text>
      <text x="60" y="66" fontFamily="monospace" fontSize="16" fill="#e2e8f0" textAnchor="middle">10 = 3 + 7</text>
      <text x="60" y="84" fontFamily="monospace" fontSize="16" fill="#e2e8f0" textAnchor="middle">28 = 5 + 23</text>
      {/* Prime indicators */}
      <circle cx="30" cy="48" r="4" fill="#2dd4bf" fillOpacity="0.3"/>
      <circle cx="90" cy="48" r="4" fill="#2dd4bf" fillOpacity="0.3"/>
      <text x="60" y="104" fontFamily="monospace" fontSize="9" fill="#94a3b8" textAnchor="middle">verified &gt; 4×10¹⁸</text>
    </svg>
  ),

  'banach-tarski': (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="16" fill="#0f1629"/>
      {/* Sphere splitting */}
      <circle cx="40" cy="60" r="24" fill="none" stroke="#6366f1" strokeWidth="2"/>
      {/* Arrow */}
      <line x1="68" y1="60" x2="78" y2="60" stroke="#f59e0b" strokeWidth="2"/>
      <polygon points="78,56 86,60 78,64" fill="#f59e0b"/>
      {/* Two spheres reassembled */}
      <circle cx="95" cy="45" r="14" fill="none" stroke="#2dd4bf" strokeWidth="2"/>
      <circle cx="95" cy="75" r="14" fill="none" stroke="#2dd4bf" strokeWidth="2"/>
      {/* Paradox label */}
      <text x="60" y="20" fontFamily="monospace" fontSize="9" fill="#f87171" textAnchor="middle">1 → 2 identical</text>
      <text x="60" y="108" fontFamily="monospace" fontSize="8" fill="#94a3b8" textAnchor="middle">mathematically true</text>
      <text x="60" y="118" fontFamily="monospace" fontSize="8" fill="#94a3b8" textAnchor="middle">physically impossible</text>
    </svg>
  ),
}

export const theoremLabels = {
  'pythagorean': 'a² + b² = c²',
  'fermats-last': 'xⁿ + yⁿ ≠ zⁿ',
  'euler-formula': 'e^(iπ) + 1 = 0',
  'fundamental-theorem': '∫d/dx',
  'infinite-pi': 'π/4 series',
  'goldbach-conjecture': 'p₁ + p₂ = even',
  'banach-tarski': '1 = 2',
}