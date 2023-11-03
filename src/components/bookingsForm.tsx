import * as React from 'react';

import { navigate } from 'gatsby';
import axios from 'axios';

import * as styles from '../styles/modules/bookingsform.module.scss';

import { validateBookingsForm, BookingsFormData } from './validation';

type FieldErrors = {
	[key: string]: string[];
};

const BookingsForm: React.FC = () => {
	const [focusedInput, setFocusedInput] = React.useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});

	const [isFormSubmitted, setIsFormSubmitted] = React.useState<boolean>(false);

	const [formData, setFormData] = React.useState<BookingsFormData>({
		firstName: '',
		lastName: '',
		email: '',
		subject: '',
		message: '',
	});

	const requiredFields = [
		'firstName',
		'lastName',
		'email',
		'subject',
		'message',
	];

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

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const validationErrors = validateBookingsForm(formData);

		const errorMessages = Object.values(validationErrors).flatMap(
			(error) => error
		);

		setFieldErrors(validationErrors);

		if (errorMessages.length > 0) {
			return;
		}

		setIsFormSubmitted(true);

		try {
			const response = await axios.post(
				'/.netlify/functions/sendmail',
				formData
			);
			console.log(
				'Eternity Percussion; [Form submitted successfully]',
				response.data
			);
			navigate('/success');

			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				subject: '',
				message: '',
			});

			setFieldErrors({});

			setFocusedInput(null);
		} catch (error) {
			console.error('Eternity Percussion; [Form submission error]', error);
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
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend>
								Vul hieronder uw gegevens in en wij nemen zo spoedig mogelijk
								contact met je op.
							</legend>
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
											focusedInput === 'email' || formData.email
												? 'visited'
												: ''
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

							<div className='form-column'>
								<div className='form-group subject'>
									<div className='form-select'>
										<label
											htmlFor='subject'
											className={
												focusedInput === 'subject' || formData.subject
													? 'visited'
													: ''
											}
										>
											Kies onderwerp
										</label>
										<select
											id='subject'
											name='subject'
											value={formData.subject}
											onChange={handleInputChange}
											onBlur={handleInputBlur}
											onFocus={() => handleInputFocus('subject')}
											className={
												fieldErrors.subject && fieldErrors.subject.length > 0
													? 'error'
													: (formData.subject &&
															fieldErrors.subject &&
															fieldErrors.subject.length === 0) ||
													  (fieldErrors.subject === undefined &&
															isFormSubmitted === true)
													? 'approved'
													: ''
											}
										>
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
										}
									>
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
										}
									></textarea>
								</div>
							</div>
						</fieldset>

						<div className={styles.bookingsformSubmit}>
							<div>
								{isFormValid() && (
									<span className={styles.bookingsformSubmitApproved}>
										Formulier is juist ingevuld!
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
				</section>
				<section data-main-content className={styles.bookingsformInfo}>
					<p>
						<strong>
							Drumband Eternity Percussion treedt op in zowel binnen- als
							buitenland. De afgelopen jaren heeft Eternity op verschillende
							grote evenementen en festivals in Nederland optredens verricht.
							Ook internationale optredens zoals op Curaçao, in Suriname,
							Engeland (Londen en Birmingham), Atlanta (USA) en Brazilië .
						</strong>
					</p>
					<p>
						In juli 2006 heeft Eternity de prijs gewonnen van Beste Brassband
						Ortel Zomercarnaval 2006. Een vakkundige jury heeft Eternity
						beoordeelt op de hoge kwaliteit van ritme, muziek, juiste harmonie
						en gevarieerde show.
					</p>
					<p>
						U kunt ons inhuren voor; <u>bedrijfsevenementen</u>,{' '}
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
						voor setjes van 10 tot maximaal 30 min (U kunt ook meerdere setjes
						boeken).
					</p>
					<p>
						Voor meer informatie kunt u telefonisch contact opnemen via:{' '}
						<a href='#!'>06 242 55 391</a> of een offerte opvragen via het{' '}
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
