export interface FormData {
	firstName: string;
	lastName: string;

	streetName: string;
	houseNumber: string;
	zipCode: string;

	city: string;
	province: string;

	email: string;

	phone: string;

	dayOfBirth: string;
	monthOfBirth: string;
	yearOfBirth: string;

	firstNameParent: string;
	lastNameParent: string;
	emailParent: string;
	phoneParent: string;
}

export function validateForm(
	formData: FormData,
	isOlderThan18: boolean
): string[] {
	const errors: string[] = [];

	console.log('formData', formData);
	console.log('isOlderThan18', isOlderThan18);

	if (formData.firstName.trim() === '') {
		errors.push('Je voornaam is verplicht.');
	}

	if (formData.lastName.trim() === '') {
		errors.push('Je achternaam is verplicht.');
	}

	if (formData.streetName.trim() === '') {
		errors.push('Je straatnaam is verplicht');
	}

	if (formData.houseNumber.trim() === '') {
		errors.push('Je huisnummer is verplicht.');
	}

	if (formData.zipCode.trim() === '') {
		errors.push('Je postcode is verplicht.');
	}

	if (formData.city.trim() === '') {
		errors.push('Invullen van jouw huidige woonstad is verplicht.');
	}

	if (formData.province.trim() === '') {
		errors.push('Invullen van jouw huidige provincie is verplicht.');
	}

	if (formData.email.trim() === '') {
		errors.push('Je e-mailadres is verplicht.');
	} else if (!isValidEmail(formData.email)) {
		errors.push('Je e-mailadres is ongeldig.');
	}

	if (formData.phone.trim() === '') {
		errors.push('Invullen van jouw telefoonnummer is verplicht.');
	}

	if (formData.dayOfBirth.trim() === '') {
		errors.push('Vul je geboortedag in.');
	}

	if (formData.monthOfBirth.trim() === '') {
		errors.push('Vul je geboortemaand in.');
	}

	if (formData.yearOfBirth.trim() === '') {
		errors.push('Vul je geboortejaar in.');
	}

	if (!isOlderThan18) {
		if (formData.firstNameParent.trim() === '') {
			errors.push('Vul de naam van jouw ouder/verzorger in.');
		}

		if (formData.lastNameParent.trim() === '') {
			errors.push('Vul de achternaam van jouw ouder/verzorger in.');
		}

		if (formData.emailParent.trim() === '') {
			errors.push('Vul het e-mailadres van jouw ouder/verzorger in.');
		}

		if (formData.phoneParent.trim() === '') {
			errors.push('Vul het telefoonnummer van jouw ouder/verzorger in.');
		}
	}

	return errors;
}

export function isValidEmail(email: string): boolean {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	return emailRegex.test(email);
}