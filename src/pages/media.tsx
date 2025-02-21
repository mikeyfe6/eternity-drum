import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { Seo } from "../components/seo";

import Breadcrumbs from "../components/layout/breadcrumbs";
import Hero from "../components/layout/heroslider";
import WhiteSpace from "../components/layout/whitespace";

import MusicPlayer from "../components/ui/musicPlayer";
import Relevance from "../components/ui/relevance";
import Videos from "../components/ui/videos";

import GalleryOne from "../components/galleries/galleryOne";
import GalleryTwo from "../components/galleries/galleryTwo";
import GalleryThree from "../components/galleries/galleryThree";
import GalleryFour from "../components/galleries/galleryFour";
import GalleryFive from "../components/galleries/galleryFive";
import GallerySix from "../components/galleries/gallerySix";
import GallerySeven from "../components/galleries/gallerySeven";
import GalleryEight from "../components/galleries/galleryEight";

import * as styles from "../styles/modules/pages/media.module.scss";

const Media: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Media" }];

	return (
		<>
			<Hero />
			<section className="page-intro">
				<Breadcrumbs crumbs={breadcrumbs} />
				<h1 className="page-title">Media</h1>
			</section>
			<section data-main-section>
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

				<WhiteSpace />

				<section className={styles.videos}>
					<h2>Video's</h2>
					<Videos />
				</section>
			</section>
		</>
	);
};

export default Media;

export const Head: HeadFC = () => (
	<Seo
		title="Media"
		pathname="/media/"
		description="Ontdek de multimediale wereld van Eternity Percussion op onze Media-pagina. Luister naar onze muziek, bekijk nieuwsartikelen en ontdek onze fotogalerij en video's."
	/>
);
