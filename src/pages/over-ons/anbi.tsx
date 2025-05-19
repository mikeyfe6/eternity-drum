import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { Link } from "gatsby";

import { useSiteMetadata } from "../../hooks/use-site-metadata";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

import { Seo } from "../../components/seo";

const Anbi: React.FC<PageProps> = () => {
    const {
        email,
        mailingAddress,
        mailingPostalCode,
        visitingAddress,
        visitingPostalCode,
        kvk,
    } = useSiteMetadata();

    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Over Ons", link: "/over-ons/" },
        { label: "ANBI" },
    ];

    return (
        <>
            <Hero />
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">ANBI</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content center">
                    <h2>Doelstelling: Eternity Percussion</h2>

                    <p>
                        Eternity is een culturele instelling die zich bezighoudt
                        met het organiseren van activiteiten, evenementen en
                        projecten op het gebied van muzikale vorming en
                        performance.
                    </p>

                    <p>
                        <b>De organisatie heeft als doel:</b>
                    </p>

                    <ul>
                        <li>
                            Het bieden van een platform voor drummers die bezig
                            zijn met Caribische muziekstijlen.
                        </li>
                        <li>
                            Het ontwikkelen van trajecten ter bevordering van
                            muzikale vaardigheden.
                        </li>
                        <li>
                            Het programmeren van drumshows bij (semi)
                            professionele podia.
                        </li>
                        <li>
                            Bevorderen van samenwerking tussen zelforganisaties
                            en gevestigde instellingen voor de nodige
                            doorstroming van getalenteerde jongeren.
                        </li>
                    </ul>

                    <h3 className="as-h4">
                        <u>Algemene gegevens</u>
                    </h3>
                    <p>
                        <b>Naam ANBI:</b> STICHTING ETERNITY PERCUSSION
                        <br />
                        <b>Telefoonnummer:</b> 020 22 17 675
                        <br />
                        <b>K.v.K:</b> {kvk}
                        <br />
                        <b>RSIN:</b> 8185.56.286
                        <br />
                        <b>E-mail:</b> {email}
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
                            <b>Postcode: </b> {mailingPostalCode}
                            <br />
                            <b>Plaats:</b> Amsterdam
                        </i>
                    </p>

                    <h3 className="as-h4">
                        <u>Bestuur</u>
                    </h3>
                    <p>
                        <b>Voorzitter:</b> Kenneth Zschuschen
                        <br />
                        <b>Secretaris:</b> Fabian Oudsten
                        <br />
                        <b>Penningmeester:</b> Ulrich Entingh
                    </p>

                    <h3 className="as-h4">
                        <u>Beleidsplan</u>
                    </h3>
                    <p>
                        <Link to="/beleidsplan-2021.pdf">
                            Klik hier voor een overzicht van ons beleidsplan
                        </Link>
                    </p>

                    <h3 className="as-h4">
                        <u>De balans en staat van baten en lasten</u>
                    </h3>
                    <p>
                        <Link to="/baat-lasten-2019.pdf">
                            Klik hier voor een overzicht van de balans en staat
                            van baten en lasten{" "}
                        </Link>
                    </p>

                    <h3 className="as-h4">
                        <u>Beloningsbeleid</u>
                    </h3>
                    <p>
                        <b>Bestuur:</b> alleen onkostenvergoeding; reis- en
                        parkeerkosten. Geen vakantiegeld.
                        <br />
                        <b>Volgens CAO Nederlandse Podia:</b> vrijwilligers,
                        geen beloningsbeleid
                    </p>

                    <h3 className="as-h4">
                        <u>Activiteiten</u>
                    </h3>
                    <ul>
                        <li>Uitwisselingsprogramma’s</li>
                        <li>Theaterproducties</li>
                        <li>Openbare optredens</li>
                        <li>Drumworkshops </li>
                    </ul>

                    <h3 className="as-h4">
                        <u>Financiële verantwoording</u>
                    </h3>

                    <p>
                        Op te vragen via:{" "}
                        <i>Your Accountants & Adviseurs B.V.</i>
                    </p>
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
