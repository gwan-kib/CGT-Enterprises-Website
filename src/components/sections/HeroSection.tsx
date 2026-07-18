import { SectionContainer } from '../layout/SectionContainer'
import { Button } from '../ui/Button'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

export function HeroSection() {
  return (
    <SectionContainer
      className="hero-section"
      id="home"
      labelledBy="hero-title"
      tone="dark"
    >
      <div className="hero-section__grid">
        <div className="hero-section__content">
          <p className="hero-section__eyebrow">CGT Enterprises / Wireframe</p>
          <h1 className="hero-section__title" id="hero-title">
            A clear headline for the work you do.
          </h1>
          <p className="hero-section__summary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            posuere, justo vitae feugiat luctus, neque lorem facilisis urna.
          </p>
          <div className="hero-section__actions">
            <Button href="#services">Explore services</Button>
            <Button href="#about" variant="outline">
              Learn more
            </Button>
          </div>
          <p className="hero-section__note">
            Placeholder introduction / content pending approval
          </p>
        </div>

        <div className="hero-section__media">
          <ImagePlaceholder ratio="portrait" />
          <p className="hero-section__media-note">
            Primary visual area / no image selected
          </p>
        </div>
      </div>
    </SectionContainer>
  )
}
