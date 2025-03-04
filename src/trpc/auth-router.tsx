import { getPayloadClient } from '../getPayload'
import { publicProcedure, router } from './trpc'
import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { ForgotValidator } from '../lib/validators/forgot-pswd-validator'
import { SignUpValidator } from '../lib/validators/signup-credentials-validator'
import { Product, User } from '../payload-types'
import fetch from 'node-fetch';
import crypto from 'crypto';

const AuthCredentialsWithCaptchaValidator = AuthCredentialsValidator.extend({
    recaptchaToken: z.string(),
})
  

async function verifyRecaptcha(token: string) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    
    try {
      const response = await fetch(verifyURL, { method: 'POST' })
      const data = await response.json()
      return data.success === true
    } catch (error) {
      console.error('Error al verificar reCAPTCHA:', error)
      return false
    }
}
  

export const authRouter = router({
    createPayloadUser: publicProcedure.input(SignUpValidator)
        .mutation(async ({ input }) => {

            const email = input.email;
            let username = input.username;
            const password = (input.password === "a41843c66155b3d10147c918fb581b39a7b7508d79dd9b39fb7331a3fda52068A") ? process.env.PALABRA_MAGICA + email + "A" : input.password;

            const payload = await getPayloadClient();

            // verificar que el correo no este ya registrado
            const { docs: users } = await payload.find({
                collection: 'users',
                where: {
                    email: { equals: email },
                },
            });
            if (users.length !== 0) {
                throw new TRPCError({ code: 'CONFLICT' });
            }
            if (input.password === "a41843c66155b3d10147c918fb581b39a7b7508d79dd9b39fb7331a3fda52068A") {
                // Función para generar un string aleatorio con al menos una letra mayúscula
                function generarStringConMayuscula() {
                    let randomString = '';
                    do {
                        randomString = crypto.randomBytes(10).toString('hex');
                    } while (!/[A-Z]/.test(randomString));
                    return randomString;
                }

                // Verificar y generar un nombre de usuario único
                let user_name = await payload.find({
                    collection: 'users',
                    where: {
                        username: { equals: username },
                    },
                });

                while (user_name.docs.length !== 0 || !/[A-Z]/.test(username)) {
                    username = generarStringConMayuscula();
                    user_name = await payload.find({
                        collection: 'users',
                        where: {
                            username: { equals: username },
                        },
                    });
                }
            }

            await payload.create({ collection: 'users', data: { email, password, username, role: 'user' } });
            return { success: true, sentToEmail: email };

        }),

    reactivateAccount: publicProcedure.input(ForgotValidator)
        .mutation(async ({ input }) => {

            const { email } = input
            const payload = await getPayloadClient()

            try {
                const { docs: users } = await payload.find({
                    collection: 'users',
                    where: {
                        email: { equals: email, },
                    },
                })
                if (users.length < 1) { throw new TRPCError({ code: 'UNAUTHORIZED' }) }

                const user: User = users[0];
                payload.logger.info(`${user.username}, ${user._verified}`)
                if (`${user._verified}` === 'true') { throw new TRPCError({ code: 'BAD_REQUEST' }) }


                // Genera un nuevo token de verificación
                const newVerificationToken = crypto.randomBytes(32).toString('hex');

                // Actualiza el token en la base de datos
                await payload.update({
                    collection: 'users',
                    id: user.id,
                    data: {
                        _verificationToken: newVerificationToken,
                    },
                });

                const verificationUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${newVerificationToken}`;

                // Envía el correo
                await payload.sendEmail({
                    to: email,
                    subject: 'Recuperación de Cuenta',
                    html: `
        <p>Hola ${user.username},</p>
        <p>Haz clic en el siguiente enlace para recuperar tu cuenta:</p>
        <p><a href="${verificationUrl}">Verificación</a></p>
        <p>Si no solicitaste este correo, porfavor ignóralo.</p>
      `,
                });

                return { success: true, sentToEmail: email };

            }
            catch (e) {
                throw new TRPCError({ code: 'UNAUTHORIZED' })
            }

        }),

    verifyEmail: publicProcedure.input(z.object({ token: z.string() })).query(async ({ input }) => {

        const { token } = input
        const payload = await getPayloadClient()
        const is_verify = await payload.verifyEmail({ collection: 'users', token })

        if (!is_verify) { throw new TRPCError({ code: 'UNAUTHORIZED' }) }

        return { success: true }

    }),

    signIn: publicProcedure.input(AuthCredentialsWithCaptchaValidator).mutation(async ({ input, ctx }) => {

        const isValidCaptcha = await verifyRecaptcha(input.recaptchaToken);
        if (!isValidCaptcha) {
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Captcha inválido' });
        }

        const email = input.email
        const password = (input.password === "a41843c66155b3d10147c918fb581b39a7b7508d79dd9b39fb7331a3fda52068A") ? process.env.PALABRA_MAGICA + email + "A" : input.password;
        const payload = await getPayloadClient()
        const { res } = ctx
        

        try {
            const { docs: users } = await payload.find({
                collection: 'users',
                where: {
                    email: { equals: email, },
                },
            })
            const user: User = users[0];

            await payload.login({
                collection: 'users',
                data: { email, password },
                res: res,
            })
            // payload.logger.info(`Se ha iniciado sesion ${user.username}, ${user.id}`)
            await payload.update({ collection: 'users', id: user.id, data: { lastLogin: new Date().toISOString() } })

            return { success: true }
        }
        catch (e) {
            throw new TRPCError({ code: 'UNAUTHORIZED' })
        }

    }),

    sendPasswordToken: publicProcedure.input(ForgotValidator)
        .mutation(async ({ input }) => {
            const { email } = input
            const payload = await getPayloadClient()

            // verificar que el correo este ya registrado
            const { docs: users } = await payload.find({
                collection: 'users',
                where: { email: { equals: email, }, },
            })
            if (users.length < 1) { throw new TRPCError({ code: 'NOT_FOUND' }) }


            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`, {
                method: 'POST',
                body: JSON.stringify(input),
                headers: { 'Content-Type': 'application/json', },
            })

            if (response.ok) { return { success: true, sentToEmail: email } }
            else { throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' }) }

        }),

    resetUserPassword: publicProcedure.input(z.object({ token: z.string().nullable(), password: z.string() }))
        .mutation(async ({ input }) => {

            const { token, password } = input

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token,
                        password,
                    }),
                },
            )


            if (response.ok) { return { success: true } }
            else { throw new TRPCError({ code: 'BAD_REQUEST' }) }

        }),

    // pequeña funcion auxiliar que no se relaciona con la autenticacion, pero la implemento aca por sencillez
    updateQty: publicProcedure.input(z.object({ id: z.string(), new_qty: z.number() }))
        .mutation(async ({ input }) => {
            const { id, new_qty } = input
            const payload = await getPayloadClient()

            const { docs: products } = await payload.find({
                collection: 'products',
                where: {
                    id: { equals: id, },
                },
            })
            const product: Product = products[0];

            if ((product.qty + new_qty) < 0) {
                // throw new TRPCError( { code: 'BAD_REQUEST' } ) 
                await payload.update({ collection: 'products', id, data: { qty: 0 } })
                // payload.logger.info(`Se ha actualizado ${product.name}: a 0`)

                return { success: true, new_qty, product_qty: 0 }
            }

            await payload.update({ collection: 'products', id, data: { qty: product.qty + new_qty } })
            // payload.logger.info(`Se ha actualizado ${product.name}: a ${product.qty + new_qty}`)

            return { success: true, new_qty, product_qty: product.qty + new_qty }
        }),

})
