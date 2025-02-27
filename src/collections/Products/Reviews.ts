import { CollectionConfig } from "payload/types";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  labels: { singular: "Review", plural: "Reviews" },

  admin: {
    useAsTitle: "id",
    description: "Comentarios de los jugadores en los productos.",
    hideAPIURL: true,
    hidden: ({ user }) => user?.role !== "admin"
  },

  fields: [
    {
      name: "review",
      type: "textarea",
      required: true,
      label: "Comentario",
    },
    {
      name: "user",
      type: "text",
      required: false, // El usuario ahora es opcional
      label: "Usuario",
    },
    {
      name: "product",
      label: "Producto",
      type: "relationship",
      relationTo: "products",
      required: true, // El comentario debe estar vinculado a un producto
    },
    {
      name: "recommend",
      type: "checkbox",
      label: "¿Recomienda este producto?",
      required: true,
      defaultValue: false, // ✅ Por defecto, el producto NO es recomendado
    },
  ],
};
