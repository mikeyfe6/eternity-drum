import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { StaticImage } from "gatsby-plugin-image";

import Breadcrumbs from "../components/layout/breadcrumbs";

import { Seo } from "../components/seo";
import { Link } from "@reach/router";

const OverOns: React.FC<PageProps> = () => {
    const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Over Ons" }];

    return (
        <>
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Over Ons</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content image-right">
                    <div>
                        <h2>Over Eternity Percussion</h2>
                        <p>
                            Eternity Percussion is een professioneel producerende culturele organisatie in Amsterdam
                            Zuidoost. Vanuit onze Afro-Caribische roots verbinden we artistieke kwaliteit,
                            talentontwikkeling, cultureel erfgoed en maatschappelijke impact.
                        </p>
                        <p>
                            Al bijna 25 jaar creëert Eternity ruimte voor muziek, makers en talent. Wat begon vanuit de
                            Afro-Caribische drumbandcultuur heeft zich ontwikkeld tot een brede culturele organisatie
                            die professionele podiumproducties realiseert, talent ontwikkelt, festivals en evenementen
                            organiseert, cultuureducatie verzorgt en samenwerkt met culturele partners in Nederland en
                            daarbuiten.
                        </p>

                        <h3>Onze missie</h3>
                        <p>
                            Eternity wil Afro-Caribische muziek, percussie en cultureel erfgoed zichtbaar, toegankelijk
                            en toekomstbestendig maken. We creëren mogelijkheden voor nieuwe generaties om hun
                            artistieke talent te ontdekken en te ontwikkelen en brengen makers, musici, publiek en
                            gemeenschappen met elkaar in verbinding.
                        </p>
                        <p>
                            Artistieke ontwikkeling en persoonlijke groei gaan daarbij hand in hand. Muziek is voor ons
                            niet alleen een kunstvorm, maar ook een krachtig middel voor ontmoeting, identiteit,
                            samenwerking en verbinding.
                        </p>

                        <h3>Wat we doen</h3>
                        <p>
                            Eternity ontwikkelt, produceert en presenteert activiteiten en programma's op het gebied
                            van:
                        </p>
                        <ul>
                            <li>professionele muziek- en podiumproducties;</li>
                            <li>talentontwikkeling en begeleiding van makers;</li>
                            <li>Southeast Drum Academy (SEDA);</li>
                            <li>cultuureducatie en muziekonderwijs;</li>
                            <li>Bijlmer Drum Festival en culturele evenementen;</li>
                            <li>Afro-Caribisch cultureel erfgoed;</li>
                            <li>internationale samenwerking en coproducties;</li>
                            <li>community- en participatieprojecten;</li>
                        </ul>

                        <h3>Southeast Drum Academy</h3>
                        <p>
                            Vanuit <Link to="/seda/">Southeast Drum Academy (SEDA)</Link> in Amsterdam Zuidoost bouwen
                            we samen met andere drumbandgroepen, makers en partners aan een duurzame plek voor
                            repetitie, talentontwikkeling, kennisoverdracht en artistieke ontwikkeling. SEDA heeft de
                            ambitie zich verder te ontwikkelen tot een landelijk expertisecentrum voor Afro-Caribische
                            percussie en immaterieel cultureel erfgoed.
                        </p>

                        <h3>Van Zuidoost naar internationaal</h3>
                        <p>
                            Amsterdam Zuidoost vormt onze thuisbasis, maar onze blik reikt verder. Eternity werkt samen
                            met makers en culturele organisaties in Nederland en internationaal. Door artistieke
                            uitwisseling, coproducties en internationale presentaties creëren we nieuwe verbindingen
                            tussen Afro-Caribische cultuur, hedendaagse podiumkunst en verschillende gemeenschappen.
                        </p>
                    </div>
                    <div>
                        <StaticImage src="../images/over-ons.jpg" alt={`Over ons`} width={600} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default OverOns;

export const Head: HeadFC = () => (
    <Seo
        title="Over Ons"
        pathname="/over-ons/"
        description="Ontdek Eternity, een culturele instelling die zich richt op talentontwikkeling en cultuurparticipatie van jongeren door muziekeducatie en Caribische drumstijlen. We bieden programma's voor muzikale vaardigheden, organiseren drumshows en stimuleren samenwerking tussen jonge artiesten en gevestigde instellingen. Onze doelgroep omvat kinderen, jongeren en liefhebbers van Caribische muziek."
    />
);
