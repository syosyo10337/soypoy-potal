'use client';

import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Hero', backgroundColor: '#f5f5dc' },
  { id: 'about', label: 'About', backgroundColor: '#0077cc' },
  { id: 'event', label: 'Event', backgroundColor: '#ffa500' },
  { id: 'access', label: 'Access', backgroundColor: '#228b22' },
];

export default function Page() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState<Record<string, number>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      const newProgress: Record<string, number> = {};
      let currentActive = '';
      
      sections.forEach(({ id }) => {
        const sectionEl = sectionRefs.current[id];
        if (!sectionEl) return;
        
        const sectionTop = sectionEl.offsetTop;
        const progress = Math.max(0, Math.min(3, (scrollTop - sectionTop) / viewportHeight * 3));
        
        newProgress[id] = progress;
        
        // 現在表示されているセクションを判定
        if (scrollTop >= sectionTop && scrollTop < sectionTop + viewportHeight) {
          currentActive = id;
        }
      });
      
      if (currentActive) {
        setActiveSection(currentActive);
      }
      setScrollProgress(newProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期化時に一度実行
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // セクション参照を設定する関数
  const setSectionRef = (id: string, ref: HTMLElement | null) => {
    sectionRefs.current[id] = ref;
  };
  
  // z-index値をマッピングする関数
  const getZIndexClass = (index: number) => {
    const zIndexMap: Record<number, string> = {
      0: 'z-5',
      1: 'z-6',
      2: 'z-7',
      3: 'z-8'
    };
    return zIndexMap[index] || 'z-5';
  };
  
  return (
    <div className="relative w-full overflow-hidden">
      {/* 背景円のオーバーレイ */}
      {sections.map((section, index) => {
        const scale = scrollProgress[section.id] || 0;
        
        return (
          <div 
            key={section.id}
            className={`fixed inset-0 pointer-events-none flex items-center justify-center ${getZIndexClass(index)}`}
            style={{
              opacity: activeSection === section.id ? 1 : 0,
              transition: 'opacity 0.4s ease-out',
            }}
          >
            <div
              className="rounded-full pointer-events-none"
              style={{
                width: '200vw',
                height: '200vw',
                backgroundColor: section.backgroundColor,
                transform: `scale(${scale})`,
                transition: 'transform 0.4s ease-out',
              }}
            />
          </div>
        );
      })}
      
      {/* セクションコンテンツ */}
      <div className="relative z-10" style={{ height: '400vh' }}>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            ref={(ref) => setSectionRef(section.id, ref)}
            className="flex items-center justify-center h-screen"
          >
            <h2 className="text-5xl font-bold text-white drop-shadow-lg">
              {section.label}
            </h2>
          </section>
        ))}
      </div>
    </div>
  );
}