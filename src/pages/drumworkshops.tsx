import React, { useRef } from "react";

import type { HeadFC, PageProps } from "gatsby";

import { useSiteMetadata } from "../hooks/use-site-metadata";

import Breadcrumbs from "../components/layout/breadcrumbs";
import Hero from "../components/layout/heroslider";

import RegisterForm, { handleClick } from "../components/forms/registerForm";

import { Seo } from "../components/seo";

import * as styles from "../styles/modules/pages/workshop.module.scss";

const Drumworkshops: React.FC<PageProps> = () => {
    const { email, mobileRaw } = useSiteMetadata();

    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Drumworkshops" },
    ];

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <Hero />
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Drumworkshops</h1>
            </section>
            <section data-main-section>
                <div className={styles.workshopContainer}>
                    <RegisterForm inputRef={inputRef} />
                    <div data-main-content className={styles.workshopInfo}>
                        <p>
                            <strong>
                                Muziekeducatie vormt een goede basis voor de
                                ontwikkeling van een kind.
                            </strong>{" "}
                            Momenteel verzorgen wij drumlessen op het{" "}
                            <a
                                href="https://www.orioncollegezuidoost.nl"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Orion College
                            </a>{" "}
                            in Amsterdam Zuidoost, als vast onderdeel van het
                            onderwijspakket. Speciaal voor kinderen en jongeren
                            verzorgen wij ook drumworkshops na schooltijd in
                            Amsterdam Zuidoost.
                        </p>

                        <p>
                            <b>
                                Voor slechts 45,- euro per maand kan je 1x in de
                                week bij ons drumlessen volgen.
                            </b>{" "}
                            Je leert bij ons niet alleen het spelen van
                            Afrikaanse, Afro-Caribische en Afro-Surinaamse
                            ritmes, maar ook het lezen van muzieknoten voor
                            percussie instrumenten. Per drumles zijn er 2
                            docenten aanwezig die ervoor zorgen dat ieder kind
                            voldoende aandacht krijgt. Alles wat de leerlingen
                            hebben geleerd zullen zij laten zien tijdens een
                            presentatie op één van de publieksevenementen in
                            Amsterdam Zuidoost.
                        </p>

                        <p>
                            <u>Voor wie</u> <br />
                            Jongens en meisjes
                        </p>

                        <p>
                            <u>Leeftijd</u> <br />6 t/m 12 of 13 t/m 18
                        </p>

                        <p>
                            <u>Beginners</u> <br />
                            Dinsdagavond
                        </p>

                        <p>
                            <u>Gevorderden</u> <br />
                            Woensdagavond
                        </p>

                        <p>
                            Meld jezelf of jouw kind nu direct aan via het{" "}
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

                        <p>
                            Wij zijn nu <b>intermediair</b> van het{" "}
                            <a
                                href="https://jeugdfondssportencultuur.nl/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Jeugdfonds
                            </a>{" "}
                            en kunnen daardoor zelf aanvragen doen voor lesgeld
                            namens ouders die daarvoor in aanmerking komen. Zo
                            kunnen wij direct ondersteuning bieden en regelingen
                            treffen via het Jeugdfonds aan kinderen die graag
                            willen deelnemen aan onze activiteiten, maar waarbij
                            financiële drempels een obstakel vormen.
                        </p>

                        <p>
                            Voor vragen omtrent deze regeling kan je telefonisch
                            contact met ons opnemen.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Drumworkshops;

export const Head: HeadFC = () => (
    <Seo
        title="Drumworkshops"
        pathname="/drumworkshops/"
        description="Ontdek onze drumworkshops in Amsterdam Zuidoost voor kinderen en jongeren. Leer diverse ritmes en noten spelen, met optredens op lokale evenementen."
    />
);
