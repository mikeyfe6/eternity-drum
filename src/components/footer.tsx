// src/components/Footer.js
import * as React from 'react';

import { useSiteMetadata } from '../hooks/use-site-metadata';
import { Link } from 'gatsby';
import axios from 'axios';

import * as styles from '../styles/modules/footer.module.scss';

const Footer = () => {
	// Define a single state object to manage all form fields
	const [formData, setFormData] = React.useState({
		name: '',
		email: '',
	});

	const {
		companyName,
		address,
		postalCode,
		city,
		phoneRaw,
		telephone,
		email,
		kvk,
		btw,
		facebookUrl,
		instagramUrl,
		linkedinUrl,
		youtubeUrl,
	} = useSiteMetadata();

	// Handle changes in the form fields
	const handleInputChange = (event: { target: { name: any; value: any } }) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Handle form submission
	const handleSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault();

		// Check if name and email are not empty
		if (formData.name.trim() === '' || formData.email.trim() === '') {
			alert('Please fill in both name and email fields.');
			return;
		}

		// Send a POST request to your server or Netlify function
		axios
			.post('/.netlify/functions/sendmail', formData)
			.then((response) => {
				// Handle successful form submission (e.g., show a success message)
				console.log('Form submitted successfully:', response.data);
			})
			.catch((error) => {
				// Handle form submission errors (e.g., show an error message)
				console.error('Form submission error:', error);
			});

		// Clear the form fields after submission
		setFormData({
			name: '',
			email: '',
		});
	};

	return (
		<footer className={styles.footerContainer}>
			<div className={styles.footerWrapper}>
				<div className={styles.footerUpperBanner}>
					<div>
						<h4>Contactgegevens</h4>
						<ul>
							<li>
								<strong>{companyName}</strong>
							</li>
							<li>{address}</li>
							<li>{`${postalCode} ${city}`}</li>
							<br />
							<li>
								<i className='fas fa-phone' />
								<a href={`tel:${phoneRaw}`}>
									<strong>{telephone}</strong>
								</a>
							</li>
							<li>
								<i className='fas fa-envelope' />
								<a href={`mailto:${email}`}>
									<strong>{email}</strong>
								</a>
							</li>
							<br />
							<li>
								<strong>KvK:</strong> {kvk}
							</li>
							<li>
								<strong>BTW:</strong> {btw}
							</li>
						</ul>
					</div>
					<div>
						<h4>Recente Posts</h4>
						<ul>
							<li>
								<Link to='/drumworkshops/'>Sankofa Academy</Link>
							</li>
							<li>
								<Link to='/drumworkshops/'>Summerschool 2022</Link>
							</li>
							<li>
								<Link to='/drumworkshops/'>Summerschool 2023</Link>
							</li>
						</ul>
						<br /> <br />
						<h4>Aankomende Evenementen</h4>
						<ul>
							<li>
								<Link to='/drumworkshops/'>
									Optreden 1 @ Bijlmer Parktheater
								</Link>
							</li>
							<li>
								<Link to='/drumworkshops/'>Optreden 2 @ Almere</Link>
							</li>
							<li>
								<Link to='/drumworkshops/'>Optreden 3 @ Amsterdam</Link>
							</li>
							<li>
								<Link to='/drumworkshops/'>Concert 1 @ Nijmegen</Link>
							</li>
							<li>
								<Link to='/drumworkshops/'>Uitwisseling 1 @ Breda</Link>
							</li>
						</ul>
					</div>
					<div className={styles.footerNewsletterContainer}>
						<div className={styles.footerNewsletterWrapper}>
							<form onSubmit={handleSubmit}>
								<fieldset>
									<legend>Schrijf je in voor onze nieuwsbrief</legend>

									<label>
										<input
											type='text'
											name='name'
											value={formData.name}
											onChange={handleInputChange}
											placeholder='Naam'
											autoComplete='name'
										/>
									</label>
									<label>
										<input
											type='email'
											name='email'
											value={formData.email}
											placeholder='E-mailadres'
											onChange={handleInputChange}
											autoComplete='email'
										/>
									</label>
								</fieldset>

								<button type='submit'>Schrijf in</button>
							</form>
						</div>

						<div className={styles.footerLogoSocial}>
							<Link to='/'>
								<img
									src='https://eternitydrum.com/wp-content/uploads/brizy/imgs/LOGO-EP-1-256x222x0x16x256x190x1540867957.png'
									alt=''
									className={styles.footerLogo}
								/>
							</Link>
							<div>
								<h4> Volg onze socials..</h4>
								<ul className={styles.footerSocialIcons}>
									<li>
										<a href={facebookUrl}>
											<i className='fab fa-facebook' />
										</a>
									</li>
									<li>
										<a href={instagramUrl}>
											<i className='fab fa-instagram' />
										</a>
									</li>
									<li>
										<a href={linkedinUrl}>
											<i className='fab fa-linkedin' />
										</a>
									</li>
									<li>
										<a href={youtubeUrl}>
											<i className='fab fa-youtube' />
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.footerBottomBanner}>
					<span>
						© 2002 – {new Date().getFullYear()} · <strong>{companyName}</strong>{' '}
						· Powered by{' '}
						<strong>
							<a href='https://menefex.nl'>Menefex</a>
						</strong>
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
