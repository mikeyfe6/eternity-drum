import * as React from 'react';

import axios from 'axios';

import * as styles from '../styles/modules/bookingsform.module.scss';

const BookingsForm: React.FC = () => {
	const [formData, setFormData] = React.useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

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
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (
			formData.name.trim() === '' ||
			formData.email.trim() === '' ||
			formData.subject.trim() === ''
		) {
			alert('Please fill in all fields.');
			return;
		}

		axios
			.post('/.netlify/functions/sendmail', formData)
			.then((response) => {
				console.log('Form submitted successfully:', response.data);
			})
			.catch((error) => {
				console.error('Form submission error:', error);
			});

		setFormData({
			name: '',
			email: '',
			subject: '',
			message: '',
		});
	};

	return (
		<section>
			<div className={styles.bookingsformContainer}>
				<section className={styles.bookingsformWrapper}>
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend>
								Vul hieronder u gegevens in en wij nemen zo spoedig mogelijk
								contact met u op.
							</legend>

							<label htmlFor='name'>Naam:</label>
							<input
								type='text'
								id='name'
								name='name'
								value={formData.name}
								placeholder='Naam'
								onChange={handleInputChange}
								autoComplete='name'
							/>

							<label htmlFor='name'>E-mailadres</label>
							<input
								type='email'
								name='email'
								value={formData.email}
								placeholder='E-mailadres'
								onChange={handleInputChange}
								autoComplete='email'
							/>

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
