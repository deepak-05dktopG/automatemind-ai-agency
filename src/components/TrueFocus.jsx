import { useEffect, useRef, useState } from 'react';
import './TrueFocus.css';

const TrueFocus = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 0.5,
  borderColor = '#c6a15b',
  glowColor = 'rgba(198, 161, 91, 0.6)',
  animationDuration = 0.2,
  pauseBetweenAnimations = 1,
  highlightIndices = []
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const focusFrameRef = useRef(null);
  const wordRefs = useRef([]);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (!manualMode) {
      let interval;

      const startRotation = () => {
        if (isScrollingRef.current || interval) return;
        interval = setInterval(
          () => setCurrentIndex(prev => (prev + 1) % words.length),
          (animationDuration + pauseBetweenAnimations) * 1000
        );
      };
      const handleScrollStart = () => {
        isScrollingRef.current = true;
        clearInterval(interval);
        interval = undefined;
        focusFrameRef.current?.getAnimations().forEach(animation => animation.pause());
      };
      const handleScrollEnd = () => {
        isScrollingRef.current = false;
        focusFrameRef.current?.getAnimations().forEach(animation => animation.play());
        startRotation();
      };

      window.addEventListener('automatemind:scrollstart', handleScrollStart);
      window.addEventListener('automatemind:scrollend', handleScrollEnd);
      startRotation();

      return () => {
        clearInterval(interval);
        window.removeEventListener('automatemind:scrollstart', handleScrollStart);
        window.removeEventListener('automatemind:scrollend', handleScrollEnd);
      };
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;

    const updateRect = () => {
      if (!wordRefs.current[currentIndex] || !containerRef.current) return;
      const parentRect = containerRef.current.getBoundingClientRect();
      const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();
      const focusFrame = focusFrameRef.current;
      if (!focusFrame) return;

      focusFrame.style.width = `${activeRect.width}px`;
      focusFrame.style.height = `${activeRect.height}px`;
      focusFrame.style.transform = `translate3d(${activeRect.left - parentRect.left}px, ${activeRect.top - parentRect.top}px, 0)`;
      focusFrame.style.opacity = '1';
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [currentIndex, words.length]);

  const handleMouseEnter = index => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div className="focus-container" ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        const isHighlight = highlightIndices.includes(index);
        return (
          <span
            key={index}
            ref={el => {
              wordRefs.current[index] = el;
            }}
            className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''} ${isHighlight ? 'highlight' : ''}`}
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.85,
              '--border-color': borderColor,
              '--glow-color': glowColor,
              transition: `filter ${animationDuration}s ease, opacity ${animationDuration}s ease`
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <div
        ref={focusFrameRef}
        className="focus-frame"
        style={{
          '--border-color': borderColor,
          '--glow-color': glowColor,
          '--focus-duration': `${animationDuration}s`,
          opacity: 0
        }}
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </div>
    </div>
  );
};

export default TrueFocus;
