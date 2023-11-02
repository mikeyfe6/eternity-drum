import * as React from 'react';

import { navigate } from 'gatsby';
import axios from 'axios';

import * as styles from '../styles/modules/bookingsform.module.scss';

import { validateBookingsForm, BookingsFormData } from './validation';

const BookingsForm: React.FC = () => {
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
			const newValidationErrors = validateBookingsForm({
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

		const validationErrors = validateBookingsForm(formData);

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
				subject: '',
				message: '',
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

	React.useEffect(() => {
		if (formData.subject === 'Overig') {
			const inputElement = document.getElementById('other') as HTMLInputElement;
			if (inputElement && inputElement.value.trim() !== '') {
				inputElement.classList.add('approved');
			}
		}
	}, [formData]);

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
										className={emptyFields.includes('email') ? 'error' : ''}
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
											className={emptyFields.includes('email') ? 'error' : ''}
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
										className={emptyFields.includes('message') ? 'error' : ''}
									></textarea>
								</div>
							</div>
						</fieldset>

						<div className={styles.bookingsformSubmit}>
							{isFormValid() ||
								(errors.length > 0 && (
									<div>
										{isFormValid() && (
											<span className={styles.bookingsformSubmitApproved}>
												Het formulier is juist & volledig ingevuld.
											</span>
										)}
										{errors.length > 0 && (
											<>
												<span className={styles.bookingsformSubmitError}>
													Formulier niet juist ingevuld
												</span>
												<ul>
													{errors.map((error, index) => (
														<li key={index}>{error}</li>
													))}
												</ul>
											</>
										)}
									</div>
								))}
							<button type='submit' disabled={errors.length > 0}>
								{formData.subject === 'boeking' ? 'Boek nu' : 'Verstuur'}
							</button>
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
