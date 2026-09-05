import React, { useState, useRef } from "react";

import { navigate } from "gatsby";

import axios from "axios";

import { useSiteMetadata } from "../../hooks/use-site-metadata";

import { validateBookingsForm, BookingsFormData } from "../auth/validation";

import * as styles from "../../styles/modules/forms/bookingsform.module.scss";

type FieldErrors = {
    [key: string]: string[];
};

const BookingsForm: React.FC = () => {
    const { mobileRaw } = useSiteMetadata();

    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

    const [formData, setFormData] = useState<BookingsFormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        topic: "",
        message: "",
    });

    const requiredFields = ["firstName", "lastName", "email", "phone", "topic", "message"];

    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputFocus = (name: string) => {
        setFocusedInput(name);
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;

        const updatedFieldErrors = { ...fieldErrors };
        updatedFieldErrors[name] =
            validateBookingsForm({
                ...formData,
                [name]: value,
            })[name] || [];

        setFieldErrors(updatedFieldErrors);

        setFormData({
            ...formData,
            [name]: value,
        });

        event.target.classList.toggle("error", updatedFieldErrors[name].length > 0);
        event.target.classList.toggle("approved", updatedFieldErrors[name].length === 0);
    };

    const handleInputBlur = () => {
        setFocusedInput(null);
    };

    const encode = (data: { [key: string]: string | null | undefined }) => {
        return Object.keys(data)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key] ?? ""))
            .join("&");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, myForm: HTMLFormElement | null) => {
        event.preventDefault();

        if (myForm !== null) {
            myForm.reset();
        }

        const allRequiredFieldsFilled = requiredFields.every((field) => formData[field as keyof BookingsFormData]);

        if (!allRequiredFieldsFilled) {
            alert("Vul aub alle verplichte velden in!");
            return;
        }

        const validationErrors = validateBookingsForm(formData);

        setFieldErrors(validationErrors);

        const errorMessages = Object.values(validationErrors).flatMap((error) => error);

        if (errorMessages.length > 0) {
            return;
        }

        setIsFormSubmitted(true);

        try {
            const formDataParams = new URLSearchParams();
            const formKeys: Array<keyof BookingsFormData> = [
                "firstName",
                "lastName",
                "email",
                "phone",
                "topic",
                "message",
            ];

            formKeys.forEach((key) => {
                formDataParams.append(key, formData[key]);
            });

            await axios.post(
                "/",
                encode({
                    "form-name": myForm?.getAttribute("name"),
                    ...formData,
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                },
            );

            navigate("/success");

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                topic: "",
                message: "",
            });

            setFieldErrors({});
            setFocusedInput(null);
            setIsFormSubmitted(false);
        } catch (error) {
            console.error("Form submission error:", error);
            alert("Er is iets misgegaan. Probeer het later opnieuw.");
        }
    };

    const isFormValid = () => {
        const allFieldsFilled = requiredFields.every((field) => formData[field as keyof BookingsFormData]);
        const areErrorsValid = Object.values(fieldErrors).flat().length <= 0;

        return allFieldsFilled && areErrorsValid;
    };

    const handleClick = (
        inputRef: React.RefObject<HTMLInputElement | null>,
        event: React.MouseEvent<HTMLAnchorElement>,
    ) => {
        event.preventDefault();
        if (inputRef.current) {
            if (window.innerWidth > 992) {
                inputRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
            inputRef.current.focus();
        }
    };

    return (
        <div className={styles.bookingsContainer}>
            <div className={styles.bookingsWrapper}>
                <h2 data-main-title>Online boekingsformulier</h2>
                <form
                    onSubmit={(event) => handleSubmit(event, document.querySelector("form"))}
                    name="bookings-form"
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    className="form"
                    noValidate
                >
                    <input type="hidden" name="bot-field" />
                    <input type="hidden" name="form-name" value="bookings-form" />
                    <fieldset>
                        <legend>
                            Vul hieronder je gegevens in en wij nemen zo spoedig mogelijk contact met je op.
                        </legend>
                        <small>
                            (Velden aangegeven met een <span>*</span> zijn verplicht)
                        </small>
                        <div className="form-column">
                            <div className="form-group first-name">
                                <label
                                    htmlFor="firstName"
                                    className={focusedInput === "firstName" || formData.firstName ? "visited" : ""}
                                >
                                    Voornaam <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Voornaam *"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    ref={inputRef}
                                    onFocus={() => handleInputFocus("firstName")}
                                    autoComplete="given-name"
                                    className={
                                        fieldErrors.firstName && fieldErrors.firstName.length > 0 ? "error"
                                        : (
                                            (formData.firstName &&
                                                fieldErrors.firstName &&
                                                fieldErrors.firstName.length === 0) ||
                                            (fieldErrors.firstName === undefined && isFormSubmitted === true)
                                        ) ?
                                            "approved"
                                        :   ""
                                    }
                                />
                            </div>

                            <div className="form-group last-name">
                                <label
                                    htmlFor="lastName"
                                    className={focusedInput === "lastName" || formData.lastName ? "visited" : ""}
                                >
                                    Achternaam <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    placeholder="Achternaam *"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    onFocus={() => handleInputFocus("lastName")}
                                    autoComplete="family-name"
                                    className={
                                        fieldErrors.lastName && fieldErrors.lastName.length > 0 ? "error"
                                        : (
                                            (formData.lastName &&
                                                fieldErrors.lastName &&
                                                fieldErrors.lastName.length === 0) ||
                                            (fieldErrors.lastName === undefined && isFormSubmitted === true)
                                        ) ?
                                            "approved"
                                        :   ""
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-column collapse-five">
                            <div className="form-group email booking">
                                <label
                                    htmlFor="email"
                                    className={focusedInput === "email" || formData.email ? "visited" : ""}
                                >
                                    E-mailadres <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="E-mailadres *"
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    onFocus={() => handleInputFocus("email")}
                                    autoComplete="email"
                                    className={
                                        fieldErrors.email && fieldErrors.email.length > 0 ? "error"
                                        : (
                                            (formData.email && fieldErrors.email && fieldErrors.email.length === 0) ||
                                            (fieldErrors.email === undefined && isFormSubmitted === true)
                                        ) ?
                                            "approved"
                                        :   ""
                                    }
                                />
                            </div>

                            <div className="form-group phone booking">
                                <label
                                    htmlFor="phone"
                                    className={focusedInput === "phone" || formData.phone ? "visited" : ""}
                                >
                                    Telefoonnummer <span>*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    autoComplete="tel"
                                    placeholder="Telefoonnummer *"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    onFocus={() => handleInputFocus("phone")}
                                    className={
                                        fieldErrors.phone && fieldErrors.phone.length > 0 ? "error"
                                        : (
                                            (formData.phone && fieldErrors.phone && fieldErrors.phone.length === 0) ||
                                            (fieldErrors.phone === undefined && isFormSubmitted === true)
                                        ) ?
                                            "approved"
                                        :   ""
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-column">
                            <div className="form-group topic">
                                <div className="form-select">
                                    <label
                                        htmlFor="topic"
                                        className={focusedInput === "topic" || formData.topic ? "visited" : ""}
                                    >
                                        Kies onderwerp <span>*</span>
                                    </label>
                                    <select
                                        id="topic"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        onFocus={() => handleInputFocus("topic")}
                                        className={
                                            fieldErrors.topic && fieldErrors.topic.length > 0 ? "error"
                                            : (
                                                (formData.topic &&
                                                    fieldErrors.topic &&
                                                    fieldErrors.topic.length === 0) ||
                                                (fieldErrors.topic === undefined && isFormSubmitted === true)
                                            ) ?
                                                "approved"
                                            :   ""
                                        }
                                    >
                                        <option value="" disabled>
                                            Kies onderwerp *
                                        </option>
                                        <option value="boeking">Boeking / Offerte</option>
                                        <option value="vraag">Vraag / Opmerking</option>
                                    </select>
                                    <div className="arrow" />
                                </div>
                            </div>
                        </div>

                        <div className="form-column">
                            <div className="form-group message">
                                <label
                                    htmlFor="message"
                                    className={focusedInput === "message" || formData.message ? "visited" : ""}
                                >
                                    Bericht <span>*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Bericht *"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    onFocus={() => handleInputFocus("message")}
                                    className={
                                        fieldErrors.message && fieldErrors.message.length > 0 ? "error"
                                        : (
                                            (formData.message &&
                                                fieldErrors.message &&
                                                fieldErrors.message.length === 0) ||
                                            (fieldErrors.message === undefined && isFormSubmitted === true)
                                        ) ?
                                            "approved"
                                        :   ""
                                    }
                                ></textarea>
                            </div>
                        </div>
                    </fieldset>

                    <div className="form-submit">
                        <div>
                            {isFormValid() && (
                                <span className="form-submit-approved">Formulier is juist ingevuld..</span>
                            )}

                            {Object.values(fieldErrors).flat().length > 0 && (
                                <span className="form-submit-error">Actie vereist!</span>
                            )}

                            <button
                                type="submit"
                                disabled={Object.values(fieldErrors).flat().length > 0 || !isFormValid()}
                            >
                                Verstuur
                            </button>
                        </div>

                        {Object.values(fieldErrors).flat().length > 0 && (
                            <ul>
                                {Object.values(fieldErrors)
                                    .flat()
                                    .map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                            </ul>
                        )}
                    </div>
                </form>
            </div>
            <div data-main-content className={styles.bookingsInfo}>
                <h2 data-main-title>Boek Eternity Percussion</h2>
                <p>
                    <strong>
                        Eternity Percussion brengt de energie en kracht van Afro-Caribische percussie naar podia,
                        festivals en bijzondere gelegenheden. Met een krachtige combinatie van percussie, koperblazers,
                        ritme en performance verzorgen onze musici optredens die worden afgestemd op het publiek, de
                        locatie en de gelegenheid.
                    </strong>
                </p>
                <p>
                    Eternity heeft ruime podiumervaring in binnen- en buitenland en trad onder meer op in Nederland,
                    Curaçao, Suriname, Barbados, Engeland, Duitsland, de Verenigde Staten en Brazilië. Onze formaties
                    zijn inzetbaar voor festivals, culturele evenementen, bedrijfsbijeenkomsten, openingen, parades,
                    theaterproducties, bruiloften, herdenkingen, jubilea en andere bijzondere gelegenheden.
                </p>
                <h3>Formaties</h3>
                <p>
                    Afhankelijk van het programma en de gelegenheid stellen we een passende formatie samen. Eternity is
                    te boeken met 6 tot 10 musici, bestaande uit percussionisten en eventueel een koperblazerssectie.
                    Optredens kunnen bestaan uit één of meerdere sets van circa 10 tot 30 minuten. Voor producties,
                    evenementen en bijzondere projecten zijn ook andere vormen en maatwerk mogelijk.
                </p>
                <h3>Eternity boeken?</h3>
                <p>
                    Neem voor beschikbaarheid, mogelijkheden en tarieven contact met ons op via{" "}
                    <a href={`tel:+${mobileRaw}`} rel="noopener noreferrer" target="_blank">
                        06 242 55 391
                    </a>{" "}
                    of vraag vrijblijvend een offerte aan via het{" "}
                    <a href="#" onClick={(event) => handleClick(inputRef, event)}>
                        online boekingsformulier
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default BookingsForm;
