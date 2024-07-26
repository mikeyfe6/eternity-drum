import React, { useState, useRef } from 'react';

import { navigate } from 'gatsby';
import axios from 'axios';

import { useSiteMetadata } from '../hooks/use-site-metadata';

import * as styles from '../styles/modules/bookingsform.module.scss';

import { validateBookingsForm, BookingsFormData } from './validation';

type FieldErrors = {
	[key: string]: string[];
};

const BookingsForm: React.FC = () => {
	const { mobile } = useSiteMetadata();

	const [focusedInput, setFocusedInput] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

	const [formData, setFormData] = useState<BookingsFormData>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		topic: '',
		message: '',
	});

	const requiredFields = ['firstName', 'lastName', 'email', 'topic', 'message'];

	const inputRef = useRef<HTMLInputElement>(null);

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
			validateBookingsForm({
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

	const encode = (data: { [key: string]: string | null | undefined }) => {
		return Object.keys(data)
			.map(
				(key) =>
					encodeURIComponent(key) + '=' + encodeURIComponent(data[key] ?? '')
			)
			.join('&');
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
			(field) => formData[field as keyof BookingsFormData]
		);

		if (!allRequiredFieldsFilled) {
			alert('Vul aub alle verplichte velden in. Geen workarounds!');
			return;
		}

		const validationErrors = validateBookingsForm(formData);

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
			const formKeys: Array<keyof BookingsFormData> = [
				'firstName',
				'lastName',
				'email',
				'phone',
				'topic',
				'message',
			];

			formKeys.forEach((key) => {
				formDataParams.append(key, formData[key]);
			});

			await axios.post(
				'/',
				encode({
					'form-name': myForm?.getAttribute('name'),
					...formData,
				}),
				{
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				}
			);

			navigate('/success');

			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				topic: '',
				message: '',
			});

			setFieldErrors({});
			setFocusedInput(null);
			setIsFormSubmitted(false);
		} catch (error) {
			console.error('Form submission error:', error);
			alert('Er is iets misgegaan. Probeer het later opnieuw.');
		}
	};

	const isFormValid = () => {
		const allFieldsFilled = requiredFields.every(
			(field) => formData[field as keyof BookingsFormData]
		);
		const areErrorsValid = Object.values(fieldErrors).flat().length <= 0;

		return allFieldsFilled && areErrorsValid;
	};

	const handleClick = (
		inputRef: React.RefObject<HTMLInputElement>,
		event: React.MouseEvent<HTMLAnchorElement>
	) => {
		event.preventDefault();
		if (inputRef.current) {
			if (window.innerWidth > 992) {
				inputRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}
			inputRef.current.focus();
		}
	};

	return (
		<section>
			<div className={styles.bookingsformContainer}>
				<section className={styles.bookingsformWrapper}>
					<h2>Online boekingsformulier</h2>
					<form
						onSubmit={(event) =>
							handleSubmit(event, document.querySelector('form'))
						}
						name='bookings-form'
						method='post'
						data-netlify='true'
						data-netlify-honeypot='bot-field'
						noValidate>
						<input type='hidden' name='form-name' value='bookings-form' />
						<input type='hidden' name='bot-field' />
						<fieldset>
							<legend>
								Vul hieronder je gegevens in en wij nemen zo spoedig mogelijk
								contact met je op.
							</legend>
							<div className='form-column'>
								<div className='form-group first-name'>
									<label
										htmlFor='firstName'
										className={
											focusedInput === 'firstName' || formData.firstName
												? 'visited'
												: ''
										}>
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
										autoComplete='given-name'
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
										}>
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

							<div className='form-column collapse-four'>
								<div className='form-group email booking'>
									<label
										htmlFor='email'
										className={
											focusedInput === 'email' || formData.email
												? 'visited'
												: ''
										}>
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

								<div className='form-group phone booking'>
									<label
										htmlFor='phone'
										className={
											focusedInput === 'phone' || formData.phone
												? 'visited'
												: ''
										}>
										Telefoon
									</label>
									<input
										type='tel'
										id='phone'
										name='phone'
										autoComplete='tel'
										placeholder='Telefoon'
										value={formData.phone}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('phone')}
										className={
											fieldErrors.phone && fieldErrors.phone.length > 0
												? 'error'
												: (formData.phone &&
														fieldErrors.phone &&
														fieldErrors.phone.length === 0) ||
												  (fieldErrors.phone === undefined &&
														isFormSubmitted === true)
												? 'approved'
												: ''
										}
									/>
								</div>
							</div>

							<div className='form-column'>
								<div className='form-group topic'>
									<div className='form-select'>
										<label
											htmlFor='topic'
											className={
												focusedInput === 'topic' || formData.topic
													? 'visited'
													: ''
											}>
											Kies onderwerp
										</label>
										<select
											id='topic'
											name='topic'
											value={formData.topic}
											onChange={handleInputChange}
											onBlur={handleInputBlur}
											onFocus={() => handleInputFocus('topic')}
											className={
												fieldErrors.topic && fieldErrors.topic.length > 0
													? 'error'
													: (formData.topic &&
															fieldErrors.topic &&
															fieldErrors.topic.length === 0) ||
													  (fieldErrors.topic === undefined &&
															isFormSubmitted === true)
													? 'approved'
													: ''
											}>
											<option value='' disabled>
												Kies onderwerp
											</option>
											<option value='boeking'>Boeking / Offerte</option>
											<option value='vraag'>Vraag / Opmerking</option>
										</select>
										<div className='arrow' />
									</div>
								</div>
							</div>

							<div className='form-column'>
								<div className='form-group message'>
									<label
										htmlFor='message'
										className={
											focusedInput === 'message' || formData.message
												? 'visited'
												: ''
										}>
										Bericht
									</label>
									<textarea
										id='message'
										name='message'
										placeholder='Bericht'
										value={formData.message}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('message')}
										className={
											fieldErrors.message && fieldErrors.message.length > 0
												? 'error'
												: (formData.message &&
														fieldErrors.message &&
														fieldErrors.message.length === 0) ||
												  (fieldErrors.message === undefined &&
														isFormSubmitted === true)
												? 'approved'
												: ''
										}></textarea>
								</div>
							</div>
						</fieldset>

						<div className={styles.bookingsformSubmit}>
							<div>
								{isFormValid() && (
									<span className={styles.bookingsformSubmitApproved}>
										Formulier is juist ingevuld..
									</span>
								)}

								{Object.values(fieldErrors).flat().length > 0 && (
									<span className={styles.bookingsformSubmitError}>
										Actie vereist!
									</span>
								)}

								<button
									type='submit'
									disabled={
										Object.values(fieldErrors).flat().length > 0 ||
										!isFormValid()
									}>
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
				</section>
				<section data-main-content className={styles.bookingsformInfo}>
					<p>
						<strong>
							Drumband Eternity Percussion treedt op in zowel binnen- als
							buitenland. De afgelopen jaren heeft Eternity op verschillende
							grote evenementen en festivals in Nederland optredens verricht.
							Ook internationale optredens zoals op Curaçao, in Suriname,
							Engeland (Londen en Birmingham), Atlanta (USA) en Brazilië.
						</strong>
					</p>
					<p>
						In juli 2006 heeft Eternity de prijs gewonnen van Beste Brassband
						Ortel Zomercarnaval 2006. Een vakkundige jury heeft Eternity
						beoordeelt op de hoge kwaliteit van ritme, muziek, juiste harmonie
						en gevarieerde show.
					</p>
					<p>
						Wij zijn in te huren voor; <u>bedrijfsevenementen</u>,{' '}
						<u>begrafenissen</u>, <u>bruiloften</u>, <u>jubilea</u>,{' '}
						<u>openingen</u>, <u>parades</u>, <u>theatervoorstellingen</u> en{' '}
						<u>verjaardagen</u>. Het repertoire wordt afgestemd op het publiek
						en de gelegenheid.
					</p>
					<p>
						Wij leveren formaties van{' '}
						<strong>
							minimaal 6 en maximaal 15 drummers inclusief de blazerssectie
						</strong>{' '}
						voor setjes van 10 tot maximaal 30 min (Je kunt ook meerdere setjes
						boeken).
					</p>
					<p>
						Voor meer informatie kan je telefonisch contact opnemen via:{' '}
						<a
							href={`tel:+${mobile}`}
							rel='noopener noreferrer'
							target='_blank'>
							06 242 55 391
						</a>{' '}
						of een offerte opvragen via het{' '}
						<a href='#' onClick={(event) => handleClick(inputRef, event)}>
							online boekingsformulier
						</a>
						.{' '}
					</p>
				</section>
			</div>
		</section>
	);
};

export default BookingsForm;
