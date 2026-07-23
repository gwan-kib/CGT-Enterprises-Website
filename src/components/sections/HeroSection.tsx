import logoBadge from "../../assets/images/CGT Logo Full (trimmed).png";
import { SectionContainer } from "../layout/SectionContainer";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <SectionContainer className="hero-section" id="home" labelledBy="hero-title" tone="dark">
      <header className="hero-section__header">
        <p className="hero-section__eyebrow">Family Owned Business</p>
        <h1 className="hero-section__title" id="hero-title">
          Hauling, recycling, and <span className="hero-section__title-accent">delivery.</span>
        </h1>
      </header>

      <div className="hero-section__grid">
        <div className="hero-section__media">
          <div className="">
            <img
              alt="CGT Enterprises logo badge"
              className="hero-section__media-image"
              height="2000"
              src={logoBadge}
              width="2000"
            />
          </div>
        </div>
        <div className="hero-section__content">
          <p className="hero-section__summary">
            Were here to take away your garbage and deliver outstanding customer service. Whether you need help with
            dump runs or beverage recycling, we are here to help.
          </p>
          <div className="hero-section__actions">
            <Button href="#services">Explore services</Button>
          </div>
          <p className="hero-section__note">
            Questions about a load or need help estimating the price? Get in touch and tell us what you need.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
