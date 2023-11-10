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
		<nav data-main-breadcrumbs>
			<ul className={styles.breadcrumbList}>
				{crumbs.map((crumb, index) => (
					<li key={index}>
						{index === 0 ? (
							<Link to='/'>
								<i className='fa-solid fa-house-chimney' />
							</Link>
						) : crumb.link ? (
							<Link to={crumb.link}>{crumb.label}</Link>
						) : (
							crumb.label
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Breadcrumb;
