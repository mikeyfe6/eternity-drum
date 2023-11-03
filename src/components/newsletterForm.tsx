import * as React from 'react';

import { navigate } from 'gatsby';
import axios from 'axios';

import * as styles from '../styles/modules/newsletterform.module.scss';

import { validateNewsletterForm, NewsletterFormData } from './validation';

type FieldErrors = {
	[key: string]: string[];
};

const NewsletterForm: React.FC = () => {
	const [formData, setFormData] = React.useState<NewsletterFormData>({
		firstName: '',
		lastName: '',
		email: '',
	});

	const requiredFields = ['firstName', 'lastName', 'email'];

	const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});

	const [errors, setErrors] = React.useState<string[]>([]);

	const [emptyFields, setEmptyFields] = React.useState<string[]>([]);
	const [focusedInput, setFocusedInput] = React.useState<string | null>(null);

	const handleInputFocus = (name: string) => {
		setFocusedInput(name);
	};

	React.useEffect(() => {
		for (const field in formData) {
			if (formData.hasOwnProperty(field)) {
				const value = formData[field as keyof typeof formData];

				if (value && value.trim() !== '') {
					const fieldErrors = validateNewsletterForm({
						...formData,
						[field]: value,
					});

					if (fieldErrors[field]) {
						setErrors([...fieldErrors[field]]);
					}
				}
			}
		}
	}, [formData]);

	const handleInputChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target;

		const updatedEmptyFields = emptyFields.filter((field) => field !== name);

		const newValidationErrors = validateNewsletterForm({
			...formData,
			[name]: value,
		});

		const updatedFieldErrors = { ...fieldErrors };
		const errorMessages = newValidationErrors[name] || [];

		updatedFieldErrors[name] = errorMessages;

		setFieldErrors(updatedFieldErrors);

		setFormData({
			...formData,
			[name]: value,
		});

		event.target.classList.toggle('error', errorMessages.length > 0);
		event.target.classList.toggle('approved', errorMessages.length === 0);

		const allErrors = Object.values(updatedFieldErrors).flat();
		setErrors(allErrors);

		setEmptyFields(updatedEmptyFields);
	};

	const handleInputBlur = () => {
		setFocusedInput(null);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const validationErrors = validateNewsletterForm(formData);

		const missingFields = requiredFields.filter((field) => {
			const value = formData[field as keyof typeof formData];
			return value === undefined || value.trim() === '';
		});

		setEmptyFields(missingFields);

		const errorMessages = Object.values(validationErrors).flatMap(
			(error) => error
		);

		setErrors(errorMessages);

		if (errorMessages.length > 0 || missingFields.length > 0) {
			setErrors(errorMessages);
		} else {
			try {
				setErrors([]);
				const response = await axios.post(
					'/.netlify/functions/sendmail',
					formData
				);
				console.log(
					'Eternity Percussion; [Form submitted successfully]',
					response.data
				);
				navigate('/success');
			} catch (error) {
				console.error('Eternity Percussion; [Form submission error]', error);
				alert('Er is iets misgegaan. Probeer het later opnieuw.');
			}
		}

		if (errorMessages.length === 0) {
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
			});

			setEmptyFields([]);
			removeApprovedClasses();
		}
	};

	const removeApprovedClasses = () => {
		const elements = document.querySelectorAll('.approved');
		elements.forEach((element) => {
			element.classList.remove('approved');
		});
	};

	const isFormValid = () => {
		const allFieldsFilled = requiredFields.every(
			(field) => formData[field as keyof NewsletterFormData]
		);
		const areErrorsValid = errors.length <= 0;

		return allFieldsFilled && areErrorsValid;
	};

	return (
		<div className={styles.newsletterWrapper}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>Schrijf je in voor onze nieuwsbrief</legend>
					<div className='form-column'>
						<div className='form-group firstName'>
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
								value={formData.firstName}
								onChange={handleInputChange}
								onBlur={handleInputBlur}
								onFocus={() => handleInputFocus('firstName')}
								autoComplete='given-name'
								className={emptyFields.includes('firstName') ? 'error' : ''}
							/>
						</div>

						<div className='form-group lastName'>
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
								value={formData.lastName}
								placeholder='Achternaam'
								onChange={handleInputChange}
								onBlur={handleInputBlur}
								onFocus={() => handleInputFocus('lastName')}
								autoComplete='family-name'
								className={emptyFields.includes('lastName') ? 'error' : ''}
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
								value={formData.email}
								placeholder='E-mailadres'
								onChange={handleInputChange}
								onBlur={handleInputBlur}
								onFocus={() => handleInputFocus('email')}
								autoComplete='email'
								className={emptyFields.includes('email') ? 'error' : ''}
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

						{errors.length > 0 && (
							<span className={styles.newsletterformSubmitError}>
								Actie vereist!
							</span>
						)}

						<button type='submit' disabled={errors.length > 0}>
							Schrijf in
						</button>
					</div>

					{errors.length > 0 && (
						<ul>
							{errors.map((error, index) => (
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
