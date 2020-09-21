const audio = document.querySelector('audio')
const prevButton = document.querySelector('#prev')
const playButton = document.querySelector('#play')
const nextButton = document.querySelector('#next')
const title = document.querySelector('.title')
const artist = document.querySelector('.artist')
const image = document.querySelector('img')
const music = document.querySelector('audio')
const progressContainer = document.querySelector('.progress-container')
const progress = document.querySelector('.progress')
const progressCurrentTime = document.querySelector('.current-time')
const progressDuration = document.querySelector('.duration')

const songs = [
    {
        image: 'assets/images/enzo-tommasi-wlxJ4idMTUk-unsplash.jpg',
        title: 'Action Fight',
        artist: 'David Fesliyan',
        music: 'assets/audio/2018-11-28_-_Action_Fight_-_David_Fesliyan.mp3'
    },
    {
        image: 'assets/images/pawel-czerwinski-6lQDFGOB1iw-unsplash.jpg',
        title: 'Homework',
        artist: 'David Fesliyan',
        music: 'assets/audio/2019-06-12_-_Homework_-_David_Fesliyan.mp3'
    },
    {
        image: 'assets/images/pawel-czerwinski-76ofI8wFtLo-unsplash.jpg',
        title: 'Please Dont Cry',
        artist: 'David Fesliyan',
        music: 'assets/audio/2019-08-03_-_Please_Dont_Cry_-_David_Fesliyan.mp3'
    },
    {
        image: 'assets/images/steve-johnson-e5LdlAMpkEw-unsplash.jpg',
        title: 'A Simple Chill',
        artist: 'David Renda',
        music: 'assets/audio/2020-03-22_-_A_Simple_Chill_-_FesliyanStudios.com_-_David_Renda.mp3'
    },
];

let isPlaying = false;
let currentSong = 0

//Play track
const playSong = () => {
    isPlaying = true
    playButton.classList.replace('fa-play', 'fa-pause')
    audio.play();
}

//Pause track
const pauseSong = () => {
    isPlaying = false
    playButton.classList.replace('fa-pause', 'fa-play')
    audio.pause()
}

// Update DOM
const loadSong = song => {
    title.textContent = song.title
    artist.textContent = song.artist
    image.src = `${song.image}`
    music.src = `${song.music}`
}

loadSong(songs[currentSong])

//Start playing
const startPlaying = () => {
    isPlaying ? pauseSong() : playSong();
}

//Previous track
const prevSong = () => {
    currentSong--;
    if(currentSong < 0) {
        currentSong = songs.length-1
    }
    loadSong(songs[currentSong])
    playSong();
}

//Next track
const nextSong = () => {
    currentSong++;
    if(currentSong > songs.length-1) {
        currentSong = 0
    }
    loadSong(songs[currentSong])
    playSong()
}

//Update progress bar
const updateProgressBar = event => {
    const {duration, currentTime} = event.srcElement
    let progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    if(duration) {
        progressDuration.textContent = (`${duration}` / 60).toFixed(2).replace('.', ':')
        progressCurrentTime.textContent = (`${currentTime}` / 60).toFixed(2).replace('.', ':')
    }
}

const setProgressBar = event => {
    const width = event.srcElement.clientWidth
    const currentWidth = event.offsetX
    const { duration } = audio
    audio.currentTime = (currentWidth / width) * duration
}

//Event Listener
prevButton.addEventListener('click', prevSong)
nextButton.addEventListener('click', nextSong)
audio.addEventListener('ended', nextSong)
playButton.addEventListener('click', startPlaying)
audio.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)