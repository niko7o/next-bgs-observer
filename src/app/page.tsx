'use client'

import { useEffect, useState } from 'react';

const Home = () => {
  const [textColor, setTextColor] = useState<string>('black');
  const [bgColor, setBgColor] = useState<string>('white');

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // @note: we could also play with a data-isdark attribute instead to simplify state to a single rerender
        const bgColor = entry.target.getAttribute('data-bgcolor');
        const textColor = entry.target.getAttribute('data-textcolor');
        if (bgColor && textColor) {
          setBgColor(bgColor);
          setTextColor(textColor);
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 }); // @note: buggy behaviour with 0.2 threshold and scrollbacks
    document.querySelectorAll('section').forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });
    return () => { observer.disconnect() };
  }, []);
  
  return (
    <div className="container" style={{ backgroundColor: bgColor, color: textColor }}>
      <section className="fullscreen-box" data-bgcolor='white' data-textcolor='black'>
        <div className='w-[90%] h-[90%] rounded rounded-[24px] flex justify-center items-center bg-[#bcdfff]'>
          <p>Hero</p>
        </div>
      </section>

      <section className="fullscreen-box" data-bgcolor='black' data-textcolor='white'>
        <p>Our vision</p>
      </section>

      <section className="fullscreen-box" data-bgcolor='white' data-textcolor='black'>
        <div className='w-[90%] h-[90%] rounded rounded-[24px] flex flex-col justify-center items-center'>
          <p>Our mission</p>
        </div>
      </section>

      <section className="fullscreen-box" data-bgcolor='black' data-textcolor='white'>
        <p>Footer</p>
      </section>
    </div>
  );
}

export default Home;