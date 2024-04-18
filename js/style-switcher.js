const styleSwitcherToggle = document.querySelector('.style-switcher-toggler')
const styleSwitcher = document.querySelector('.style-switcher')

const closeStyleSwitcher = () => {
	if (styleSwitcher.classList.contains('open')) {
		styleSwitcher.classList.remove('open')
	}
}

styleSwitcherToggle.addEventListener('click', event => {
	event.stopPropagation() // Prevents the click event from propagating to the document
	styleSwitcher.classList.toggle('open')
})

document.addEventListener('click', event => {
	const isClickInsideStyleSwitcher = styleSwitcher.contains(event.target)
	const isClickOnToggle = styleSwitcherToggle.contains(event.target)

	if (!isClickInsideStyleSwitcher && !isClickOnToggle) {
		closeStyleSwitcher()
	}
})

// Theme Color
const alternateStyles = document.querySelectorAll('.alternate-style')
function setActiveStyle(color) {
	alternateStyles.forEach(style => {
		if (color === style.getAttribute('title')) {
			style.removeAttribute('disabled')
		} else {
			style.setAttribute('disabled', 'true')
		}
	})
}

// Theme Light and Dark
const dayNight = document.querySelector('.day-night')

// Function to toggle dark mode
function toggleDarkMode() {
	dayNight.querySelector('i').classList.toggle('fa-sun')
	dayNight.querySelector('i').classList.toggle('fa-moon')
	document.body.classList.toggle('dark')

	// Save user preference to local storage
	const preference = document.body.classList.contains('dark') ? 'dark' : 'light'
	localStorage.setItem('userPreference', JSON.stringify({ mode: preference, timestamp: Date.now() }))
}

dayNight.addEventListener('click', toggleDarkMode)

// Function to set initial mode based on system preference or saved preference
function setInitialMode() {
	const savedPreference = localStorage.getItem('userPreference')
	const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

	if (savedPreference) {
		const { mode, timestamp } = JSON.parse(savedPreference)
		if (Date.now() - timestamp < 12 * 60 * 60 * 1000) {
			document.body.classList.toggle('dark', mode === 'dark')
		} else {
			document.body.classList.toggle('dark', systemPreference === 'dark')
			localStorage.removeItem('userPreference') // Remove expired preference
		}
	} else {
		document.body.classList.toggle('dark', systemPreference === 'dark')
	}
	changeIcon()
}

// Set initial mode when the window loads
window.addEventListener('load', setInitialMode)

// Listen for changes in system preference and update the page
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
	document.body.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
	localStorage.setItem(
		'userPreference',
		JSON.stringify({ mode: document.body.classList.contains('dark') ? 'dark' : 'light', timestamp: Date.now() })
	)
	changeIcon()
})

function changeIcon() {
	if (document.body.classList.contains('dark')) {
		dayNight.querySelector('i').classList.remove('fa-moon')
		dayNight.querySelector('i').classList.add('fa-sun')
	} else {
		dayNight.querySelector('i').classList.remove('fa-sun')
		dayNight.querySelector('i').classList.add('fa-moon')
	}
}
