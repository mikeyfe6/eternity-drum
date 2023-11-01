import * as React from 'react';

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

	const [errors, setErrors] = React.useState<string[]>([]);
	const [submitted, setSubmitted] = React.useState(false);

	const handleInputChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});

		// Reset errors when the user interacts with the form.
		setErrors([]);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		setSubmitted(true);

		// Check for form validation and update errors.
		const validationErrors = validateBookingsForm(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		axios
			.post('/.netlify/functions/sendmail', formData)
			.then((response) => {
				console.log('Form submitted successfully:', response.data);
				setFormData({
					firstName: '',
					lastName: '',
					email: '',
					subject: '',
					message: '',
				});
			})
			.catch((error) => {
				console.error('Form submission error:', error);
			});
	};

	return (
		<section>
			<div className={styles.bookingsformContainer}>
				<section className={styles.bookingsformWrapper}>
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend>
								Vul hieronder uw gegevens in en wij nemen zo spoedig mogelijk
								contact met u op.
							</legend>

							<label htmlFor='firstName'>Naam:</label>
							<input
								type='text'
								id='firstName'
								name='firstName'
								placeholder='Voornaam'
								value={formData.firstName}
								onChange={handleInputChange}
								autoComplete='name'
							/>
							{errors.includes('name') && (
								<span className='error-message'>Name is required.</span>
							)}

							<label htmlFor='lastName'>Naam:</label>
							<input
								type='text'
								id='lastName'
								name='lastName'
								value={formData.lastName}
								placeholder='Achternaam'
								onChange={handleInputChange}
								autoComplete='name'
							/>
							{errors.includes('name') && (
								<span className='error-message'>Name is required.</span>
							)}

							<label htmlFor='email'>E-mailadres</label>
							<input
								type='email'
								name='email'
								value={formData.email}
								placeholder='E-mailadres'
								onChange={handleInputChange}
								autoComplete='email'
							/>
							{errors.includes('email') && (
								<span className='error-message'>Valid email is required.</span>
							)}

							<label htmlFor='subject'>Onderwerp</label>
							<div className={styles.bookingsformSelect}>
								<select
									id='subject'
									name='subject'
									value={formData.subject}
									onChange={handleInputChange}
								>
									<option value='' disabled>
										Kies onderwerp
									</option>
									<option value='boeking'>Boeking / Offerte</option>
									<option value='vraag'>Vraag / Opmerking</option>
								</select>
								{errors.includes('subject') && (
									<span className='error-message'>Select an option.</span>
								)}
								<div className={styles.arrow}></div>
							</div>

							<label htmlFor='message'>Uw Bericht</label>
							<textarea
								id='message'
								name='message'
								value={formData.message}
								onChange={handleInputChange}
								placeholder='Uw bericht'
							></textarea>
							{errors.includes('message') && (
								<span className='error-message'>Message is required.</span>
							)}
						</fieldset>

						<button type='submit'>
							{formData.subject === 'boeking' ? 'Boek nu' : 'Verstuur'}
						</button>
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
						<a href='#!'>06 242 55 391</a> of een offerte opvragen via{' '}
						<a href='#!'>info@eternitydrum.com</a>.{' '}
					</p>
				</section>
			</div>
		</section>
	);
};

export default BookingsForm;
