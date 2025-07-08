{/* Component from: https://uiverse.io/ilkhoeri/curvy-newt-49 Creator: @ilkhoeri */}
import '../components/Dropdown.css';
import { useEffect,useRef } from 'react';

export default function Dropdown({ title = "Dropdown", items = [] }) {
  const ref = useRef();
  const checkboxRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && checkboxRef.current) {
          checkboxRef.current.checked = true;
        }
      },
      {
        threshold: 0.9,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className="bg-black">
      <div className="dropdown">
        <input
          ref = {checkboxRef}
          hidden=""
          className="sr-only"
          name={`state-${title}`}
          id={`state-${title}`}
          type="checkbox"
        />
        <label
          aria-label="dropdown scrollbar"
          htmlFor={`state-${title}`}
          className="trigger"
        >
          {title}
        </label>

        <ul className="list webkit-scrollbar" role="list" dir="auto">
          {items.map((text, index) => (
            <li className="listitem" role="listitem" key={index}>
              <article className="article">{text}</article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
