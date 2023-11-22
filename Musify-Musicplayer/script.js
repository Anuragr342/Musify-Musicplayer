const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const seekBar = document.getElementById('seek-bar');
const startTimeDisplay = document.getElementById('start-time');
const endTimeDisplay = document.getElementById('end-time');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const songList = document.getElementById('song-list').getElementsByTagName('a');

let currentSongIndex = 0;

// Function to load a song by index
function loadSong(index) {
    const song = songList[index];
    audioPlayer.src = song.href;
    songTitle.textContent = song.innerText;
    audioPlayer.load();
}

// Play the current song
function playCurrentSong() {
    audioPlayer.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline';
}

// Load the first song and play it
loadSong(currentSongIndex);
playCurrentSong();

// Event listener for play button
playButton.addEventListener('click', playCurrentSong);

// Event listener for pause button
pauseButton.addEventListener('click', () => {
    audioPlayer.pause();
    playButton.style.display = 'inline';
    pauseButton.style.display = 'none';
});

// Event listener for time update
audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    seekBar.value = currentTime;
    seekBar.max = duration;

    // Format time for display (e.g., 0:00)
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        startTimeDisplay.textContent = `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
        endTimeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
    };

    formatTime(currentTime);
});

// Event listener for seek bar
seekBar.addEventListener('input', () => {
    audioPlayer.currentTime = seekBar.value;
});

// Event listener for ended
audioPlayer.addEventListener('ended', () => {
    // Play the next song when the current song ends
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    loadSong(currentSongIndex);
    playCurrentSong();
});

// Event listener for "Next" button
const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', () => {
    // Play the next song in the playlist
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    loadSong(currentSongIndex);
    playCurrentSong();
});

// Event listener for "Previous" button
const prevButton = document.getElementById('prev-button');
prevButton.addEventListener('click', () => {
    // Play the previous song in the playlist
    currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
    loadSong(currentSongIndex);
    playCurrentSong();
});
