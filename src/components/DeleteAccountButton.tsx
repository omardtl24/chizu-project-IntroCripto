"use client";

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { User } from "@/payload-types"
import { toast } from "sonner"
import ConfirmationModal from "./ConfirmationModal"
import { getServerUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import GetUserID from "./GetUserID"
//const DeleteAccountButton = ({ id }: { id: User }) => {

const DeleteAccountButton =  () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  const handleDeleteClick = () => {
    setShowModal(true)     // Primero abrimos el modal para que el usuario confirme
  }

  const handleConfirmDelete = async () => {
    setShowModal(false)

    try {
      // Llamamos a tu endpoint para realizar el "soft delete"
      
      const response = await fetch(
        "https://us-central1-chizu-444720.cloudfunctions.net/soft_delete_users",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          // Ajusta el valor de ID según tu lógica (si `id` es un número o viene en un objeto)
          body: JSON.stringify({ id: GetUserID() }),
        }
      )

      // Validamos si la respuesta es exitosa
      if (!response.ok) {
        throw new Error("Error en la eliminación de la cuenta")
      }
      toast.success("Se eliminó la cuenta corrrectamente.")

      // Si la eliminación es exitosa, mostramos el mensaje de éxito
      setIsSuccess(true)
    } catch (error) {
      // Si hay un error, mostramos notificación de error
      toast.error("No se ha podido eliminar la cuenta, intente más tarde.")
    }
  }

  const handleCancel = () => {
    // Cerramos el modal sin eliminar
    setShowModal(false)
  }

  return (
    <>
      <Button
        onClick={handleDeleteClick}
        size="lg"
        className="w-full"
        disabled={isSuccess}
      >
        {isSuccess ? "¡Cuenta eliminada con éxito!" : "Eliminar cuenta"}
      </Button>

      {/* Modal de confirmación */}
      <ConfirmationModal
        show={showModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
      />
    </>
  )
}

export default DeleteAccountButton
