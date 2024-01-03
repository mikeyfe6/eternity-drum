export interface RegisterFormData {
	firstName: string;
	lastName: string;

	streetName: string;
	houseNumber: string;
	zipCode: string;

	city: string;
	province: string;

	email: string;
	gender?: string;

	phone: string;

	dayOfBirth: string;
	monthOfBirth: string;
	yearOfBirth: string;

	discover?: string;
	other?: string;
	comments?: string;

	firstNameParent: string;
	lastNameParent: string;
	emailParent: string;
	phoneParent: string;
}

export interface BookingsFormData {
	firstName: string;
	lastName: string;

	email: string;
	phone: string;

	topic: string;
	message: string;
}

export interface NewsletterFormData {
	firstName: string;
	lastName: string;

	email: string;
}

export type FieldErrors = {
	[key: string]: string[];
};

export const validateRegisterForm = (
	formData: RegisterFormData,
	isOlderThan18: boolean
): FieldErrors => {
	const errors: FieldErrors = {};

	if (formData.firstName.trim() === '') {
		errors['firstName'] = ['Je voornaam is verplicht.'];
	} else if (!isValidFirstName(formData.firstName)) {
		errors['firstName'] = ['Je voornaam mag geen nummers bevatten.'];
	}

	if (formData.lastName.trim() === '') {
		errors['lastName'] = ['Je achternaam is verplicht.'];
	} else if (!isValidLastName(formData.lastName)) {
		errors['lastName'] = ['Je achternaam mag geen nummers bevatten.'];
	}

	if (formData.streetName.trim() === '') {
		errors['streetName'] = ['Je straatnaam is verplicht.'];
	} else if (!isValidStreetName(formData.streetName)) {
		errors['streetName'] = ['Je straatnaam is ongeldig.'];
	}

	if (formData.houseNumber.trim() === '') {
		errors['houseNumber'] = ['Je huisnummer is verplicht.'];
	} else if (!isValidHouseNumber(formData.houseNumber)) {
		errors['houseNumber'] = ['Je huisnummer is ongeldig.'];
	}

	if (formData.zipCode.trim() === '') {
		errors['zipCode'] = ['Je postcode is verplicht.'];
	}

	if (formData.city.trim() === '') {
		errors['city'] = ['Jouw huidige woonstad is verplicht.'];
	}

	if (formData.province.trim() === '') {
		errors['province'] = ['Jouw huidige provincie is verplicht.'];
	}

	if (formData.email.trim() === '') {
		errors['email'] = ['Je e-mailadres is verplicht.'];
	} else if (!isValidEmail(formData.email)) {
		errors['email'] = ['Je e-mailadres is ongeldig.'];
	}

	if (formData.phone.trim() === '') {
		errors['phone'] = ['Jouw telefoonnummer is verplicht.'];
	}

	if (formData.dayOfBirth.trim() === '') {
		errors['dayOfBirth'] = ['Vul je geboortedag in.'];
	}

	if (formData.monthOfBirth.trim() === '') {
		errors['monthOfBirth'] = ['Vul je geboortemaand in.'];
	}

	if (formData.yearOfBirth.trim() === '') {
		errors['yearOfBirth'] = ['Vul je geboortejaar in.'];
	}

	if (!isOlderThan18) {
		if (formData.firstNameParent.trim() === '') {
			errors['firstNameParent'] = ['Vul de naam van jouw ouder/verzorger in.'];
		}

		if (formData.lastNameParent.trim() === '') {
			errors['lastNameParent'] = [
				'Vul de achternaam van jouw ouder/verzorger in.',
			];
		}

		if (formData.emailParent.trim() === '') {
			errors['emailParent'] = [
				'Vul het e-mailadres van jouw ouder/verzorger in.',
			];
		}

		if (formData.phoneParent.trim() === '') {
			errors['phoneParent'] = [
				'Vul het telefoonnummer van jouw ouder/verzorger in.',
			];
		}
	}

	return errors;
};

export function validateBookingsForm(formData: BookingsFormData): FieldErrors {
	const errors: FieldErrors = {};

	if (formData.firstName.trim() === '') {
		errors['firstName'] = ['Je voornaam is verplicht.'];
	}

	if (formData.lastName.trim() === '') {
		errors['lastName'] = ['Je achternaam is verplicht.'];
	}

	if (formData.email.trim() === '') {
		errors['email'] = ['Je e-mailadres is verplicht.'];
	} else if (!isValidEmail(formData.email)) {
		errors['email'] = ['Je e-mailadres is ongeldig.'];
	}

	if (formData.phone.trim() === '') {
		errors['phone'] = ['Je telefoonnummer is verplicht.'];
	}

	if (formData.topic.trim() === '') {
		errors['topic'] = ['Onderwerp invullen is verplicht.'];
	}

	if (formData.message.trim() === '') {
		errors['message'] = ['Wat is jouw bericht?'];
	}

	return errors;
}

export function validateNewsletterForm(
	formData: NewsletterFormData
): FieldErrors {
	const errors: FieldErrors = {};

	if (formData.firstName.trim() === '') {
		errors['firstName'] = ['Je voornaam is verplicht.'];
	}

	if (formData.lastName.trim() === '') {
		errors['lastName'] = ['Je achternaam is verplicht.'];
	}

	if (formData.email.trim() === '') {
		errors['email'] = ['Je e-mailadres is verplicht.'];
	} else if (!isValidEmail(formData.email)) {
		errors['email'] = ['Je e-mailadres is ongeldig.'];
	}

	return errors;
}

export function isValidFirstName(firstName: string): boolean {
	const firstNameRegex = /^[A-Za-z\s'-]+$/;
	return firstNameRegex.test(firstName);
}

export function isValidLastName(lastName: string): boolean {
	const lastNameRegex = /^[A-Za-z\s'-]+$/;
	return lastNameRegex.test(lastName);
}

export function isValidStreetName(streetName: string): boolean {
	const streetNameRegex = /^[A-Za-z\s'-]+$/;
	return streetNameRegex.test(streetName);
}

export function isValidHouseNumber(houseNumber: string): boolean {
	const houseNumberRegex = /^[A-Za-z0-9\s]{1,8}$/;
	return houseNumberRegex.test(houseNumber);
}

export function isValidEmail(email: string): boolean {
	const emailRegex =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	return emailRegex.test(email);
}
