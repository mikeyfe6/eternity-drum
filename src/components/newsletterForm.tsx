import * as React from 'react';

import { navigate } from 'gatsby';
import axios from 'axios';

import * as styles from '../styles/modules/newsletterform.module.scss';

import { validateNewsletterForm, NewsletterFormData } from './validation';

const NewsletterForm: React.FC = () => {
	const [formData, setFormData] = React.useState<NewsletterFormData>({
		firstName: '',
		lastName: '',
		email: '',
	});

	const requiredFields = ['firstName', 'lastName', 'email'];

	const [errors, setErrors] = React.useState<string[]>([]);
	const [submitted, setSubmitted] = React.useState(false);
	const [emptyFields, setEmptyFields] = React.useState<string[]>([]);
	const [focusedInput, setFocusedInput] = React.useState<string | null>(null);

	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleInputFocus = (name: string) => {
		setFocusedInput(name);
	};

	const handleInputChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target;

		const updatedEmptyFields = emptyFields.filter((field) => field !== name);

		if (submitted) {
			const newValidationErrors = validateNewsletterForm({
				...formData,
				[name]: value,
			});

			setErrors(newValidationErrors);
		}

		setFormData({
			...formData,
			[name]: value,
		});

		if (value.trim() === '') {
			if (!emptyFields.includes(name)) {
				updatedEmptyFields.push(name);
			}

			event.target.classList.remove('approved');
			event.target.classList.add('error');
		} else {
			event.target.classList.remove('error');
			event.target.classList.add('approved');
		}

		setEmptyFields(updatedEmptyFields);
	};

	const handleInputBlur = () => {
		setFocusedInput(null);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		setSubmitted(true);

		const validationErrors = validateNewsletterForm(formData);

		const missingFields = requiredFields.filter((field) => {
			const value = formData[field as keyof typeof formData];
			return value === undefined || value.trim() === '';
		});

		setEmptyFields(missingFields);

		if (validationErrors.length > 0 || missingFields.length > 0) {
			setErrors(validationErrors);
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

		if (validationErrors.length === 0) {
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
			});

			setEmptyFields([]);
			removeApprovedClasses();
		}
	};

	React.useEffect(() => {
		const addApprovedClassForField = (name: string) => {
			const inputElement = document.getElementById(name) as HTMLInputElement;
			if (inputElement && inputElement.value.trim() !== '') {
				inputElement.classList.add('approved');
			}
		};

		for (const field of requiredFields) {
			addApprovedClassForField(field);
		}
	}, [formData, requiredFields]);

	const removeApprovedClasses = () => {
		const elements = document.querySelectorAll('.approved');
		elements.forEach((element) => {
			element.classList.remove('approved');
		});
	};

	const isFormValid = () => {
		const allFieldsFilled = requiredFields.every(
			(field) => formData[field as keyof typeof formData]
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
								ref={inputRef}
								onFocus={() => handleInputFocus('firstName')}
								autoComplete='name'
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
								autoComplete='name'
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
