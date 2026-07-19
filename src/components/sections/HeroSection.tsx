import { SectionContainer } from "../layout/SectionContainer";
import { Button } from "../ui/Button";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

export function HeroSection() {
  return (
    <SectionContainer className="hero-section" id="home" labelledBy="hero-title" tone="dark">
      <header className="hero-section__header">
        <p className="hero-section__eyebrow">Family Owned Business</p>
        <h1 className="hero-section__title" id="hero-title">
          Hauling, recycling, and delivery.
        </h1>
      </header>

      <div className="hero-section__grid">
        <div className="hero-section__content">
          <p className="hero-section__summary">
            Our goal is to take away your garbage and deliver outstanding customer service.
            Whether you need help with dump runs or beverage recycling, we are here to help.
          </p>
          <div className="hero-section__actions">
            <Button href="#services">Explore services</Button>
            <Button href="#about" variant="outline">
              Learn more
            </Button>
          </div>
          <p className="hero-section__note">
            Questions about a load or need help estimating the price? Get in touch and tell us what you need.
          </p>
        </div>

        <div className="hero-section__media">
          <ImagePlaceholder ratio="square" />
          <p className="hero-section__media-note">Primary visual area / no image selected</p>
        </div>
      </div>
    </SectionContainer>
  );
}
