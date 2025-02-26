"use client";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Comment {
  id: string;
  comment: string;
  user: { name: string; email: string } | null;
  product: string;
  createdAt: string;
}

const Comments = ({ productId }: { productId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        console.log("Fetching comments for product:", productId);
  
        const res = await fetch(`/api/comments?productId=${productId}`);
        if (!res.ok) throw new Error("Error al cargar los comentarios");
  
        const data = await res.json();
        console.log("Fetched comments:", data);
  
        if (!Array.isArray(data.docs)) { // Validar si es un array
          console.error("Los datos recibidos no son un array:", data);
          setComments([]);
          return;
        }
  
        setComments(data.docs || []); // Aquí extraemos el array de comentarios
      } catch (error) {
        console.error(error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    }
  
    if (productId) {
      fetchComments();
    }
  }, [productId]);  

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comentarios</h2>

      {loading ? (
        <p className="text-gray-600">Cargando comentarios...</p>
      ) : comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold">{comment.user?.name || "Usuario desconocido"}</span>
              </div>
              <p className="text-gray-800">{comment.comment}</p>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No hay comentarios aún.</p>
      )}
    </div>
  );
};

export default Comments;
