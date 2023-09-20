import * as React from 'react';
import { Link } from 'gatsby';

import * as styles from '../styles/modules/breadcrumbs.module.scss';

interface Crumb {
	label: string;
	link?: string;
}

interface BreadcrumbProps {
	crumbs: Crumb[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs }) => {
	return (
		<nav data-breadcrumbs>
			<ul className={styles.breadcrumbList}>
				{crumbs.map((crumb, index) => (
					<li key={index}>
						{crumb.link ? (
							<Link to={crumb.link}>{crumb.label}</Link>
						) : (
							<span>{crumb.label}</span>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Breadcrumb;
