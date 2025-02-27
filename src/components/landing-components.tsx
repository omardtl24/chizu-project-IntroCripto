"use client";

import React from "react";
import { Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { AboutCard } from "@/components";
import { EventContentCard } from "@/components";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductReel from "@/components/ProductReel";
import exp from "constants";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";


type AnimationType = "fadeIn" | "slideRight" | "slideLeft" | "zoomIn";

interface ScrollAnimationProps {
    children: React.ReactNode;
    className?: string;
    animation: AnimationType;
}


interface EventInfo {
    title: string;
    description: string;
}

interface StatInfo {
    count: string;
    title: string;
}

interface EventContentInfo {
    title: string;
    des: string;
    name: string;
    position: string;
    panel: string;
    img: string;
}

interface FaqInfo {
    title: string;
    desc: string;
}


const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, className, animation }) => {
    const animations = {
        fadeIn: {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-200px" },
            transition: { duration: 0.8 }
        },
        slideRight: {
            initial: { opacity: 0, x: -100 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true, margin: "-200px" },
            transition: { duration: 0.8 }
        },
        slideLeft: {
            initial: { opacity: 0, x: 100 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true, margin: "-200px" },
            transition: { duration: 0.8 }
        },
        zoomIn: {
            initial: { opacity: 0, scale: 0.5 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true, margin: "-200px" },
            transition: { duration: 0.8 }
        }
    };

    return (
        <div className="overflow-hidden">
            <motion.div
                className={className}
                {...animations[animation]}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollAnimation;


// HERO
export const Hero: React.FC = () => {
    return (
        <div className="relative min-h-screen w-full bg-[url('/spartan.jpg')] bg-cover bg-no-repeat">
            <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
            <div className="grid min-h-screen px-8">
                <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
                    <ScrollAnimation animation="zoomIn">
                        <Typography variant="h1" color="white" className="lg:max-w-3xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            CHIZU
                        </Typography>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fadeIn">
                        <Typography variant="h3" color="white" className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            Level Up Your Vision
                        </Typography>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fadeIn">
                        <Typography
                            variant="lead"
                            color="white"
                            className="mt-1 mb-12 w-full md:max-w-full lg:max-w-2xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                            Únete a la plataforma que fortalece tus sueños
                        </Typography>
                    </ScrollAnimation>
                </div>
            </div>
        </div>
    );
};

const EVENT_INFO: EventInfo[] = [
    {
        title: "Visión",
        description: "Para el 2032, seremos de las plataformas más influyentes para la venta, financiación y promoción de videojuegos independientes, caracterizándonos por nuestra pasión por el aprendizaje e innovación",
    },
    {
        title: "Misión",
        description: "Visibilizar a los creadores de videojuegos independientes a través de una plataforma que permite la venta y financiación de sus proyectos, potenciando la creatividad e innovación de los desarrolladores",
    },
];

// ABOUT US
export const AboutEvent: React.FC = () => {
    return (
        <section id="about-us" className="container mx-auto flex flex-col items-center px-4 py-10 scroll-mt-10">
            <ScrollAnimation animation="fadeIn">
                <Typography variant="h3" className="text-center" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Sobre Nosotros
                </Typography>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeIn">
                <Typography
                    variant="lead"
                    className="mt-2 lg:max-w-4xl mb-8 w-full text-center font-normal !text-black-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                    Chizu es un aplicativo web para la compra, venta y promoción de videojuegos.
                    Los desarrolladores podrán generar campañas para la recaudación de fondos para la creación de sus juegos,
                    mediante un sistema de suscripción por tiers o niveles a los que dicho desarrollador puede asociar diversas recompensas.
                    Chizu busca ser una  plataforma no solo para la compra y venta de videojuegos, sino potenciar la labor de los desarrolladores independientes

                </Typography>
            </ScrollAnimation>
            <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {EVENT_INFO.map((props, idx) => (
                    <ScrollAnimation key={idx} animation={idx % 2 === 0 ? "slideRight" : "slideLeft"}>
                        <AboutCard {...props} />
                    </ScrollAnimation>
                ))}
            </div>
        </section>
    );
};

const STATS: StatInfo[] = [
    {
        count: "Recaudación",
        title: "Apoya juegos en desarrollo y obtén recompensas exclusivas, por medio de suscripciones que apoyan a los creadores",
    },
    {
        count: "Conexión",
        title: "Jugadores y creadores colaborando en fomentar una comunidad de videojuegos independientes y de calidad",
    },
    {
        count: "Apoyo a Independientes",
        title: "Ofrecemos un espacio para que los desarrolladores independientes puedan mostrar su trabajo y recibir apoyo de la comunidad",
    },
    {
        count: "Baja Comisión",
        title: "Solo el 10% de las ventas de juegos y suscripciones, permitiendo que los desarrolladores maximicen sus ingresos",
    },
];


export const OurStats: React.FC = () => {
    return (
        <section id="advantages" className="container mx-auto px-8 py-20 grid gap-8">
            <ScrollAnimation animation="fadeIn">
                <div className="bg-gray-100 rounded-xl shadow-md p-8">
                    <Typography className="text-5xl font-bold leading-tight" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Ventajas
                    </Typography>
                    <Typography variant="lead" className="mt-3 text-gray-500 text-justify text-xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        En Chizu, buscamos revolucionar la forma en que los videojuegos son
                        creados. Nuestra plataforma ofrece beneficios únicos tanto a
                        desarrolladores independientes como a jugadores, creando un
                        ecosistema que fomenta la creatividad, la colaboración y el
                        crecimiento mutuo
                    </Typography>
                </div>
            </ScrollAnimation>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {STATS.map((props, key) => (
                    <ScrollAnimation key={key} animation="zoomIn">
                        <div className="bg-gray-100 rounded-xl shadow-md m-2 p-6 flex flex-col gap-2">
                            <Typography className="text-2xl font-bold" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                {props.count}
                            </Typography>
                            <Typography variant="paragraph" className="text-gray-500 text-xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                {props.title}
                            </Typography>
                        </div>
                    </ScrollAnimation>
                ))}
            </div>
        </section>
    );
};

const EVENT_CONTENT: EventContentInfo[] = [
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

export const EventContent: React.FC = () => {
    return (
        <section id="projects" className="py-4 px-8 lg:py-20">
            <ScrollAnimation animation="fadeIn">
                <Typography variant="h2" className="text-center font-bold text-blue-gray-900 mb-12" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Proyectos en Progreso
                </Typography>
            </ScrollAnimation>

            <div className="mx-auto container">
                {EVENT_CONTENT.map((props, idx) => (
                    <ScrollAnimation key={idx} animation={idx % 2 === 0 ? "slideRight" : "slideLeft"}>
                        <EventContentCard {...props} />
                    </ScrollAnimation>
                ))}
            </div>
        </section>
    );
};

const SPONSORS: string[] = [
    "coinbase",
    "spotify",
    "pinterest",
    "google",
    "amazon",
    "netflix",
];

export const SponsoredBy: React.FC = () => {
    return (
        <section className="py-8 px-8 lg:py-20">
            <div className="container mx-auto text-center">
                <ScrollAnimation animation="fadeIn">
                    <Typography variant="h6" color="blue-gray" className="mb-8" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        NUESTROS SOCIOS
                    </Typography>
                </ScrollAnimation>
                <div className="flex flex-wrap items-center justify-center gap-6">
                    {SPONSORS.map((logo, key) => (
                        <ScrollAnimation key={key} animation="zoomIn">
                            <Image
                                width={256}
                                height={256}
                                src={`/logos/logo-${logo}.svg`}
                                alt={logo}
                                className="w-40"
                            />
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQS: FaqInfo[] = [
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

export const Faq: React.FC = () => {
    const [open, setOpen] = React.useState<number>(0);
    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    return (
        <section id="faq" className="py-8 px-8 lg:py-20">
            <div className="container mx-auto">
                <ScrollAnimation animation="fadeIn">
                    <div className="text-center">
                        <Typography variant="h1" color="blue-gray" className="mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            Preguntas Frecuentes
                        </Typography>
                        <Typography variant="lead" className="mx-auto mb-24 lg:w-3/5 !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            Aquí encontrarás respuestas a las preguntas más comunes sobre cómo funciona Chizu,
                            cómo aprovechar sus herramientas y cómo aseguramos una experiencia confiable para desarrolladores y jugadores.
                            ¡Descubre todo lo que necesitas saber aquí! 😊
                        </Typography>
                    </div>
                </ScrollAnimation>

                <div className="mx-auto lg:max-w-screen-lg lg:px-20">
                    {FAQS.map(({ title, desc }, key) => (
                        <ScrollAnimation key={key} animation="fadeIn">
                            <Accordion open={open === key + 1} onClick={() => handleOpen(key + 1)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <AccordionHeader className="text-left text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    {title}
                                </AccordionHeader>
                                <AccordionBody>
                                    <Typography color="blue-gray" className="font-normal text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        {desc}
                                    </Typography>
                                </AccordionBody>
                            </Accordion>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const Slider: React.FC = () => {
    return <ScrollAnimation animation="fadeIn">
        <div className="flex flex-col sm:flex-row gap-4 mt-0 items-center justify-center mb-2">
            <Link href='/products' className={buttonVariants()}>
                Explorar Catalogo &rarr;
            </Link>
        </div>
        <div className="container mx-auto flex flex-col items-center px-4 py-10 scroll-mt-10">
            <ProductReel
                key={1}
                title={'Chizu Selected'}
                subtitle={'Nuestros favoritos del momento.'}
                href={`/products?category=Chizu Selected`}
                query={{ sort: 'desc', limit: 4, category: ["Chizu Selected"] }} />
        </div>
    </ScrollAnimation>
};
