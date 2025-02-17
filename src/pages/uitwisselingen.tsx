import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { Seo } from "../components/seo";

import Breadcrumbs from "../components/layout/breadcrumbs";

import Hero from "../components/layout/heroslider";

const Uitwisselingen: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: "Home", link: "/" },
		{ label: "Uitwisselingen" },
	];

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumbs crumbs={breadcrumbs} />

				<h1>Uitwisselingen</h1>
				<p>Pagina komt binnenkort..</p>
			</section>
		</>
	);
};

export default Uitwisselingen;

export const Head: HeadFC = () => (
	<Seo title="Uitwisselingen" pathname="/uitwisselingen/" />
);
