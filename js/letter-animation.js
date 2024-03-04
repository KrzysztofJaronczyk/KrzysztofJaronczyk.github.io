const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

document.querySelectorAll('.section-title h2').forEach(title => {
	const originalText = title.dataset.value

	const animateTitle = () => {
		let interactions = 0
		const interval = setInterval(() => {
			let newText = originalText
				.split('')
				.map((letter, index) => {
					if (index < interactions) {
						return originalText[index]
					} else {
						const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length))
						return randomLetter
					}
				})
				.join('')
			title.innerText = newText

			if (interactions >= originalText.length) clearInterval(interval)
			interactions += 1 / 3
		}, 100)
	}

	animateTitle()

	setInterval(animateTitle, 12000)
})
