import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";
import { StaticImage, getSrc } from "gatsby-plugin-image";

import { useSiteMetadata } from "../hooks/use-site-metadata";
import { useSrcImages } from "../hooks/use-src-image";

import Breadcrumbs from "../components/layout/breadcrumbs";

import { Seo } from "../components/seo";

const Seda: React.FC<PageProps> = () => {
    const { email, visitingAddress, visitingPostalCode } = useSiteMetadata();

    const breadcrumbs = [{ label: "Home", link: "/" }, { label: "SEDA" }];

    return (
        <>
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">SEDA</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content basic seda">
                    <div>
                        <h2>De culturele voorziening voor Afro-Caribische drumbandcultuur in Amsterdam Zuidoost</h2>
                        <p>
                            Southeast Drum Academy (SEDA) is een unieke culturele voorziening in Amsterdam Zuidoost waar
                            Afro-Caribische drumbandgroepen samenkomen om te repeteren, talent te ontwikkelen en kennis
                            en cultuur met elkaar te delen. SEDA is ontstaan vanuit een gezamenlijk initiatief van
                            verschillende drumbandgroepen die al jarenlang behoefte hadden aan een kwalitatieve en
                            permanente repetitieruimte. Door het ontbreken van geschikte oefenlocaties dreigde een
                            belangrijk onderdeel van de Afro-Caribische muziekcultuur onder druk te komen staan.
                        </p>
                        <p>
                            Om deze behoefte te vervullen is de huidige, tijdelijke accommodatie gerealiseerd als eerste
                            stap naar een duurzame culturele voorziening voor de Afro-Caribische drumbandcultuur in
                            Amsterdam. Stichting Eternity Percussion is verantwoordelijk voor het beheer en de
                            exploitatie van SEDA en zorgt ervoor dat de locatie optimaal wordt ingezet als repetitie-,
                            ontwikkel- en ontmoetingsplek voor meerdere drumbandgroepen, culturele organisaties en
                            muzikanten.
                        </p>
                        <p>
                            SEDA is echter méér dan een repetitielocatie. De ambitie is om SEDA de komende jaren verder
                            te ontwikkelen tot een landelijk expertisecentrum voor Afro-Caribische percussie,
                            talentontwikkeling en immaterieel erfgoed. Vanuit deze visie worden drumlessen, workshops,
                            talentontwikkelingstrajecten, cultuureducatieve programma's, artistieke producties en
                            kennisuitwisseling georganiseerd. Hiermee levert SEDA een belangrijke bijdrage aan het
                            behoud, de ontwikkeling en de overdracht van Afro-Caribische muziek- en cultuurtradities aan
                            nieuwe generaties.
                        </p>
                        <p>
                            De huidige locatie vormt een belangrijke tussenfase in deze ontwikkeling. In 2030 staat de
                            realisatie van een permanente, grotere accommodatie gepland. Daarmee ontstaat ruimte om de
                            ambities van SEDA verder te verwezenlijken en uit te groeien tot hét nationale kennis-,
                            ontwikkel- en ontmoetingscentrum voor Afro-Caribische drumbandcultuur, waar artistieke
                            kwaliteit, talentontwikkeling, cultureel erfgoed en maatschappelijke verbinding samenkomen.
                        </p>
                        <h3>Repetitieruimte huren?</h3>
                        <p>
                            SEDA biedt verschillende Afro-Caribische drumbandgroepen de mogelijkheid om gebruik te maken
                            van de repetitieruimtes. Ben je op zoek naar een geschikte locatie voor jouw drumband of wil
                            je meer informatie over de mogelijkheden? Neem dan gerust contact met ons op via{" "}
                            <a href={`mailto:${email}`} rel="noopener noreferrer" target="_blank">
                                {email}
                            </a>
                            .
                        </p>
                        <p>
                            SEDA is niet te missen:{" "}
                            <a
                                href="https://maps.app.goo.gl/MGox9UBh15DWsfLg8"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {visitingAddress}, {visitingPostalCode}
                            </a>
                            , gelegen in een opvallende paarse container onder het metrostation Kraaiennest in Amsterdam
                            Zuidoost.
                        </p>
                    </div>
                    <div>
                        <StaticImage
                            src="../images/seda/feestelijke-opening-seda.jpg"
                            alt={`Feestelijke opening SEDA`}
                            width={475}
                        />
                        <StaticImage
                            src="../images/seda/jonge-seda-huurders.jpeg"
                            alt={`Jonge SEDA huurders`}
                            width={475}
                        />
                        <StaticImage src="../images/seda-logo.jpg" alt={`SEDA Logo`} width={375} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Seda;

export const Head: HeadFC = () => {
    const { seda } = useSrcImages();

    const imageUrl = getSrc(seda);

    return (
        <Seo
            title="SEDA (Southeast Drum Academy)"
            pathname="/seda/"
            image={imageUrl}
            description="Ontdek de inspirerende oefenruimtes van Southeast Drum Academy (SEDA), een plek voor drumgroepen op hun muzikale reis. Onder artistiek directeur Orlando Ceder bloeit samenwerking en gemeenschap op. Gevestigd onder metrostation Kraaiennest in Amsterdam Zuidoost, op Kruitbergstraat 18, 1104 CH."
        />
    );
};
