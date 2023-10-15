import * as React from 'react';

import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as styles from '../styles/modules/registerform.module.scss';

const RegisterForm: React.FC = () => {
	const [emptyFields, setEmptyFields] = React.useState<string[]>([]);
	const [focusedInput, setFocusedInput] = React.useState<string | null>(null);

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

	const handleInputFocus = (name: string) => {
		setFocusedInput(name);
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

	const handleInputBlur = () => {
		setFocusedInput(null);
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
							<legend>Gegevens cursist:</legend>

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
										value={formData.firstName}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('firstName')}
										className={emptyFields.includes('firstName') ? 'error' : ''}
										ref={inputRef}
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
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('lastName')}
										className={emptyFields.includes('lastName') ? 'error' : ''}
									/>
								</div>
							</div>

							<div className='form-column'>
								<div className='form-group streetName'>
									<label
										htmlFor='streetName'
										className={
											focusedInput === 'streetName' || formData.streetName
												? 'visited'
												: ''
										}
									>
										Straatnaam
									</label>
									<input
										type='text'
										id='streetName'
										name='streetName'
										value={formData.streetName}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('streetName')}
										className={
											emptyFields.includes('streetName') ? 'error' : ''
										}
									/>
								</div>

								<div className='form-group houseNumber'>
									<label
										htmlFor='houseNumber'
										className={
											focusedInput === 'houseNumber' || formData.houseNumber
												? 'visited'
												: ''
										}
									>
										Huisnr
									</label>
									<input
										type='text'
										id='houseNumber'
										name='houseNumber'
										value={formData.houseNumber}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('houseNumber')}
										className={
											emptyFields.includes('houseNumber') ? 'error' : ''
										}
									/>
								</div>
								<div className='form-group zipCode'>
									<label
										htmlFor='zipCode'
										className={
											focusedInput === 'zipCode' || formData.zipCode
												? 'visited'
												: ''
										}
									>
										Postcode
									</label>
									<input
										type='text'
										id='zipCode'
										name='zipCode'
										value={formData.zipCode}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('zipCode')}
										className={emptyFields.includes('zipCode') ? 'error' : ''}
									/>
								</div>
							</div>

							<div className='form-column'>
								<div className='form-group city'>
									<label
										htmlFor='city'
										className={
											focusedInput === 'city' || formData.city ? 'visited' : ''
										}
									>
										Woonplaats
									</label>
									<input
										type='text'
										id='city'
										name='city'
										value={formData.city}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('city')}
										className={emptyFields.includes('city') ? 'error' : ''}
									/>
								</div>

								<div className='form-group province'>
									<label
										htmlFor='province'
										className={
											focusedInput === 'province' || formData.province
												? 'visited'
												: ''
										}
									>
										Provincie
									</label>
									<input
										type='text'
										id='province'
										name='province'
										value={formData.province}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('province')}
										className={emptyFields.includes('province') ? 'error' : ''}
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
										type='email'
										id='email'
										name='email'
										autoComplete='email'
										value={formData.email}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('email')}
										className={emptyFields.includes('email') ? 'error' : ''}
									/>
								</div>
							</div>

							<div className='form-column'>
								<div className='form-group phone'>
									<label
										htmlFor='phone'
										className={
											focusedInput === 'phone' || formData.phone
												? 'visited'
												: ''
										}
									>
										Telefoonnummer
									</label>
									<input
										type='tel'
										id='phone'
										name='phone'
										autoComplete='tel'
										value={formData.phone}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('phone')}
										className={emptyFields.includes('phone') ? 'error' : ''}
									/>
								</div>

								<div className='form-group gender'>
									<div className={styles.registerformSelect}>
										<label
											htmlFor='gender'
											className={
												focusedInput === 'gender' || formData.gender
													? 'visited'
													: ''
											}
										>
											Geslacht
										</label>
										<select
											id='gender'
											name='gender'
											value={formData.gender}
											onChange={handleInputChange}
											onBlur={handleInputBlur}
											onFocus={() => handleInputFocus('gender')}
											className={emptyFields.includes('gender') ? 'error' : ''}
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
								</div>

								<div className='form-group dateOfBirth'>
									<label
										htmlFor='dateOfBirth'
										className={
											focusedInput === 'dateOfBirth' || formData.dateOfBirth
												? 'visited'
												: ''
										}
									>
										Geboortedatum
									</label>
									<input
										type='date'
										id='dateOfBirth'
										name='dateOfBirth'
										autoComplete='bday'
										value={formData.dateOfBirth}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('dateOfBirth')}
										className={
											emptyFields.includes('dateOfBirth') ? 'error' : ''
										}
									/>
								</div>
							</div>

							<div className='form-column'>
								<div className='form-group discover'>
									<div className={styles.registerformSelect}>
										<label
											htmlFor='discover'
											className={
												focusedInput === 'discover' || formData.discover
													? 'visited'
													: ''
											}
										>
											Hoe ben je bij ons terecht gekomen?
										</label>
										<select
											id='discover'
											name='discover'
											value={formData.discover}
											onChange={handleInputChange}
											onBlur={handleInputBlur}
											onFocus={() => handleInputFocus('discover')}
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
								</div>
							</div>

							<div className='form-column'>
								<div className='form-group comments'>
									<label
										htmlFor='comments'
										className={
											focusedInput === 'comments' || formData.comments
												? 'visited'
												: ''
										}
									>
										Heb je nog opmerkingen?
									</label>
									<textarea
										id='comments'
										name='comments'
										value={formData.comments}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('comments')}
									></textarea>
								</div>
							</div>
						</fieldset>

						{!isOlderThan18 && (
							<span>
								Je bent jonger dan 18 jaar. Vul hieronder de gegevens van jouw
								ouders/voogd in.
							</span>
						)}

						{!isOlderThan18 && (
							<fieldset>
								<legend>Gegevens ouders/voogd:</legend>

								<div className='form-column'>
									<div className='form-group firstNameParent'>
										<label
											htmlFor='firstNameParent'
											className={
												focusedInput === 'firstNameParent' ||
												formData.firstNameParent
													? 'visited'
													: ''
											}
										>
											Voornaam (ouders/voogd)
										</label>
										<input
											type='text'
											id='firstNameParent'
											name='firstNameParent'
											value={formData.firstNameParent}
											onChange={handleInputChange}
											onBlur={handleInputBlur}
											onFocus={() => handleInputFocus('firstNameParent')}
											className={
												emptyFields.includes('firstNameParent') ? 'error' : ''
											}
										/>
									</div>

									<div className='form-group lastNameParent'>
										<label
											htmlFor='lastNameParent'
											className={
												focusedInput === 'lastNameParent' ||
												formData.lastNameParent
													? 'visited'
													: ''
											}
										>
											Achternaam (ouders/voogd)
										</label>
										<input
											type='text'
											id='lastNameParent'
											name='lastNameParent'
											value={formData.lastNameParent}
											onChange={handleInputChange}
											onBlur={handleInputBlur}
											onFocus={() => handleInputFocus('lastNameParent')}
											className={
												emptyFields.includes('lastNameParent') ? 'error' : ''
											}
										/>
									</div>
								</div>

								<div className='form-column'>
									<div className='form-group emailParent'>
										<label
											htmlFor='emailParent'
											className={
												focusedInput === 'emailParent' || formData.emailParent
													? 'visited'
													: ''
											}
										>
											E-mailadres (ouders/voogd)
										</label>
										<input
											id='emailParent'
											type='email'
											name='emailParent'
											value={formData.emailParent}
											onChange={handleInputChange}
											onBlur={handleInputBlur}
											onFocus={() => handleInputFocus('emailParent')}
											className={
												emptyFields.includes('emailParent') ? 'error' : ''
											}
										/>
									</div>

									<div className='form-group phoneParent'>
										<label
											htmlFor='phoneParent'
											className={
												focusedInput === 'phoneParent' || formData.phoneParent
													? 'visited'
													: ''
											}
										>
											Telefoonnummer (ouders/voogd)
										</label>
										<input
											type='tel'
											id='phoneParent'
											name='phoneParent'
											value={formData.phoneParent}
											onChange={handleInputChange}
											onBlur={handleInputBlur}
											onFocus={() => handleInputFocus('phoneParent')}
											className={
												emptyFields.includes('phoneParent') ? 'error' : ''
											}
										/>
									</div>
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
