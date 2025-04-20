import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { useSrcImages } from "../../hooks/use-src-image";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

import LightBox from "../../components/plugins/lightbox";

import { Seo } from "../../components/seo";

const Umuntu: React.FC<PageProps> = () => {
    const { umuntuF, umuntuB } = useSrcImages();

    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Theater", link: "/theater/" },
        { label: "Umuntu" },
    ];

    return (
        <>
            <Hero />
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Umuntu</h1>
            </section>

            <section data-main-section>
                <div data-main-content className="page-content basic big-image">
                    <div>
                        <h2>Theatervoorstelling: "Umuntu"</h2>
                        <p>
                            Umuntu is een muzikale theatervoorstelling over de
                            impact van hedendaagse muzikale iconen op de
                            ontwikkeling van een groep jongemannen op weg naar
                            hun man zijn. Umuntu is een samenstelling van de
                            kunstdisciplines muziek, dans en spel waarbij de
                            spelers werden begeleid en gecoacht door
                            professioneel muzikant en arrangeur Orlando Ceder en
                            regisseur en acteur Yahmani Blackman.
                        </p>
                        <p>
                            Een groep jongeren gaat op zoek naar verschillende
                            rituelen dat leidt naar hun mannelijkheid. Ze
                            gebruiken hun passie voor muziek als middel om dit
                            te bewerkstelligen. Umuntu betekent man in het
                            Zuid-Afrikaans en gaat over een groep jongens die
                            hun Rite of Passage doorlopen. Welke elementen en
                            personen hebben zij nodig om succesvol te zijn in
                            het leven. Welke situaties zijn er die voor
                            blokkades/obstakels kunnen zorgen. En welke tools
                            zijn er nodig om deze hiaten te overwinnen om weer
                            het pad naar succes voort te zetten. Daarbij moet je
                            altijd in staat zijn als succesvolle jongeman om een
                            legacy achter te laten voor de volgende generatie.
                            Dit is ook een op een te weerleggen als het gaat om
                            vader en zoon relatie of vaderlijke rol die een
                            persoon ten opzichte van een jongeman inneemt.
                        </p>
                    </div>
                    <div>
                        <LightBox
                            image={umuntuF}
                            alt="Summerschool 2020 Flyer"
                        />
                        <LightBox
                            image={umuntuB}
                            alt="Sankofa Flyer Voorkant"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Umuntu;

export const Head: HeadFC = () => (
    <Seo title="Umuntu" pathname="/theater/umuntu/" />
);
