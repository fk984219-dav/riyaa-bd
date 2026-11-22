// ==================================
// ALL SLIDES
// ==================================

const welcome = document.getElementById("welcome");
const intro = document.getElementById("intro");
const birthday = document.getElementById("birthday");
const collage1 = document.getElementById("collage1");
const collage2 = document.getElementById("collage2");
const letter = document.getElementById("letter");
const songSlide = document.getElementById("songSlide");
const finalSlide = document.getElementById("finalSlide");

const allSlides = [
    welcome,
    intro,
    birthday,
    collage1,
    collage2,
    letter,
    songSlide,
    finalSlide
].filter(Boolean);


// ==================================
// ALL BUTTONS
// ==================================

const startBtn = document.getElementById("startBtn");
const birthdayBtn = document.getElementById("birthdayBtn");
const nextBtn = document.getElementById("nextBtn");
const collageNextBtn = document.getElementById("collageNextBtn");
const letterBtn = document.getElementById("letterBtn");
const openLetterBtn = document.getElementById("openLetterBtn");
const songSlideBtn = document.getElementById("songSlideBtn");
const skipSongBtn = document.getElementById("skipSongBtn");
const musicNextBtn = document.getElementById("musicNextBtn");


// ==================================
// BACKGROUND MUSIC
// These tracks are optional.
// ==================================

const introMusic = new Audio("assets/music/intro.mp3");
const collageMusic = new Audio("assets/music/dilruba.mp3");
const letterMusic = new Audio("assets/music/letter.mp3");

introMusic.loop = true;
introMusic.volume = 0.7;

collageMusic.loop = true;
collageMusic.volume = 0.7;

letterMusic.loop = true;
letterMusic.volume = 0.6;


// ==================================
// SONG PLAYER ELEMENTS
// ==================================

const mySong = document.getElementById("mySong");

const playPauseBtn = document.getElementById("playPauseBtn");
const songSeek = document.getElementById("songSeek");

const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");

const playbackSpeed = document.getElementById("playbackSpeed");
const playerHint = document.getElementById("playerHint");

const playerCard = document.querySelector(".song-player-card");
const equalizer = document.getElementById("equalizer");

let finalSlideTimer = null;


// ==================================
// SLIDE CHANGE FUNCTION
// ==================================

function showSlide(slide) {

    if (!slide) return;

    allSlides.forEach(item => {

        item.classList.remove("active");

        item.scrollTop = 0;

    });

    slide.classList.add("active");

    slide.scrollTop = 0;

    window.scrollTo({
        top: 0,
        behavior: "auto"
    });

}


// ==================================
// STOP BACKGROUND MUSIC
// ==================================

function stopBackgroundMusic() {

    [introMusic, collageMusic, letterMusic].forEach(audio => {

        audio.pause();

        audio.currentTime = 0;

    });

}


// ==================================
// PLAY BACKGROUND MUSIC
// ==================================

async function playBackgroundMusic(audio) {

    stopBackgroundMusic();

    try {

        await audio.play();

    } catch (error) {

        // Optional background music may be missing.
        console.log("Background music unavailable:", error.message);

    }

}


// ==================================
// TIME FORMAT FUNCTION
// ==================================

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {

        return "0:00";

    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;

}


// ==================================
// WELCOME TO INTRO
// ==================================

startBtn?.addEventListener("click", async () => {

    showSlide(intro);

    await playBackgroundMusic(introMusic);

});


// ==================================
// INTRO TO BIRTHDAY
// ==================================

birthdayBtn?.addEventListener("click", () => {

    stopBackgroundMusic();

    showSlide(birthday);

    createConfetti();

});


// ==================================
// BIRTHDAY TO COLLAGE 1
// ==================================

nextBtn?.addEventListener("click", async () => {

    showSlide(collage1);

    await playBackgroundMusic(collageMusic);

});


// ==================================
// COLLAGE 1 TO COLLAGE 2
// ==================================

collageNextBtn?.addEventListener("click", () => {

    showSlide(collage2);

});


// ==================================
// COLLAGE 2 TO LETTER
// ==================================

letterBtn?.addEventListener("click", async () => {

    showSlide(letter);

    await playBackgroundMusic(letterMusic);

});


// ==================================
// OPEN LETTER
// ==================================

openLetterBtn?.addEventListener("click", () => {

    const envelope = document.getElementById("envelopeContainer");

    const paper = document.getElementById("letterPaper");

    if (envelope) {

        envelope.style.display = "none";

    }

    if (paper) {

        paper.classList.add("show");

        setTimeout(() => {

            letter.scrollTo({

                top: paper.offsetTop - 20,

                behavior: "smooth"

            });

        }, 150);

    }

});


// ==================================
// LETTER TO SONG SURPRISE
// ==================================

songSlideBtn?.addEventListener("click", () => {

    stopBackgroundMusic();

    clearTimeout(finalSlideTimer);

    if (mySong) {

        mySong.pause();

        mySong.currentTime = 0;

        mySong.playbackRate = 1;

    }

    if (playbackSpeed) {

        playbackSpeed.value = "1";

    }

    if (songSeek) {

        songSeek.value = 0;

    }

    if (currentTimeText) {

        currentTimeText.textContent = "0:00";

    }

    if (durationText) {

        durationText.textContent = formatTime(mySong.duration);

    }

    if (playPauseBtn) {

        playPauseBtn.textContent = "▶";

    }

    if (playerHint) {

        playerHint.textContent = "Press play whenever you're ready! 🎧";

    }

    playerCard?.classList.remove("is-playing");

    equalizer?.classList.remove("playing");

    showSlide(songSlide);

});


