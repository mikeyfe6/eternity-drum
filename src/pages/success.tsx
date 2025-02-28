import * as React from "react";

import { Link, HeadFC, PageProps } from "gatsby";

import { Seo } from "../components/seo";

import * as styles from "../styles/modules/pages/success.module.scss";

const Success: React.FC<PageProps> = () => {
    return (
        <section data-main-section>
            <h1>Bedankt!</h1>
            <br />
            <p style={{ fontSize: "1.125rem" }}>
                Je bericht is succesvol verstuurd! We nemen zo snel mogelijk
                contact met jou op.
                <br />
                {process.env.NODE_ENV === "development" ? (
                    <>
                        <br />
                        <code>Je bent aan 't developen!</code>
                        <br />
                    </>
                ) : null}
                <br />
            </p>

            <button type="button" className={styles.succesButton}>
                <Link to="/">Ga naar de homepagina</Link>
            </button>
        </section>
    );
};

export default Success;

export const Head: HeadFC = () => (
    <Seo title="Succesvolle formulierzending!" pathname="/success/" noindex />
);
