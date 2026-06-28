import "./Report.css";
import outputShape from "../assets/output.svg";

function Report({ researchResult, onGoToLibrary, language }) {
  const report = researchResult?.report?.report;

  if (!report) return null;

  const isArabic = language === "ar";

  return (
    <main className="report-page" dir={isArabic ? "rtl" : "ltr"}>
      <div className="report-wrapper">
        <img className="report-shape" src={outputShape} alt="" />

        <div
          className="report-content"
          style={{
            textAlign: isArabic ? "right" : "left",
          }}
        >
          <h1>{report.title}</h1>

          {report.executiveSummary && (
            <section>
              <h2>
                {isArabic ? "الملخص التنفيذي" : "Executive Summary"}
              </h2>
              <p>{report.executiveSummary}</p>
            </section>
          )}

          {report.whyItMatters && (
            <section>
              <h2>
                {isArabic ? "أهمية الموضوع" : "Why It Matters"}
              </h2>
              <p>{report.whyItMatters}</p>
            </section>
          )}

          {report.sections?.map((section, index) => (
            <section key={index}>
              <h2>{section.name}</h2>

              {section.items?.map((item, itemIndex) => (
                <div className="report-card" key={itemIndex}>
                  <h3>{item.title}</h3>

                  <p>{item.summary}</p>

                  {item.whyItMatters && (
                    <p>
                      <strong>
                        {isArabic ? "سبب الأهمية:" : "Why it matters:"}
                      </strong>{" "}
                      {item.whyItMatters}
                    </p>
                  )}

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {isArabic ? "فتح المصدر" : "Open Source"}
                    </a>
                  )}
                </div>
              ))}
            </section>
          ))}

          <button
            className="report-btn"
            onClick={onGoToLibrary}
          >
            {isArabic ? "الذهاب إلى المكتبة" : "Go to Library"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Report;