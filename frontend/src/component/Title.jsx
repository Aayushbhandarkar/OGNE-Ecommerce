import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Title({ text1, text2 }) {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    const letters = el.querySelectorAll('.char');

    gsap.fromTo(
      letters,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.05,
        ease: 'power3.out',
        duration: 0.8,
      }
    );

    gsap.fromTo(
      '.line-top',
      { width: 0 },
      { width: 60, duration: 1, ease: 'power2.out', delay: 0.3 }
    );
    gsap.fromTo(
      '.line-bottom',
      { width: 0 },
      { width: 60, duration: 1, ease: 'power2.out', delay: 0.6 }
    );
  }, []);

  const splitText = (text) =>
    text.split('').map((char, i) => (
      <span key={i} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <div
      ref={titleRef}
      className="flex flex-col items-center justify-center text-center mb-6"
    >
      {/* Top Divider */}
      <div className="line-top h-[2px] bg-gray-400 mb-3"></div>

      {/* Title */}
      <h2 className="text-[28px] md:text-[42px] font-semibold tracking-[3px] uppercase text-gray-900">
        <span className="text-gray-500">{splitText(text1)}</span>{' '}
        <span className="text-black">{splitText(text2)}</span>
      </h2>

      {/* Bottom Divider */}
      <div className="line-bottom h-[2px] bg-gray-400 mt-3"></div>
    </div>
  );
}

export default Title;
