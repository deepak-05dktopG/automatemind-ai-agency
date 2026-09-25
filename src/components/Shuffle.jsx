import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Shuffle.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Shuffle = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  maxDelay = 0,
  ease = 'power3.out',
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'span',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = '',
  colorFrom,
  colorTo,
  triggerOnce = true,
  triggerOnMount = false,
  respectReducedMotion = true,
  triggerOnHover = true
}) => {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const wrappersRef = useRef([]);
  const tlRef = useRef(null);
  const playingRef = useRef(false);
  const hoverHandlerRef = useRef(null);

  useEffect(() => {
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') setFontsLoaded(true);
      else document.fonts.ready.then(() => setFontsLoaded(true));
    } else setFontsLoaded(true);
  }, []);

  const scrollTriggerStart = useMemo(() => {
    const startPct = (1 - threshold) * 100;
    const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');
    const mv = mm ? parseFloat(mm[1]) : 0;
    const mu = mm ? mm[2] || 'px' : 'px';
    const sign = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
    return `top ${startPct}%${sign}`;
  }, [threshold, rootMargin]);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setReady(true);
        onShuffleComplete?.();
        return;
      }

      const el = ref.current;
      const start = scrollTriggerStart;

      const removeHover = () => {
        if (hoverHandlerRef.current && ref.current) {
          ref.current.removeEventListener('mouseenter', hoverHandlerRef.current);
          const buttonParent = ref.current.closest('a, button');
          if (buttonParent) {
            buttonParent.removeEventListener('mouseenter', hoverHandlerRef.current);
          }
          hoverHandlerRef.current = null;
        }
      };

      const teardown = () => {
        if (tlRef.current) {
          tlRef.current.kill();
          tlRef.current = null;
        }
        if (wrappersRef.current.length) {
          el.innerHTML = '';
          el.textContent = text;
          wrappersRef.current = [];
        }
        playingRef.current = false;
      };

      const build = () => {
        teardown();
        el.innerHTML = '';

        const charsArray = Array.from(text);
        wrappersRef.current = [];

        const rolls = Math.max(1, Math.floor(shuffleTimes));
        const rand = set => set.charAt(Math.floor(Math.random() * set.length)) || '';
        const isVertical = shuffleDirection === 'up' || shuffleDirection === 'down';

        charsArray.forEach((charStr) => {
          if (charStr === ' ') {
            const spaceSpan = document.createElement('span');
            spaceSpan.textContent = '\u00A0';
            spaceSpan.className = 'shuffle-space';
            spaceSpan.style.display = 'inline-block';
            el.appendChild(spaceSpan);
            return;
          }

          const wrap = document.createElement('span');
          wrap.className = 'shuffle-char-wrapper';
          Object.assign(wrap.style, {
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            position: 'relative'
          });

          const inner = document.createElement('span');
          inner.className = 'shuffle-strip';
          Object.assign(inner.style, {
            display: isVertical ? 'flex' : 'inline-flex',
            flexDirection: isVertical ? 'column' : 'row',
            whiteSpace: 'nowrap',
            willChange: 'transform'
          });

          const makeCharSpan = (ch, isOrig = false) => {
            const c = document.createElement('span');
            c.className = 'shuffle-char';
            c.textContent = ch;
            if (isOrig) c.setAttribute('data-orig', '1');
            Object.assign(c.style, {
              display: 'inline-block',
              textAlign: 'center',
              lineHeight: '1'
            });
            return c;
          };

          const origChar = makeCharSpan(charStr, true);

          // Build strip items
          const items = [];
          items.push(origChar);

          for (let k = 0; k < rolls; k++) {
            const scrambleChar = scrambleCharset ? rand(scrambleCharset) : charStr;
            items.push(makeCharSpan(scrambleChar));
          }

          const targetChar = makeCharSpan(charStr);
          items.push(targetChar);

          // If sliding right or down, re-order strip items
          if (shuffleDirection === 'right' || shuffleDirection === 'down') {
            const firstCopy = items[0];
            const real = items[items.length - 1];
            const middle = items.slice(1, items.length - 1);
            items.length = 0;
            items.push(real, ...middle, firstCopy);
          }

          items.forEach(it => inner.appendChild(it));
          wrap.appendChild(inner);
          el.appendChild(wrap);

          wrappersRef.current.push(wrap);
        });

        // Measure layout after adding to DOM
        const steps = rolls + 1;

        wrappersRef.current.forEach((wrap) => {
          const inner = wrap.firstElementChild;
          if (!inner) return;
          const sampleChar = inner.querySelector('.shuffle-char') || inner.firstElementChild;
          if (!sampleChar) return;

          const rect = sampleChar.getBoundingClientRect();
          const w = Math.ceil(rect.width) || 10;
          const h = Math.ceil(rect.height) || 18;

          wrap.style.width = `${w}px`;
          wrap.style.height = `${h}px`;
          Array.from(inner.children).forEach(child => {
            child.style.width = `${w}px`;
            child.style.height = `${h}px`;
          });

          let startX = 0, finalX = 0, startY = 0, finalY = 0;

          if (shuffleDirection === 'right') {
            startX = -steps * w;
            finalX = 0;
          } else if (shuffleDirection === 'left') {
            startX = 0;
            finalX = -steps * w;
          } else if (shuffleDirection === 'down') {
            startY = -steps * h;
            finalY = 0;
          } else if (shuffleDirection === 'up') {
            startY = 0;
            finalY = -steps * h;
          }

          if (shuffleDirection === 'left' || shuffleDirection === 'right') {
            gsap.set(inner, { x: startX, y: 0, force3D: true });
            inner.setAttribute('data-start-x', String(startX));
            inner.setAttribute('data-final-x', String(finalX));
          } else {
            gsap.set(inner, { x: 0, y: startY, force3D: true });
            inner.setAttribute('data-start-y', String(startY));
            inner.setAttribute('data-final-y', String(finalY));
          }

          if (colorFrom) inner.style.color = colorFrom;
        });
      };

      const inners = () => wrappersRef.current.map(w => w.firstElementChild).filter(Boolean);

      const randomizeScrambles = () => {
        if (!scrambleCharset) return;
        wrappersRef.current.forEach(w => {
          const strip = w.firstElementChild;
          if (!strip) return;
          const kids = Array.from(strip.children);
          for (let i = 1; i < kids.length - 1; i++) {
            kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));
          }
        });
      };

      const cleanupToStill = () => {
        wrappersRef.current.forEach(w => {
          const strip = w.firstElementChild;
          if (!strip) return;
          const real = strip.querySelector('[data-orig="1"]');
          if (!real) return;
          strip.replaceChildren(real);
          strip.style.transform = 'none';
          strip.style.willChange = 'auto';
        });
      };

      const play = () => {
        const strips = inners();
        if (!strips.length) return;

        playingRef.current = true;
        const isVertical = shuffleDirection === 'up' || shuffleDirection === 'down';

        const tl = gsap.timeline({
          smoothChildTiming: true,
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? loopDelay : 0,
          onRepeat: () => {
            if (scrambleCharset) randomizeScrambles();
            if (isVertical) {
              gsap.set(strips, { y: (i, t) => parseFloat(t.getAttribute('data-start-y') || '0') });
            } else {
              gsap.set(strips, { x: (i, t) => parseFloat(t.getAttribute('data-start-x') || '0') });
            }
            onShuffleComplete?.();
          },
          onComplete: () => {
            playingRef.current = false;
            if (!loop) {
              cleanupToStill();
              if (colorTo) gsap.set(strips, { color: colorTo });
              onShuffleComplete?.();
              armHover();
            }
          }
        });

        const addTween = (targets, at) => {
          const vars = {
            duration,
            ease,
            force3D: true,
            stagger: animationMode === 'evenodd' ? stagger : 0
          };
          if (isVertical) {
            vars.y = (i, t) => parseFloat(t.getAttribute('data-final-y') || '0');
          } else {
            vars.x = (i, t) => parseFloat(t.getAttribute('data-final-x') || '0');
          }

          tl.to(targets, vars, at);

          if (colorFrom && colorTo) {
            tl.to(targets, { color: colorTo, duration, ease }, at);
          }
        };

        if (animationMode === 'evenodd') {
          const odd = strips.filter((_, i) => i % 2 === 1);
          const even = strips.filter((_, i) => i % 2 === 0);
          const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
          const evenStart = odd.length ? oddTotal * 0.7 : 0;
          if (odd.length) addTween(odd, 0);
          if (even.length) addTween(even, evenStart);
        } else {
          strips.forEach(strip => {
            const d = Math.random() * maxDelay;
            const vars = {
              duration,
              ease,
              force3D: true
            };
            if (isVertical) {
              vars.y = parseFloat(strip.getAttribute('data-final-y') || '0');
            } else {
              vars.x = parseFloat(strip.getAttribute('data-final-x') || '0');
            }
            tl.to(strip, vars, d);
            if (colorFrom && colorTo) tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, d);
          });
        }

        tlRef.current = tl;
      };

      const armHover = () => {
        if (!triggerOnHover || !ref.current) return;
        removeHover();
        const handler = () => {
          if (playingRef.current) return;
          build();
          if (scrambleCharset) randomizeScrambles();
          play();
        };
        hoverHandlerRef.current = handler;
        
        // Listen on the component element as well as parent button/link if inside one
        ref.current.addEventListener('mouseenter', handler);
        const buttonParent = ref.current.closest('a, button');
        if (buttonParent) {
          buttonParent.addEventListener('mouseenter', handler);
        }
      };

      const create = () => {
        build();
        if (scrambleCharset) randomizeScrambles();
        play();
        armHover();
        setReady(true);
      };

      if (triggerOnMount) {
        create();

        return () => {
          removeHover();
          teardown();
          setReady(false);
        };
      }

      const st = ScrollTrigger.create({
        trigger: ref.current.closest('a, button') || el,
        start,
        once: triggerOnce,
        onEnter: create
      });

      return () => {
        st.kill();
        removeHover();
        teardown();
        setReady(false);
      };
    },
    {
      dependencies: [
        text,
        duration,
        maxDelay,
        ease,
        scrollTriggerStart,
        fontsLoaded,
        shuffleDirection,
        shuffleTimes,
        animationMode,
        loop,
        loopDelay,
        stagger,
        scrambleCharset,
        colorFrom,
        colorTo,
        triggerOnce,
        triggerOnMount,
        respectReducedMotion,
        triggerOnHover,
        onShuffleComplete
      ],
      scope: ref
    }
  );

  const commonStyle = useMemo(() => ({ textAlign, ...style }), [textAlign, style]);
  const classes = useMemo(() => `shuffle-parent ${ready ? 'is-ready' : ''} ${className}`, [ready, className]);

  const Tag = tag || 'span';
  return React.createElement(Tag, { ref, className: classes, style: commonStyle }, text);
};

export default Shuffle;
