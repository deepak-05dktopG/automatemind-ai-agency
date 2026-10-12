import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const SplitText = ({
  text,
  className = '',
  delay = 30,
  duration = 0.8,
  ease = 'power3.out',
  splitType = 'words',
  from = { opacity: 0, y: 25 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') setFontsLoaded(true);
      else document.fonts.ready.then(() => setFontsLoaded(true));
    } else setFontsLoaded(true);
  }, []);

  useEffect(() => {
    if (!ref.current || !text || !fontsLoaded || animationCompletedRef.current) return undefined;
    const el = ref.current;

    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const elementFontSize = parseFloat(getComputedStyle(el).fontSize);
    let observer;
    let tween;
    let animationStarted = false;

    // Build DOM elements for words/chars splitting without paid SplitText plugin
    el.innerHTML = '';
    const words = text.split(' ');
    const targets = [];

    words.forEach((wordStr, wordIdx) => {
      const wordWrap = document.createElement('span');
      wordWrap.className = 'split-word';
      wordWrap.style.display = 'inline-block';
      wordWrap.style.whiteSpace = 'nowrap';

      if (splitType.includes('chars')) {
        Array.from(wordStr).forEach(charStr => {
          const charSpan = document.createElement('span');
          charSpan.className = 'split-char';
          charSpan.textContent = charStr;
          charSpan.style.display = 'inline-block';
          wordWrap.appendChild(charSpan);
          targets.push(charSpan);
        });
      } else {
        wordWrap.textContent = wordStr;
        targets.push(wordWrap);
      }

      el.appendChild(wordWrap);

      if (wordIdx < words.length - 1) {
        const spaceSpan = document.createElement('span');
        spaceSpan.className = 'split-space';
        spaceSpan.textContent = '\u00A0';
        spaceSpan.style.display = 'inline-block';
        el.appendChild(spaceSpan);
      }
    });

    gsap.set(targets, { ...from, willChange: 'transform,opacity' });

    const startAnimation = () => {
      if (animationStarted) return;
      animationStarted = true;
      observer?.disconnect();
      window.removeEventListener('resize', observeTrigger);
      tween = gsap.to(targets, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          gsap.set(targets, { clearProps: 'willChange' });
          animationCompletedRef.current = true;
          onCompleteRef.current?.();
        }
      });
    };

    const observeTrigger = () => {
      observer?.disconnect();
      if (typeof IntersectionObserver === 'undefined') {
        startAnimation();
        return;
      }
      const marginPixels = marginValue * (
        marginUnit === 'em' ? elementFontSize :
        marginUnit === 'rem' ? rootFontSize :
        marginUnit === '%' ? window.innerHeight / 100 : 1
      );
      const triggerLine = window.innerHeight * (1 - threshold) + marginPixels;
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) startAnimation();
        },
        { rootMargin: `0px 0px ${triggerLine - window.innerHeight}px 0px` },
      );
      observer.observe(el);
    };

    observeTrigger();
    window.addEventListener('resize', observeTrigger);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', observeTrigger);
      tween?.kill();
      gsap.set(targets, { clearProps: 'willChange' });
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    JSON.stringify(from),
    JSON.stringify(to),
    threshold,
    rootMargin,
    fontsLoaded
  ]);

  const Tag = tag || 'p';
  const style = {
    textAlign,
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  };

  return (
    <Tag ref={ref} style={style} className={`split-parent ${className}`.trim()}>
      {text}
    </Tag>
  );
};

export default SplitText;
