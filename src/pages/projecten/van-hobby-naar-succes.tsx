import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { Seo } from "../../components/seo";

import Breadcrumbs from "../../components/breadcrumbs";

import Hero from "../../components/heroslider";

const VanHobbyNaarSucces: React.FC<PageProps> = () => {
	const breadcrumbs = [
		{ label: "Home", link: "/" },
		{ label: "Projecten", link: "/projecten/" },
		{ label: "Van Hobby Naar Succes" },
	];

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumbs crumbs={breadcrumbs} />

				<h1>Van Hobby Naar Succes</h1>
				<p>Pagina komt binnenkort..</p>
			</section>
		</>
	);
};

export default VanHobbyNaarSucces;

export const Head: HeadFC = () => (
	<Seo
		title="Van Hobby Naar Succes"
		pathname="/projecten/van-hobby-naar-succes/"
	/>
);
