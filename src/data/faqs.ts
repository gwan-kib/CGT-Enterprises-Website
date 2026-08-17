export interface Faq {
  question: string;
  answer: string[];
}

export const faqs: Faq[] = [
  {
    question: "How do I know how much the Solid Waste Facility charged for my garbage?",
    answer: [
      "We copy and paste the tipping fee receipt we receive from the City of Yellowknife onto all invoices. This keeps our costs fair and transparent. The receipt will also include the weight of the junk for disposal.",
    ],
  },
  {
    question: 'I need my appliance(s) picked up from my home "curbside". How much is that?',
    answer: [
        "We can pickup the appliance(s) from outside the home for $100 per appliance. If you need us to come inside, our labor rate (seprate from the cost of the appliences) starts at $130 per hour (prorated).",
      ],
  },
  {
    question: "What forms of payment do you take?",
    answer: [
      "We accept Visa, Mastercard, American Express, EFT, and most major credit cards. Payment is made through our invoicing system using cgt@cgtenterprises.ca. No payment is required until the job is complete and invoiced.",
    ],
  },
  {
    question: "Do you take dangerous goods? (eg. paint, engine oil, antifreeze...)",
    answer: ["We do not accept dangerous goods."],
  },
  {
    question: "Do you work on weekends and holidays?",
    answer: [
      "Yes, we work 7 days a week. We do not work on statutory holidays since the Solid Waste Facility is normally closed.",
    ],
  },
];
