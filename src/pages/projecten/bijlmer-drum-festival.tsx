import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { Seo } from "../../components/seo";

import Breadcrumbs from "../../components/layout/breadcrumbs";
import Hero from "../../components/layout/heroslider";

const BijlmerDrumFestival: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: "Home", link: "/" },
		{ label: "Projecten", link: "/projecten/" },
		{ label: "Bijlmer Drum Festival" },
	];

	return (
		<>
			<Hero />
			<section className="page-intro">
				<Breadcrumbs crumbs={breadcrumbs} />
				<h1 className="page-title">Bijlmer Drum Festival</h1>
			</section>
			<section data-main-section>
				<div data-main-content className="page-content coming-soon">
					<p>Pagina komt binnenkort..</p>
				</div>
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
