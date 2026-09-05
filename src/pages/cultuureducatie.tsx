import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { useSiteMetadata } from "../hooks/use-site-metadata";

import Breadcrumbs from "../components/layout/breadcrumbs";

import { Seo } from "../components/seo";

const CultuurEducatie: React.FC<PageProps> = () => {
    const { email } = useSiteMetadata();

    const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Cultuureducatie" }];

    return (
        <>
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Cultuureducatie</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content center">
                    <h2>Cultuureducatie</h2>
                    <p>
                        <strong>Eternity Percussion</strong> maakt Afro-Caribische muziek, percussie en cultureel
                        erfgoed toegankelijk voor kinderen en jongeren. Met onze muziek- en cultuurprogramma’s verbinden
                        we muziekonderwijs aan talentontwikkeling, creativiteit, samenwerking en persoonlijke groei.
                    </p>

                    <h3>Leren door muziek en cultuur</h3>

                    <p>
                        Binnen onze programma’s ontwikkelen kinderen en jongeren hun muzikale vaardigheden en krijgen
                        zij ruimte om hun eigen talent en creativiteit te ontdekken. Afhankelijk van het programma
                        werken deelnemers toe naar een presentatie of optreden. Deelnemers die zich verder willen
                        ontwikkelen, kunnen doorstromen naar talentontwikkelingstrajecten van Eternity.
                    </p>

                    <p>
                        Eternity werkt hierbij samen met scholen, culturele organisaties en maatschappelijke partners in
                        Amsterdam Zuidoost en daarbuiten.
                    </p>

                    <h3>Cultuureducatie op school</h3>

                    <p>
                        Eternity ontwikkelt en verzorgt lessen, workshops en muziek- en cultuurprogramma’s voor het
                        primair, voortgezet en speciaal onderwijs. De inhoud kan worden afgestemd op de leeftijd, het
                        niveau en de leerdoelen van de leerlingen en de school. Zo verzorgt Eternity onder andere
                        muziekeducatie binnen het{" "}
                        <a href="https://www.orioncollegezuidoost.nl" rel="noopener noreferrer" target="_blank">
                            Orion College
                        </a>{" "}
                        in Amsterdam Zuidoost.
                    </p>

                    <h3>Samenwerken met Eternity?</h3>

                    <p>
                        Scholen en organisaties die geïnteresseerd zijn in een workshop, lessenreeks of muziek- en
                        cultuurprogramma kunnen contact opnemen via{" "}
                        <a href={`mailto:${email}`} rel="noopener noreferrer" target="_blank">
                            {email}
                        </a>
                        .
                    </p>
                </div>
            </section>
        </>
    );
};

export default CultuurEducatie;

export const Head: HeadFC = () => (
    <Seo
        title="Cultuureducatie"
        pathname="/cultuureducatie/"
        description="Ontdek Eternity's cultuureducatie: educatieve en naschoolse drumworkshops in Amsterdam. Talentontwikkeling en optredens met professionele drumband."
    />
);
