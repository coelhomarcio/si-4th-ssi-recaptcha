const form = document.querySelector("form")
const termsCheckbox = document.querySelector(".terms > input")
const termsAnchor = document.querySelector(".terms > p > a")
const termsDetails = document.querySelector(".terms-details")
const termsDetailsAnchor = document.querySelector(".terms-details > small > a")
const result = document.querySelector(".result")
const resultParagraph = document.querySelector(".result-paragraph")
const resultAnchor = document.querySelector(".result > p  > a")
let captcha = false

function callBack() {
	captcha = true
}

let verifyCaptcha = () => {
	let resultMessage
	if (termsCheckbox.checked && captcha) {
		resultMessage = "Formulário enviado com sucesso!"
		if (result.classList.contains("result-error"))
			result.classList.remove("result-error")
		if (!result.classList.contains("result-success"))
			result.classList.add("result-success")
		captcha = false
		termsCheckbox.checked = false
		grecaptcha.reset()
	}
	else {
		if (!termsCheckbox.checked && !captcha) {
			resultMessage = "Você precisa aceitar os termos de uso deste formulário"
			resultMessage += "<br>Validação reCAPTCHA obrigatória"
		}
		if (!termsCheckbox.checked && captcha)
			resultMessage = "Você precisa aceitar os termos de uso deste formulário"
		if (termsCheckbox.checked && !captcha)
			resultMessage = "Validação reCAPTCHA obrigatória"
		if (result.classList.contains("result-success"))
			result.classList.remove("result-success")
		if (!result.classList.contains("result-error"))
			result.classList.add("result-error")
	}
	resultParagraph.innerHTML = resultMessage
	if (!result.classList.contains("result-active"))
		result.classList.add("result-active")
}

form.addEventListener("submit", form => {
	form.preventDefault()
	verifyCaptcha()
})

termsAnchor.addEventListener("click", () => {
	if (!termsDetails.classList.contains("terms-active"))
		termsDetails.classList.add("terms-active")
})

termsDetailsAnchor.addEventListener("click", () => {
	if (termsDetails.classList.contains("terms-active"))
		termsDetails.classList.remove("terms-active")
})

resultAnchor.addEventListener("click", () => {
	if (result.classList.contains("result-active"))
		result.classList.remove("result-active")
})
