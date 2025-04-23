import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

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

import { Seo } from "../components/seo";

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

            <div className={styles.mediaContOne} data-main-section>
                <section className={styles.music}>
                    <h2>Muziek</h2>
                    <MusicPlayer />
                </section>

                <section className={styles.news} data-main-content>
                    <h2>In het nieuws</h2>
                    <Relevance />
                </section>
            </div>

            <section className={styles.photos} data-main-content>
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

            <section className={styles.videos} data-main-content>
                <h2>Video's</h2>
                <Videos />
            </section>
        </>
    );
};

export default Media;

export const Head: HeadFC = () => (
    <Seo
        title="Media"
        pathname="/media/"
        description="Ontdek onze multimedia. Luister naar onze muziek, bekijk nieuwsartikelen en ontdek onze fotogalerijen en video's."
    />
);
