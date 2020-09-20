const audio = document.querySelector('audio')
const playButton = document.querySelector('.main-button')
const images = document.querySelectorAll('')
const playerControls = () => {
    audio.play();
    console.log((audio.play()));
}

playButton.addEventListener('click', playerControls)