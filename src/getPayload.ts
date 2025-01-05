import dotenv from 'dotenv'
import path from 'path'
import type { InitOptions } from 'payload/config'
import payload, { Payload } from 'payload'
import nodemailer from 'nodemailer'

dotenv.config({
    path: path.resolve(__dirname, '../.env')
})

// configuracion envio de correos
const transporter = nodemailer.createTransport({
  host : 'smtp.gmail.com', //secure : true,
  port : 587,
  auth: {
    user : 'oilstockmanager@gmail.com', 
    pass : process.env.EMAIL_KEY,
  },
  
})

// optimizacion de arranque
let cached = (global as any).payload
if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  }
}

// crear el database client y lo enviamos al cache
interface Args { initOptions?: Partial<InitOptions> }
  
export const getPayloadClient = async ({ initOptions, }: Args = {}): Promise<Payload> => {

    if (!process.env.PAYLOAD_SECRET) {
      throw new Error('UwUsecret no identificado')
    }
    if (cached.client) { return cached.client }
    
    // guardar la promesa para no recargarla despues
    if (!cached.promise) {
      cached.promise = payload.init({
        // aca irian las credenciales del correo tambien
        email : { transport: transporter, fromAddress: 'oilstockmanager@gmail.com', fromName: 'UwUteca' },

        secret: process.env.PAYLOAD_SECRET,
        local: initOptions?.express ? false : true,
        
        // y todo lo demas que pongamos en las opciones de configuracion inicial
        ...(initOptions || {}), 
      })
    }
  
    try {
      cached.client = await cached.promise
    } 
    catch (e: unknown) {
      cached.promise = null
      throw e
    }
  
    return cached.client
}
