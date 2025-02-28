import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";
import { StaticImage, getSrc } from "gatsby-plugin-image";

import { useSiteMetadata } from "../hooks/use-site-metadata";
import { useSrcImages } from "../hooks/use-src-image";

import Breadcrumbs from "../components/layout/breadcrumbs";
import Hero from "../components/layout/heroslider";

import { Seo } from "../components/seo";

const Seda: React.FC<PageProps> = () => {
    const { email, visitingAddress, visitingPostalCode } = useSiteMetadata();

    const breadcrumbs = [{ label: "Home", link: "/" }, { label: "SEDA" }];

    return (
        <>
            <Hero />
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Seda</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content basic seda">
                    <div>
                        <h2>
                            Ontdek de Magie van Ritme bij de Southeast Drum
                            Academy!
                        </h2>
                        <p>
                            Welkom bij de <u>Southeast Drum Academy</u> (SEDA),
                            waar we met trots onze oefenruimte en kleedkamers
                            presenteren. De magische klanken van Eternity
                            nodigen alle drumgroepen uit, die op zoek zijn naar
                            een inspirerende repetitieruimte voor hun wekelijkse
                            muziekavonturen.
                        </p>
                        <p>
                            <strong>
                                Samen Groeien - Een Nieuwe Wereld van
                                Samenwerking
                            </strong>
                        </p>
                        <p>
                            SEDA is een broedplaats van samenwerking en
                            gemeenschap. We zijn verheugd om nieuwe
                            partnerschappen te verwelkomen en onze positie als
                            sprankelend merk in de muzikale wereld te
                            versterken. Of je nu een bestaande muziekgroep leidt
                            of deel uitmaakt van een percussiegroep, bij SEDA
                            ben je van harte welkom om te genieten van onze
                            uitstekende faciliteiten. Onder het gepassioneerde
                            leiderschap van de artistiek directeur, Orlando
                            Ceder, werken we hard om deze creatieve hub te laten
                            floreren.
                        </p>
                        <p>
                            Onze locatie is niet te missen:{" "}
                            <a
                                href="https://maps.app.goo.gl/MGox9UBh15DWsfLg8"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {visitingAddress}
                            </a>
                            , {visitingPostalCode}, gelegen in een opvallende
                            paarse container onder het metrostation Kraaiennest
                            in Amsterdam Zuidoost.
                        </p>
                        <p>
                            Wil je meer weten over de verhuurmogelijkheden? Neem
                            dan contact met ons op via onze e-mail;{" "}
                            <a
                                href={`mailto:${email}`}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {email}
                            </a>
                            .
                        </p>
                    </div>
                    <div>
                        <StaticImage
                            src="../images/seda-logo.jpg"
                            alt={`Seda`}
                            width={475}
                        />
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
            title="Seda"
            pathname="/seda/"
            image={imageUrl}
            description="Ontdek de inspirerende oefenruimtes van Southeast Drum Academy (SEDA), een plek voor drumgroepen op hun muzikale reis. Onder artistiek directeur Orlando Ceder bloeit samenwerking en gemeenschap op. Gevestigd onder metrostation Kraaiennest in Amsterdam Zuidoost, op Kruitbergstraat 18, 1104 CH."
        />
    );
};
