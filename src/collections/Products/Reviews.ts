import { CollectionConfig } from "payload/types";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  labels: { singular: "Reseña", plural: "Reseñas" },

  admin: {
    useAsTitle: "id",
    description: "Reseñas de los jugadores en los productos.",
    hideAPIURL: true,
  },

  fields: [
    {
      name: "review",
      label: "Reseña",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      label: "Calificación",
      type: "select",
      required: true,
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
      ],
    },
    {
      name: "user",
      label: "Usuario",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
      access: {
        update: () => false, // No se puede modificar el usuario después de creado
        create: () => false, // Se asignará automáticamente
      },
      admin: { condition: () => false }, // Ocultar en el panel
    },
    {
      name: "product",
      label: "Producto",
      type: "relationship",
      relationTo: "products",
      required: true,
    },
  ],

  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === "create") {
          if (!data.user && req.user) {
            data.user = req.user.id; // Asignar el usuario autenticado
          }
        }
        return data;
      },
    ],
  },
};
