import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";
import { StaticImage, getSrc } from "gatsby-plugin-image";

import { useSrcImages } from "../../hooks/use-src-image";

import { Seo } from "../../components/seo";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

const KwasiEnYaw: React.FC<PageProps> = () => {
    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Theater", link: "/theater/" },
        { label: "Kwasi & Yaw" },
    ];

    return (
        <>
            <Hero />
            <section className="page-intro">
                <Breadcrumbs crumbs={breadcrumbs} />
                <h1 className="page-title">Kwasi & Yaw</h1>
            </section>
            <section data-main-section>
                <div data-main-content className="page-content basic">
                    <div>
                        <h2>Theatervoorstelling: "Kwasi & Yaw"</h2>
                        <p>
                            <strong>Kwasi en Yaw</strong> gaat over het zoeken
                            naar voorouderlijke krachten. Yaw komt vanuit Afrika
                            door slavernij in het heden, maar ontkent zijn
                            achtergrond. In de nacht wordt hij geplaagd door
                            beelden uit het verleden, maar hij ziet niet hoe hij
                            in reine kan komen met zichzelf. Lukt het Yaw om
                            zich te openen voor de waarheid over zijn culturele
                            wortels en zijn achtergrond te omarmen? Een
                            voorstelling over de kracht van spiritualiteit,
                            waarbij Afrikaanse dans en percussie een belangrijke
                            rol spelen.
                        </p>
                        <p>
                            De voorstelling Kwasi en Yaw wordt geproduceerd door
                            stichting Eternity Percussion. Eternity is een
                            culturele instelling die zich bezighoudt met
                            activiteiten, projecten en evenementen op het gebied
                            van muzikale vorming en performance.
                        </p>

                        <h4>Extra info</h4>
                        <p>
                            Uit onderzoek is gebleken, dat veel van de
                            Afrikaanse Surinaamse slaafgemaakten zijn
                            geëxporteerd vanaf het West-Afrikaanse gebied van de
                            Akan, dat tegenwoordig bekend is onder de namen
                            zoals Ghana, Benin, Ivoorkust, Togo etc. De
                            slaafgemaakten hadden de gewoonte om hun kinderen
                            namen te geven, die afhankelijk zijn van de dag
                            waarop ze zijn geboren. Kwasi is de naam die hoort
                            bij zondag als geboortedag en Yaw bij de donderdag.
                        </p>

                        <h4>Credits</h4>
                        <ul>
                            <li>
                                <b>Makers:</b> Derillio Alexander en Revelino
                                Pinas
                            </li>
                            <li>
                                <b>Cast:</b> Derillio Alexander, Revelino Pinas,
                                Denzil Tromp, Miquel Nelom, Pape Matar Fall en
                                Yeshua
                            </li>
                            <li>
                                <b>Dans (Untold):</b> Kleber Pique, Daphne
                                Scheerlink, Nerissa Macnack, Esperanza Anches en
                                Jaleesa Gefferie
                            </li>
                            <li>
                                <b>Coach muzikaal arrangeur:</b> Orlando Ceder
                            </li>
                            <li>
                                <b>Regie:</b> Tati Wirahadiraksa
                            </li>
                        </ul>
                    </div>
                    <div>
                        <StaticImage
                            src="../../images/theater/kwasi-en-yaw.jpg"
                            alt={`Kwasi & Yaw`}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default KwasiEnYaw;

export const Head: HeadFC = () => {
    const { kwasiAndYaw } = useSrcImages();

    const imageUrl = getSrc(kwasiAndYaw);

    return (
        <Seo
            title="Kwasi & Yaw"
            pathname="/theater/kwasi-en-yaw/"
            image={imageUrl}
            description="Ontdek 'Kwasi & Yaw', een krachtige theatervoorstelling over de zoektocht naar Afrikaanse roots en spirituele erfenis, ondersteund door betoverende dans en percussie."
        />
    );
};
