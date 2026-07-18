export interface Service {
  description: string
  id: string
  name: string
  price: string
}

export const placeholderServices: Service[] = [
  {
    id: '01',
    name: 'Service placeholder one',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo at velit posuere.',
    price: 'Price placeholder',
  },
  {
    id: '02',
    name: 'Service placeholder two',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo at velit posuere.',
    price: 'Price placeholder',
  },
  {
    id: '03',
    name: 'Service placeholder three',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo at velit posuere.',
    price: 'Price placeholder',
  },
  {
    id: '04',
    name: 'Service placeholder four',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo at velit posuere.',
    price: 'Price placeholder',
  },
]
