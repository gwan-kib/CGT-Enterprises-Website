import aboutImage from "../../assets/IRL Truck and Trailer.png";
import { SectionContainer } from "../layout/SectionContainer";
import { Button } from "../ui/Button";

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
      Founded by Trevor Squires, CGT Enterprises is a family-owned and locally operated business backed by Trevor’s 40 years of experience living and working in Yellowknife, NWT. Built on reliable service and a strong commitment to the community, it is an established local business you can count on. One way CGT Enterprises gives back is through its waste diversion program, which provides items such as furniture and mattresses to local individuals and families at no cost, and with free delivery.
 
      </p>

      <div className="about-section__actions">
        <Button href="#contact">Contact us to learn more!</Button>
      </div>
    </SectionContainer>
  );
}
