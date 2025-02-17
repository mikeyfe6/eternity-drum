import React, { useState, useLayoutEffect, useRef } from "react";
import { Link } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as styles from "../../styles/modules/layout/breadcrumbs.module.scss";

interface Crumb {
	label: string;
	link?: string;
}

interface BreadcrumbProps {
	crumbs: Crumb[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ crumbs }) => {
	const breadcrumbRef = useRef<HTMLUListElement>(null);
	const [ulWidth, setUlWidth] = useState<number | null>(null);

	useLayoutEffect(() => {
		const handleResize = () => {
			if (breadcrumbRef.current) {
				const availableSpace =
					document.body.clientWidth -
					(breadcrumbRef.current.getBoundingClientRect().left || 0);

				setUlWidth(availableSpace);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);
		window.addEventListener("load", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("load", handleResize);
		};
	}, []);

	return (
		<nav data-main-breadcrumbs className={styles.breadcrumbs}>
			<ul
				ref={breadcrumbRef}
				className={styles.breadcrumbsList}
				style={{ maxWidth: ulWidth ? `${ulWidth}px` : "100%" }}
			>
				{crumbs.map((crumb, index) => (
					<li key={index} className={styles.breadcrumbsItem}>
						{index === 0 ? (
							<>
								<Link to="/">
									<FontAwesomeIcon
										icon={"house-chimney"}
										className={styles.breadcrumbsHome}
									/>
								</Link>
								<FontAwesomeIcon
									icon={"caret-right"}
									className={styles.breadcrumbsSeperator}
								/>
							</>
						) : crumb.link ? (
							<>
								<Link to={crumb.link}>{crumb.label}</Link>
								<FontAwesomeIcon
									icon={"caret-right"}
									className={styles.breadcrumbsSeperator}
								/>
							</>
						) : (
							<span className={styles.breadcrumbsPage}>{crumb.label}</span>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Breadcrumbs;
