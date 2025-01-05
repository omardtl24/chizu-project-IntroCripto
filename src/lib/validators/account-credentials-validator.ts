import { z } from "zod"

export const AuthCredentialsValidator = z.object({
    email: z.string().email({
        message: 'Porfavor ingrese un correo valido.',
    }),

    password: z.string()
        .min(8, {
            message: 'Contraseña Invalida.',
        })
        .refine(password => /[a-z]/.test(password), {
            message: 'Contraseña Invalida.',
        })
        .refine(password => /[A-Z]/.test(password), {
            message: 'Contraseña Invalida.',
        })
        .refine(password => /\d/.test(password), {
            message: 'Contraseña Invalida.',
        }),
    
    // confirm: 
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
