import React, { useRef } from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { useSiteMetadata } from '../hooks/use-site-metadata';

import { Seo } from '../components/seo';

import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';
import RegisterForm, { handleClick } from '../components/registerForm';

import * as styles from '../styles/modules/workshop.module.scss';

const Drumworkshops: React.FC<PageProps> = () => {
	const { email, mobile } = useSiteMetadata();

	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Drumworkshops' },
	];

	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>Drumworkshops</h1>
				<div className={styles.workshopContainer}>
					<RegisterForm inputRef={inputRef} />
					<section data-main-content className={styles.workshopInfo}>
						<p>
							<strong>
								Muziekeducatie vormt een goede basis voor de ontwikkeling van
								een kind.
							</strong>{' '}
							Momenteel verzorgen wij drumlessen op het{' '}
							<a
								href='https://www.bindelmeercollege.nl'
								rel='noopener noreferrer'
								target='_blank'
							>
								Bindelmeer College{' '}
							</a>
							en de{' '}
							<a
								href='https://bredeschoolzuidoost.nl'
								rel='noopener noreferrer'
								target='_blank'
							>
								Bredeschool Zuidoost{' '}
							</a>
							als vast onderdeel van het onderwijspakket. Speciaal voor kinderen
							en jongeren verzorgen wij ook drumworkshops na schooltijd in
							Amsterdam Zuidoost.
						</p>

						<p>
							<strong>
								Voor slechts 45,- euro per maand kan je 1x in de week bij ons
								drumlessen volgen.
							</strong>{' '}
							Je leert bij ons niet alleen het spelen van Afrikaanse,
							Afro-Caribische en Afro-Surinaamse ritmes, maar ook het lezen van
							muzieknoten voor percussie instrumenten. Per drumles zijn er 2
							docenten aanwezig die ervoor zorgen dat ieder kind voldoende
							aandacht krijgt. Alles wat de leerlingen hebben geleerd zullen zij
							laten zien tijdens een presentatie op één van de
							publieksevenementen in Amsterdam Zuidoost.
						</p>

						<p>
							<u>Voor wie</u> <br />
							Jongens en meisjes
						</p>

						<p>
							<u>Leeftijd</u> <br />6 t/m 12 of 13 t/m 18
						</p>

						<p>
							<u>Beginners</u> <br />
							Dinsdagavond
						</p>

						<p>
							<u>Gevorderden</u> <br />
							Woensdagavond
						</p>

						<p>
							Meld jezelf of jouw kind nu direct aan via het{' '}
							<a href='#' onClick={(event) => handleClick(inputRef, event)}>
								online inschrijfformulier
							</a>
							, via de mail{' '}
							<a
								href={`mailto:${email}`}
								rel='noopener noreferrer'
								target='_blank'
							>
								{email}
							</a>{' '}
							of telefonisch via{' '}
							<a
								href={`tel:+${mobile}`}
								rel='noopener noreferrer'
								target='_blank'
							>
								06 242 55 391
							</a>
							.
						</p>

						<p>
							Ben je niet ouder dan 18 jaar? Vraag dan even toestemming aan jouw
							ouders.
						</p>

						<p>
							Voor de ouders die graag hun kinderen aan deze activiteit willen
							laten deelnemen, maar niet in staat zijn om de bijdrage te betalen
							kunnen wij een regeling treffen via het{' '}
							<a
								href='https://www.jongerencultuurfonds.nl'
								rel='noopener noreferrer'
								target='_blank'
							>
								Jongerencultuurfonds
							</a>
							.
						</p>

						<p>
							Voor vragen omtrent deze regeling kan je telefonisch contact met
							ons opnemen.
						</p>
					</section>
				</div>
			</section>
		</>
	);
};

export default Drumworkshops;

export const Head: HeadFC = () => <Seo title='Drumworkshops' />;
