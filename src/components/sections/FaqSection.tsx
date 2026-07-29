import { useState } from "react";
import { faqs } from "../../data/faqs";
import { SectionContainer } from "../layout/SectionContainer";

export function FaqSection() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set(),
  );

  function toggleIndex(index: number) {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <SectionContainer id="faq" labelledBy="faq-title" tone="subtle">
      <div className="faq-section__grid">
        <header className="section-heading section-heading--center">
          <h2 className="section-heading__title" id="faq-title">
            Frequently Asked Questions
          </h2>
          <p className="section-heading__description">
            Common questions about our dump runs, appliance pickup, labour
            rates, payment methods, and more.
          </p>
        </header>

        <div className="faq-section__faq-wrapper">
          <span aria-hidden="true" className="faq-section__list-question-mark material-symbols-rounded">question_mark</span>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openIndices.has(index);
              const answerId = `faq-answer-${index}`;
              const questionId = `faq-question-${index}`;

              return (
                <div className="faq-item" key={faq.question}>
                  <button
                    aria-controls={answerId}
                    aria-expanded={isOpen}
                    className="faq-item__question"
                    id={questionId}
                    onClick={() => toggleIndex(index)}
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className={`faq-item__chevron material-symbols-rounded ${isOpen ? "faq-item__chevron--open" : ""}`}
                    >
                      expand_more
                    </span>
                    <span className="faq-item__question-text">{faq.question}</span>
                    
                  </button>
                  <div
                    aria-labelledby={questionId}
                    className={`faq-item__answer-wrapper ${isOpen ? "faq-item__answer-wrapper--open" : ""}`}
                    id={answerId}
                    role="region"
                  >
                    <div className="faq-item__answer-content">
                      {faq.answer.map((paragraph, pIndex) => (
                        <p className="faq-item__answer" key={pIndex}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <span aria-hidden="true" className="faq-section__list-question-mark material-symbols-rounded">question_mark</span>
        </div>
      </div>
    </SectionContainer>
  );
}
