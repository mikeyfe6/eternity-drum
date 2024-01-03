import React, { useState } from 'react';

import { navigate } from 'gatsby';

import * as styles from '../styles/modules/newsletterform.module.scss';

import { validateNewsletterForm, NewsletterFormData } from './validation';

type FieldErrors = {
	[key: string]: string[];
};

const NewsletterForm: React.FC = () => {
	const [focusedInput, setFocusedInput] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

	const [formData, setFormData] = useState<NewsletterFormData>({
		firstName: '',
		lastName: '',
		email: '',
	});

	const requiredFields = ['firstName', 'lastName', 'email'];

	const handleInputFocus = (name: string) => {
		setFocusedInput(name);
	};

	const handleInputChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target;

		const updatedFieldErrors = { ...fieldErrors };
		updatedFieldErrors[name] =
			validateNewsletterForm({
				...formData,
				[name]: value,
			})[name] || [];

		setFieldErrors(updatedFieldErrors);

		setFormData({
			...formData,
			[name]: value,
		});

		event.target.classList.toggle('error', updatedFieldErrors[name].length > 0);
		event.target.classList.toggle(
			'approved',
			updatedFieldErrors[name].length === 0
		);
	};

	const handleInputBlur = () => {
		setFocusedInput(null);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const myForm = event.target as HTMLFormElement;
		const formData = new FormData(myForm);

		const encodedFormData = new URLSearchParams(formData as any).toString();

		try {
			const response = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: encodedFormData,
			});

			if (response.ok) {
				setIsFormSubmitted(true);

				setFormData({
					firstName: '',
					lastName: '',
					email: '',
				});

				setFieldErrors({});
				setFocusedInput(null);

				const formFields = document.querySelectorAll('.approved');
				formFields.forEach((field) => {
					field.classList.remove('approved');
				});

				navigate('/success');
			} else {
				throw new Error('Form submission failed');
			}
		} catch (error: any) {
			alert(error.message || 'An error occurred');
		}
	};

	const isFormValid = () => {
		const allFieldsFilled = requiredFields.every(
			(field) => formData[field as keyof NewsletterFormData]
		);
		const areErrorsValid = Object.values(fieldErrors).flat().length <= 0;

		return allFieldsFilled && areErrorsValid;
	};

	return (
		<div className={styles.newsletterWrapper}>
			<form
				onSubmit={handleSubmit}
				name='newsletter-form'
				method='post'
				data-netlify='true'
				data-netlify-honeypot='bot-field'
			>
				<input type='hidden' name='form-name' value='newsletter-form' />
				<fieldset>
					<legend>Schrijf je in voor onze nieuwsbrief</legend>
					<div className='form-column'>
						<div className='form-group first-name'>
							<label
								htmlFor='firstName'
								className={
									focusedInput === 'firstName' || formData.firstName
										? 'visited'
										: ''
								}
							>
								Voornaam
							</label>
							<input
								type='text'
								id='firstName'
								name='firstName'
								placeholder='Voornaam'
								autoComplete='given-name'
								value={formData.firstName}
								onChange={handleInputChange}
								onBlur={handleInputBlur}
								onFocus={() => handleInputFocus('firstName')}
								className={
									fieldErrors.firstName && fieldErrors.firstName.length > 0
										? 'error'
										: (formData.firstName &&
												fieldErrors.firstName &&
												fieldErrors.firstName.length === 0) ||
										  (fieldErrors.firstName === undefined &&
												isFormSubmitted === true)
										? 'approved'
										: ''
								}
							/>
						</div>

						<div className='form-group last-name'>
							<label
								htmlFor='lastName'
								className={
									focusedInput === 'lastName' || formData.lastName
										? 'visited'
										: ''
								}
							>
								Achternaam
							</label>
							<input
								type='text'
								id='lastName'
								name='lastName'
								placeholder='Achternaam'
								autoComplete='family-name'
								value={formData.lastName}
								onChange={handleInputChange}
								onBlur={handleInputBlur}
								onFocus={() => handleInputFocus('lastName')}
								className={
									fieldErrors.lastName && fieldErrors.lastName.length > 0
										? 'error'
										: (formData.lastName &&
												fieldErrors.lastName &&
												fieldErrors.lastName.length === 0) ||
										  (fieldErrors.lastName === undefined &&
												isFormSubmitted === true)
										? 'approved'
										: ''
								}
							/>
						</div>
					</div>

					<div className='form-column'>
						<div className='form-group email'>
							<label
								htmlFor='email'
								className={
									focusedInput === 'email' || formData.email ? 'visited' : ''
								}
							>
								E-mailadres
							</label>
							<input
								type='text'
								id='email'
								name='email'
								placeholder='E-mailadres'
								autoComplete='email'
								value={formData.email}
								onChange={handleInputChange}
								onBlur={handleInputBlur}
								onFocus={() => handleInputFocus('email')}
								className={
									fieldErrors.email && fieldErrors.email.length > 0
										? 'error'
										: (formData.email &&
												fieldErrors.email &&
												fieldErrors.email.length === 0) ||
										  (fieldErrors.email === undefined &&
												isFormSubmitted === true)
										? 'approved'
										: ''
								}
							/>
						</div>
					</div>
				</fieldset>
				<div className={styles.newsletterformSubmit}>
					<div>
						{isFormValid() && (
							<span className={styles.newsletterformSubmitApproved}>
								Formulier is juist ingevuld!
							</span>
						)}

						{Object.values(fieldErrors).flat().length > 0 && (
							<span className={styles.newsletterformSubmitError}>
								Actie vereist!
							</span>
						)}

						<button
							type='submit'
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
		</div>
	);
};

export default NewsletterForm;
