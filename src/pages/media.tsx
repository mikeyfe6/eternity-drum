import React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import { Seo } from '../components/seo';

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
import GallerySeven from '../components/galleries/gallerySeven';
import GalleryEight from '../components/galleries/galleryEight';

import YouTubePlayer from '../components/youtubePlayer';

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
					<hr />
					<GallerySeven />
					<hr />
					<GalleryEight />
				</section>

				<section className={styles.videos}>
					{' '}
					<h2>Video's</h2>
					<YouTubePlayer videoId='dav38cHRAM0' />
					<YouTubePlayer videoId='czwOwdNREgU' />
					<YouTubePlayer videoId='6u3690Hc7EI' />
					<YouTubePlayer videoId='incatDwpaqk' />
					<YouTubePlayer videoId='V281m7npf6o' />
					<YouTubePlayer videoId='uVWWOwVlr1k' />
					<YouTubePlayer videoId='0im5wdxXxDM' />
					<YouTubePlayer videoId='czwOwdNREgU' />
				</section>
			</section>
		</Layout>
	);
};

export default Media;

export const Head: HeadFC = () => <Seo title='Media' />;
