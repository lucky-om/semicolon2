import { useEffect, useState } from "react";

const NeonTitle = () => {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(true);
      setTimeout(() => setFlicker(false), 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mb-8">
      <h1 
        className={`font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-primary 
          ${flicker ? 'opacity-80' : 'neon-text'} transition-all duration-150`}
      >
        CODE ARENA
      </h1>
      <p className="font-body text-xl md:text-2xl mt-4 text-muted-foreground tracking-widest uppercase">
        Spin once. <span className="text-secondary neon-text-magenta">Fate decides.</span>
      </p>
    </div>
  );
};

export default NeonTitle;
