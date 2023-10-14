import * as React from 'react';

import axios from 'axios';

import * as styles from '../styles/modules/registerform.module.scss';

const RegisterForm: React.FC = () => {
	const [emptyFields, setEmptyFields] = React.useState<string[]>([]);

	const inputRef = React.useRef<HTMLInputElement>(null);

	const [isOlderThan18, setIsOlderThan18] = React.useState(true);

	const [formData, setFormData] = React.useState({
		firstName: '',
		lastName: '',

		streetName: '',
		houseNumber: '',
		zipCode: '',

		city: '',
		province: '',

		email: '',

		dateOfBirth: '',
		gender: '',
		phone: '',
		discover: '',
		comments: '',

		firstNameParent: '',
		lastNameParent: '',
		emailParent: '',
		phoneParent: '',
	});

	const requiredFields = [
		'firstName',
		'lastName',

		'streetName',
		'houseNumber',
		'zipCode',

		'city',
		'province',

		'email',

		'dateOfBirth',
		'phone',
	];

	if (!isOlderThan18) {
		requiredFields.push(
			'firstNameParent',
			'lastNameParent',
			'emailParent',
			'phoneParent'
		);
	}

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		if (inputRef.current) {
			inputRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
			inputRef.current.focus();
		}
	};

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

		if (value.trim() === '') {
			if (!emptyFields.includes(name)) {
				setEmptyFields([...emptyFields, name]);
			}
		} else {
			setEmptyFields(emptyFields.filter((field) => field !== name));

			event.target.classList.add('approved');

			// console.log(`Field '${name}' has 'approved' class added.`);
		}
	};

	const handleFieldBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		const { name, value, required } = event.target;

		if (required && value.trim() === '' && !emptyFields.includes(name)) {
			setEmptyFields((prevEmptyFields) => [...prevEmptyFields, name]);
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const missingFields = requiredFields.filter(
			(field) => formData[field as keyof typeof formData].trim() === ''
		);

		setEmptyFields(missingFields);

		if (missingFields.length > 0) {
			// console.log('Form not submitted, missing fields:', missingFields);
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
			firstName: '',
			lastName: '',
			streetName: '',
			houseNumber: '',
			zipCode: '',
			city: '',
			province: '',
			email: '',
			dateOfBirth: '',
			gender: '',
			phone: '',
			firstNameParent: '',
			lastNameParent: '',
			emailParent: '',
			phoneParent: '',
			discover: '',
			comments: '',
		});

		setEmptyFields([]);
	};

	React.useEffect(() => {
		const dobParts = formData.dateOfBirth.split('-');

		if (dobParts.length === 3) {
			const dobYear = parseInt(dobParts[0], 10);
			const dobMonth = parseInt(dobParts[1], 10) - 1;
			const dobDay = parseInt(dobParts[2], 10);

			const dob = new Date(dobYear, dobMonth, dobDay);
			const today = new Date();

			let age = today.getFullYear() - dob.getFullYear();

			if (
				today.getMonth() < dob.getMonth() ||
				(today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
			) {
				age--;
			}

			setIsOlderThan18(age >= 18);
		} else {
			setIsOlderThan18(true);
		}
	}, [formData.dateOfBirth]);

	return (
		<section>
			<div className={styles.registerformContainer}>
				<div className={styles.registerformWrapper}>
					<h2>Online inschrijfformulier</h2>
					<span>
						Vul hieronder jouw gegevens in en wij nemen zo spoedig mogelijk
						contact met je op.
					</span>
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend>Gegevens cursist</legend>

							<div>
								<label htmlFor='firstName'>Voornaam:</label>
								<input
									type='text'
									id='firstName'
									name='firstName'
									value={formData.firstName}
									placeholder='Voornaam'
									onChange={handleInputChange}
									ref={inputRef}
									onBlur={handleFieldBlur}
									className={emptyFields.includes('firstName') ? 'error' : ''}
								/>

								<label htmlFor='lastName'>Achternaam:</label>
								<input
									type='text'
									id='lastName'
									name='lastName'
									value={formData.lastName}
									placeholder='Achternaam'
									onChange={handleInputChange}
									className={emptyFields.includes('lastName') ? 'error' : ''}
								/>
							</div>

							<div>
								<label htmlFor='streetName'>Straatnaam:</label>
								<input
									type='text'
									id='streetName'
									name='streetName'
									value={formData.streetName}
									placeholder='Straatnaam'
									onChange={handleInputChange}
									className={emptyFields.includes('streetName') ? 'error' : ''}
								/>

								<label htmlFor='houseNumber'>Huisnr:</label>
								<input
									type='text'
									id='houseNumber'
									name='houseNumber'
									value={formData.houseNumber}
									placeholder='Huisnr.'
									onChange={handleInputChange}
									className={emptyFields.includes('houseNumber') ? 'error' : ''}
								/>

								<label htmlFor='zipCode'>Postcode:</label>
								<input
									type='text'
									id='zipCode'
									name='zipCode'
									value={formData.zipCode}
									placeholder='Postcode'
									onChange={handleInputChange}
									className={emptyFields.includes('zipCode') ? 'error' : ''}
								/>
							</div>

							<div>
								<label htmlFor='city'>Woonplaats:</label>
								<input
									type='text'
									id='city'
									name='city'
									value={formData.city}
									placeholder='Woonplaats'
									onChange={handleInputChange}
									className={emptyFields.includes('city') ? 'error' : ''}
								/>

								<label htmlFor='province'>Provincie:</label>
								<input
									type='text'
									id='province'
									name='province'
									value={formData.province}
									placeholder='Provincie'
									onChange={handleInputChange}
									className={emptyFields.includes('province') ? 'error' : ''}
								/>
							</div>

							<div>
								<label htmlFor='email'>E-mailadres</label>
								<input
									type='email'
									name='email'
									value={formData.email}
									placeholder='E-mailadres'
									onChange={handleInputChange}
									className={emptyFields.includes('email') ? 'error' : ''}
								/>
							</div>

							<div>
								<label htmlFor='phone'>Telefoonnummer:</label>
								<input
									type='tel'
									id='phone'
									name='phone'
									value={formData.phone}
									placeholder='Telefoonnummer'
									onChange={handleInputChange}
									className={emptyFields.includes('phone') ? 'error' : ''}
								/>

								<div className={styles.registerformSelect}>
									<label htmlFor='gender'>Geslacht</label>
									<select
										id='gender'
										name='gender'
										value={formData.gender}
										onChange={handleInputChange}
									>
										<option value='' disabled>
											Geslacht
										</option>
										<option value='male'>Man</option>
										<option value='female'>Vrouw</option>
										<option value='other'>Anders</option>
									</select>
									<div className={styles.arrow}></div>
								</div>

								<label htmlFor='dob'>Geboortedatum:</label>
								<input
									type='date'
									name='dateOfBirth'
									value={formData.dateOfBirth}
									placeholder='Geboortedatum'
									onChange={handleInputChange}
									className={emptyFields.includes('dateOfBirth') ? 'error' : ''}
								/>
							</div>

							<div className={styles.registerformSelect}>
								<label htmlFor='discover'>
									Hoe ben je bij ons terecht gekomen?
								</label>
								<select
									id='discover'
									name='discover'
									value={formData.discover}
									onChange={handleInputChange}
								>
									<option value='' disabled>
										Hoe ben je bij ons terecht gekomen?
									</option>
									<option value='Via Social Media (Facebook, Instagram, Etc)'>
										Via Social Media (Facebook, Instagram, Etc)
									</option>
									<option value='Via Google, Bing of een andere zoekmachine'>
										Via Google, Bing of een andere zoekmachine
									</option>
									<option value='Via een vriend(in), kennis, collega of familielid'>
										Via een vriend(in), kennis, collega of familielid
									</option>
									<option value='Via eerdere workshops (bijv. de Eternity Summerschool)'>
										Via eerdere workshops (bijv. de Eternity Summerschool)
									</option>
									<option value='U heeft ons eerder zien/horen spelen/optreden'>
										Je hebt ons eerder zien/horen spelen/optreden
									</option>
									<option value='Overig'>
										Op een andere manier, namelijk:
									</option>
								</select>
								<div className={styles.arrow}></div>
							</div>

							<label htmlFor='comments'>Heb je nog opmerkingen?</label>
							<textarea
								id='comments'
								name='comments'
								value={formData.comments}
								onChange={handleInputChange}
								placeholder='Heb je nog opmerkingen?'
							></textarea>
						</fieldset>

						{!isOlderThan18 && (
							<span>
								Je bent jonger dan 18 jaar. Vul hieronder de gegevens van jouw
								ouders/voogd in.
							</span>
						)}

						{!isOlderThan18 && (
							<fieldset>
								<legend>Gegevens ouders/voogd</legend>

								<div>
									<label htmlFor='firstNameParent'>
										Voornaam: (ouders/voogd)
									</label>
									<input
										type='text'
										id='firstNameParent'
										name='firstNameParent'
										value={formData.firstNameParent}
										placeholder='Voornaam'
										onChange={handleInputChange}
										className={
											emptyFields.includes('firstNameParent') ? 'error' : ''
										}
									/>

									<label htmlFor='lastNameParent'>Naam:</label>
									<input
										type='text'
										id='lastNameParent'
										name='lastNameParent'
										value={formData.lastNameParent}
										placeholder='Achternaam'
										onChange={handleInputChange}
										className={
											emptyFields.includes('lastNameParent') ? 'error' : ''
										}
									/>
								</div>

								<div>
									<label htmlFor='emailParent'>
										E-mailadres (ouders/voogd)
									</label>
									<input
										type='email'
										name='emailParent'
										value={formData.emailParent}
										placeholder='E-mailadres'
										onChange={handleInputChange}
										className={
											emptyFields.includes('emailParent') ? 'error' : ''
										}
									/>

									<label htmlFor='phoneParent'>Telefoonnummer:</label>
									<input
										type='tel'
										id='phoneParent'
										name='phoneParent'
										value={formData.phoneParent}
										placeholder='Telefoonnummer'
										onChange={handleInputChange}
										className={
											emptyFields.includes('phoneParent') ? 'error' : ''
										}
									/>
								</div>
							</fieldset>
						)}

						<button type='submit'>Nu inschrijven</button>
					</form>

					<div className={styles.registerformConditions}>
						<p>
							<strong>Voorwaarden:</strong>
						</p>
						<ul>
							<li>
								Eternity Percussion kan niet aansprakelijk worden gesteld voor
								enig lichamelijk letsel, schade of vermissing van eigendom
								tijdens de lessen en/of repetities
							</li>
							<li>
								Het lesgeld dient aan het begin van elke maand op de rekening
								van Eternity Percussion worden over gemaakt
							</li>
							<li>
								De opzegtermijn bedraagt minimaal een maand en dient via email
								info@eternitydrum.com te worden doorgegeven
							</li>
						</ul>
						<p>
							<strong>Let op !</strong>
						</p>
						<ul>
							<li>Vul het inschrijfformulier volledig in</li>
						</ul>

						<p>
							<u>
								Door invulling en het versturen van dit formulier, stemt u
								automatisch in met de voorwaarden en huisregels van Eternity
								Percussion
							</u>
						</p>
					</div>
				</div>
				<div className={styles.registerformInfo}>
					<p>
						<strong>
							Muziekeducatie vormt een goede basis voor de ontwikkeling van een
							kind.{' '}
						</strong>
						Momenteel verzorgen wij drumlessen op het Bindelmeer College en de
						Bredeschool Zuidoost als vast onderdeel van het onderwijspakket.
						Speciaal voor kinderen en jongeren verzorgen wij ook drumworkshops
						na schooltijd in Amsterdam Zuidoost.
					</p>
					<br />
					<p>
						<strong>
							Voor slechts 45,- euro per maand kan je 1x in de week bij ons
							drumlessen volgen.{' '}
						</strong>
						Je leert bij ons niet alleen het spelen van Afrikaanse,
						Afro-Caribische en Afro-Surinaamse ritmes, maar ook het lezen van
						muzieknoten voor percussie instrumenten. Per drumles zijn er 2
						docenten aanwezig die ervoor zorgen dat ieder kind voldoende
						aandacht krijgt. Alles wat de leerlingen hebben geleerd zullen zij
						laten zien tijdens een presentatie op één van de publieksevenementen
						in Amsterdam Zuidoost.
					</p>
					<br />
					<p>
						<u>Voor wie</u>
						<br />
						Jongens en meisjes
					</p>
					<br />
					<p>
						<u>Leeftijd</u>
						<br />6 t/m 12 of 13 t/m 18
					</p>
					<br />
					<p>
						<u>Beginners</u>
						<br />
						Dinsdagavond
					</p>
					<br />
					<p>
						<u>Gevorderden</u>
						<br />
						Woensdagavond
					</p>
					<br />
					<p>
						Meld uw kind nu direct aan via het{' '}
						<a href='#' onClick={handleClick}>
							online formulier
						</a>
						, via de mail <a href='#!'>info@eternitydrum.com</a> of telefonisch
						via <a href='#!'>06 24 25 53 91</a>.
					</p>
					<br />
					<p>
						Ben je niet ouder dan 18 jaar? Vraag dan even toestemming aan jouw
						ouders.
					</p>
					<br />
					<p>
						Voor de ouders die graag hun kinderen aan deze activiteit willen
						laten deelnemen, maar niet in staat zijn om de bijdrage te betalen
						kunnen wij een regeling treffen via het{' '}
						<a href='#!'>Jongerencultuurfonds</a>. Voor vragen omtrent deze
						regeling kunt u telefonisch contact met ons opnemen.
					</p>
				</div>
			</div>
		</section>
	);
};

export default RegisterForm;
