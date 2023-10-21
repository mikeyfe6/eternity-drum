import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../../components/seo';

import Layout from '../../components/layout';
import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';
// import RegisterForm, { handleClick } from '../../components/registerform';

import * as styles from '../../styles/modules/workshop.module.scss';

const SummerschoolFirst: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Drumworkshops', link: '/drumworkshops/' },
		{ label: 'Summerschool 2020' },
	];

	// const inputRef = React.useRef<HTMLInputElement>(null);

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />
				<h1>Summerschool 2020</h1>
				<div className={styles.workshopContainer}>
					{/* <RegisterForm inputRef={inputRef} /> */}
					<section className={styles.workshopInfo}>
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
							<u>Voor wie</u>
							<br />
							Jongens en meisjes
						</p>

						<p>
							<u>Leeftijd</u>
							<br />6 t/m 12 of 13 t/m 18
						</p>

						<p>
							<u>Beginners</u>
							<br />
							Dinsdagavond
						</p>

						<p>
							<u>Gevorderden</u>
							<br />
							Woensdagavond
						</p>

						<p>
							Meld jezelf of kind nu direct aan via het{' '}
							{/* <a href='#' onClick={(event) => handleClick(inputRef, event)}>
								online formulier
							</a> */}
							, via de mail <a href='#!'>info@eternitydrum.com</a> of
							telefonisch via <a href='#!'>06 24 25 53 91</a>.
						</p>

						<p>
							Ben je niet ouder dan 18 jaar? Vraag dan even toestemming aan jouw
							ouders.
						</p>

						<p>
							Voor de ouders die graag hun kinderen aan deze activiteit willen
							laten deelnemen, maar niet in staat zijn om de bijdrage te betalen
							kunnen wij een regeling treffen via het{' '}
							<a href='#!'>Jongerencultuurfonds</a>. Voor vragen omtrent deze
							regeling kunt u telefonisch contact met ons opnemen.
						</p>
					</section>
				</div>
			</section>
		</Layout>
	);
};

export default SummerschoolFirst;

export const Head: HeadFC = () => <SEO title='Summerschool 2020' />;
