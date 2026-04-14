import { motion } from "framer-motion";

export function GaugeChart({ score = 0, size = 160 }) {
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;
  // Map score (0-100) to half circle offset
  const scorePercent = Math.max(0, Math.min(100, score));
  const offset = circumference - (scorePercent / 100) * (circumference / 2);
  
  let colorClass = "stroke-red-500";
  if (score > 40) colorClass = "stroke-yellow-500";
  if (score > 70) colorClass = "stroke-green-500";

  return (
    <div className="relative flex flex-col items-center justify-center pt-[20px]" style={{ width: size, height: size * 0.6 }}>
      <svg width={size} height={size / 2 + 10} className="overflow-visible" viewBox={`0 0 ${size} ${size / 2}`}>
        {/* Background Arc */}
        <path
          d={`M ${size * 0.1} ${size / 2} A ${radius} ${radius} 0 0 1 ${size * 0.9} ${size / 2}`}
          fill="transparent"
          stroke="currentColor"
          className="text-gray-200 dark:text-gray-800"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Foreground Arc */}
        <motion.path
          d={`M ${size * 0.1} ${size / 2} A ${radius} ${radius} 0 0 1 ${size * 0.9} ${size / 2}`}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference} // start empty
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={colorClass}
          strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute top-[50%] flex flex-col items-center translate-y-[-20%]">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold text-gray-900 dark:text-gray-50"
        >
          {score}
        </motion.span>
        <span className="text-xs text-gray-500 font-medium">TRUST SCORE</span>
      </div>
    </div>
  );
}
