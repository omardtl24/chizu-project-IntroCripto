"use client";
import { useState } from "react";
import { toast } from "sonner"; 

const ReviewForm = ({ username, productId }: { username: string | null; productId: string }) => {
    const [review, setReview] = useState("");
    const [recommend, setRecommend] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!review.trim()) return toast.error("La review no puede estar vacía.");
        if (!username) return toast.error("Debes iniciar sesión para dejar una review.");

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ review, recommend, user: username, product: productId }),
            });

            if (!res.ok) throw new Error("Error al enviar la review");

            const createdReview = await res.json();
            setReview("");
            setRecommend(false);

            toast.success("¡Review enviada correctamente!");
        } catch (error) {
            console.error(error);
            toast.error("Error al enviar la review :/"); 
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-12 mb-12 p-6 border border-gray-300 rounded-lg bg-gray-50 w-full">
            <h2 className="text-xl font-bold mb-2">Deja tu review</h2>

            {/* Si el usuario es null, mostramos un mensaje en lugar del formulario */}
            {!username ? (
                <p className="text-gray-600 text-center">
                    Debes <a href="/sign-in" className="text-blue-500 font-semibold hover:underline">iniciar sesión</a> para dejar una review.
                </p>
            ) : (
                <>
                    <p className="text-gray-600 mb-2">
                        Usuario: <span className="font-semibold">{username}</span>
                    </p>
                    <textarea
                        className="w-full p-2 border rounded-lg"
                        placeholder="Escribe tu opinión..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                    <div className="mt-3 flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={recommend}
                            onChange={() => setRecommend(!recommend)}
                            className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-gray-700">¿Recomiendas este producto?</span>
                    </label>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-900 disabled:bg-gray-400"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? "Enviando..." : "Publicar Review"}
                    </button>
                </>
            )}
        </div>
    );
};

export default ReviewForm;
