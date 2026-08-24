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
    <div ref={ref}>
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
          {items.map((item, index) => {
            // Accepts a plain string or { label, Icon }. Entries without an icon
            // render a blank slot the same size, so labels stay aligned.
            const label = typeof item === "string" ? item : item.label;
            const Icon = typeof item === "string" ? null : item.Icon;
            return (
              <li className="listitem" role="listitem" key={index}>
                <article className="article flex items-center gap-3">
                  {Icon ? (
                    <Icon className="h-5 w-5 shrink-0" />
                  ) : (
                    <span className="h-5 w-5 shrink-0" aria-hidden="true" />
                  )}
                  <span>{label}</span>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
