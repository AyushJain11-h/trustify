import { motion } from "framer-motion";

export function LineChart({ data = [], width = 300, height = 100 }) {
  if (!data || data.length === 0) return <div className="h-24 flex items-center justify-center text-gray-400">No Data</div>;
  
  const max = Math.max(...data) || 1;
  const min = Math.min(...data, 0);
  const range = max - min;
  
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative w-full" style={{ aspectRatio: `${width}/${height}` }}>
      <svg viewBox={`0 -10 ${width} ${height + 20}`} className="w-full h-full overflow-visible">
        <motion.polyline
          points={points}
          fill="none"
          stroke="currentColor"
          className="text-primary-500"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {data.map((val, idx) => {
          const x = (idx / (data.length - 1)) * width;
          const y = height - ((val - min) / range) * height;
          return (
            <motion.circle
              key={idx}
              cx={x}
              cy={y}
              r="4"
              fill="currentColor"
              className="text-white dark:text-gray-900 stroke-primary-600 dark:stroke-primary-400 stroke-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + idx * 0.1 }}
            />
          );
        })}
      </svg>
    </div>
  );
}
