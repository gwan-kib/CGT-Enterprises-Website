export interface Service {
  description: string;
  id: string;
  name: string;
  price: string;
}

export const placeholderServices: Service[] = [
  {
    id: "1",
    name: "Dump Runs",
    description:
      "We collect and dispose of household waste and/or any unwanted items. Yard cleanouts and indoor item removal are also available for an additional fee.",
    price: "Starting at $60",
  },
  {
    id: "2",
    name: "Appliance Disposal",
    description: "We pick up residential appliances placed outside your home. Indoor appliance removal is available for an additional fee depending on stairs, doors, disconnection, and other requirements.",
    price: "Starting at $100",
  },
  {
    id: "3",
    name: "Curbside Delivery",
    description: "We pick up your item(s) from the front door and deliver it to the front door of another location. Indoor moving is not included.",
    price: "Starting at $50",
  },
  {
    id: "4",
    name: "Household Moving",
    description: "Moving to a new home? We can provide a truck, trailer, or even just a driver to help transport household furniture while you handle loading and unloading.",
    price: "Starting at $60",
  },
  {
    id: "5",
    name: "Beverage Recycling",
    description: "We pick up, sort, and count your beverage containers at home, then pay you 50% of the refundable deposit.",
    price: "50/50 Split",
  },
];
