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

	return (
		<nav className={styles.breadcrumbs} data-main-breadcrumbs>
			<ul ref={breadcrumbRef} className={styles.breadcrumbsList}>
				{crumbs.map((crumb, index) => (
					<li
						key={index}
						className={`${styles.breadcrumbsItem} ${
							index === crumbs.length - 2 ? styles.breadcrumbsItemMobile : ""
						}`}
					>
						{index === 0 ? (
							<>
								<FontAwesomeIcon
									icon={"caret-left"}
									className={styles.breadcrumbsSeperatorMobile}
								/>
								<Link to="/">
									<FontAwesomeIcon
										icon={"house-chimney"}
										className={styles.breadcrumbsHomeIcon}
									/>
									<span className={styles.breadcrumbsHome}>Home</span>
								</Link>
								<FontAwesomeIcon
									icon={"caret-right"}
									className={styles.breadcrumbsSeperator}
								/>
							</>
						) : crumb.link ? (
							<>
								<FontAwesomeIcon
									icon={"caret-left"}
									className={styles.breadcrumbsSeperatorMobile}
								/>
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
