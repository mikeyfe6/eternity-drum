import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import Breadcrumbs from "../../components/layout/breadcrumbs";

import { Seo } from "../../components/seo";

const Slavernijverleden: React.FC<PageProps> = () => {
    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Over Ons", link: "/over-ons/" },
        { label: "Slavernijverleden" },
    ];

    return (
        <>
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Slavernijverleden</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content center">
                    <h2>Afro-Caribisch erfgoed & slavernijverleden</h2>
                    <h3>De muziek vertelt ook onze geschiedenis</h3>
                    <p>
                        Afro-Caribische muziek en percussie dragen verhalen, tradities en kennis over van generatie op
                        generatie. Deze muzikale tradities zijn verbonden met de geschiedenis van mensen van Afrikaanse
                        afkomst in Suriname, het Caribisch gebied en Nederland. Daarbij kunnen het trans-Atlantisch
                        slavernijverleden en de doorwerking daarvan in het heden niet los worden gezien van de
                        ontwikkeling en betekenis van dit cultureel erfgoed. Eternity Percussion zet zich in om
                        Afro-Caribische muziek, percussie en cultureel erfgoed zichtbaar, toegankelijk en levend te
                        houden. Vanuit onze muzikale en culturele roots creëren we ruimte voor kennisoverdracht,
                        artistieke ontwikkeling en ontmoeting tussen generaties.
                    </p>

                    <h3>Erfgoed in beweging</h3>
                    <p>
                        Voor Eternity is erfgoed niet alleen iets uit het verleden. Het leeft voort in muziek, ritmes,
                        verhalen, gebruiken en in de manier waarop nieuwe generaties hun identiteit en creativiteit
                        vormgeven. Via onze podiumproducties, cultuureducatie, talentontwikkeling, workshops en
                        activiteiten binnen Southeast Drum Academy (SEDA) maken kinderen, jongeren, makers en publiek
                        kennis met Afro-Caribische muziek- en percussietradities en de verhalen en geschiedenis die
                        daarmee verbonden zijn. Ook in onze artistieke producties onderzoeken we thema's als identiteit,
                        voorouders, culturele wortels, geschiedenis en de verbinding tussen generaties. Producties als
                        Muziki en Kwasi & Yaw laten zien hoe muziek en podiumkunst kunnen bijdragen aan het vertellen,
                        onderzoeken en doorgeven van deze verhalen.
                    </p>
                    <h3>Kennis, bewustwording en verbinding</h3>
                    <p>
                        Door cultureel erfgoed niet alleen te bewaren, maar vooral te spelen, delen, onderzoeken en
                        doorgeven, wil Eternity bijdragen aan meer kennis en bewustwording over het trans-Atlantisch
                        slavernijverleden en de doorwerking daarvan in het heden. Daarbij kijken we niet alleen terug.
                        We bouwen voort op wat eerdere generaties hebben doorgegeven en creëren ruimte voor nieuwe
                        makers, nieuwe verhalen en nieuwe vormen van Afro-Caribische podiumkunst. Zo blijft erfgoed in
                        beweging en wordt geschiedenis verbonden met het heden en de toekomst.
                    </p>
                </div>
            </section>
        </>
    );
};

export default Slavernijverleden;

export const Head: HeadFC = () => (
    <Seo
        title="Slavernijverleden"
        pathname="/over-ons/slavernijverleden/"
        description="Eternity onderzoekt het Afro-Caribische erfgoed en het trans-Atlantisch slavernijverleden via muziek, percussie en podiumkunst, en brengt de verhalen van geschiedenis, identiteit en verbinding levend naar het heden."
    />
);
