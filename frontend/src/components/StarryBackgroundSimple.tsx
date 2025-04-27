import { useEffect, useRef } from "react";

interface StarConfig {
  size: number;
  top: string;
  left?: string;
  right?: string;
  opacity: number;
}

const generateStarPlacements = (count: number): StarConfig[] => {
  const stars: StarConfig[] = [];
  for (let i = 0; i < count; i++) {
    // Generate random size between 12 and 24
    const size = Math.floor(Math.random() * 13) + 12;
    
    // Generate random position (keeping stars away from the edges)
    const top = `${Math.floor(Math.random() * 75) + 15}%`;
    
    // Randomly choose between left and right positioning
    const useLeft = Math.random() > 0.5;
    const position = `${Math.floor(Math.random() * 75) + 15}%`;
    
    // Generate random opacity between 15 and 30
    const opacity = Math.floor(Math.random() * 16) + 15;

    stars.push({
      size,
      top,
      ...(useLeft ? { left: position } : { right: position }),
      opacity: opacity,
    });
  }
  return stars;
};

const StarryBackgroundSimple = () => {
  const starsRef = useRef<HTMLDivElement>(null);
  const starConfigs = generateStarPlacements(8); // Generate 8 random star placements

  useEffect(() => {
    const handleScroll = () => {
      if (!starsRef.current) return;
      const stars = starsRef.current.getElementsByClassName('star') as HTMLCollectionOf<HTMLElement>;
      const scrolled = window.scrollY;
      const rotationFactor = 0.2;

      Array.from(stars).forEach((star, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        const rotation = scrolled * rotationFactor * direction;
        star.style.transform = `rotate(${rotation}deg)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Decorative stars */}
      <div ref={starsRef}>
        {starConfigs.map((config, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              top: config.top,
              ...(config.left ? { left: config.left } : { right: config.right }),
            }}
          >
            <svg
              width={config.size}
              height={config.size}
              className="text-sleep-purple star"
              style={{ opacity: config.opacity / 100 }}
            >
              <path
                fill="currentColor"
                d={`M${config.size/2} ${config.size*0.08}l${config.size*0.2} ${config.size*0.31}h${config.size*0.32}l-${config.size*0.26} ${config.size*0.19}l${config.size*0.1} ${config.size*0.31}-${config.size*0.26}-${config.size*0.19}-${config.size*0.26} ${config.size*0.19}l${config.size*0.1}-${config.size*0.31}-${config.size*0.26}-${config.size*0.19}h${config.size*0.32}z`}
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarryBackgroundSimple; 