// Get elements
const videoPlayer = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const fullScreenBtn = document.getElementById('fullScreenBtn');
const videoFileInput = document.getElementById('videoFile');
const uploadBtn = document.getElementById('uploadBtn');
const videoSource = document.getElementById('videoSource');
const videoThumbnails = document.getElementById('videoThumbnails');

// Play/Pause button functionality
playPauseBtn.addEventListener('click', () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playPauseBtn.textContent = 'Pause';
  } else {
    videoPlayer.pause();
    playPauseBtn.textContent = 'Play';
  }
});

// Mute button functionality
muteBtn.addEventListener('click', () => {
  videoPlayer.muted = !videoPlayer.muted;
  muteBtn.textContent = videoPlayer.muted ? 'Unmute' : 'Mute';
});

// Fullscreen button functionality
fullScreenBtn.addEventListener('click', () => {
  if (videoPlayer.requestFullscreen) {
    videoPlayer.requestFullscreen();
  } else if (videoPlayer.mozRequestFullScreen) {
    // Firefox
    videoPlayer.mozRequestFullScreen();
  } else if (videoPlayer.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    videoPlayer.webkitRequestFullscreen();
  } else if (videoPlayer.msRequestFullscreen) {
    // IE/Edge
    videoPlayer.msRequestFullscreen();
  }
});

// Function to change the video when a thumbnail is clicked
function changeVideo(videoFile) {
  videoSource.src = videoFile;
  videoPlayer.load();
  videoPlayer.play();
  playPauseBtn.textContent = 'Pause';
}

// Handle video upload
uploadBtn.addEventListener('click', () => {
  const videoFile = videoFileInput.files[0];

  if (videoFile) {
    const videoURL = URL.createObjectURL(videoFile);
    const newThumbnail = document.createElement('div');
    newThumbnail.classList.add('thumbnail');
    newThumbnail.innerHTML = `<img src="https://via.placeholder.com/180x120?text=New+Video" alt="${videoFile.name}" />`;
    newThumbnail.addEventListener('click', () => changeVideo(videoURL));

    videoThumbnails.appendChild(newThumbnail);

    // Load the new video into the player
    changeVideo(videoURL);
    alert('Video uploaded successfully!');
  } else {
    alert('Please select a video to upload.');
  }
});
