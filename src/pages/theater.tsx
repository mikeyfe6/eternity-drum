import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { Seo } from "../components/seo";

import Breadcrumbs from "../components/layout/breadcrumbs";

import Hero from "../components/layout/heroslider";

const Theater: React.FC<PageProps> = () => {
	const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Theater" }];

	return (
		<>
			<Hero />
			<section data-main-section>
				<Breadcrumbs crumbs={breadcrumbs} />

				<h1>Theater</h1>
				<div data-main-content className="page-content basic">
					<p>Pagina komt binnenkort..</p>
				</div>
			</section>
		</>
	);
};

export default Theater;

export const Head: HeadFC = () => <Seo title="Theater" pathname="/theater/" />;
