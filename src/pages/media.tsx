import * as React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../components/seo';

import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumbs';

import Hero from '../components/heroslider';
import MusicPlayer from '../components/musicPlayer';
import Relevance from '../components/relevance';

import GalleryOne from '../components/galleries/galleryOne';
import GalleryTwo from '../components/galleries/galleryTwo';
import GalleryThree from '../components/galleries/galleryThree';
import GalleryFour from '../components/galleries/galleryFour';
import GalleryFive from '../components/galleries/galleryFive';
import GallerySix from '../components/galleries/gallerySix';

import * as styles from '../styles/modules/media.module.scss';

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
						<MusicPlayer />
					</section>

					<section className={styles.news}>
						<h2>In het nieuws</h2>
						<Relevance />
					</section>
				</div>
				{/* <section className={styles.videos}>
					<h2>Video's</h2>
				</section> */}

				<section className={styles.photos}>
					<h2>Foto's</h2>
					<GalleryOne />
					<hr />
					<GalleryFour />
					<hr />
					<GalleryThree />
					<hr />
					<GalleryTwo />
					<hr />
					<GallerySix />
					<hr />
					<GalleryFive />
				</section>
			</section>
		</Layout>
	);
};

export default Media;

export const Head: HeadFC = () => <SEO title='Media' />;
