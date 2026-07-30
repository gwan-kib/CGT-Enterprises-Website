export interface Faq {
  question: string;
  answer: string[];
}

export const faqs: Faq[] = [
  {
    question:
      "How much does it cost for a dump run under 300lbs from the driveway of my home or apartment building?",
    answer: [
      "$60 + the City of Yellowknife tipping fee which starts at $20.25 for the first 220lbs, the dumping fee increases with weight.",
    ],
  },
  {
    question:
      "How much does it cost for a dump run between 300-800lbs from the driveway of my home or apartment building?",
    answer: [
      "$85 + the City of Yellowknife tipping fee which starts at $20.25 for the first 220lbs, the dumping fee increases with weight.",
    ],
  },
  {
    question:
      "How much does it cost for a dump run between 800-1100lbs from the driveway of my home or apartment building?",
    answer: [
      "$125 + the City of Yellowknife tipping fee which starts at $20.25 for the first 220lbs, the dumping fee increases with weight.",
    ],
  },
  {
    question:
      "My junk is inside my home, how much do you charge to take that away?",
    answer: [
      "Same as above with labor rates starting at $130 per hour (prorated). Only pay for the labor you use.",
    ],
  },
  {
    question: "How do I know what the actual charges are for the solid waste facility?",
    answer: [
      "We copy and paste the tipping fee receipt we receive from the City of Yellowknife onto all invoices. This keeps our costs fair and transparent. The receipt will also include the weight of the junk for disposal.",
    ],
  },
  {
    question:
      'I need my appliance(s) picked up from my home "curbside". How much is that?',
    answer: [
      "We can pickup the appliance(s) from outside the home for $100 per appliance. If you need us to come inside our labor rate (in addition) starts at $130 per hour (prorated).",
    ],
  },
  {
    question: "What forms of payment do you take?",
    answer: [
      "Email Funds Transfer (EFT), Visa, Mastercard, American Express, most credit cards. Payments are only accepted using our invoicing payment software and email address (cgt@cgtenterprises.ca). We do not take any money until the job is completed and invoiced.",
    ],
  },
  {
    question: "Do you take dangerous goods like paint and gas?",
    answer: [
      "We do not accept dangerous goods at this time.",
    ],
  },
  {
    question: "Are you open on weekends and holidays?",
    answer: [
      "Yes, we work 7 days a week, our hours are posted on the website. We do not offer solid waste facility dropoffs on holidays because those facilities are normally closed on legal holidays.",
    ],
  },
];
