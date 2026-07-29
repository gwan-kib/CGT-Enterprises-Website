export interface Service {
  description: string;
  details?: string[];
  icon: string;
  id: string;
  name: string;
  price: string;
}

export const placeholderServices: Service[] = [
  {
    id: "1",
    icon: "local_shipping",
    name: "Dump Runs",
    description:
      "We collect and dispose of household waste and/or any unwanted items. Yard cleanouts and indoor item removal are also available for an additional fee.",
    price: "Starting at $60",
    details: [
      "Under 300 lb: $60 + City tipping fee",
      "300\u2013800 lb: $85 + City tipping fee",
      "800\u20131,100 lb: $125 + City tipping fee",
      "The City of Yellowknife tipping fee starts at $20.25 for the first 220 lb and increases based on the disposal weight.",
    ],
  },
  {
    id: "2",
    icon: "kitchen",
    name: "Appliance Disposal",
    description: "We pick up residential appliances placed outside your home. Indoor appliance removal is available for an additional fee depending on stairs, doors, disconnection, and other requirements.",
    price: "Starting at $100",
    details: [
      "Appliance-disposal details and pricing breakdown go here once the client provides approved copy.",
    ],
  },
  {
    id: "3",
    icon: "package_2",
    name: "Curbside Delivery",
    description: "We pick up your item(s) from the front door and deliver it to the front door of another location. Indoor moving is not included.",
    price: "Starting at $50",
    details: [
      "Curbside-delivery details and pricing breakdown go here once the client provides approved copy.",
    ],
  },
  {
    id: "4",
    icon: "delivery_truck_speed",
    name: "Household Moving",
    description: "Moving to a new home? We can provide a truck, trailer, or even just a driver to help transport household furniture while you handle loading and unloading.",
    price: "Starting at $60",
    details: [
      "Household-moving details and pricing breakdown go here once the client provides approved copy.",
    ],
  },
  {
    id: "5",
    icon: "recycling",
    name: "Beverage Recycling",
    description: "We pick up, sort, and count your beverage containers, then pay you 50% of the refundable deposit.",
    price: "50/50 Split",
    details: [
      "Beverage-recycling details and pricing breakdown go here once the client provides approved copy.",
    ],
  },
];
