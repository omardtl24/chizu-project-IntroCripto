"use client";

import { FC, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";

interface ConfirmationModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  show,
  onConfirm,
  onCancel,
  title = "¿Está seguro que quiere eliminar su cuenta?",
  description = "Esta acción no se puede deshacer.",
}) => {
  const [mounted, setMounted] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    if (show) {
      document.body.style.overflow = "hidden";
      // Enfocar el botón "Cancelar" al abrir el modal
      setTimeout(() => {
        cancelButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && show) {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onCancel]);

  if (!show || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white p-4 sm:p-6 rounded-md shadow-lg w-full max-w-lg sm:max-w-sm mx-4 overflow-y-auto">
        <h2 id="modal-title" className="text-xl font-semibold mb-2">
          {title}
        </h2>
        <p id="modal-description" className="mb-4 text-gray-700">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          {/* Botón Cancelar con fondo blanco, texto negro y borde amarillo más delgado */}
          <Button
            onClick={onCancel}
            className="w-full sm:w-auto bg-white hover:bg-gray-200 text-black border border-yellow-500 hover:border-yellow-600 transition-colors duration-300"
            ref={cancelButtonRef}
          >
            Cancelar
          </Button>
          {/* Botón Eliminar con transición a rojo más oscuro al hacer hover */}
          <Button
            className="bg-red-500 hover:bg-red-600 transition-colors duration-300 w-full sm:w-auto"
            onClick={onConfirm}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
