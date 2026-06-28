import { useEffect, useState } from "react";
import "./Loading.css";

import traceflowText from "../assets/traceflow text.svg";
import purpleRectangle from "../assets/purple rectangle.svg";

const loadingSteps = {
  en: [
    "Analyzing your AI interest...",
    "Searching arXiv papers...",
    "Finding latest AI projects...",
    "Checking AI news...",
    "Generating your research report...",
    "Almost ready...",
  ],
  ar: [
    "تحليل اهتمامك في الذكاء الاصطناعي...",
    "البحث في أوراق arXiv...",
    "البحث عن أحدث مشاريع الذكاء الاصطناعي...",
    "متابعة آخر أخبار الذكاء الاصطناعي...",
    "إنشاء تقريرك البحثي...",
    "اقتربنا من الانتهاء...",
  ],
};

function Loading({ language = "en" }) {
  const [step, setStep] = useState(0);

  const steps = loadingSteps[language] || loadingSteps.en;

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <main className="loading-page" dir={language === "ar" ? "rtl" : "ltr"}>
      <img className="loading-title" src={traceflowText} alt="TraceFlow" />

      <div className="loading-character">
        <img src={purpleRectangle} alt="" />
      </div>

      <div className="loading-message">
        <p>{steps[step]}</p>
      </div>
    </main>
  );
}

export default Loading;