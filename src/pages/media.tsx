import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';
import Gallery from '../components/gallery';
import MusicPlayer from '../components/music';

import * as styles from '../styles/modules/media.module.scss';

const Media: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: 'Home', link: '/' }, { label: 'Media' }];

	return (
		<Layout>
			{/* <Hero /> */}
			<section data-main-section>
				<Breadcrumb crumbs={breadcrumbs} />
				<h1>Media</h1>

				<div className={styles.mediaContOne}>
					<section className={styles.music}>
						<h2>Muziek</h2>
						<MusicPlayer />
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
				{/* <section className={styles.videos}>
					<h2>Video's</h2>
				</section> */}

				<section className={styles.photos}>
					<h2>Foto's</h2>

					<h3>Swazoom Live 2023</h3>
					<Gallery />
				</section>
			</section>
		</Layout>
	);
};

export default Media;

export const Head: HeadFC = () => <SEO title='Media' />;
