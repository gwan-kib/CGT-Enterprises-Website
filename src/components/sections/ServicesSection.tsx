import { placeholderServices } from "../../data/services";
import { SectionContainer } from "../layout/SectionContainer";
import { SectionHeading } from "../ui/SectionHeading";
import { ServiceCard } from "../ui/ServiceCard";

export function ServicesSection() {
  return (
    <SectionContainer id="services" labelledBy="services-title" tone="subtle">
      <div className="services-section__intro">
        <SectionHeading
          align="center"
          description="Explore our currently available services. View starting prices below and contact us for availability."
          eyebrow="(02) Services"
          id="services-title"
          title="Available services:"
        />
      </div>

      <div className="services-grid">
        {placeholderServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </SectionContainer>
  );
}
