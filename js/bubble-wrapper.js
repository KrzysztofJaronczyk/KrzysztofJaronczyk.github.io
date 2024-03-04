
const animateBubble = (wrapperId, x) => {
	const wrapper = document.querySelector(wrapperId)
	const bubble = document.createElement('div')
	bubble.className = 'bubble'
	bubble.style.left = `${x}px`
	wrapper.appendChild(bubble)
	setTimeout(() => wrapper.removeChild(bubble), 2000)
}

window.onmousemove = e => {
	animateBubble('#wrapper1', e.clientX) // For first wrapper
	animateBubble('#wrapper2', e.clientX) // For second wrapper, can adjust to differentiate if needed
}

