//TODO:create a database with users' names and passwords

const mainForm = document.getElementById('main-form')
const nameInput = document.getElementById('name-input')
const passwordInput = document.getElementById('password-input')
const passwordAgain = document.getElementById('password-again-input')
const wrongModal = document.getElementById('wrong-input-modal')
const rightModal = document.getElementById('right-input-modal')
const subBtn = document.getElementById('sub-btn')
const againBtn = document.getElementById('again-btn')
const wrongReason = document.getElementById('wrong-modal-reason')
const userData = []

const cleanUsername = username => {
	const regex = /[.,\s-]/gi
	return username.replace(regex, '')
}

const isInvalidPassword = password => {
	const regex = /[\s]/g
	if (!password || password.length < 8) {
		return true
	}

	return password.match(regex)
}

mainForm.addEventListener('submit', e => {
	e.preventDefault()
})

subBtn.addEventListener('click', () => {
	if (!nameInput.value && !passwordInput.value) {
		wrongReason.innerHTML = 'Enter your info please'
		wrongModal.showModal()
	} else if (isInvalidPassword(passwordInput.value)) {
		wrongReason.innerHTML = 'Wrong password input. Password should contain 8 characters.'
		wrongModal.showModal()
	} else if (!cleanUsername(nameInput.value)) {
		wrongReason.innerHTML = 'Invalid name. Try again!'
		wrongModal.showModal()
	} else if (passwordInput.value !== passwordAgain.value) {
		wrongReason.innerHTML = 'Passwords are not similar.'
		wrongModal.showModal()
	} else {
		let userObj = {
			name: nameInput.value,
			password: passwordInput.value,
		}
		userData.unshift(userObj)
		localStorage.setItem('data', JSON.stringify(userData))
		rightModal.showModal()
	}
})

const tryAgain = () => {
	nameInput.value = ''
	passwordInput.value = ''
	passwordAgain.value = ''

	wrongModal.close()
}

againBtn.addEventListener('click', tryAgain)
