import {
  Beauty,
  WelcomeOne,
  WelcomeThree,
  WelcomeTwo,
  Fashion,
  Kids,
  Mens,
  Womens,
  Banner1,
  Product1,
  Product2,
  Product4,
  Product3,
  Product5,
  Product6,
  Product7,
} from '../assets/images';

export const onboarding = [
  {
    id: 1,
    title: 'Choose Products',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    image: WelcomeOne,
  },
  {
    id: 2,
    title: 'Make Payment',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    image: WelcomeTwo,
  },
  {
    id: 3,
    title: 'Get Your Order',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    image: WelcomeThree,
  },
];

export const categoriesData = [
  {
    id: 1,
    name: 'Beauty',
    image: Beauty,
  },
  {
    id: 2,
    name: 'Fashion',
    image: Fashion,
  },
  {
    id: 3,
    name: 'Kids',
    image: Kids,
  },
  {
    id: 4,
    name: 'Mens',
    image: Mens,
  },
  {
    id: 5,
    name: 'Womens',
    image: Womens,
  },
];

export const bannersData = [
  {
    id: 1,
    textOne: '40-50% OFF',
    textTwo: 'Now in (product)',
    buttonText: 'Shop Now',
    image: Banner1,
  },
  {
    id: 2,
    textOne: '40-50% OFF',
    textTwo: 'Now in (product)',
    buttonText: 'Shop Now',
    image: Banner1,
  },
  {
    id: 3,
    textOne: '40-50% OFF',
    textTwo: 'Now in (product)',
    buttonText: 'Shop Now',
    image: Banner1,
  },
];

export const featuredProducts = [
  {
    id: 1,
    name: 'Women Printed Kurta',
    description: 'Neque porro quisquam est qui dolorem ipsum quia',
    price: '1500',
    oldPrice: '2499',
    off: '40% OFF',
    rating: 4.5,
    ratingCount: 5680,
    image: Product1,
    linkId: 1,
    deliveryDays: '3-4',
    productSize: [
      {
        id: 1,
        size: 'S',
      },
      {
        id: 2,
        size: 'M',
      },
      {
        id: 3,
        size: 'L',
      },
      {
        id: 4,
        size: 'XL',
      },
    ],
  },
  {
    id: 2,
    name: 'HRX by Hrithik Roshan',
    description: 'Neque porro quisquam est qui dolorem ipsum quia',
    price: '2499',
    oldPrice: '3199',
    off: '22% OFF',
    rating: 4.5,
    ratingCount: 3445,
    image: Product2,
    linkId: 2,
    deliveryDays: '2-3',
    productSize: [
      {
        id: 1,
        size: '6 UK',
      },
      {
        id: 2,
        size: '7 UK',
      },
      {
        id: 3,
        size: '8 UK',
      },
      {
        id: 4,
        size: '9 UK',
      },
    ],
  },
  {
    id: 3,
    name: 'IWC Schaffhausen',
    description: "2021 Pilot's Watch 'SIHH 2019' 44mm",
    price: '4999',
    oldPrice: '9999',
    off: '50% OFF',
    rating: 4.5,
    ratingCount: 3004,
    image: Product3,
    linkId: 3,
    deliveryDays: '4-5',
    productSize: [
      {
        id: 1,
        size: '44 mm',
      },
      {
        id: 2,
        size: '46 mm',
      },
      {
        id: 3,
        size: '48 mm',
      },
    ],
  },
  {
    id: 4,
    name: 'Labbin White Sneakers',
    description: 'For Men and Female',
    price: '1650',
    oldPrice: '2499',
    off: '30% OFF',
    rating: 4,
    ratingCount: 1500,
    image: Product4,
    linkId: 4,
    deliveryDays: '2-3',
    productSize: [
      {
        id: 1,
        size: '6 UK',
      },
      {
        id: 2,
        size: '7 UK',
      },
      {
        id: 3,
        size: '8 UK',
      },
      {
        id: 4,
        size: '9 UK',
      },
    ],
  },
  {
    id: 5,
    name: 'Black Winter Hoodie',
    description: 'Autumn And Winter Casual cotton-padded jacket',
    price: '2999',
    oldPrice: '3999',
    off: '25% OFF',
    rating: 4.5,
    ratingCount: 2000,
    image: Product5,
    linkId: 5,
    deliveryDays: '3-4',
    productSize: [
      {
        id: 1,
        size: 'S',
      },
      {
        id: 2,
        size: 'M',
      },
      {
        id: 3,
        size: 'L',
      },
      {
        id: 4,
        size: 'XL',
      },
    ],
  },
  {
    id: 6,
    name: 'Imported Jacket',
    description: 'This warm and comfortable jacket is great for learni',
    price: '5500',
    oldPrice: '6999',
    off: '20% OFF',
    rating: 4,
    ratingCount: 1000,
    image: Product6,
    linkId: 6,
    deliveryDays: '4-5',
    productSize: [
      {
        id: 1,
        size: 'S',
      },
      {
        id: 2,
        size: 'M',
      },
      {
        id: 3,
        size: 'L',
      },
      {
        id: 4,
        size: 'XL',
      },
    ],
  },
  {
    id: 7,
    name: 'Mens Starry',
    description: 'Mens Starry Sky Printed Shirt 100% Cotton Fabric',
    price: '1999',
    oldPrice: '2999',
    off: '33% OFF',
    rating: 4.5,
    ratingCount: 500,
    image: Product7,
    linkId: 7,
    deliveryDays: '2-3',
    productSize: [
      {
        id: 1,
        size: 'S',
      },
      {
        id: 2,
        size: 'M',
      },
      {
        id: 3,
        size: 'L',
      },
      {
        id: 4,
        size: 'XL',
      },
    ],
  },
];

