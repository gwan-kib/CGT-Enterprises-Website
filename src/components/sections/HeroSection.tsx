import logoBadge from "../../assets/images/CGT Logo Full (trimmed).png";
import { SectionContainer } from "../layout/SectionContainer";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <SectionContainer className="hero-section" id="home" labelledBy="hero-title" tone="dark">
    

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
          <header className="hero-section__header">
        <p className="hero-section__eyebrow">Family Owned Business</p>
        <h1 className="hero-section__title" id="hero-title">
          Hauling, recycling, and <span className="hero-section__title-accent">delivery.</span>
        </h1>
      </header>
          <p className="hero-section__summary">
            We're here to take your garbage and deliver wonderful customer service.
            We can help you move homes, do dump runs, beverage recycling and more!
          </p>
          <div className="hero-section__actions">
            <Button href="#services">Explore Services</Button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
