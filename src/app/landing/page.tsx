"use client";

import React from "react";
import { Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { AboutCard } from "@/components";
import { EventContentCard } from "@/components";
import Image from "next/image";
// HERO
function Hero() {
  return (
    <div className="relative min-h-screen w-full bg-[url('/spartan.jpg')] bg-cover bg-no-repeat">
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <Typography variant="h1" color="white" className="lg:max-w-3xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            CHIZU
          </Typography>
          <Typography variant="h3" color="white" className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Level Up Your Vision
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-1 mb-12 w-full md:max-w-full lg:max-w-2xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Únete a la plataforma que fortalece tus sueños
          </Typography>
        </div>
      </div>
    </div>
  );
}

const EVENT_INFO = [
  {
    title: "Visión",
    description:
      "Para el 2032, seremos de las plataformas más influyentes para la venta, financiación y promoción de videojuegos independientes, caracterizándonos por nuestra pasión por el aprendizaje e innovación ",
  },
  {
    title: "Misión",
    description:
      "Visibilizar a los creadores de videojuegos independientes a través de una plataforma para la venta, financiación y refinamiento de sus proyectos gracias a la interacción con jugadores, potenciando la creatividad e innovación de los desarrolladores",
  },
];

// ABOUT US
function AboutEvent() {
  return (
    <section id="about-us" className="container mx-auto flex flex-col items-center px-4 py-10 scroll-mt-10">
      <Typography variant="h3" className="text-center" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        Sobre Nosotros
      </Typography>
      <Typography
        variant="lead"
        className="mt-2 lg:max-w-4xl mb-8 w-full text-center font-normal !text-black-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        Somos una plataforma que impulsa la creatividad, permite la financiación 
        colaborativa y ofrece un espacio donde los sueños de los creadores se convierten en 
        experiencias únicas para los jugadores. Aquí apoyas, descubres y juegas como nunca antes 🎮✨
      </Typography>
      <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {EVENT_INFO.map((props, idx) => (
          <AboutCard key={idx} {...props} />
        ))}
        <div className="md:col-span-2">
        </div>
      </div>
    </section>
  );
}

const STATS = [
  {
    count: "Financiación",
    title: "Apoya juegos en desarrollo y obtén recompensas exclusivas",
  },
  {
    count: "Conexión",
    title: "Jugadores y creadores colaborando en un mismo espacio",
  },
  {
    count: "Apoyo a Indies",
    title: "Publica y financia tus proyectos fácilmente",
  },
  {
    count: "Baja Comisión",
    title: "Solo el 10% para maximizar los ingresos de los desarrolladores",
  },
];

function OurStats() {
  return (
    <section id="advantages" className="container mx-auto px-8 py-20 grid gap-8">
      {/* Contenedor para la sección Ventajas */}
      <div className="bg-gray-100 rounded-xl shadow-md p-8">
        <Typography
          className="text-5xl font-bold leading-tight"
          color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          Ventajas
        </Typography>
        <Typography
          variant="lead"
          className="mt-3 text-gray-500 text-justify text-xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          En Chizu, buscamos revolucionar la forma en que los videojuegos son
          creados. Nuestra plataforma ofrece beneficios únicos tanto a
          desarrolladores independientes como a jugadores, creando un
          ecosistema que fomenta la creatividad, la colaboración y el
          crecimiento mutuo 🎮✨
        </Typography>
      </div>

      {/* Contenedor para las estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STATS.map((props, key) => (
          <div
            key={key}
            className="bg-gray-100 rounded-xl shadow-md p-6 flex flex-col gap-2"
          >
            <Typography
              className="text-2xl font-bold"
              color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              {props.count}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-gray-500 text-xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              {props.title}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
}

const EVENT_CONTENT = [
  {
    title: "Galaxy Shooter",
    des: "Un simple, entretenido y agradable Shooter en el espacio",
    name: "Juan Carlos (Meow) Garavito",
    position: "Desarrollador Indie, Universidad Nacional de Colombia",
    panel: "Proyecto Indie",
    img: "/galaxyshooter.png",
  },
  {
    title: "The Essence",
    des: "Simplemente acción!",
    name: "Juan Carlos (Meow) Garavito",
    position: "Desarrollador Indie, Universidad Nacional de Colombia",
    panel: "Proyecto Indie",
    img: "/theessence.png",
  },
  {
    title: "Pong",
    des: "Un juego local de Pong en 3D",
    name: "Juan Carlos (Meow) Garavito",
    position: "Desarrollador Indie, Universidad Nacional de Colombia",
    panel: "Proyecto Indie",
    img: "/pong.png",
  },
];

function EventContent() {
  return (
    <section id="projects" className="py-4 px-8 lg:py-20">
      <Typography
        variant="h2"
        className="text-center font-bold text-blue-gray-900 mb-12" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        Proyectos en Progreso
      </Typography>

      {/* Contenido estático */}
      <div className="mx-auto container">
        {EVENT_CONTENT.map((props, idx) => (
          <EventContentCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

const SPONSORS = [
  "coinbase",
  "spotify",
  "pinterest",
  "google",
  "amazon",
  "netflix",
];

function SponsoredBy() {
  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto text-center">
        <Typography variant="h6" color="blue-gray" className="mb-8" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          NUESTROS SOCIOS
        </Typography>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {SPONSORS.map((logo, key) => (
            <Image
              width={256}
              height={256}
              key={key}
              src={`/logos/logo-${logo}.svg`}
              alt={logo}
              className="w-40"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    title: "1. ¿Cómo funciona la financiación colaborativa?",
    desc: "Los desarrolladores pueden crear campañas con recompensas por niveles (tiers). Los jugadores apoyan el proyecto y reciben beneficios exclusivos según el nivel seleccionado.",
  },
  {
    title: "2. ¿Qué tipo de videojuegos hay en Chizu?",
    desc: "Chizu ofrece una variedad de juegos, desde títulos indie hasta videojuegos convencionales, para satisfacer todos los gustos.",
  },
  {
    title: "3. ¿Cómo puedo contactar a un desarrollador?",
    desc: "Puedes interactuar con desarrolladores directamente a través de comentarios, reseñas y los canales habilitados en sus campañas.",
  },
  {
    title: "4. ¿Cómo protege Chizu mis datos?",
    desc: "Utilizamos políticas de protección de datos conforme a las normativas legales, incluyendo cifrado de contraseñas y protocolos seguros de transacción.",
  },
  {
    title: "5. ¿Qué porcentaje se lleva Chizu?",
    desc: "Chizu cobra solo el 10% de las ventas de juegos y suscripciones, permitiendo que los desarrolladores maximicen sus ingresos.",
  },
  {
    title: "6. ¿Puedo jugar versiones en desarrollo de los videojuegos?",
    desc: "Sí, algunos desarrolladores ofrecen acceso a versiones en desarrollo como parte de sus campañas de financiación.",
  },
];

function Faq() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <section id="faq" className="py-8 px-8 lg:py-20">
      <div className="container mx-auto">
        <div className="text-center">
          <Typography variant="h1" color="blue-gray" className="mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Preguntas Frecuentes
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto mb-24 lg:w-3/5 !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Aquí encontrarás respuestas a las preguntas más comunes sobre cómo funciona Chizu, 
            cómo aprovechar sus herramientas y cómo aseguramos una experiencia confiable para desarrolladores y jugadores. 
            ¡Descubre todo lo que necesitas saber aquí! 😊
          </Typography>
        </div>

        <div className="mx-auto lg:max-w-screen-lg lg:px-20">
          {FAQS.map(({ title, desc }, key) => (
            <Accordion
              key={key}
              open={open === key + 1}
              onClick={() => handleOpen(key + 1)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              <AccordionHeader className="text-left text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {title}
              </AccordionHeader>
              <AccordionBody>
                <Typography
                  color="blue-gray"
                  className="font-normal text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  {desc}
                </Typography>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

// LANDING PAGE
export default function Page() {
  return (
    <>
      <Hero />
      <AboutEvent />
      <OurStats />
      <EventContent />
      <Faq />
      <SponsoredBy />
    </>
  );
}