export const imagesData = [
  {
    id: 1,
    linkId: 1,
    images: [Product1, Product1],
  },
  {
    id: 2,
    linkId: 2,
    images: [Product2, Product2],
  },
  {
    id: 3,
    linkId: 3,
    images: [Product3, Product3],
  },
  {
    id: 4,
    linkId: 4,
    images: [Product4, Product4],
  },
  {
    id: 5,
    linkId: 5,
    images: [Product5, Product5],
  },
  {
    id: 6,
    linkId: 6,
    images: [Product6, Product6],
  },
  {
    id: 7,
    linkId: 7,
    images: [Product7, Product7],
  },
];

export const discountedProducts = [
  {
    id: 1,
    name: 'Women Printed Kurta',
    description: 'Neque porro quisquam est qui dolorem ipsum quia',
    price: '1500',
    oldPrice: '2499',
    off: '40% OFF',
    rating: 4.5,
    ratingCount: 5680,
    image: Product1,
    linkId: 1,
    deliveryDays: '3-4',
    productSize: [
      {
        id: 1,
        size: 'S',
      },
      {
        id: 2,
        size: 'M',
      },
      {
        id: 3,
        size: 'L',
      },
      {
        id: 4,
        size: 'XL',
      },
    ],
  },
  {
    id: 2,
    name: 'HRX by Hrithik Roshan',
    description: 'Neque porro quisquam est qui dolorem ipsum quia',
    price: '2499',
    oldPrice: '3199',
    off: '22% OFF',
    rating: 4.5,
    ratingCount: 3445,
    image: Product2,
    linkId: 2,
    deliveryDays: '2-3',
    productSize: [
      {
        id: 1,
        size: '6 UK',
      },
      {
        id: 2,
        size: '7 UK',
      },
      {
        id: 3,
        size: '8 UK',
      },
      {
        id: 4,
        size: '9 UK',
      },
    ],
  },
  {
    id: 3,
    name: 'IWC Schaffhausen',
    description: "2021 Pilot's Watch 'SIHH 2019' 44mm",
    price: '4999',
    oldPrice: '9999',
    off: '50% OFF',
    rating: 4.5,
    ratingCount: 3004,
    image: Product3,
    linkId: 3,
    deliveryDays: '4-5',
    productSize: [
      {
        id: 1,
        size: '44 mm',
      },
      {
        id: 2,
        size: '46 mm',
      },
      {
        id: 3,
        size: '48 mm',
      },
    ],
  },
  {
    id: 4,
    name: 'Labbin White Sneakers',
    description: 'For Men and Female',
    price: '1650',
    oldPrice: '2499',
    off: '30% OFF',
    rating: 4,
    ratingCount: 1500,
    image: Product4,
    linkId: 4,
    deliveryDays: '2-3',
    productSize: [
      {
        id: 1,
        size: '6 UK',
      },
      {
        id: 2,
        size: '7 UK',
      },
      {
        id: 3,
        size: '8 UK',
      },
      {
        id: 4,
        size: '9 UK',
      },
    ],
  },
  {
    id: 5,
    name: 'Black Winter Hoodie',
    description: 'Autumn And Winter Casual cotton-padded jacket',
    price: '2999',
    oldPrice: '3999',
    off: '25% OFF',
    rating: 4.5,
    ratingCount: 2000,
    image: Product5,
    linkId: 5,
    deliveryDays: '3-4',
    productSize: [
      {
        id: 1,
        size: 'S',
      },
      {
        id: 2,
        size: 'M',
      },
      {
        id: 3,
        size: 'L',
      },
      {
        id: 4,
        size: 'XL',
      },
    ],
  },
  {
    id: 6,
    name: 'Imported Jacket',
    description: 'This warm and comfortable jacket is great for learni',
    price: '5500',
    oldPrice: '6999',
    off: '20% OFF',
    rating: 4,
    ratingCount: 1000,
    image: Product6,
    linkId: 6,
    deliveryDays: '4-5',
    productSize: [
      {
        id: 1,
        size: 'S',
      },
      {
        id: 2,
        size: 'M',
      },
      {
        id: 3,
        size: 'L',
      },
      {
        id: 4,
        size: 'XL',
      },
    ],
  },
  {
    id: 7,
    name: 'Mens Starry',
    description: 'Mens Starry Sky Printed Shirt 100% Cotton Fabric',
    price: '1999',
    oldPrice: '2999',
    off: '33% OFF',
    rating: 4.5,
    ratingCount: 500,
    image: Product7,
    linkId: 7,
    deliveryDays: '2-3',
    productSize: [
      {
        id: 1,
        size: 'S',
      },
      {
        id: 2,
        size: 'M',
      },
      {
        id: 3,
        size: 'L',
      },
      {
        id: 4,
        size: 'XL',
      },
    ],
  },
];
