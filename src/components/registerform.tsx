import * as React from 'react';

import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

import { validateRegisterForm, RegisterFormData } from './validation';

import * as styles from '../styles/modules/registerform.module.scss';

interface RegisterFormProps {
	inputRef: React.RefObject<HTMLInputElement>;
}

export const handleClick = (
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

const RegisterForm: React.FC<RegisterFormProps> = ({ inputRef }) => {
	const [errors, setErrors] = React.useState<string[]>([]);
	const [emptyFields, setEmptyFields] = React.useState<string[]>([]);
	const [focusedInput, setFocusedInput] = React.useState<string | null>(null);

	const [submitted, setSubmitted] = React.useState(false);

	const [isOlderThan18, setIsOlderThan18] = React.useState(true);

	const [formData, setFormData] = React.useState<RegisterFormData>({
		firstName: '',
		lastName: '',

		streetName: '',
		houseNumber: '',
		zipCode: '',

		city: '',
		province: '',

		email: '',

		dayOfBirth: '',
		monthOfBirth: '',
		yearOfBirth: '',

		gender: '',
		phone: '',
		discover: '',
		comments: '',
		other: '',

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

		'phone',

		'dayOfBirth',
		'monthOfBirth',
		'yearOfBirth',
	];

	if (!isOlderThan18) {
		requiredFields.push(
			'firstNameParent',
			'lastNameParent',
			'emailParent',
			'phoneParent'
		);
	}

	const handleInputFocus = (name: string) => {
		if (
			name === 'dayOfBirth' ||
			name === 'monthOfBirth' ||
			name === 'yearOfBirth'
		) {
			setFocusedInput('dateOfBirth');
		} else {
			setFocusedInput(name);
		}
	};

	const handleDateChange = (name: string, value: string) => {
		setFormData({
			...formData,
			[name]: value,
		});

		if (submitted) {
			const newValidationErrors = validateRegisterForm(
				{
					...formData,
					[name]: value,
				},
				isOlderThan18
			);

			setErrors(newValidationErrors);
		}

		if (value.trim() !== '') {
			const inputElement = document.getElementById(name);
			if (inputElement) {
				inputElement.classList.add('approved');
			}
		}
	};

	const handleInputChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target;

		const updatedEmptyFields = emptyFields.filter((field) => field !== name);

		if (submitted) {
			const newValidationErrors = validateRegisterForm(
				{
					...formData,
					[name]: value,
				},
				isOlderThan18
			);

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

		const validationErrors = validateRegisterForm(formData, isOlderThan18);

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
				streetName: '',
				houseNumber: '',
				zipCode: '',
				city: '',
				province: '',
				email: '',
				dayOfBirth: '',
				monthOfBirth: '',
				yearOfBirth: '',
				gender: '',
				phone: '',
				firstNameParent: '',
				lastNameParent: '',
				emailParent: '',
				phoneParent: '',
				discover: '',
				comments: '',
				other: '',
			});

			setEmptyFields([]);
			removeApprovedClasses();
		}
	};

	React.useEffect(() => {
		if (formData.dayOfBirth && formData.monthOfBirth && formData.yearOfBirth) {
			const dobYear = parseInt(formData.yearOfBirth, 10);
			const dobMonth = parseInt(formData.monthOfBirth, 10) - 1;
			const dobDay = parseInt(formData.dayOfBirth, 10);

			const dob = new Date(dobYear, dobMonth, dobDay);
			const today = new Date();

			let age = today.getFullYear() - dob.getFullYear();

			if (
				today.getMonth() < dob.getMonth() ||
				(today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
			) {
				age--;
			}

			setErrors([]);

			setIsOlderThan18(age >= 18);

			if (submitted) {
				const newValidationErrors = validateRegisterForm(formData, age >= 18);
				setErrors(newValidationErrors);
			}
		} else {
			setIsOlderThan18(true);
		}
	}, [
		formData.dayOfBirth,
		formData.monthOfBirth,
		formData.yearOfBirth,
		submitted,
	]);

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
		if (formData.discover === 'Overig') {
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

	const { pathname } = useLocation();

	return (
		<section>
			<div className={styles.registerformWrapper}>
				<h2>Online inschrijfformulier</h2>
				<span>
					Vul hieronder jouw gegevens in en wij nemen zo spoedig mogelijk
					contact met je op.
				</span>
				<form onSubmit={handleSubmit} noValidate>
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
									placeholder='Voornaam'
									ref={inputRef}
									value={formData.firstName}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus('firstName')}
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
									placeholder='Achternaam'
									value={formData.lastName}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus('lastName')}
									className={emptyFields.includes('lastName') ? 'error' : ''}
								/>
							</div>
						</div>

						<div className='form-column collapseOne'>
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
									placeholder='Straatnaam'
									value={formData.streetName}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus('streetName')}
									className={emptyFields.includes('streetName') ? 'error' : ''}
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
									Huisnr.
								</label>
								<input
									type='text'
									id='houseNumber'
									name='houseNumber'
									placeholder='Huisnr.'
									value={formData.houseNumber}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus('houseNumber')}
									className={emptyFields.includes('houseNumber') ? 'error' : ''}
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
									placeholder='Postcode'
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
									placeholder='Woonplaats'
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
									placeholder='Provincie'
									value={formData.province}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus('province')}
									className={emptyFields.includes('province') ? 'error' : ''}
								/>
							</div>
						</div>

						<div className='form-column collapseTwo'>
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
									type='email'
									id='email'
									name='email'
									autoComplete='email'
									placeholder='E-mailadres'
									value={formData.email}
									onChange={handleInputChange}
									onBlur={handleInputBlur}
									onFocus={() => handleInputFocus('email')}
									className={emptyFields.includes('email') ? 'error' : ''}
								/>
							</div>

							<div className='form-group gender'>
								<div className='form-select'>
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
									<div className='arrow' />
								</div>
							</div>
						</div>

						<div className='form-column collapseThree'>
							<div className='form-group phone'>
								<label
									htmlFor='phone'
									className={
										focusedInput === 'phone' || formData.phone ? 'visited' : ''
									}
								>
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
									className={emptyFields.includes('phone') ? 'error' : ''}
								/>
							</div>

							<div className='form-group dateOfBirth'>
								<label
									htmlFor='dateOfBirth'
									className={
										focusedInput === 'dateOfBirth' ||
										formData.dayOfBirth ||
										formData.monthOfBirth ||
										formData.yearOfBirth
											? 'visited'
											: ''
									}
								>
									Geboortedatum
								</label>
								<div className='date-inputs'>
									<select
										id='dayOfBirth'
										name='dayOfBirth'
										value={formData.dayOfBirth}
										onChange={(event) =>
											handleDateChange('dayOfBirth', event.target.value)
										}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('dayOfBirth')}
										className={
											emptyFields.includes('dayOfBirth') && !formData.dayOfBirth
												? 'error'
												: ''
										}
									>
										<option value='' disabled>
											Dag
										</option>
										{Array.from({ length: 31 }, (_, i) => (
											<option key={i} value={i + 1}>
												{i + 1}
											</option>
										))}
									</select>
									<select
										id='monthOfBirth'
										name='monthOfBirth'
										value={formData.monthOfBirth}
										onChange={(event) =>
											handleDateChange('monthOfBirth', event.target.value)
										}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('monthOfBirth')}
										className={
											emptyFields.includes('monthOfBirth') ? 'error' : ''
										}
									>
										<option value='' disabled>
											Maand
										</option>
										{[
											'Januari',
											'Februari',
											'Maart',
											'April',
											'Mei',
											'Juni',
											'Juli',
											'Augustus',
											'September',
											'Oktober',
											'November',
											'December',
										].map((month, index) => (
											<option key={index} value={index + 1}>
												{month}
											</option>
										))}
									</select>
									<select
										id='yearOfBirth'
										name='yearOfBirth'
										value={formData.yearOfBirth}
										onChange={(event) =>
											handleDateChange('yearOfBirth', event.target.value)
										}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('yearOfBirth')}
										className={
											emptyFields.includes('yearOfBirth') ? 'error' : ''
										}
									>
										<option value='' disabled>
											Jaar
										</option>
										{Array.from({ length: 100 }, (_, i) => (
											<option key={i} value={new Date().getFullYear() - i}>
												{new Date().getFullYear() - i}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>

						<div
							className='form-column'
							style={{
								marginBottom:
									formData.discover === 'Overig' ? '1em' : 'revert-layer',
							}}
						>
							<div className='form-group discover'>
								<div className='form-select'>
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
										<option value='U heeft ons eerder zien/horen spelen'>
											Ik heb jullie eerder zien/horen spelen
										</option>
										<option value='Overig'>
											Op een andere manier, namelijk:
										</option>
									</select>
									<div className='arrow' />
								</div>
							</div>
						</div>

						{formData.discover === 'Overig' && (
							<div className='form-column'>
								<div className='form-group other'>
									<label htmlFor='other'>Meer info..</label>
									<input
										type='text'
										id='other'
										name='other'
										placeholder='...'
										value={formData.other}
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onFocus={() => handleInputFocus('other')}
										className={emptyFields.includes('other') ? 'reset' : ''}
									/>
								</div>
							</div>
						)}

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
									placeholder='Heb je nog opmerkingen?'
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
							Jonger dan 18? Vul hieronder de gegevens van jouw ouders/voogd in.
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
										placeholder='Voornaam (ouders/voogd)'
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
										placeholder='Achternaam (ouders/voogd)'
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
										placeholder='E-mailadres (ouders/voogd)'
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
										placeholder='Telefoonnummer (ouders/voogd)'
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

					<div className={styles.registerformSubmit}>
						{isFormValid() ||
							(errors.length > 0 && (
								<div>
									{isFormValid() && (
										<span className={styles.registerformSubmitApproved}>
											Het formulier is juist & volledig ingevuld.
										</span>
									)}
									{errors.length > 0 && (
										<>
											<span className={styles.registerformSubmitError}>
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
							Nu inschrijven
						</button>
					</div>
				</form>

				<div className={styles.registerformConditions}>
					<p>
						<strong>Voorwaarden:</strong>
					</p>
					<ul>
						<li>
							Eternity Percussion kan niet aansprakelijk worden gesteld voor
							enig lichamelijk letsel, schade of vermissing van eigendom tijdens
							de lessen en/of repetities
						</li>
						{pathname.includes('drumworkshops') ? (
							<>
								<li>
									Het lesgeld dient aan het begin van elke maand op de rekening
									van Eternity Percussion worden over gemaakt
								</li>
								<li>
									De opzegtermijn bedraagt minimaal een maand en dient via email
									info@eternitydrum.com te worden doorgegeven
								</li>
							</>
						) : null}
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
		</section>
	);
};

export default RegisterForm;
