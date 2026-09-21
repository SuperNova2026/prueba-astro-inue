import type { ImageMetadata } from "astro";

import logo7Eleven from "../assets/images/institutions/logo-7-eleven.svg";
import logoBecerra from "../assets/images/institutions/logo-becerra.svg";
import logoBruma from "../assets/images/institutions/logo-bruma.svg";
import logoCaracolbc from "../assets/images/institutions/logo-caracolbc.svg";
import logoCarrodilla from "../assets/images/institutions/logo-carrodilla.webp";
import logoCetys from "../assets/images/institutions/logo-cetys.svg";
import logoCoparmex from "../assets/images/institutions/logo-coparmex.svg";
import logoCoral from "../assets/images/institutions/logo-coral.webp";
import logoDifEnsenada from "../assets/images/institutions/logo-dif-ensenada.svg";
import logoDonTomas from "../assets/images/institutions/logo-don-tomas.webp";
import logoElCielo from "../assets/images/institutions/logo-el-cielo.svg";
import logoFender from "../assets/images/institutions/logo-fender.svg";
import logoImjuvens from "../assets/images/institutions/logo-imjuvens.svg";
import logoLaRuta from "../assets/images/institutions/logo-la-ruta.svg";
import logoMagoni from "../assets/images/institutions/logo-magoni.svg";
import logoMonteXanic from "../assets/images/institutions/logo-monte-xanic.svg";
import logoPampas from "../assets/images/institutions/logo-pampas.svg";
import logoRoganto from "../assets/images/institutions/logo-roganto.svg";
import logoSantoTomas from "../assets/images/institutions/logo-santo-tomas.svg";
import logoSat from "../assets/images/institutions/logo-sat.svg";
import logoSepsa from "../assets/images/institutions/logo-sepsa.svg";
import logoValmar from "../assets/images/institutions/logo-valmar.svg";
import logoVyva from "../assets/images/institutions/logo-vyva.svg";
import logoZoologicoNino from "../assets/images/institutions/logo-zoologico-nino.svg";

export interface Partner {
    slug: string;
    alt: string;
    image: ImageMetadata;
}

// Carrusel hacia la izquierda
export const partnersTop: Partner[] = [
    { slug: "7-eleven", alt: "7-Eleven", image: logo7Eleven },
    { slug: "becerra", alt: "Becerra", image: logoBecerra },
    { slug: "bruma", alt: "Bruma", image: logoBruma },
    { slug: "caracolbc", alt: "CaracolBC", image: logoCaracolbc },
    { slug: "carrodilla", alt: "Carrodilla", image: logoCarrodilla },
    { slug: "cetys", alt: "CETYS", image: logoCetys },
    { slug: "coparmex", alt: "Coparmex", image: logoCoparmex },
    { slug: "coral", alt: "Coral", image: logoCoral },
    { slug: "dif-ensenada", alt: "DIF Ensenada", image: logoDifEnsenada },
    { slug: "don-tomas", alt: "Don Tomás", image: logoDonTomas },
    { slug: "el-cielo", alt: "El Cielo", image: logoElCielo },
    { slug: "fender", alt: "Fender", image: logoFender },
];

// Carrusel hacia la derecha
export const partnersBottom: Partner[] = [
    { slug: "imjuvens", alt: "IMJUVENS", image: logoImjuvens },
    { slug: "la-ruta", alt: "La Ruta", image: logoLaRuta },
    { slug: "magoni", alt: "Magoni", image: logoMagoni },
    { slug: "monte-xanic", alt: "Monte Xanic", image: logoMonteXanic },
    { slug: "pampas", alt: "Pampas", image: logoPampas },
    { slug: "roganto", alt: "Roganto", image: logoRoganto },
    { slug: "santo-tomas", alt: "Santo Tomás", image: logoSantoTomas },
    { slug: "sat", alt: "SAT", image: logoSat },
    { slug: "sepsa", alt: "Sepsa", image: logoSepsa },
    { slug: "valmar", alt: "Valmar", image: logoValmar },
    { slug: "vyva", alt: "Vyva", image: logoVyva },
    { slug: "zoologico-nino", alt: "Zoológico del Niño", image: logoZoologicoNino },
];