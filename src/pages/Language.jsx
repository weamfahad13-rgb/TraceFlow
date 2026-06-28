import "./Language.css";

import traceflowText from "../assets/traceflow text.svg";
import purpleRectangle from "../assets/purple rectangle.svg";

function Language({ onSelectLanguage }) {
  return (
    <main className="language-page">
      <img className="language-title" src={traceflowText} alt="TraceFlow" />

      <div className="language-character">
        <img src={purpleRectangle} alt="" />
      </div>

      <div className="language-options">
        <div className="language-question">Choose your language</div>

        <button
          className="language-btn"
          type="button"
          onClick={() => onSelectLanguage("en")}
        >
          English
        </button>

        <button
          className="language-btn"
          type="button"
          onClick={() => onSelectLanguage("ar")}
        >
          Arabic
        </button>
      </div>
    </main>
  );
}

export default Language;