import aboutImage from "../../assets/IRL Truck and Trailer.png";
import { SectionContainer } from "../layout/SectionContainer";

export function AboutSection() {
  return (
    <SectionContainer id="about" labelledBy="about-title" tone="default">
      <header className="section-heading section-heading--center">
        <h2 className="section-heading__title" id="about-title">
          About CGT Enterprises
        </h2>
      </header>

      <div className="about-section__media">
        <img
          alt="CGT Enterprises truck and trailer"
          className="about-section__media-image"
          loading="lazy"
          src={aboutImage}
        />
      </div>

      <p className="about-section__body">
        About copy placeholder. This paragraph will introduce CGT Enterprises,
        describe the family-owned business, and highlight its services once the
        client provides approved text.
      </p>
    </SectionContainer>
  );
}
