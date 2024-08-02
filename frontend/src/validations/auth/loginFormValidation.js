import * as Yup from "yup";

export const loginFormValidation = Yup.object().shape({
	email: Yup.string()
		.required("Lütfen email adresi giriniz!")
		.email("Geçerli bir email adresi girmediniz"),
	password: Yup.string().required("Lütfen şifre giriniz!"),
});
