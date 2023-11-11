import React, { useEffect, useRef, useState } from 'react';
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
	const [isOverflow, setIsOverflow] = useState(false);

	useEffect(() => {
		const checkOverflow = () => {
			const containerWidth = document.documentElement.offsetWidth - 100;
			const breadcrumbWidth = breadcrumbRef.current?.scrollWidth || 0;
			const isOverflowing = breadcrumbWidth > containerWidth;
			setIsOverflow(isOverflowing);
		};

		const debouncedCheckOverflow = debounce(checkOverflow, 10);
		debouncedCheckOverflow();

		window.addEventListener('resize', debouncedCheckOverflow);

		return () => {
			window.removeEventListener('resize', debouncedCheckOverflow);
		};
	}, []);

	const breadcrumbClass = `${styles.breadcrumbList} ${
		isOverflow ? styles.overflow : ''
	}`;

	return (
		<nav data-main-breadcrumbs>
			<ul className={breadcrumbClass} ref={breadcrumbRef}>
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

const debounce = (func: Function, wait: number) => {
	let timeout: number;
	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = window.setTimeout(() => func(...args), wait);
	};
};

export default Breadcrumb;
