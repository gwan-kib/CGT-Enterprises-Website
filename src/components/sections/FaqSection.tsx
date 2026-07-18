import { SectionContainer } from '../layout/SectionContainer'
import { SectionHeading } from '../ui/SectionHeading'

const placeholderFaqs = [
  'Question placeholder one?',
  'Question placeholder two?',
  'Question placeholder three?',
  'Question placeholder four?',
  'Question placeholder five?',
]

export function FaqSection() {
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
          {placeholderFaqs.map((question, index) => (
            <details className="faq-item" key={question} open={index === 0}>
              <summary className="faq-item__question">{question}</summary>
              <p className="faq-item__answer">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vitae sapien vel justo feugiat ullamcorper.
              </p>
            </details>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
