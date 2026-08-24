import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useHasHover } from '@/hooks/useHasHover';

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#120F17',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#120F17',
  borderColor = '#fff'
}) {
  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{ backgroundColor: bgColor }}>
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, icons = [], speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, isFirst }) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(4);
  const hasHover = useHasHover();
  const [open, setOpen] = useState(false);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part');
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, icons]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part');
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };

    const timer = setTimeout(setupMarquee, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [text, icons, repetitions, speed]);

  const edgeFrom = ev => {
    const rect = itemRef.current.getBoundingClientRect();
    return findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
  };

  const ready = () => itemRef.current && marqueeRef.current && marqueeInnerRef.current;

  const animateIn = ev => {
    if (!ready()) return;
    const edge = edgeFrom(ev);
    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const animateOut = ev => {
    if (!ready()) return;
    const edge = edgeFrom(ev);
    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const handleMouseEnter = ev => hasHover && animateIn(ev);
  const handleMouseLeave = ev => hasHover && animateOut(ev);

  // Touch: hover never fires reliably (and sticks when it does), so a tap
  // toggles the marquee instead. preventDefault stops the reveal tap from
  // also following the link.
  const handleClick = ev => {
    if (hasHover) return;
    ev.preventDefault();
    if (open) animateOut(ev);
    else animateIn(ev);
    setOpen(o => !o);
  };

  return (
    <div
      className="flex-1 relative overflow-hidden text-center"
      ref={itemRef}
      style={{ borderTop: isFirst ? 'none' : `1px solid ${borderColor}` }}>
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-[4vh]"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        aria-expanded={hasHover ? undefined : open}
        style={{ color: textColor }}>
        {text}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%]"
        ref={marqueeRef}
        style={{ backgroundColor: marqueeBgColor }}>
        <div className="h-full w-fit flex" ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, idx) => (
            <div
              className="marquee-part flex items-center flex-shrink-0"
              key={idx}
              style={{ color: marqueeTextColor }}>
              {icons.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="flex items-center gap-[0.6vw] px-[1.4vw] whitespace-nowrap">
                  <Icon className="h-[4.5vh] w-[4.5vh] shrink-0" />
                  <span className="text-[2vh] font-medium tracking-wide">{label}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
