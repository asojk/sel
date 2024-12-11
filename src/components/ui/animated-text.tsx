/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';

gsap.registerPlugin(ScrollTrigger);

const AnimatedLetter: React.FC<{
  char: string;
  id: string;
  smoothScrollYProgress: any;
  start: number;
  mid: number;
  end: number;
  letterIndex: number;
  className: string;
}> = React.memo(({ char, id, smoothScrollYProgress, start, mid, end, letterIndex, className }) => {
  const opacity = useTransform(smoothScrollYProgress, [start, mid, end], [0, 1, 1]);
  const y = useTransform(smoothScrollYProgress, [start, mid, end], [50, -20, 0]);
  const x = useTransform(smoothScrollYProgress, [start, mid, end], [0, letterIndex % 2 === 0 ? 1 : -2, 0]);

  const letterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (letterRef.current) {
      gsap.to(letterRef.current, {
        scrollTrigger: {
          trigger: letterRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        color: 'var(--color-s)',
        scale: 1.45,
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, []);

  return (
    <motion.span
      ref={letterRef}
      key={id}
      className={`${className} char`}
      style={{ opacity, y, x }}>
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
});

const WaveScrollAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  

  useEffect(() => {
    if (containerRef.current) {
      const results = Splitting({ target: containerRef.current, by: 'chars' });
      const highlightedChars = results[0]?.chars;
  
      if (highlightedChars && highlightedChars.length > 0) {
        const animationDefaults = {
          duration: 0.3,
          ease: 'power3.in',
        };
  
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top bottom',
          onEnter: () => animateChars(),
          onEnterBack: () => animateChars(),
          onLeave: () => resetChars(),
          onLeaveBack: () => resetChars()
        });
  
        const animateChars = () => {
          gsap.timeline({ defaults: animationDefaults })
            .set(highlightedChars, { willChange: 'transform, opacity, color' })
            .to(highlightedChars, {
              stagger: 0.05,
              scale: 1.45,
              color: 'var(--color-s)',
            })
            .to(highlightedChars, {
              duration: 0.4,
              ease: 'sine',
              stagger: 0.05,
              scale: 1,
              color: 'var(--color-a-dark)',
            }, animationDefaults.duration);
        };
  
        const resetChars = () => {
          gsap.killTweensOf(highlightedChars);
          gsap.set(highlightedChars, {
            scale: 1,
            color: 'var(--color-a)',
          });
        };
      }
    }
  }, []);

  

  const textLine1 = ['Ethics over trends'];
  const textLine2 = ['& principles over profit'];

  const splitIntoWords = (line: string) =>
    line.split(' ').map((word, wordIndex) => ({
      word,
      id: `word-${wordIndex}`,
    }));
  
  const splitIntoLetters = (word: string) =>
    word.split('').map((char, charIndex) => ({
      char,
      id: `char-${charIndex}`,
    }));

    const renderLine = useMemo(() => (line: string, lineIndex: number, className: string) => (
      <motion.div
        key={lineIndex}
        className="flex justify-center overflow-hidden"
        style={{ display: 'inline-flex' }}>
        {splitIntoWords(line).map(({ word, id: wordId }, wordIndex) => (
          <span
            key={wordId}
            style={{
              display: 'inline-flex',
              marginRight: wordIndex < line.split(' ').length - 1 ? '1em' : '0', // Add spacing between words
            }}>
            {splitIntoLetters(word).map(({ char, id: charId }, letterIndex) => {
              const start = letterIndex * 0.01 + wordIndex * 0.1;
              const end = start + 0.5;
    
              return (
                <AnimatedLetter
                  key={charId}
                  char={char}
                  id={charId}
                  smoothScrollYProgress={smoothScrollYProgress}
                  start={start}
                  mid={(start + end) / 2}
                  end={end}
                  letterIndex={letterIndex}
                  className={className}
                />
              );
            })}
          </span>
        ))}
      </motion.div>
    ), [smoothScrollYProgress]);

  return (
    
    <motion.div
      ref={containerRef}
      className='flex flex-col items-center justify-center py-20'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      layoutScroll>

      <div className='w-full max-w-4xl space-y-6'>
        {textLine1.map((line, index) => renderLine(line, index, 'text-3xl md:text-6xl font-light tracking-wide animate-text-container bg-gradient-to-r from-p-dark via-a-dark/20 to-p-5 bg-clip-text text-left text-transparent'))}
      </div>
      <div className='w-full max-w-4xl space-y-6 mt-4'>
        {textLine2.map((line, index) => renderLine(line, index, 'text-3xl md:text-6xl font-light tracking-wide animate-text-containerbg-gradient-to-r from-p-dark via-p-3 to-p-5 bg-clip-text text-left text-transparent'))}
      </div>
    </motion.div>
  );
};

export default WaveScrollAnimation;