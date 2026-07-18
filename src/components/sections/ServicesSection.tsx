import { placeholderServices } from '../../data/services'
import { SectionContainer } from '../layout/SectionContainer'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCard } from '../ui/ServiceCard'

export function ServicesSection() {
  return (
    <SectionContainer id="services" labelledBy="services-title" tone="subtle">
      <div className="services-section__intro">
        <SectionHeading
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. The final service names, descriptions, and prices will replace these placeholders."
          eyebrow="(02) Services and pricing"
          id="services-title"
          title="A clear place to compare available services."
        />
      </div>

      <div className="services-section__grid">
        {placeholderServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </SectionContainer>
  )
}
