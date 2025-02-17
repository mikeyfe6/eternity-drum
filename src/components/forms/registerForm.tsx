import React, { useState, useEffect } from "react";

import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

import { validateRegisterForm, RegisterFormData } from "../auth/validation";

import * as styles from "../../styles/modules/forms/registerform.module.scss";

interface RegisterFormProps {
	inputRef: React.RefObject<HTMLInputElement | null>;
}

type FieldErrors = {
	[key: string]: string[];
};

export const handleClick = (
	inputRef: React.RefObject<HTMLInputElement | null>,
	event: React.MouseEvent<HTMLAnchorElement>
) => {
	event.preventDefault();
	if (inputRef.current) {
		inputRef.current.focus();
	}
};

const RegisterForm: React.FC<RegisterFormProps> = ({ inputRef }) => {
	const [focusedInput, setFocusedInput] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

	const [isOlderThan18, setIsOlderThan18] = useState(true);

	const [formData, setFormData] = useState<RegisterFormData>({
		firstName: "",
		lastName: "",

		streetName: "",
		houseNumber: "",
		zipCode: "",

		city: "",
		province: "",

		email: "",

		dayOfBirth: "",
		monthOfBirth: "",
		yearOfBirth: "",

		gender: "",
		phone: "",
		discover: "",
		comments: "",
		other: "",

		firstNameParent: "",
		lastNameParent: "",
		emailParent: "",
		phoneParent: "",
	});

	const requiredFields = [
		"firstName",
		"lastName",

		"streetName",
		"houseNumber",
		"zipCode",

		"city",
		"province",

		"email",

		"phone",

		"dayOfBirth",
		"monthOfBirth",
		"yearOfBirth",
	];

	if (!isOlderThan18) {
		requiredFields.push(
			"firstNameParent",
			"lastNameParent",
			"emailParent",
			"phoneParent"
		);
	}

	const handleInputFocus = (name: string) => {
		if (
			name === "dayOfBirth" ||
			name === "monthOfBirth" ||
			name === "yearOfBirth"
		) {
			setFocusedInput("dateOfBirth");
		} else {
			setFocusedInput(name);
		}
	};

	const handleDateChange = (name: string, value: string) => {
		setFormData({
			...formData,
			[name]: value,
		});

		if (value.trim() !== "") {
			const inputElement = document.getElementById(name);
			if (inputElement) {
				inputElement.classList.add("approved");
			}
		}
	};

	const handleInputChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target;

		const updatedFieldErrors = { ...fieldErrors };
		updatedFieldErrors[name] =
			validateRegisterForm(
				{
					...formData,
					[name]: value,
				},
				isOlderThan18
			)[name] || [];

		setFieldErrors(updatedFieldErrors);

		setFormData({
			...formData,
			[name]: value,
		});

		event.target.classList.toggle("error", updatedFieldErrors[name].length > 0);
		event.target.classList.toggle(
			"approved",
			updatedFieldErrors[name].length === 0
		);
	};

	const handleInputBlur = () => {
		setFocusedInput(null);
	};

	const encode = (data: { [key: string]: string | null | undefined }) => {
		return Object.keys(data)
			.map(
				(key) =>
					encodeURIComponent(key) + "=" + encodeURIComponent(data[key] ?? "")
			)
			.join("&");
	};

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
		myForm: HTMLFormElement | null
	) => {
		event.preventDefault();

		if (myForm !== null) {
			myForm.reset();
		}

		const allRequiredFieldsFilled = requiredFields.every(
			(field) => formData[field as keyof RegisterFormData]
		);

		if (!allRequiredFieldsFilled) {
			alert("Vul aub alle verplichte velden in. Geen workarounds!");
			return;
		}

		const validationErrors = validateRegisterForm(formData, isOlderThan18);

		setFieldErrors(validationErrors);

		const errorMessages = Object.values(validationErrors).flatMap(
			(error) => error
		);

		if (errorMessages.length > 0) {
			return;
		}

		setIsFormSubmitted(true);

		try {
			const formDataParams = new URLSearchParams();
			const formKeys: Array<keyof RegisterFormData> = [
				"firstName",
				"lastName",
				"streetName",
				"houseNumber",
				"zipCode",
				"city",
				"province",
				"email",
				"dayOfBirth",
				"monthOfBirth",
				"yearOfBirth",
				"gender",
				"phone",
				"discover",
				"comments",
				"other",
			];

			if (!isOlderThan18) {
				formKeys.push(
					"firstNameParent",
					"lastNameParent",
					"emailParent",
					"phoneParent"
				);
			}

			formKeys.forEach((key) => {
				formDataParams.append(key, formData[key] ?? "");
			});

			await axios.post(
				"/",
				encode({
					"form-name": myForm?.getAttribute("name"),
					...formData,
				}),
				{
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
				}
			);

			navigate("/success");

			setFormData({
				firstName: "",
				lastName: "",
				streetName: "",
				houseNumber: "",
				zipCode: "",
				city: "",
				province: "",
				email: "",
				dayOfBirth: "",
				monthOfBirth: "",
				yearOfBirth: "",
				gender: "",
				phone: "",
				firstNameParent: "",
				lastNameParent: "",
				emailParent: "",
				phoneParent: "",
				discover: "",
				comments: "",
				other: "",
			});

			setFieldErrors({});
			setFocusedInput(null);
			setIsFormSubmitted(false);
		} catch (error) {
			console.error("Form submission error:", error);
			alert("Er is iets misgegaan. Probeer het later opnieuw.");
		}
	};

	useEffect(() => {
		if (formData.dayOfBirth && formData.monthOfBirth && formData.yearOfBirth) {
			const dobYear = parseInt(formData.yearOfBirth, 10);
			const dobMonth = parseInt(formData.monthOfBirth, 10) - 1;
			const dobDay = parseInt(formData.dayOfBirth, 10);

			const dob = new Date(dobYear, dobMonth, dobDay);
			const today = new Date();

			let age = today.getFullYear() - dob.getFullYear();

			if (
				today.getMonth() < dobMonth ||
				(today.getMonth() === dobMonth && today.getDate() < dobDay)
			) {
				age--;
			}

			setIsOlderThan18(age >= 18);
		} else {
			setIsOlderThan18(true);
		}
	}, [formData.dayOfBirth, formData.monthOfBirth, formData.yearOfBirth]);

	useEffect(() => {
		if (formData.discover === "Overig") {
			const inputElement = document.getElementById("other") as HTMLInputElement;
			if (inputElement && inputElement.value.trim() !== "") {
				inputElement.classList.add("approved");
			}
		}
	}, [formData]);

	const isFormValid = () => {
		const allFieldsFilled = requiredFields.every(
			(field) => formData[field as keyof RegisterFormData]
		);
		const areErrorsValid = Object.values(fieldErrors).flat().length <= 0;

		return allFieldsFilled && areErrorsValid;
	};

	const { pathname } = useLocation();

	return (
		<section>
			<div className={styles.registerformWrapper}>
				<h2>Online inschrijfformulier</h2>
				<span>
					Vul hieronder jouw gegevens in en wij nemen zo spoedig mogelijk
					contact met je op.
				</span>
				<form
					onSubmit={(event) =>
						handleSubmit(event, document.querySelector("form"))
					}
					name="register-form"
					method="post"
					data-netlify="true"
					data-netlify-honeypot="bot-field"
					noValidate
				>
					<input type="hidden" name="form-name" value="register-form" />

					<fieldset>
						<legend>Gegevens cursist:</legend>

						<div className="form-column">
							<div className="form-group first-name">
								<label
									htmlFor="firstName"
									className={
										focusedInput === "firstName" || formData.firstName
											? "visited"
											: ""
									}
								>
									Voornaam
								</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									placeholder="Voornaam"
									ref={inputRef}
									value={formData.firstName}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("firstName")}
									className={
										fieldErrors.firstName && fieldErrors.firstName.length > 0
											? "error"
											: (formData.firstName &&
													fieldErrors.firstName &&
													fieldErrors.firstName.length === 0) ||
											  (fieldErrors.firstName === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>

							<div className="form-group last-name">
								<label
									htmlFor="lastName"
									className={
										focusedInput === "lastName" || formData.lastName
											? "visited"
											: ""
									}
								>
									Achternaam
								</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									placeholder="Achternaam"
									value={formData.lastName}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("lastName")}
									className={
										fieldErrors.lastName && fieldErrors.lastName.length > 0
											? "error"
											: (formData.lastName &&
													fieldErrors.lastName &&
													fieldErrors.lastName.length === 0) ||
											  (fieldErrors.lastName === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>
						</div>

						<div className="form-column collapse-one">
							<div className="form-group street-name">
								<label
									htmlFor="streetName"
									className={
										focusedInput === "streetName" || formData.streetName
											? "visited"
											: ""
									}
								>
									Straatnaam
								</label>
								<input
									type="text"
									id="streetName"
									name="streetName"
									placeholder="Straatnaam"
									autoComplete="street-address"
									value={formData.streetName}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("streetName")}
									className={
										fieldErrors.streetName && fieldErrors.streetName.length > 0
											? "error"
											: (formData.streetName &&
													fieldErrors.streetName &&
													fieldErrors.streetName.length === 0) ||
											  (fieldErrors.streetName === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>

							<div className="form-group house-number">
								<label
									htmlFor="houseNumber"
									className={
										focusedInput === "houseNumber" || formData.houseNumber
											? "visited"
											: ""
									}
								>
									Huisnr.
								</label>
								<input
									type="text"
									id="houseNumber"
									name="houseNumber"
									placeholder="Huisnr."
									value={formData.houseNumber}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("houseNumber")}
									className={
										fieldErrors.houseNumber &&
										fieldErrors.houseNumber.length > 0
											? "error"
											: (formData.houseNumber &&
													fieldErrors.houseNumber &&
													fieldErrors.houseNumber.length === 0) ||
											  (fieldErrors.houseNumber === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>
							<div className="form-group zip-code">
								<label
									htmlFor="zipCode"
									className={
										focusedInput === "zipCode" || formData.zipCode
											? "visited"
											: ""
									}
								>
									Postcode
								</label>
								<input
									type="text"
									id="zipCode"
									name="zipCode"
									placeholder="Postcode"
									value={formData.zipCode}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("zipCode")}
									className={
										fieldErrors.zipCode && fieldErrors.zipCode.length > 0
											? "error"
											: (formData.zipCode &&
													fieldErrors.zipCode &&
													fieldErrors.zipCode.length === 0) ||
											  (fieldErrors.zipCode === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>
						</div>

						<div className="form-column">
							<div className="form-group city">
								<label
									htmlFor="city"
									className={
										focusedInput === "city" || formData.city ? "visited" : ""
									}
								>
									Woonplaats
								</label>
								<input
									type="text"
									id="city"
									name="city"
									placeholder="Woonplaats"
									value={formData.city}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("city")}
									className={
										fieldErrors.city && fieldErrors.city.length > 0
											? "error"
											: (formData.city &&
													fieldErrors.city &&
													fieldErrors.city.length === 0) ||
											  (fieldErrors.city === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>

							<div className="form-group province">
								<label
									htmlFor="province"
									className={
										focusedInput === "province" || formData.province
											? "visited"
											: ""
									}
								>
									Provincie
								</label>
								<input
									type="text"
									id="province"
									name="province"
									placeholder="Provincie"
									value={formData.province}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("province")}
									className={
										fieldErrors.province && fieldErrors.province.length > 0
											? "error"
											: (formData.province &&
													fieldErrors.province &&
													fieldErrors.province.length === 0) ||
											  (fieldErrors.province === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>
						</div>

						<div className="form-column collapse-two">
							<div className="form-group email">
								<label
									htmlFor="email"
									className={
										focusedInput === "email" || formData.email ? "visited" : ""
									}
								>
									E-mailadres
								</label>
								<input
									type="email"
									id="email"
									name="email"
									autoComplete="email"
									placeholder="E-mailadres"
									value={formData.email}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("email")}
									className={
										fieldErrors.email && fieldErrors.email.length > 0
											? "error"
											: (formData.email &&
													fieldErrors.email &&
													fieldErrors.email.length === 0) ||
											  (fieldErrors.email === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>

							<div className="form-group gender">
								<div className="form-select">
									<label
										htmlFor="gender"
										className={
											focusedInput === "gender" || formData.gender
												? "visited"
												: ""
										}
									>
										Geslacht
									</label>
									<select
										id="gender"
										name="gender"
										value={formData.gender}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus("gender")}
									>
										<option value="" disabled>
											Geslacht
										</option>
										<option value="male">Man</option>
										<option value="female">Vrouw</option>
										<option value="other">Anders</option>
									</select>
									<div className="arrow" />
								</div>
							</div>
						</div>

						<div className="form-column collapse-three">
							<div className="form-group phone">
								<label
									htmlFor="phone"
									className={
										focusedInput === "phone" || formData.phone ? "visited" : ""
									}
								>
									Telefoon
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									autoComplete="tel"
									placeholder="Telefoon"
									value={formData.phone}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("phone")}
									className={
										fieldErrors.phone && fieldErrors.phone.length > 0
											? "error"
											: (formData.phone &&
													fieldErrors.phone &&
													fieldErrors.phone.length === 0) ||
											  (fieldErrors.phone === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>

							<div className="form-group date-of-birth">
								<label
									htmlFor="dateOfBirth"
									className={
										focusedInput === "dateOfBirth" ||
										formData.dayOfBirth ||
										formData.monthOfBirth ||
										formData.yearOfBirth
											? "visited"
											: ""
									}
								>
									Geboortedatum
								</label>
								<div className="date-inputs">
									<label htmlFor="dayOfBirth" hidden>
										Geboortedag
									</label>
									<select
										id="day-of-birth"
										name="dayOfBirth"
										value={formData.dayOfBirth}
										onChange={(event) =>
											handleDateChange("dayOfBirth", event.target.value)
										}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus("dayOfBirth")}
										className={
											fieldErrors.dayOfBirth &&
											fieldErrors.dayOfBirth.length > 0
												? "error"
												: (formData.dayOfBirth &&
														fieldErrors.dayOfBirth &&
														fieldErrors.dayOfBirth.length === 0) ||
												  (fieldErrors.dayOfBirth === undefined &&
														isFormSubmitted === true)
												? "approved"
												: ""
										}
									>
										<option value="" disabled>
											Dag
										</option>
										{Array.from({ length: 31 }, (_, i) => (
											<option key={i} value={i + 1}>
												{i + 1}
											</option>
										))}
									</select>
									<label htmlFor="monthOfBirth" hidden>
										Geboortemaand
									</label>
									<select
										id="month-of-birth"
										name="monthOfBirth"
										value={formData.monthOfBirth}
										onChange={(event) =>
											handleDateChange("monthOfBirth", event.target.value)
										}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus("monthOfBirth")}
										className={
											fieldErrors.monthOfBirth &&
											fieldErrors.monthOfBirth.length > 0
												? "error"
												: (formData.monthOfBirth &&
														fieldErrors.monthOfBirth &&
														fieldErrors.monthOfBirth.length === 0) ||
												  (fieldErrors.monthOfBirth === undefined &&
														isFormSubmitted === true)
												? "approved"
												: ""
										}
									>
										<option value="" disabled>
											Maand
										</option>
										{[
											"Januari",
											"Februari",
											"Maart",
											"April",
											"Mei",
											"Juni",
											"Juli",
											"Augustus",
											"September",
											"Oktober",
											"November",
											"December",
										].map((month, index) => (
											<option key={index} value={index + 1}>
												{month}
											</option>
										))}
									</select>
									<label htmlFor="yearOfBirth" hidden>
										Geboortejaar
									</label>
									<select
										id="year-of-birth"
										name="yearOfBirth"
										value={formData.yearOfBirth}
										onChange={(event) =>
											handleDateChange("yearOfBirth", event.target.value)
										}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus("yearOfBirth")}
										className={
											fieldErrors.yearOfBirth &&
											fieldErrors.yearOfBirth.length > 0
												? "error"
												: (formData.yearOfBirth &&
														fieldErrors.yearOfBirth &&
														fieldErrors.yearOfBirth.length === 0) ||
												  (fieldErrors.yearOfBirth === undefined &&
														isFormSubmitted === true)
												? "approved"
												: ""
										}
									>
										<option value="" disabled>
											Jaar
										</option>
										{Array.from({ length: 100 }, (_, i) => (
											<option key={i} value={new Date().getFullYear() - i}>
												{new Date().getFullYear() - i}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>

						<div
							className="form-column"
							style={{
								marginBottom:
									formData.discover === "Overig" ? "1em" : "revert-layer",
							}}
						>
							<div className="form-group discover">
								<div className="form-select">
									<label
										htmlFor="discover"
										className={
											focusedInput === "discover" || formData.discover
												? "visited"
												: ""
										}
									>
										Hoe ben je bij ons terecht gekomen?
									</label>
									<select
										id="discover"
										name="discover"
										value={formData.discover}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus("discover")}
									>
										<option value="" disabled>
											Hoe ben je bij ons terecht gekomen?
										</option>
										<option value="Via Social Media (Facebook, Instagram, Etc)">
											Via Social Media (Facebook, Instagram, Etc)
										</option>
										<option value="Via Google, Bing of een andere zoekmachine">
											Via Google, Bing of een andere zoekmachine
										</option>
										<option value="Via een vriend(in), kennis, collega of familielid">
											Via een vriend(in), kennis, collega of familielid
										</option>
										<option value="Via eerdere workshops (bijv. de Eternity Summerschool)">
											Via eerdere workshops (bijv. de Eternity Summerschool)
										</option>
										<option value="U heeft ons eerder zien/horen spelen">
											Ik heb jullie eerder zien/horen spelen
										</option>
										<option value="Overig">
											Op een andere manier, namelijk:
										</option>
									</select>
									<div className="arrow" />
								</div>
							</div>
						</div>

						<div
							className="form-column"
							style={{
								display: formData.discover === "Overig" ? "block" : " none",
							}}
						>
							<div className="form-group other">
								<label htmlFor="other">Meer info..</label>
								<input
									type="text"
									id="other"
									name="other"
									placeholder="..."
									value={formData.other}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("other")}
								/>
							</div>
						</div>

						<div className="form-column">
							<div className="form-group comments">
								<label
									htmlFor="comments"
									className={
										focusedInput === "comments" || formData.comments
											? "visited"
											: ""
									}
								>
									Heb je nog opmerkingen?
								</label>
								<textarea
									id="comments"
									name="comments"
									placeholder="Heb je nog opmerkingen?"
									value={formData.comments}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("comments")}
								></textarea>
							</div>
						</div>
					</fieldset>

					{!isOlderThan18 && (
						<span>
							Jonger dan 18? Vul hieronder de gegevens van jouw ouders/voogd in.
						</span>
					)}

					<fieldset style={{ display: isOlderThan18 ? "none" : " block" }}>
						<legend>Gegevens ouders/voogd:</legend>

						<div className="form-column">
							<div className="form-group first-name-parent">
								<label
									htmlFor="firstNameParent"
									className={
										focusedInput === "firstNameParent" ||
										formData.firstNameParent
											? "visited"
											: ""
									}
								>
									Voornaam (ouders/voogd)
								</label>
								<input
									type="text"
									id="firstNameParent"
									name="firstNameParent"
									placeholder="Voornaam (ouders/voogd)"
									value={formData.firstNameParent}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("firstNameParent")}
									className={
										fieldErrors.firstNameParent &&
										fieldErrors.firstNameParent.length > 0
											? "error"
											: (formData.firstNameParent &&
													fieldErrors.firstNameParent &&
													fieldErrors.firstNameParent.length === 0) ||
											  (fieldErrors.firstNameParent === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>

							<div className="form-group last-name-parent">
								<label
									htmlFor="lastNameParent"
									className={
										focusedInput === "lastNameParent" || formData.lastNameParent
											? "visited"
											: ""
									}
								>
									Achternaam (ouders/voogd)
								</label>
								<input
									type="text"
									id="lastNameParent"
									name="lastNameParent"
									placeholder="Achternaam (ouders/voogd)"
									value={formData.lastNameParent}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("lastNameParent")}
									className={
										fieldErrors.lastNameParent &&
										fieldErrors.lastNameParent.length > 0
											? "error"
											: (formData.lastNameParent &&
													fieldErrors.lastNameParent &&
													fieldErrors.lastNameParent.length === 0) ||
											  (fieldErrors.lastNameParent === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>
						</div>

						<div className="form-column">
							<div className="form-group email-parent">
								<label
									htmlFor="emailParent"
									className={
										focusedInput === "emailParent" || formData.emailParent
											? "visited"
											: ""
									}
								>
									E-mailadres (ouders/voogd)
								</label>
								<input
									id="emailParent"
									type="email"
									name="emailParent"
									placeholder="E-mailadres (ouders/voogd)"
									value={formData.emailParent}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("emailParent")}
									className={
										fieldErrors.emailParent &&
										fieldErrors.emailParent.length > 0
											? "error"
											: (formData.emailParent &&
													fieldErrors.emailParent &&
													fieldErrors.emailParent.length === 0) ||
											  (fieldErrors.emailParent === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>

							<div className="form-group phone-parent">
								<label
									htmlFor="phoneParent"
									className={
										focusedInput === "phoneParent" || formData.phoneParent
											? "visited"
											: ""
									}
								>
									Telefoonnummer (ouders/voogd)
								</label>
								<input
									type="tel"
									id="phoneParent"
									name="phoneParent"
									placeholder="Telefoonnummer (ouders/voogd)"
									value={formData.phoneParent}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus("phoneParent")}
									className={
										fieldErrors.phoneParent &&
										fieldErrors.phoneParent.length > 0
											? "error"
											: (formData.phoneParent &&
													fieldErrors.phoneParent &&
													fieldErrors.phoneParent.length === 0) ||
											  (fieldErrors.phoneParent === undefined &&
													isFormSubmitted === true)
											? "approved"
											: ""
									}
								/>
							</div>
						</div>
					</fieldset>

					<div className={styles.registerformSubmit}>
						<div>
							{isFormValid() && (
								<span className={styles.registerformSubmitApproved}>
									Formulier is juist ingevuld!
								</span>
							)}

							{Object.values(fieldErrors).flat().length > 0 && (
								<span className={styles.registerformSubmitError}>
									Actie vereist!
								</span>
							)}

							<button
								type="submit"
								disabled={
									Object.values(fieldErrors).flat().length > 0 || !isFormValid()
								}
							>
								Schrijf in
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

				<div className={styles.registerformConditions}>
					<p>
						<strong>Voorwaarden:</strong>
					</p>
					<ul>
						<li>
							Eternity Percussion kan niet aansprakelijk worden gesteld voor
							enig lichamelijk letsel, schade of vermissing van eigendom tijdens
							de lessen en/of repetities
						</li>
						{pathname.includes("drumworkshops") ? (
							<>
								<li>
									Het lesgeld dient aan het begin van elke maand op de rekening
									van Eternity Percussion worden over gemaakt
								</li>
								<li>
									De opzegtermijn bedraagt minimaal een maand en dient via email
									info@eternitydrum.com te worden doorgegeven
								</li>
							</>
						) : null}
					</ul>
					<p>
						<strong>Let op !</strong>
					</p>
					<ul>
						<li>Vul het inschrijfformulier volledig in</li>
					</ul>

					<p>
						<u>
							Door invulling en het versturen van dit formulier, stem je
							automatisch in met de voorwaarden en huisregels van Eternity
							Percussion
						</u>
					</p>
				</div>
			</div>
		</section>
	);
};

export default RegisterForm;
