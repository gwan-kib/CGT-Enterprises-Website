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
        For 40 years, Trevor Squires has proudly lived and worked in Yellowknife, Northwest Territories. Today, CGT Enterprises—our family-owned and locally operated business—is built on a dual foundation of exceptional client service and deep community dedication. Unlike the fly-by-night "cash job" operators on social media who come and go, we are a fully established business that is here today and here tomorrow. In addition to our core services, our signature waste diversion program actively supports local individuals and families by providing essential items, such as furniture and mattresses, entirely free of charge with complimentary delivery. Contact us today at 867-445-5883 or visit cgtenterprises.ca to learn more.
      </p>
    </SectionContainer>
  );
}
