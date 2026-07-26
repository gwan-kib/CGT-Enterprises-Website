import { useState } from "react";
import { SectionContainer } from "../layout/SectionContainer";
import { SectionHeading } from "../ui/SectionHeading";

const placeholderFaqs = [
  "Question placeholder one?",
  "Question placeholder two?",
  "Question placeholder three?",
  "Question placeholder four?",
  "Question placeholder five?",
];

export function FaqSection() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set([0]),
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
        <SectionHeading
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Approved questions and answers will replace this temporary structure."
          eyebrow="(05) Frequently asked questions"
          id="faq-title"
          title="Common questions, arranged for quick scanning."
        />

        <div className="faq-list">
          {placeholderFaqs.map((question, index) => {
            const isOpen = openIndices.has(index);
            const answerId = `faq-answer-${index}`;
            const questionId = `faq-question-${index}`;

            return (
              <div className="faq-item" key={question}>
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
                  <span className="faq-item__question-text">{question}</span>
                  
                </button>
                <div
                  aria-labelledby={questionId}
                  className={`faq-item__answer-wrapper ${isOpen ? "faq-item__answer-wrapper--open" : ""}`}
                  id={answerId}
                  role="region"
                >
                  <div className="faq-item__answer-content">
                    <p className="faq-item__answer">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed vitae sapien vel justo feugiat ullamcorper.
                    </p>
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
