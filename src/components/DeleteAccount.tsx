"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useAuth } from '@/hooks/useAuth'

interface User {
  id: any // Ajusta el tipo según tu modelo (string, number, etc.)
}

export function useDeleteAccount(user: User) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { signOut } = useAuth()
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [isSuccess])

  /** Al hacer clic en "Eliminar cuenta" */
  const handleDeleteClick = () => {
    setShowModal(true)
  }

  /** Al confirmar en el modal */
  const handleConfirmDelete = async () => {
    setShowModal(false)
    try {
      // Validar que user.id sea number o string convertible a number
      if (typeof user.id !== "number" && typeof user.id !== "string") {
        throw new Error("ID de usuario inválido.")
      }

      // Convertir string a number si es necesario
      if (typeof user.id === "string") {
        user.id = parseInt(user.id)
      }
      signOut()
      const response = await fetch(
        "https://us-central1-chizu-444720.cloudfunctions.net/soft_delete_users",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user.id }),
        }
      )

      if (!response.ok) {
        throw new Error("Error en la eliminación de la cuenta")
      }

      toast.success("Se eliminó la cuenta correctamente.")
      setIsSuccess(true)
    } catch (error) {
      toast.error("No se ha podido eliminar la cuenta, intente más tarde.")
    }
  }

  /** Al cancelar en el modal */
  const handleCancel = () => {
    setShowModal(false)
  }

  return {
    isSuccess,
    showModal,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancel,
  }
}
