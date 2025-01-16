export const PRODUCT_CATEGORIES = [
  {
      label: 'Destacados',
      value: 'select' as const,
      featured: [
          {
              name: 'Populares',
              href: `/products?category=Populares`,
              imageSrc: '/nav/picks/img1.jpg',
          },
          {
              name: 'Chizu Selected',
              href: '/products?category=Chizu Selected',
              imageSrc: '/nav/picks/img2.jpg',
          },
      ],
  },

  {
      label: 'Campañas',
      value: 'popular' as const,
      featured: [
          {
              name: 'Favoritas',
              href: '/products?category=Populares',
              imageSrc: '/nav/fav/img1.jpg',
          },
          {
              name: 'Recomendados',
              href: `/products?category=Chizu Selected`,
              imageSrc: '/nav/fav/img2.png',
          },
      ],
  },
]