// ==================================
// SONG PLAY / PAUSE
// ==================================

playPauseBtn?.addEventListener("click", async () => {

    if (!mySong) return;

    if (mySong.paused) {

        try {

            await mySong.play();

        } catch (error) {

            console.log("Song playback error:", error);

            if (playerHint) {

                playerHint.textContent =
                    "Song nahi chal raha? Check assets/my-song.mpeg ❤️";

            }

        }

    } else {

        mySong.pause();

    }

});


// ==================================
// SONG PLAY EVENT
// ==================================

mySong?.addEventListener("play", () => {

    if (playPauseBtn) {

        playPauseBtn.textContent = "❚❚";

    }

    if (playerHint) {

        playerHint.textContent = "Playing your special song... ❤️";

    }

    playerCard?.classList.add("is-playing");

    equalizer?.classList.add("playing");

});


// ==================================
// SONG PAUSE EVENT
// ==================================

mySong?.addEventListener("pause", () => {

    if (playPauseBtn) {

        playPauseBtn.textContent = "▶";

    }

    playerCard?.classList.remove("is-playing");

    equalizer?.classList.remove("playing");

});


// ==================================
// SONG METADATA
// ==================================

mySong?.addEventListener("loadedmetadata", () => {

    if (durationText) {

        durationText.textContent = formatTime(mySong.duration);

    }

    if (songSeek && Number.isFinite(mySong.duration)) {

        songSeek.max = Math.floor(mySong.duration);

    }

});


// ==================================
// SONG TIME UPDATE
// ==================================

mySong?.addEventListener("timeupdate", () => {

    if (currentTimeText) {

        currentTimeText.textContent = formatTime(mySong.currentTime);

    }

    if (songSeek) {

        songSeek.value = Math.floor(mySong.currentTime);

    }

});


// ==================================
// SONG DURATION UPDATE
// ==================================

mySong?.addEventListener("durationchange", () => {

    if (durationText) {

        durationText.textContent = formatTime(mySong.duration);

    }

    if (songSeek && Number.isFinite(mySong.duration)) {

        songSeek.max = Math.floor(mySong.duration);

    }

});


// ==================================
// SONG SEEK BAR
// ==================================

songSeek?.addEventListener("input", () => {

    if (mySong && Number.isFinite(mySong.duration)) {

        mySong.currentTime = Number(songSeek.value);

    }

});


// ==================================
// PLAYBACK SPEED CONTROL
// ==================================

playbackSpeed?.addEventListener("change", () => {

    if (mySong) {

        mySong.playbackRate = Number(playbackSpeed.value);

    }

});


// ==================================
// SONG ERROR HANDLING
// ==================================

mySong?.addEventListener("error", () => {

    if (playerHint) {

        playerHint.textContent =
            "Audio file nahi mil rahi. Check assets/my-song.mpeg ❤️";

    }

    console.log("Please check the song file path.");

});


// ==================================
// SONG ENDED
// ==================================

mySong?.addEventListener("ended", () => {

    if (playPauseBtn) {

        playPauseBtn.textContent = "▶";

    }

    if (playerHint) {

        playerHint.textContent = "Hope you liked it! ❤️";

    }

    playerCard?.classList.remove("is-playing");

    equalizer?.classList.remove("playing");

    clearTimeout(finalSlideTimer);

    finalSlideTimer = setTimeout(() => {

        showFinalSlide();

    }, 1800);

});


// ==================================
// SKIP SONG - GO TO FINAL
// ==================================

skipSongBtn?.addEventListener("click", () => {

    showFinalSlide();

});


// ==================================
// MUSIC NEXT BUTTON - GO TO FINAL
// ==================================

musicNextBtn?.addEventListener("click", () => {

    showFinalSlide();

});


// ==================================
// FINAL SLIDE FUNCTION
// ==================================

function showFinalSlide() {

    clearTimeout(finalSlideTimer);

    stopBackgroundMusic();

    if (mySong) {

        mySong.pause();

        mySong.currentTime = 0;

    }

    if (playPauseBtn) {

        playPauseBtn.textContent = "▶";

    }

    if (playerHint) {

        playerHint.textContent = "Hope you liked my surprise! ❤️";

    }

    playerCard?.classList.remove("is-playing");

    equalizer?.classList.remove("playing");

    showSlide(finalSlide);

    createConfetti();

}


// ==================================
// CONFETTI FUNCTION
// ==================================

function createConfetti() {

    const container = document.getElementById("confetti-container");

    if (!container) return;

    // Remove old confetti first.
    container.innerHTML = "";

    const colors = [
        "#ff69a6",
        "#c084fc",
        "#ffd166",
        "#ff8fab",
        "#a0c4ff"
    ];

    for (let i = 0; i < 100; i++) {

        const piece = document.createElement("div");

        piece.classList.add("confetti");

        piece.style.left = Math.random() * 100 + "%";

        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (Math.random() * 3 + 2) + "s";

        piece.style.animationDelay =
            Math.random() * 2 + "s";

        container.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 6000);

    }

}


// ==================================
// WEBSITE READY
// ==================================

console.log("Riya's Birthday Website is ready! ❤️");