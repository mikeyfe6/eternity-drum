import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { Seo } from "../../components/seo";

import Breadcrumbs from "../../components/breadcrumbs";

import Hero from "../../components/heroslider";

const BijlmerDrumFestival: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: "Home", link: "/" },
		{ label: "Projecten", link: "/projecten/" },
		{ label: "Bijlmer Drum Festival" },
	];

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumbs crumbs={breadcrumbs} />

				<h1>Bijlmer Drum Festival</h1>
				<p>Pagina komt binnenkort..</p>
			</section>
		</>
	);
};

export default BijlmerDrumFestival;

export const Head: HeadFC = () => (
	<Seo
		title="Bijlmer Drum Festival"
		pathname="/projecten/bijlmer-drum-festival/"
	/>
);
