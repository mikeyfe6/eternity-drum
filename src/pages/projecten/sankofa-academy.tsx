import React, { useRef } from "react";

import type { HeadFC, PageProps } from "gatsby";
import { getSrc } from "gatsby-plugin-image";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import { useSrcImages } from "../../hooks/use-src-image";

import { Seo } from "../../components/seo";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

import RegisterForm, { handleClick } from "../../components/forms/registerForm";

import LightBox from "../../components/plugins/lightbox";

import * as styles from "../../styles/modules/pages/workshop.module.scss";

const SankofaAcademy: React.FC<PageProps> = () => {
    const { email, mobileRaw } = useSiteMetadata();
    const { sankofaB, sankofaF } = useSrcImages();

    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Projecten", link: "/projecten/" },
        { label: "Sankofa Academy" },
    ];

    const inputRef = useRef<HTMLInputElement>(null);

    const sankofaBack = sankofaB;
    const sankofaFront = sankofaF;

    return (
        <>
            <Hero />
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Projecten</h1>
            </section>
            <section data-main-section>
                <div className={styles.workshopBgImage} />

                <div className={styles.workshopContainer}>
                    <RegisterForm inputRef={inputRef} />
                    <div data-main-content className={styles.workshopInfo}>
                        <p>
                            <strong>Sankofa Academy</strong> is een educatief
                            programma in het kader van een gedeelde geschiedenis
                            om mensen van Afrikaanse afkomst te leren over hun
                            eigen geschiedenis en de maatschappelijke gevolgen
                            hiervan. Middels het organiseren van
                            ontmoetingsactiviteiten is Eternity Percussion bezig
                            met het bijdragen aan het empoweren en emanciperen
                            van Afrikaanse-Nederlandse groepen door middels van
                            verschillende educatieve activiteiten.
                        </p>

                        <hr />
                        <div className={styles.workshopImages}>
                            <LightBox
                                image={sankofaBack}
                                alt="Sankofa Flyer Achterkant"
                            />
                            <LightBox
                                image={sankofaFront}
                                alt="Sankofa Flyer Voorkant"
                            />
                        </div>
                        <hr />

                        <p>
                            De onderwerpen gedurende dit programma gaat over de
                            Trans-Atlantische slavernij, kolonialisme en de
                            historische periodes die van belang zijn geweest
                            voor de opbouw van de huidige samenleving. Door dit
                            soort onderwerpen aan te kaarten en met elkaar in
                            gesprek te gaan versterkt dit de identiteit van de
                            deelnemers, bewustwording en hun positie binnen de
                            Nederlandse samenleving.
                        </p>

                        <p>
                            Ook leren de verschillende publieksgroepen elkaar
                            hierdoor te respecteren er wordt wederzijds begrip
                            naar elkaar geuit wat kan leiden tot sociale cohesie
                            en verbroedering onder elkaar. Dit project is in het
                            kader van de afschaffing van de Trans-Atlantische
                            slavernij door Nederland in Suriname en de
                            voormalige Nederlandse Antillen. Dit project is in
                            samenwerking met{" "}
                            <a
                                href="https://untold.nl"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Untold Empowerment
                            </a>
                            .
                        </p>

                        <p>
                            <u>Voor wie</u>
                            <br />
                            Tieners, jongeren & volwassenen
                        </p>

                        <p>
                            <u>Leeftijd</u>
                            <br />
                            Vanaf 13 jaar en ouder
                        </p>

                        <p>
                            <u>Beginners</u>
                            <br />
                            Dinsdagavond
                        </p>

                        <p>
                            <u>Gevorderden</u>
                            <br />
                            Woensdagavond
                        </p>

                        <p>
                            <u>Planning</u>
                            <br />
                            Wordt via onze social media kanalen bekend gemaakt
                        </p>

                        <p>
                            <u>Kosten</u>
                            <br />
                            Gratis
                        </p>

                        <p>
                            Meld jezelf of uw kind nu direct aan via het{" "}
                            <a
                                href="#"
                                onClick={(event) =>
                                    handleClick(inputRef, event)
                                }
                            >
                                online inschrijfformulier
                            </a>
                            , via de mail{" "}
                            <a
                                href={`mailto:${email}`}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {email}
                            </a>{" "}
                            of telefonisch via{" "}
                            <a
                                href={`tel:+${mobileRaw}`}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                06 242 55 391
                            </a>
                            .
                        </p>

                        <p>
                            Ben je niet ouder dan 18 jaar? Vraag dan even
                            toestemming aan jouw ouders.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SankofaAcademy;

export const Head: HeadFC = () => {
    const { sankofaF } = useSrcImages();

    const imageUrl = getSrc(sankofaF);

    return (
        <Seo
            title="Sankofa Academy"
            pathname="/projecten/sankofa-academy/"
            image={imageUrl}
            description="Ontdek Sankofa Academy: empower en emancipeer mensen van Afrikaanse afkomst. Leer over gedeelde geschiedenis, identiteit en bewustzijn."
        />
    );
};
