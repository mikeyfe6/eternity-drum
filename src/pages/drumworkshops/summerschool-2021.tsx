import React from "react";

import type { HeadFC, PageProps } from "gatsby";
import { getSrc } from "gatsby-plugin-image";

import { useSrcImages } from "../../hooks/use-src-image";

import { Seo } from "../../components/seo";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

import LightBox from "../../components/ui/lightbox";

import * as styles from "../../styles/modules/pages/workshop.module.scss";

const SummerschoolSecond: React.FC<PageProps> = () => {
	const { summerschool2021, midzomerlatest } = useSrcImages();

	const breadcrumbs = [
		{ label: "Home", link: "/" },
		{ label: "Drumworkshops", link: "/drumworkshops/" },
		{ label: "Summerschool 2021" },
	];

	return (
		<>
			<Hero />
			<section className="page-intro">
				<Breadcrumbs crumbs={breadcrumbs} />
				<h1 className="page-title">Summerschool 2021</h1>
			</section>
			<section data-main-section>
				<div className={styles.workshopContainer}>
					<div className={styles.workshopVisuals}>
						<LightBox image={summerschool2021} alt="Summerschool 2021 Flyer" />
						<LightBox image={midzomerlatest} alt="Sankofa Flyer Voorkant" />
					</div>
					<div data-main-content className={styles.workshopInfo}>
						<h2>
							PERCUSSIONBAND ETERNITY, UNTOLD EMPOWERMENT EN BLACK HARMONY GEVEN
							GRATIS WORKSHOPS!
						</h2>
						<p>
							<strong>
								Brassbandworkshops, Drumworkshops en Afro-Caribische
								drumworkshops voor kinderen, tieners en jongeren bij jouw in de
								wijk in de Bijlmer!
							</strong>
						</p>

						<p>
							Kom 2 weken lang van maandag t/m vrijdag in de zomervakantie bij
							Eternity muzieklessen volgen. Na afloop mag je je vanaf september
							aansluiten als lid bij de artiestengroep van Eternity, Untold of
							Black Harmony, waar je verder wordt opgeleid als professioneel
							muzikant.
						</p>
						<p>
							Houd onze website en onze socials in de gate en blijf op de hoogte
							van al onze activiteiten en de locaties.
						</p>

						<p>
							<u>TIJDEN & DAGEN WORKSHOPS</u>
							<br />
						</p>

						<p>
							<b>Maandag 19 juli 2021:</b> <br /> 12:00 – 13:15 uur ・ kinderen:
							8 – 12 jaar <br />
							12:00 – 13:15 uur ・ kinderen: 13 – 17 jaar <br /> 15:00 – 16:15
							uur ・ kinderen: 18 – 23 jaar
						</p>
						<p>
							<b>Dinsdag 20 juli 2021:</b> <br /> 12:00 – 13:15 uur ・ kinderen:
							8 – 12 jaar <br />
							12:00 – 13:15 uur ・ kinderen: 13 – 17 jaar <br /> 15:00 – 16:15
							uur ・ kinderen: 18 – 23 jaar
						</p>
						<p>
							<b>Donderdag 22 juli 2021:</b> <br /> 12:00 – 13:15 uur ・
							kinderen: 8 – 12 jaar <br />
							12:00 – 13:15 uur ・ kinderen: 13 – 17 jaar <br /> 15:00 – 16:15
							uur ・ kinderen: 18 – 23 jaar
						</p>
						<p>
							<b>Maandag 26 juli 2021:</b> <br /> 12:00 – 13:15 uur ・ kinderen:
							8 – 12 jaar <br />
							12:00 – 13:15 uur ・ kinderen: 13 – 17 jaar <br /> 15:00 – 16:15
							uur ・ kinderen: 18 – 23 jaar
						</p>
						<p>
							<b>Dinsdag 27 juli 2021:</b> <br /> 12:00 – 13:15 uur ・ kinderen:
							8 – 12 jaar <br />
							12:00 – 13:15 uur ・ kinderen: 13 – 17 jaar <br /> 15:00 – 16:15
							uur ・ kinderen: 18 – 23 jaar
						</p>
						<p>
							<b>Donderdag 29 juli 2021:</b> <br /> 12:00 – 13:15 uur ・
							kinderen: 8 – 12 jaar <br />
							12:00 – 13:15 uur ・ kinderen: 13 – 17 jaar <br /> 15:00 – 16:15
							uur ・ kinderen: 18 – 23 jaar
						</p>

						<p>
							<b>LOCATIE workshops:</b> <u>South East Drumacademy</u>,
							Kruitbergstraat 18, 1104 CH in Amsterdam (nieuw gebouw onder het
							station Kraaiennest)
						</p>

						<p>AANMELDEN: VRIJE INLOOP TIJDENS DE ACTIVITEITEN</p>

						<p style={{ fontWeight: "200" }}>
							Nog vragen of opmerkingen? Neem gerust contact met ons op.
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default SummerschoolSecond;

export const Head: HeadFC = () => {
	const { summerschool2021 } = useSrcImages();

	const imageUrl = getSrc(summerschool2021);

	return (
		<Seo
			title="Summerschool 2021"
			pathname="/drumworkshops/summerschool-2021/"
			image={imageUrl}
			description="Ontdek onze zinderende Summerschool 2021! Gratis muziekworkshops voor kinderen, tieners en jongeren in Amsterdam Zuidoost. Lid worden van Eternity, Untold of Black Harmony? Bekijk onze workshops en sluit je aan!"
		/>
	);
};
