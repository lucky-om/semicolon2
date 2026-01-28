import { useEffect, useState } from "react";

interface VictoryRippleProps {
  active: boolean;
}

const VictoryRipple = ({ active }: VictoryRippleProps) => {
  const [ripples, setRipples] = useState<number[]>([]);

  useEffect(() => {
    if (active) {
      // Create ripples sequentially
      const ids: number[] = [];
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const id = Date.now() + i;
          ids.push(id);
          setRipples(prev => [...prev, id]);
          
          // Remove ripple after animation
          setTimeout(() => {
            setRipples(prev => prev.filter(r => r !== id));
          }, 1500);
        }, i * 300);
      }
    }
  }, [active]);

  if (!active && ripples.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {ripples.map((id, index) => (
        <div
          key={id}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
            w-20 h-20 rounded-full border-2 border-primary/60"
          style={{
            animation: "ripple 1.5s ease-out forwards",
          }}
        />
      ))}
    </div>
  );
};

export default VictoryRipple;
