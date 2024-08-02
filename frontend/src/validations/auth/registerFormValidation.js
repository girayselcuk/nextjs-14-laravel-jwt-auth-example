import * as Yup from "yup";

export const registerFormValidation = Yup.object().shape({
	name: Yup.string()
		.required("Lütfen adınızı giriniz")
		.min(3, "Adınız 3 karakterden az olamaz"),
	surname: Yup.string().required("Lütfen soyadınızı giriniz"),
	email: Yup.string()
		.required("Lütfen email adresi giriniz!")
		.email("Geçerli bir email adresi girmediniz"),
	password: Yup.string()
		.required("Lütfen şifre giriniz!")
		.min(8, "Şifreniz minimum 8 karakter olmak zorundadır."),
	/*
    profile_image: Yup.mixed()
		.notRequired()
		.test("fileSize", "Dosya boyutu maksimum 8 MB olmalıdır", (value) => {
			if (value) {
				return value.size <= 8 * 1024 * 1024;
			}
			return true;
		})
		.test(
			"fileType",
			"Sadece 'jpg, png, jpeg' dosya türleri kabul edilmektedir.",
			(value) => {
				if (value) {
					return ["image/png", "image/jpeg", "image/jpg"].includes(
						value.type
					);
				}
				return true;
			}
		),
    */
});
