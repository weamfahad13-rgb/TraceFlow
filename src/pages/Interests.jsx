import "./Interests.css";

import traceflowText from "../assets/traceflow text.svg";
import purpleRectangle from "../assets/purple rectangle.svg";

function Interests({ onComplete, language = "en" }) {
  const text = {
    en: {
      placeholder: "What AI topics interest you?",
      examples: "Examples: AI Agents, LLMs, Computer Vision, RAG",
      button: "Continue",
    },
    ar: {
      placeholder: "ما مواضيع الذكاء الاصطناعي التي تهمك؟",
      examples: "أمثلة: وكلاء الذكاء الاصطناعي، النماذج اللغوية، الرؤية الحاسوبية، RAG",
      button: "متابعة",
    },
  };

  const currentText = text[language] || text.en;

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const interests = formData.get("interests").trim();

    if (!interests) return;

    onComplete(interests);
  };

  return (
    <main className="interests-page" dir={language === "ar" ? "rtl" : "ltr"}>
      <img className="interests-title" src={traceflowText} alt="TraceFlow" />

      <div className="interests-character">
        <img src={purpleRectangle} alt="" />
      </div>

      <form className="interests-form" onSubmit={handleSubmit}>
        <div className="interests-box">
          <input
            name="interests"
            type="text"
            placeholder={currentText.placeholder}
            autoComplete="off"
          />

          <p>{currentText.examples}</p>
        </div>

        <button className="continue-btn" type="submit">
          {currentText.button}
        </button>
      </form>
    </main>
  );
}

export default Interests;