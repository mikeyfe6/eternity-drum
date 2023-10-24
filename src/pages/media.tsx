import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';

import * as styles from '../styles/modules/media.module.scss';

import samba from '../music/01-Samba.mp3';
import afrosamba from '../music/02-Afro-Samba.mp3';
import changebeat from '../music/03-Change-Beat.mp3';
import africanstyle1 from '../music/04-African-Style-1.mp3';
import africanstyle2 from '../music/05-African-Style-2.mp3';
import aleke from '../music/06-Aleke.mp3';
import sambareggae1 from '../music/07-Samba-Reggae-1.mp3';
import sambareggae2 from '../music/08-Samba-Reggae-2.mp3';
import brass from '../music/09-Brass.mp3';

const Media: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: 'Media' }];

	return (
		<Layout>
			<Hero />
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />
				<h1>Media</h1>

				<div className={styles.mediaContOne}>
					<section className={styles.music}>
						<h2>Muziek</h2>

						<p>Eternity Percussion - Samba</p>
						<audio controls title='Eternity Percussion - Samba'>
							<source src={samba} type='audio/mpeg' />
							Your browser does not support the audio element.
						</audio>
						<hr />
						<p>Eternity Percussion - Afro-Samba</p>
						<audio controls title='Eternity Percussion - Afro-Samba'>
							<source src={afrosamba} type='audio/mpeg' />
							Your browser does not support the audio element.
						</audio>
						<hr />
						<p>Eternity Percussion - Change-Beat</p>
						<audio controls title='Eternity Percussion - Change-Beat'>
							<source src={changebeat} type='audio/mpeg' />
							Your browser does not support the audio element.
						</audio>
						<hr />
						<p>Eternity Percussion - African-Style 1</p>
						<audio controls title='Eternity Percussion - African-Style 1'>
							<source src={africanstyle1} type='audio/mpeg' />
							Your browser does not support the audio element.
						</audio>
						<hr />
						<p>Eternity Percussion - African-Style 2</p>
						<audio controls title='Eternity Percussion - African-Style 2'>
							<source src={africanstyle2} type='audio/mpeg' />
							Your browser does not support the audio element.
						</audio>
						<hr />
						<p>Eternity Percussion - Aleke</p>
						<audio controls title='Eternity Percussion - Aleke'>
							<source src={aleke} type='audio/mpeg' />
							Your browser does not support the audio element.
						</audio>
						<hr />
						<p>Eternity Percussion - Samba-Reggae 1</p>
						<audio controls title='Eternity Percussion - Samba-Reggae 1'>
							<source src={sambareggae1} type='audio/mpeg' />
							Your browser does not support the audio element.
						</audio>
						<hr />
						<p>Eternity Percussion - Samba-Reggae 2</p>
						<audio controls title='Eternity Percussion - Samba-Reggae 2'>
							<source src={sambareggae2} type='audio/mpeg' />
							Your browser does not support the audio element.
						</audio>
						<hr />
						<p>Eternity Percussion - Brass</p>
						<audio controls title='Eternity Percussion - Brass'>
							<source src={brass} type='audio/mpeg' />
							Your browser does not support the audio element.
						</audio>
					</section>

					<section className={styles.news}>
						<h2>In het nieuws</h2>
						<a
							href='https://www.nigelclarkepresenter.co.uk/ace-dance-rhythm-workshop/'
							rel='noopener noreferrer'
							target='_blank'
						>
							Eternity and ACE, workshop Nigel Clark
							<i className='fa-solid fa-up-right-from-square' />
						</a>
						<hr />
						<a
							href='https://museumnacht.amsterdam/programma/429/eternity-percussion/'
							rel='noopener noreferrer'
							target='_blank'
						>
							Eternity opent Museumnacht in de Nieuwe Kerk te Amsterdam
							<i className='fa-solid fa-up-right-from-square' />
						</a>
						<hr />
						<a
							href='https://www.nrc.nl/nieuws/2020/02/13/vrij-a3990200'
							rel='noopener noreferrer'
							target='_blank'
						>
							Eternity in het NRC Handelsblad
							<i className='fa-solid fa-up-right-from-square' />
						</a>
						<hr />
						<a
							href='https://www.slagwerkkrant.nl/nieuws/artikel/2-3395/eternity-wint-battle-of-the-drums-zomercarnaval'
							rel='noopener noreferrer'
							target='_blank'
						>
							Eternity wint Brassband battle 2006
							<i className='fa-solid fa-up-right-from-square' />
						</a>
						<hr />
						<a
							href='https://kunstvol.nl/amsterdam/cursussen/drummen-met-eternity-percussion/'
							rel='noopener noreferrer'
							target='_blank'
						>
							Eternity wint Brassband battle 2006 Eternity Kunstvol
							<i className='fa-solid fa-up-right-from-square' />
						</a>
						<hr />
						<a
							href='http://www.bijlmerenmeer.nl/kenny-zschuschen-het-had-ook-anders-met-mij-kunnen-aflopen/'
							rel='noopener noreferrer'
							target='_blank'
						>
							Kenny Zschuschen over Eternity
							<i className='fa-solid fa-up-right-from-square' />
						</a>
						<hr />
						<b>Eternity in het Surinaamse nieuws, bekijk video:</b>
						<br />
						<br />
						<iframe
							id='ytplayer'
							width='620'
							height='305'
							src='https://www.youtube.com/embed/fRDGRiSMDSc?&modestbranding=1&color=white&iv_load_policy=3'
							title='YouTube video player'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							allowFullScreen
						></iframe>
					</section>
				</div>
				{/* <div className={styles.mediaContTwo}>
					<section className={styles.videos}>
						<h2>Video's</h2>
					</section>

					<section className={styles.photos}>
						<h2>Foto's</h2>
					</section>
				</div> */}
			</section>
		</Layout>
	);
};

export default Media;

export const Head: HeadFC = () => <SEO title='Media' />;
