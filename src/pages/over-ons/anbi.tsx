import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { Link } from "gatsby";

import { useSiteMetadata } from "../../hooks/use-site-metadata";

import Breadcrumbs from "../../components/layout/breadcrumbs";

import { Seo } from "../../components/seo";

const Anbi: React.FC<PageProps> = () => {
    const { email, mailingAddress, mailingPostalCode, visitingAddress, visitingPostalCode, kvk, siteUrl } =
        useSiteMetadata();

    const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Over Ons", link: "/over-ons/" }, { label: "ANBI" }];

    return (
        <>
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">ANBI</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content center">
                    <h2>Over onze ANBI Status</h2>

                    <p>
                        Stichting Eternity Percussion is door de Belastingdienst erkend als een Culturele Algemeen Nut
                        Beogende Instelling (ANBI). Als professionele culturele organisatie zet Eternity zich in voor de
                        ontwikkeling, productie en presentatie van muziek- en podiumkunstprojecten, talentontwikkeling,
                        cultuureducatie en het behoud van Afro-Caribisch cultureel erfgoed. Transparantie, goed bestuur
                        en maatschappelijke verantwoordelijkheid staan hierbij centraal.
                    </p>

                    <p>
                        Eternity Percussion handelt volgens de Governance Code Cultuur, de Fair Practice Code en de Code
                        Diversiteit & Inclusie. De organisatie investeert in professioneel bestuur, transparantie en een
                        duurzame culturele bedrijfsvoering.
                    </p>

                    <h3 className="as-h4">
                        <u>Algemene gegevens</u>
                    </h3>
                    <p>
                        <b>Naam organisatie:</b> Stichting Eternity Percussion
                        <br />
                        <b>ANBI-status:</b> Culturele Algemeen Nut Beogende Instelling (ANBI)
                        <br />
                        <b>KvK:</b> {kvk}
                        <br />
                        <b>RSIN:</b> 8185.56.286
                        <br />
                        <b>Telefoon:</b> 020 22 17 675
                        <br />
                        <b>E-mail:</b> {email}
                        <br />
                        <b>Website:</b> {siteUrl}
                        <br />
                    </p>

                    <p>
                        <b>Bezoekadres:</b> {visitingAddress}
                        <br />
                        <b>Postcode:</b> {visitingPostalCode}
                        <br />
                        <b>Plaats:</b> Amsterdam
                    </p>

                    <p>
                        <i>
                            <b>Postadres:</b> {mailingAddress}
                            <br />
                            <b>Postcode:</b> {mailingPostalCode}
                            <br />
                            <b>Plaats:</b> Amsterdam
                        </i>
                    </p>

                    <h3 className="as-h4">
                        <u>Bestuur</u>
                    </h3>
                    <p>Het bestuur van Stichting Eternity Percussion bestaat uit:</p>
                    <ul>
                        <li>
                            Clyde Wartes - <b>Voorzitter</b>
                        </li>
                        <li>
                            Fabian Oudsten - <b>Secretaris</b>
                        </li>
                        <li>
                            Zamaney Menso - <b>Penningmeester</b>
                        </li>
                    </ul>

                    <h3 className="as-h4">
                        <u>Dagelijkse leiding</u>
                    </h3>
                    <p>De dagelijkse leiding van Stichting Eternity Percussion is in handen van:</p>
                    <ul>
                        <li>
                            Orlando Ceder - <b>Artistiek directeur</b>
                        </li>
                        <li>
                            Otmar Watson - <b>Zakelijk leider</b>
                        </li>
                    </ul>
                    <p>
                        De directie is verantwoordelijk voor de dagelijkse aansturing van de organisatie en legt
                        hierover periodiek verantwoording af aan het bestuur.
                    </p>

                    <h3 className="as-h4">
                        <u>Beleidsplan</u>
                    </h3>
                    <p>
                        Stichting Eternity Percussion beschikt over een actueel beleidsplan waarin de missie, visie,
                        strategische doelstellingen en activiteiten voor de beleidsperiode zijn vastgelegd. De
                        hoofdlijnen van het beleid zijn verwerkt in de informatie op deze website. Het volledige
                        beleidsplan is op aanvraag beschikbaar.
                    </p>

                    <h3 className="as-h4">
                        <u>Jaarrekening</u>
                    </h3>
                    <p>
                        Stichting Eternity Percussion publiceert jaarlijks haar financiële verantwoording in het kader
                        van de ANBI-verplichtingen. Hieronder vindt u de meest recente jaarrekening, bestaande uit de
                        balans en de staat van baten en lasten. <br />
                        <br />
                        <a href="/jaarrekening-2024.pdf" rel="noopener noreferrer" target="_blank">
                            Download hier de jaarrekening
                        </a>
                    </p>

                    <h3 className="as-h4">
                        <u>Beloningsbeleid</u>
                    </h3>
                    <p>
                        De bestuursleden van Stichting Eternity Percussion ontvangen geen beloning voor hun
                        werkzaamheden. Zij kunnen uitsluitend aanspraak maken op een vergoeding van daadwerkelijk
                        gemaakte onkosten, zoals reis- en parkeerkosten, conform de statuten en de geldende
                        ANBI-richtlijnen.
                    </p>
                    <p>
                        De artistiek directeur, zakelijk directeur, medewerkers en ingehuurde professionals ontvangen,
                        indien van toepassing, een passende vergoeding die aansluit bij de aard en omvang van hun
                        werkzaamheden en de financiële mogelijkheden van de organisatie. Vrijwilligers ontvangen geen
                        salaris, maar kunnen een onkostenvergoeding ontvangen conform de geldende wettelijke regels.
                    </p>

                    <h3 className="as-h4">
                        <u>Activiteiten</u>
                    </h3>
                    <ul>
                        <li>Muziek- en podiumproducties</li>
                        <li>Talentontwikkeling</li>
                        <li>Cultuureducatie</li>
                        <li>Internationale samenwerking</li>
                        <li>Festivals, workshops en communityprojecten</li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Anbi;

export const Head: HeadFC = () => (
    <Seo
        title="ANBI"
        pathname="/over-ons/anbi/"
        description="Ontdek meer over 'Stichting Eternity Percussion' (ANBI). Leer over onze missie en doelstellingen als organisatie voor muzikale vormingsactiviteiten en evenementen. Ontdek ons platform voor Caribische muziekstijlen, talentontwikkeling en muzikale samenwerking. Krijg inzicht in onze contactgegevens en bestuur."
    />
);
