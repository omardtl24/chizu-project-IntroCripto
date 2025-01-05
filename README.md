# Chizu

Chizu es un aplicativo web para la compra, venta y promoción de videojuegos. Los usuarios jugadores tendrán la posibilidad de comprar y descargar los videojuegos que hayan sido subidos por otros usuarios desarrolladores o empresas y valorar dichos juegos a través de opiniones y reseñas. Los desarrolladores podrán generar campañas para la recolección de fondos necesarios para la creación de sus juegos, mediante un sistema de suscripción por niveles a los que dicho desarrollador puede asociar diversas recompensas incrementales, a su vez, los jugadores que deseen apoyar a un desarrollador de su interés, podrán aportar reportes sobre errores o posibles mejoras que se puedan realizar en los juegos. Chizu busca ser una  plataforma no solo para la compra y venta de videojuegos, sino potenciar la labor de los desarrolladores independientes.


## Equipo.

| Nombre                         | Rol           | Experiencia y Habilidades                              |
|--------------------------------|---------------|--------------------------------------------------------|
| **Juan Pablo Gomez Rangel**        | Desarrollador | Back-end usando Next.js 13, Django                   |
|                                | Scrum Master 1| Front-end usando React                               |
|                                |               | Experiencia en MongoDB y Firebase                    |
| **Julian David Osorio Carrillo**  | Desarrollador | Back-end usando Next.js 13 y Django                  |
|                                | Scrum Master 4| Front-end usando React y Tailwind                    |
|                                |               | Implementación pasarela de pagos en Stripe           |
| **Juan Carlos Garavito Higuera**   | Desarrollador | Back-end usando Next.js 13, Django                   |
|                                | Scrum Master 2| Front-end usando React y Tailwind                    |
|                                |               | Conocimientos de C#                                  |
| **Juan Pablo Garcia Otalora**      | Desarrollador | Back-end usando Django                               |
|                                | Scrum Master 3| Mobile dev usando Flutter y Swift                    |
|                                |               | Experiencia en uso de Firebase                       |
|                                |               | Experiencia en GCP                                   |


## Propósito.
### Visión.
Para el 2032, seremos reconocidos como una de las plataformas más influyentes en América Latina para la venta de videojuegos, junto a la financiación colaborativa y promoción de videojuegos independientes, destacándonos por nuestra pasión por el aprendizaje continuo, nuestro compromiso con la innovación, y la constancia como base para construir relaciones sólidas y sostenibles entre desarrolladores y jugadores. 

### Misión.
Ofrecer una plataforma accesible en donde los desarrolladores puedan publicar y financiar sus proyectos, mientras los jugadores descubren, compran y disfrutan una amplia variedad de videojuegos, tanto independientes como convencionales. Conectamos día a día a creadores y jugadores, brindando herramientas claras y asegurando una experiencia confiable y enriquecedora, fomentando la visibilidad de Chizu entre nuevos jugadores. 

### Modelo de Negocio.
![ModeloCanvas](https://github.com/user-attachments/assets/1f2333b3-4c22-4e08-954c-8a0f82992694)


## Requerimientos.
### Funcionales.
1. Tienda de juegos publicados: Permitir al usuario subir un juego o comprarlo y descargarlo dentro de la tienda.
2. Reseñas usuarios y Reportes de Bugs: Permitir que los usuarios dejen reseñas y calificaciones de los juegos comprados, ayudando a otros usuarios a tomar decisiones de compra informadas. Adicionalmente, permitir que los usuarios puedan reportar fallos que quieran ver corregidos en los juegos que han adquirido.
3. Creacion de campañas de recaudación: Los usuarios que estén desarrollando un juego podrán crear campañas para recibir apoyo en el desarrollo de dicho juego, esto mediante la creación de niveles de suscripción con diferentes recompensas incrementales. Los demás usuarios de la plataforma que deseen apoyar a los desarrolladores podrán pagar por estas suscripciones.
4. Facilitar diferentes tipos de Recompensas: Permitir a los usuarios desarrolladores ofrecer arte, acceso adelantado a videojuegos, entre otros tipos de recompensas las cuales puedan asociar a sus niveles de subscripción con la cual captar la atención de otros posibles usuarios que deseen apoyarlos.
5. Autenticación con Google: Permitir a los usuarios registrarse e iniciar sesión usando su cuenta de google por conveniencia y facilidad.
6. Biblioteca de juegos: Ofrecer una biblioteca en la que los usuarios puedan acceder a todos los juegos que han adquirido.
7. Panel de Perfil de Usuario: Ofrecer al usuario un panel donde pueda editar y actualizar su información personal.

### No Funcionales.
1. Diseño responsivo: La plataforma será responsiva para dispositivos móviles, asegurando una experiencia de usuario de alta calidad en smartphones y tablets, así como en computadoras de escritorio.
2. Seguridad en el proceso de Pagos: Usando un administrador de pagos avalado por la normativa PCI DSS para la seguridad de pagos con tarjeta de débito y crédito. 
3. Rapidez: Tiempo de respuesta a peticiones menor a 5 segundos con una conexión de mínimo 80MB/s.
4. Compatibilidad: Funcional en las últimas versiones de Chrome, Opera y Microsoft Edge a la fecha; 123.0.6312.28, 114.0.5282.102, 132.0.1, respectivamente.
