{/* Component from: https://uiverse.io/ilkhoeri/curvy-newt-49 Creator: @ilkhoeri */}
import '../components/Dropdown.css';

export default function Dropdown({ title = "Dropdown", items = [] }) {
  return (
    <div className="bg-black">
      <div className="dropdown">
        <input
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
