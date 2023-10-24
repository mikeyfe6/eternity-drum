import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../../components/seo';

import Layout from '../../components/layout';
import Breadcrumb from '../../components/breadcrumbs';

import Hero from '../../components/heroslider';

const Anbi: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Over Ons', link: '/over-ons/' },
		{ label: 'ANBI' },
	];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />

				<h1>ANBI</h1>
				<section data-main-content className='page-content-center'>
					<h2>Doelstelling: Eternity Percussion</h2>

					<p>
						Eternity is een culturele instelling die zich bezighoudt met het
						organiseren van activiteiten, evenementen en projecten op het gebied
						van muzikale vorming en performance.
					</p>

					<p>
						<strong>De organisatie heeft als doel:</strong>
					</p>

					<ul>
						<li>
							Het bieden van een platform voor drummers die bezig zijn met
							Caribische muziekstijlen.
						</li>
						<li>
							Het ontwikkelen van trajecten ter bevordering van muzikale
							vaardigheden.
						</li>
						<li>
							Het programmeren van drumshows bij (semi) professionele podia.
						</li>
						<li>
							Bevorderen van samenwerking tussen zelforganisaties en gevestigde
							instellingen voor de nodige doorstroming van getalenteerde
							jongeren.
						</li>
					</ul>

					<h4>
						<u>Algemene gegevens</u>
					</h4>
					<p>
						<strong>Naam ANBI:</strong> STICHTING ETERNITY PERCUSSION
						<br />
						<strong>Telefoonnummer:</strong> 020 – 22 17 675
						<br />
						<strong>K.v.K:</strong> 34284743
						<br />
						<strong>RSIN:</strong> 8185.56.286
						<br />
						<strong>E-mail:</strong> info@eternitydrum.com
						<br />
					</p>

					<p>
						<strong>Bezoekadres:</strong> Anton De Komplein 240
						<br />
						<strong>Postcode:</strong> 1102 DR
						<br />
						<strong>Plaats:</strong> Amsterdam
					</p>

					<p>
						<i>
							<strong>Postadres:</strong> Anton De Komplein 240
							<br />
							<strong>Postcode: </strong> 1102 DR
							<br />
							<strong>Plaats:</strong> Amsterdam
						</i>
					</p>

					<h4>
						<u>Bestuur</u>
					</h4>
					<p>
						<strong>Voorzitter:</strong> Kenneth Zschuschen
						<br />
						<strong>Secretaris:</strong> Otmar Watson
						<br />
						<strong>Penningmeester:</strong> Ulrich Entingh
					</p>

					<h4>
						<u>Beleidsplan</u>
					</h4>
					<p>
						<a href='#!'>Klik hier voor een overzicht van ons beleidsplan</a>
					</p>

					<h4>
						<u>De balans en staat van baten en lasten</u>
					</h4>
					<p>
						<a href='#!'>
							Klik hier voor een overzicht van de balans en staat van baten en
							lasten{' '}
						</a>
					</p>

					<h4>
						<u>Beloningsbeleid</u>
					</h4>
					<p>
						<strong>Bestuur:</strong> alleen onkostenvergoeding; reis- en
						parkeerkosten. Geen vakantiegeld.
						<br />
						<strong>Volgens CAO Nederlandse Podia:</strong> vrijwilligers, geen
						beloningsbeleid
					</p>

					<h4>
						<u>Activiteiten</u>
					</h4>
					<ul>
						<li>Uitwisselingsprogramma’s</li>
						<li>Theaterproducties</li>
						<li>Openbare optredens</li>
						<li>Drumworkshops </li>
					</ul>

					<h4>
						<u>Financiële verantwoording</u>
					</h4>

					<p>
						Op te vragen via: <i>Your Accountants & Adviseurs B.V.</i>
					</p>
				</section>
			</section>
		</Layout>
	);
};

export default Anbi;

export const Head: HeadFC = () => <SEO title='ANBI' />;
