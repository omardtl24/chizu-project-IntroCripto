"use client"

import { FC } from "react"
import { Button } from "./ui/button"

interface ConfirmationModalProps {
  show: boolean
  title?: string
  onConfirm: () => void
  onCancel: () => void
}


// * Este componente muestra un modal de confirmación con un fondo semitransparente y opciones de continuar o cancelar.

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  show,
  title = "¿Está seguro que quiere eliminar su cuenta?",
  onConfirm,
  onCancel,
}) => {
  // Si no se debe mostrar, retornamos null para no renderizar nada
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md max-w-sm w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
