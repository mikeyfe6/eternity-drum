import React, { useRef } from "react";

import type { HeadFC, PageProps } from "gatsby";

import { useSiteMetadata } from "../hooks/use-site-metadata";

import Breadcrumbs from "../components/layout/breadcrumbs";

import RegisterForm, { handleClick } from "../components/forms/registerForm";

import { Seo } from "../components/seo";

import * as styles from "../styles/modules/pages/workshop.module.scss";

const Drumworkshops: React.FC<PageProps> = () => {
    const { email, mobileRaw } = useSiteMetadata();

    const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Drumworkshops" }];

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Drumworkshops</h1>
            </section>
            <section data-main-section>
                <div className={styles.workshopContainer}>
                    <RegisterForm inputRef={inputRef} />
                    <div data-main-content className={styles.workshopInfo}>
                        <h2 data-main-title>Percussielessen & Workshops</h2>
                        <p>
                            <strong>
                                {" "}
                                Muziek is een krachtig middel voor artistieke en persoonlijke ontwikkeling.
                            </strong>{" "}
                            Eternity Percussion laat kinderen en jongeren kennismaken met Afro-Caribische, Afrikaanse en
                            Afro-Surinaamse ritmes en percussietradities. Daarbij staan muzikaliteit, samenspel,
                            creativiteit, discipline en plezier centraal.
                        </p>

                        <p>
                            Vanuit Southeast Drum Academy (SEDA) verzorgen onze docenten percussielessen, workshops en
                            talentontwikkelingsactiviteiten. Daarnaast werkt Eternity samen met scholen en andere
                            organisaties in Amsterdam Zuidoost op het gebied van cultuureducatie.
                        </p>

                        <p>
                            Tijdens de lessen ontwikkelen deelnemers hun gevoel voor ritme, techniek en samenspel. Zij
                            leren verschillende ritmes en speeltechnieken en maken kennis met muzieknotatie voor
                            percussie. Waar mogelijk werken deelnemers toe naar een presentatie of optreden, zodat zij
                            ook podiumervaring kunnen opdoen.
                        </p>

                        <h3>Lessen</h3>

                        <p>
                            <strong>Leeftijd:</strong>: 6 t/m 18 jaar <br />
                            <strong>Niveau:</strong> beginners en gevorderden <br />
                            <strong>Locatie:</strong> Southeast Drum Academy (SEDA), Amsterdam Zuidoost <br />
                            <strong>
                                Voor actuele lesdagen, tijden en tarieven kun je contact met ons opnemen of je aanmelden
                                via het online inschrijfformulier.
                            </strong>
                        </p>

                        <h3>Cultuureducatie op scholen</h3>

                        <p>
                            Eternity verzorgt ook percussielessen, workshops en culturele programma's binnen het
                            onderwijs. Muziekeducatie wordt daarbij verbonden met talentontwikkeling, samenwerking en
                            kennismaking met Afro-Caribische muziek en cultureel erfgoed.
                        </p>

                        <h3>Meedoen?</h3>

                        <p>
                            Wil je zelf deelnemen of je kind aanmelden? Gebruik het{" "}
                            <a href="#" onClick={(event) => handleClick(inputRef, event)}>
                                online inschrijfformulier
                            </a>
                            , mail naar{" "}
                            <a href={`mailto:${email}`} rel="noopener noreferrer" target="_blank">
                                {email}
                            </a>{" "}
                            of neem telefonisch contact met ons op via{" "}
                            <a href={`tel:+${mobileRaw}`} rel="noopener noreferrer" target="_blank">
                                06 242 55 391
                            </a>
                            .
                        </p>

                        <h3>Jeugdfonds Sport & Cultuur</h3>

                        <p>
                            Eternity Percussion is intermediair voor het{" "}
                            <a href="https://jeugdfondssportencultuur.nl/" rel="noopener noreferrer" target="_blank">
                                Jeugdfonds Sport & Cultuur
                            </a>
                            . Voor gezinnen waarvoor lesgeld een financiële drempel vormt, kunnen wij ondersteunen bij
                            een aanvraag voor een bijdrage aan de deelnamekosten. Neem voor meer informatie contact met
                            ons op.
                        </p>
                        {/* <p>
                            <u>Leeftijd</u> <br />6 t/m 12 of 13 t/m 18
                        </p>

                        <p>
                            <u>Beginners</u> <br />
                            Dinsdagavond
                        </p>

                        <p>
                            <u>Gevorderden</u> <br />
                            Woensdagavond
                        </p> */}

                        {/* <p>
                            Meld jezelf of jouw kind nu direct aan via het{" "}
                            <a href="#" onClick={(event) => handleClick(inputRef, event)}>
                                online inschrijfformulier
                            </a>
                            , via de mail{" "}
                            <a href={`mailto:${email}`} rel="noopener noreferrer" target="_blank">
                                {email}
                            </a>{" "}
                            of telefonisch via{" "}
                            <a href={`tel:+${mobileRaw}`} rel="noopener noreferrer" target="_blank">
                                06 242 55 391
                            </a>
                            .
                        </p>

                        <p>Ben je niet ouder dan 18 jaar? Vraag dan even toestemming aan jouw ouders.</p>

                        <p>
                            Wij zijn nu <b>intermediair</b> van het{" "}
                            <a href="https://jeugdfondssportencultuur.nl/" rel="noopener noreferrer" target="_blank">
                                Jeugdfonds
                            </a>{" "}
                            en kunnen daardoor zelf aanvragen doen voor lesgeld namens ouders die daarvoor in aanmerking
                            komen. Zo kunnen wij direct ondersteuning bieden en regelingen treffen via het Jeugdfonds
                            aan kinderen die graag willen deelnemen aan onze activiteiten, maar waarbij financiële
                            drempels een obstakel vormen.
                        </p>

                        <p>Voor vragen omtrent deze regeling kan je telefonisch contact met ons opnemen.</p> */}
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
