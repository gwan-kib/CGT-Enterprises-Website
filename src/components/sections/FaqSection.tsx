import { useState } from "react";
import { faqs } from "../../data/faqs";
import { SectionContainer } from "../layout/SectionContainer";

export function FaqSection() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set());

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
    <SectionContainer id="faq" labelledBy="faq-title" tone="brand">
      <div className="faq-section__grid">
        <header className="section-heading section-heading--center">
          <h2 className="section-heading__title" id="faq-title">
            Frequently Asked Questions
          </h2>
          <p className="section-heading__description">
            Common questions and answers.
          </p>
        </header>

        <a
          className="button faq-section__facility-link"
          href="https://www.yellowknife.ca/waste-management/solid-waste-facility/visiting"
          rel="noopener noreferrer"
          target="_blank"
        >
          Yellowknife Solid Waste Facility - Tipping Fees
          <span className="material-symbols-rounded" aria-hidden="true">
            arrow_outward
          </span>
        </a>

        <div className="faq-wrapper">
          {faqs.map((faq, index) => {
            const isOpen = openIndices.has(index);
            const answerId = `faq-answer-${index}`;
            const questionId = `faq-question-${index}`;

            return (
              <div
                aria-controls={answerId}
                aria-expanded={isOpen}
                className="faq-item"
                key={faq.question}
                onClick={() => toggleIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleIndex(index);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="faq-item__question">
                  <span className="faq-item__question-text" id={questionId}>{faq.question}</span>
                  <span className="faq-item__circle">
                    <span aria-hidden="true" className="faq-item__circle-icon material-symbols-rounded">
                      add
                    </span>
                  </span>
                </div>
                <div
                  aria-labelledby={questionId}
                  className={`faq-item__answer-wrapper ${isOpen ? "faq-item__answer-wrapper--open" : ""}`}
                  id={answerId}
                  role="region"
                >
                  <div className="faq-item__answer-content">
                    {faq.answer.map((paragraph, pIndex) => (
                      <p className="faq-item__answer" key={pIndex}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
