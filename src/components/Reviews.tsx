import React from "react";
import payload from "payload";

export const Reviews = async ({ productId }) => {
    const { docs: reviews } = await payload.find({
        collection: "reviews",
        where: {
            product: {
                equals: productId,
            },
        },
    });

    return (
        <div>
            <h1>Reviews</h1>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => {
                        const reviewData = review as { id: string; review: string; user?: string; recommend?: boolean };
                        return (
                            <li key={reviewData.id}>
                                <p><strong>{reviewData.user || "Usuario desconocido"}</strong></p>
                                <p>{reviewData.review}</p>
                                <p>{reviewData.recommend ? "✅ Recomendado" : "❌ No recomendado"}</p>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No hay comentarios aún.</p>
            )}
        </div>
    );
};
