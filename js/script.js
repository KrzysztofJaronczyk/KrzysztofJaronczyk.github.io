// typing animation

var typed = new Typed('.typing', {
	strings: ['', 'Web Developer', 'Freelancer', '', 'C# Developer', '', 'Student', '', 'Book Reader', ''],
	typeSpeed: 100,
	backSpeed: 60,
	loop: true,
})

const nav = document.querySelector('.nav'),
	navList = nav.querySelectorAll('li'),
	totalNavList = navList.length,
	allSection = document.querySelectorAll('.section'),
	totalSection = allSection.length
for (let i = 0; i < totalNavList; i++) {
	removeBackSection()
	const a = navList[i].querySelector('a')
	a.addEventListener('click', function () {
		for (let j = 0; j < totalNavList; j++) {
			if (navList[j].querySelector('a').classList.contains('active')) {
				// allSection[j].classList.add('back-section');
				addBackSection(j)
			}
			navList[j].querySelector('a').classList.remove('active')
		}
		this.classList.add('active')
		showSection(this)
		if (window.innerWidth < 1200) {
			asideSectionTogglerBtn()
		}
	})
}
function removeBackSection() {
	for (let i = 0; i < totalSection; i++) {
		allSection[i].classList.remove('back-section')
	}
}

function addBackSection(num) {
	allSection[num].classList.add('back-section')
}

function showSection(element) {
	for (let i = 0; i < totalSection; i++) {
		allSection[i].classList.remove('active')
	}
	const target = element.getAttribute('href').split('#')[1]
	document.querySelector('#' + target).classList.add('active')
}
function updateNav(element) {
	for (let i = 0; i < totalNavList; i++) {
		navList[i].querySelector('a').classList.remove('active')
		const target = element.getAttribute('href').split('#')[1]
		if (target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) {
			navList[i].querySelector('a').classList.add('active')
		}
	}
}

document.querySelector('.hire-me').addEventListener('click', function () {
	const sectionIndex = this.getAttribute('data-section-index')
	showSection(this)
	updateNav(this)
	removeBackSection()
	addBackSection(sectionIndex)
})

const navTogglerBtn = document.querySelector('.nav-toggler'),
	aside = document.querySelector('.aside')
navTogglerBtn.addEventListener('click', () => {
	asideSectionTogglerBtn()
})
function asideSectionTogglerBtn() {
	aside.classList.toggle('open')
	navTogglerBtn.classList.toggle('open')
	for (let i = 0; i < totalSection; i++) {
		allSection[i].classList.toggle('open')
	}
}
// Function to create and animate bubble
const animateBubble = (wrapperId, x) => {
	const wrapper = document.querySelector(wrapperId)
	const bubble = document.createElement('div')
	bubble.className = 'bubble'
	bubble.style.left = `${x}px`
	wrapper.appendChild(bubble)
	setTimeout(() => wrapper.removeChild(bubble), 2000)
}

// Separate event listeners for different behaviors or wrappers
window.onmousemove = e => {
	animateBubble('#wrapper1', e.clientX) // For first wrapper
	animateBubble('#wrapper2', e.clientX) // For second wrapper, can adjust to differentiate if needed
}

const follower = document.querySelector('#following-gradient')

document.addEventListener('mousemove', e => {
	follower.animate(
		{
			left: `${e.clientX}px`,
			top: `${e.clientY}px`,
		},
		{ duration: 3000, fill: 'forwards' }
	)
})
