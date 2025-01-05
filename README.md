# UwUteca e-commerce
Una tienda de manga en Español :3

### Desarrollo

1. Clonar repositorio
1. `npm run dev` o `yarn dev`
1. Abra `http://localhost:3000` para abrir la aplicación en el navegador.


## Estructura de carpetas `src`

### Collections (Modelo)

- #### Users

   Los usuarios son administradores y clientes según el valor de su campo `role`. Solo los usuarios **admin** pueden acceder al panel de administración para actualizar, eliminar o agregar información de la tienda. **client** puede acceder al menú de la tienda, al carrito y al panel de perfil.


- #### Products

   Los productos están vinculados a Stripe y se actualizan en el Panel de Admin.

- #### Categories

   Productos en funcion de determinado grupo.

- #### Orders

### Views

- #### Pages

   Diseños y componentes de React para aplicar en cada plantilla.

- #### Media

   Imágenes, vídeos, descargas y otros activos.


### Globals

Encabezado y Pie de página que aparece en todas las vistas (Header, Footer).


## Funciones (carpeta App/(pages))

### Carrito
Los usuarios que hayan iniciado sesión pueden guardar sus carritos de compras en sus perfiles mientras compran.
> Nota: Podemos crear un campo `cart` en el modelo `user` para evitar un modelo adicional.


### Pasarela de Pagos
Payload ofrece un punto final personalizado `POST /api/create-paid-intent` que inicia el proceso de pago. Este punto final suma el total del carrito y crea una [Intención de pago de Stripe](https://stripe.com/docs/paids/paid-intents). El precio total se vuelve a calcular en el servidor para garantizar la precisión y la seguridad. Una vez que el pago se haya realizado correctamente, se creará un pedido en Payload con un `stripePaymentIntentID` unica. Cada producto comprado se registrará en el perfil del usuario y el carrito del usuario se borrará automáticamente.

#### Stripe
El marco Payload no gestiona los pagos por sí mismo; entonces, para procesar pagos de forma segura, se implementa [Stripe](https://stripe.com) en la aplicación; luego establezca la conexión con cada producto y Stripe.

> Nota: Acontinucacion anexo algunas referencias de utilidad en el Sprint 3; donde se implementara la pasarela de pagos.

* Stripe a Payload usando [Stripe Webhooks](https://stripe.com/docs/webhooks):
    - `product.create`
    - `product.update`
    - 
* Payload a Stripe usando [Hooks de carga útil](https://payloadcms.com/docs/hooks/overview):
    - `user.create`

Para más detalles: [Complemento Payload Stripe](https://github.com/payloadcms/plugin-stripe).


1. Cree una cuenta [Stripe](https://stripe.com).
1. Recupere las [claves API de Stripe](https://dashboard.stripe.com/test/apikeys) y péguelas en el `env`:

    ```ts
    STRIPE_SECRET_KEY=
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
    ```
1. En otra terminal, escuche los webhooks (opcional):
    ```ts
    stripe login # follow the prompts
    yarn stripe:webhooks
    ```
1. Pegue el secreto de firma del webhook proporcionado en el `env`:
    ```ts
    STRIPE_WEBHOOKS_SIGNING_SECRET=
    ```
1. Reinicie Payload para asegurarse de que Stripe se conecte y los webhooks estén registrados.

> En esencia estamos creando una 'instancia' única de Stripe en el ambiente de Payload, similar a lo que se haría para conectar una base de datos en Mongo por medio de llaves.



## Implementación
> Nota: Anexo algunas recomendaciones importantes directamente de la documentación de Payload Framework.
Para ejecutar Payload en producción, debe crear y ofrecer el panel de administración. Para hacerlo, siga estos pasos:

1. Invoque el script `payload build` ejecutando `yarn build` o `npm run build` en la raíz del proyecto. Esto crea un directorio `./build` con un paquete de administración listo para producción.
1. Ejecute `yarnserve` o `npm run save` para ejecutar Node en producción y servir la carga útil desde el directorio `./build`.


> Nota: Anexo algunas consideraciones adicionales para hacer deploy con Stripe una vez lo implementemos; De resto, debemos seguir la guía de Vecel.
1. Cambie [Stripe live mode](https://stripe.com/docs/test-mode) y actualice las [claves API de Stripe](https://dashboard.stripe.com/test/apikeys). Consulte [Connect Stripe](#connect-stripe) para obtener más detalles.

1. Implemente la aplicación manualmente para evitar tarifas de la nube; consulte la [documentación de implementación](https://payloadcms.com/docs/production/deployment) para obtener más detalles.
