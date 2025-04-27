import { useEffect, useRef } from "react";

interface StarConfig {
  size: number;
  top: string;
  left?: string;
  right?: string;
  opacity: number;
}

interface StarryBackgroundProps {
  showBlobs?: boolean;
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

const StarryBackground = ({ showBlobs = true }: StarryBackgroundProps) => {
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
      {showBlobs && (
        <>
          <div className="absolute top-[-6rem] left-[-6rem] w-96 h-96 bg-sleep-purple/30 rounded-full blur-3xl animate-ambient-1" />
          <div className="absolute bottom-[-8rem] right-[-8rem] w-[32rem] h-[32rem] bg-sleep-soft-blue/30 rounded-full blur-3xl animate-ambient-2" />
          <div
            className="absolute top-[30%] left-[10%] w-80 h-80 bg-sleep-light-purple/20 rounded-full blur-3xl animate-ambient-3"
            style={{ animationDelay: "10s" }}
          />
          <div
            className="absolute bottom-[20%] right-[30%] w-72 h-72 bg-sleep-sky-blue/20 rounded-full blur-3xl animate-ambient-4"
            style={{ animationDelay: "20s" }}
          />
        </>
      )}
      
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

export default StarryBackground; 