import React, { useState, useEffect, useRef } from 'react';
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
	const breadcrumbRef = useRef<HTMLUListElement>(null);
	const [ulWidth, setUlWidth] = useState<number | null>(null);

	useEffect(() => {
		const handleResize = () => {
			if (breadcrumbRef.current) {
				const availableSpace =
					document.body.clientWidth -
					(breadcrumbRef.current.getBoundingClientRect().left || 0);

				setUlWidth(availableSpace);
			}
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<nav data-main-breadcrumbs>
			<ul
				ref={breadcrumbRef}
				className={styles.breadcrumbList}
				style={{ maxWidth: ulWidth ? `${ulWidth}px` : '100%' }}
			>
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
