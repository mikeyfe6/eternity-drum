import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import type { HeadFC, PageProps } from "gatsby";

import { Seo } from "../../components/seo";

import Breadcrumbs from "../../components/breadcrumbs";

import Hero from "../../components/heroslider";
import LightBox from "../../components/lightbox";

import * as styles from "../../styles/modules/workshop.module.scss";

const SummerschoolSecond: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: "Home", link: "/" },
		{ label: "Drumworkshops", link: "/drumworkshops/" },
		{ label: "Summerschool 2021" },
	];

	const { flyer, midzomer } = useStaticQuery(graphql`
		query {
			flyer: file(relativePath: { eq: "summerschool-2021.jpg" }) {
				childImageSharp {
					gatsbyImageData
				}
			}
			midzomer: file(relativePath: { eq: "midzomerlogo-latest.jpeg" }) {
				childImageSharp {
					gatsbyImageData
				}
			}
		}
	`);

	const summerSchoolFlyer = flyer.childImageSharp.gatsbyImageData;
	const midzomerLogo = midzomer.childImageSharp.gatsbyImageData;

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumbs crumbs={breadcrumbs} />
				<h1>Summerschool 2021</h1>
				<div className={styles.workshopContainer}>
					<div className={styles.workshopVisuals}>
						<LightBox image={summerSchoolFlyer} alt="Summerschool 2021 Flyer" />
						<LightBox image={midzomerLogo} alt="Sankofa Flyer Voorkant" />
					</div>
					<section data-main-content className={styles.workshopInfo}>
						<h3>
							PERCUSSIONBAND ETERNITY, UNTOLD EMPOWERMENT EN BLACK HARMONY GEVEN
							GRATIS WORKSHOPS!
						</h3>
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
							<strong>Maandag 19 juli 2021:</strong> <br /> 12:00 – 13:15 uur ・
							kinderen: 8 – 12 jaar <br />
							12:00 – 13:15 uur ・ kinderen: 13 – 17 jaar <br /> 15:00 – 16:15
							uur ・ kinderen: 18 – 23 jaar
						</p>
						<p>
							<strong>Dinsdag 20 juli 2021:</strong> <br /> 12:00 – 13:15 uur ・
							kinderen: 8 – 12 jaar <br />
							12:00 – 13:15 uur ・ kinderen: 13 – 17 jaar <br /> 15:00 – 16:15
							uur ・ kinderen: 18 – 23 jaar
						</p>
						<p>
							<strong>Donderdag 22 juli 2021:</strong> <br /> 12:00 – 13:15 uur
							・ kinderen: 8 – 12 jaar <br />
							12:00 – 13:15 uur ・ kinderen: 13 – 17 jaar <br /> 15:00 – 16:15
							uur ・ kinderen: 18 – 23 jaar
						</p>
						<p>
							<strong>Maandag 26 juli 2021:</strong> <br /> 12:00 – 13:15 uur ・
							kinderen: 8 – 12 jaar <br />
							12:00 – 13:15 uur ・ kinderen: 13 – 17 jaar <br /> 15:00 – 16:15
							uur ・ kinderen: 18 – 23 jaar
						</p>
						<p>
							<strong>Dinsdag 27 juli 2021:</strong> <br /> 12:00 – 13:15 uur ・
							kinderen: 8 – 12 jaar <br />
							12:00 – 13:15 uur ・ kinderen: 13 – 17 jaar <br /> 15:00 – 16:15
							uur ・ kinderen: 18 – 23 jaar
						</p>
						<p>
							<strong>Donderdag 29 juli 2021:</strong> <br /> 12:00 – 13:15 uur
							・ kinderen: 8 – 12 jaar <br />
							12:00 – 13:15 uur ・ kinderen: 13 – 17 jaar <br /> 15:00 – 16:15
							uur ・ kinderen: 18 – 23 jaar
						</p>

						<p>
							<strong>LOCATIE workshops:</strong> <u>South East Drumacademy</u>,
							Kruitbergstraat 18, 1104 CH in Amsterdam (nieuw gebouw onder het
							station Kraaiennest)
						</p>

						<p>AANMELDEN: VRIJE INLOOP TIJDENS DE ACTIVITEITEN</p>

						<p style={{ fontWeight: "200" }}>
							Nog vragen of opmerkingen? Neem gerust contact met ons op.
						</p>
					</section>
				</div>
			</section>
		</>
	);
};

export default SummerschoolSecond;

export const Head: HeadFC = () => (
	<Seo
		title="Summerschool 2021"
		pathname="/drumworkshops/summerschool-2021/"
		description="Ontdek onze zinderende Summerschool 2021! Gratis muziekworkshops voor kinderen, tieners en jongeren in Amsterdam Zuidoost. Lid worden van Eternity, Untold of Black Harmony? Bekijk onze workshops en sluit je aan!"
	/>
);
