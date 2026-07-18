import { SectionContainer } from '../layout/SectionContainer'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { SectionHeading } from '../ui/SectionHeading'

const placeholderDetails = [
  ['01', 'Value placeholder'],
  ['02', 'Process placeholder'],
  ['03', 'Detail placeholder'],
]

export function AboutSection() {
  return (
    <SectionContainer id="about" labelledBy="about-title">
      <div className="about-section__heading">
        <SectionHeading
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae augue at ipsum posuere tempor."
          eyebrow="(01) About placeholder"
          id="about-title"
          title="A simple introduction belongs here."
        />
      </div>

      <div className="about-section__grid">
        <ImagePlaceholder ratio="landscape" />
        <div className="about-section__content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            feugiat, lorem at congue feugiat, justo lectus aliquet neque, a
            malesuada risus turpis vitae augue.
          </p>
          <p>
            Sed dignissim, magna sed posuere feugiat, neque lacus faucibus
            nibh, vitae pellentesque massa nibh sed arcu.
          </p>

          <dl className="about-section__details">
            {placeholderDetails.map(([number, label]) => (
              <div className="about-section__detail" key={number}>
                <dt>{number}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SectionContainer>
  )
}
