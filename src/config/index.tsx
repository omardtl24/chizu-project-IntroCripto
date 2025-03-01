export const PRODUCT_CATEGORIES = [
  {
      label: 'Juegos',
      value: 'select' as const,
      featured: [
          {
              name: 'Nuestro Catalogo',
              href: `/products`,
              imageSrc: '/nav/picks/img1.jpg',
          },
          {
              name: 'Chizu Selected',
              href: '/products?category=Chizu Selected',
              imageSrc: '/nav/picks/img2.jpg',
          },
      ],
  },

//   {
//       label: 'Campañas',
//       value: 'popular' as const,
//       featured: [
//           {
//               name: 'Favoritas',
//               href: '/campaigns',
//               imageSrc: '/nav/fav/img1.jpg',
//           },
//           {
//               name: 'Recomendados',
//               href: `/campaigns?category=Chizu Selected`,
//               imageSrc: '/nav/fav/img2.png',
//           },
//       ],
//   },
]
