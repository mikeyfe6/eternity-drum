import * as React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../../components/seo';

import Layout from '../../components/layout';
import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';

import LightBox from '../../components/lightbox';

import * as styles from '../../styles/modules/workshop.module.scss';

const SummerschoolFirst: React.FC<PageProps> = () => {
	const { flyer, midzomer } = useStaticQuery(graphql`
		query {
			flyer: file(relativePath: { eq: "summerschool-2020.jpg" }) {
				childImageSharp {
					gatsbyImageData
				}
			}
			midzomer: file(relativePath: { eq: "midzomerlogo.jpg" }) {
				childImageSharp {
					gatsbyImageData
				}
			}
		}
	`);

	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Drumworkshops', link: '/drumworkshops/' },
		{ label: 'Summerschool 2020' },
	];

	const summerSchoolFlyer = flyer.childImageSharp.gatsbyImageData;
	const midzomerLogo = midzomer.childImageSharp.gatsbyImageData;

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />
				<h1>Summerschool 2020</h1>
				<div className={styles.workshopContainer}>
					<div className={styles.workshopVisuals}>
						<LightBox image={summerSchoolFlyer} alt='Summerschool 2020 Flyer' />
						<LightBox image={midzomerLogo} alt='Sankofa Flyer Voorkant' />
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
							Kom 6 weken lang in de zomervakantie bij Eternity muzieklessen
							volgen. Na afloop mag je je vanaf september aansluiten als lid bij
							de artiestengroep van Eternity, Untold of Black Harmony, waar je
							verder wordt opgeleid als professioneel muzikant.
						</p>
						<p>
							Houd onze website in de gaten en blijf op de hoogte van al onze
							activiteiten en de locaties. (Deze kunnen verschillen voor de
							workshops die buiten plaats vinden)
						</p>

						<p>
							<u>TIJDEN & DAGEN WORKSHOPS</u>
							<br />
						</p>

						<p>
							<strong>Maandag 6 juli 2020:</strong> <br /> 12:30 - 13:45
							workshop(s): Eternity <br />
							13:45 - 15:00 workshop(s): Eternity <br /> 15:30 - 17:00
							workshop(s): Black Harmony / Untold
						</p>
						<p>
							<strong>Woensdag 8 juli 2020:</strong> <br />
							13:00 – 14:15 workshop(s): Eternity <br />
							14:15 – 15:30 workshop(s): Eternity
							<br /> 16:00 – 17:30 workshop(s): Black Harmony / Untold
						</p>
						<p>
							<strong>Maandag 13 juli 2020:</strong> <br /> 12:30 – 13:45
							workshop(s): Eternity
							<br />
							13:45 – 15:00 workshop(s): Eternity
							<br /> 15:30 – 17:00 workshop(s): Black Harmony / Untold
						</p>
						<p>
							<strong>Woensdag 15 juli 2020:</strong> <br /> 13:00 – 14:15
							workshop(s): Eternity
							<br />
							14:15 – 15:30 workshop(s): Eternity
							<br /> 16:00 – 17:30 workshop(s): Black Harmony / Untold
						</p>
						<p>
							<strong>Maandag 20 juli 2020:</strong> <br /> 12:30 - 13:45
							workshop(s): Eternity <br />
							13:45 - 15:00 workshop(s): Eternity <br /> 15:30 - 17:00
							workshop(s): Black Harmony / Untold
						</p>
						<p>
							<strong>Woensdag 22 juli 2020:</strong> <br /> 12:30 - 13:45
							workshop(s): Eternity <br />
							13:45 - 15:00 workshop(s): Eternity
							<br /> 15:30 - 17:00 workshop(s): Black Harmony / Untold
						</p>
						<p>
							<strong>Dinsdag 28 juli 2020:</strong> <br /> 13:00 – 14:15
							workshop(s): Eternity
							<br />
							14:15 – 15:30 workshop(s): Eternity <br /> 16:00 – 17:30
							workshop(s): Black Harmony / Untold
						</p>
						<p>
							<strong>Maandag 3 augustus 2020:</strong> <br /> 12:30 - 13:45
							workshop(s): Eternity <br />
							13:45 - 15:00 workshop(s): Eternity <br /> 15:30 - 17:00
							workshop(s): Black Harmony / Untold
						</p>
						<p>
							<strong>Woensdag 5 augustus 2020:</strong> <br /> 13:00 – 14:15
							workshop(s): Eternity <br />
							14:15 – 15:30 workshop(s): Eternity <br /> 16:00 – 17:30
							workshop(s): Black Harmony / Untold
						</p>
						<p>
							<strong>Maandag 10 augustus 2020:</strong> <br /> 12:30 - 13:45
							workshop(s): Eternity <br />
							13:45 - 15:00 workshop(s): Eternity <br /> 15:30 - 17:00
							workshop(s): Black Harmony / Untold
						</p>
						<p>
							<strong>Woensdag 12 augustus 2020:</strong> <br /> 13:00 – 14:15
							workshop(s): Eternity
							<br />
							14:15 – 15:30 workshop(s): Eternity
							<br /> 16:00 – 17:30 workshop(s): Black Harmony / Untold
						</p>

						<p>
							<strong>LOCATIE workshops:</strong> <u>IAMJONG</u>, Hoogoorddreef
							2, 1102 CP in Amsterdam (oud-postkantoor in het Amsterdamse Poort)
						</p>

						<p>AANMELDEN: VRIJE INLOOP TIJDENS DE ACTIVITEITEN</p>

						<p style={{ fontWeight: '200' }}>
							Nog vragen of opmerkingen? Neem gerust contact met ons op.
						</p>
					</section>
				</div>
			</section>
		</Layout>
	);
};

export default SummerschoolFirst;

export const Head: HeadFC = () => <SEO title='Summerschool 2020' />;
