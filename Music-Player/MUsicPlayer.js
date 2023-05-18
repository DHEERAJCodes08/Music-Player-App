const image = document.querySelector(".images");
const title = document.querySelector(".music-name");
const artist = document.querySelector(".music-artist");
const progress = document.querySelector(".progress-bar");
const progressCont = document.querySelector(".progress");
const currentTimeEl= document.querySelector(".start");
const endTime = document.querySelector(".end");
//selecting Buttons
const playbtn = document.getElementById("play");
const prevbtn = document.getElementById("prev");
const nextbtn = document.getElementById("next");

const music = new Audio();   //this will fetch the audio used here and act according to the condition Provided ex if we Pass music.play() it will start playing and if we pass music.pause() 

const songs = [
    {
        path: 'PlayerSong/Hare Krishna Hare Rama.mp3',
        displayName: 'Hare Krishna Hare Rama',
        cover: 'PlayerImg/Music -1.jpg',
        artist: 'Hanu Dixit',
    },
    {
        path: 'PlayerSong/Aasma ko chukar dekho.mp3',
        displayName: 'Aasma ko chukar ',
        cover: 'PlayerImg/Music-2.jpg',
        artist: 'Shree Hanuman ',
    },
    {
        path: 'PlayerSong/Ram Siya Ram  Lofi Version  Mangal Bhavan Amangal Hari  Lofi Heaven  Slowed .mp3',
        displayName: 'Ram Siya Ram ',
        cover: 'PlayerImg/Music-3.jpg',
        artist: 'Siya Ram',
    }

];

let musicIndex = 0;

let isPlaying = false;

function tooglePlay(){
   // console.log("Iam Working");
    //console.log(songs.length);

    if(isPlaying){
        pauseMusic();   //it will call this function
    }

    else{
        //console.log("Iam executed");
        playMusic(); //it will call this function
    }

}


function playMusic(){

       isPlaying = true;
        //change the play button icon
        playbtn.classList.replace('fa-play','fa-pause' )
        
        // Change the titel hover 
        playbtn.setAttribute('title','Pause');
        music.play();
}

function pauseMusic(){
    isPlaying = false;
    //replacing the classlist to change the play button
    playbtn.classList.replace('fa-pause', 'fa-play');
    //changing the attribute 
    playbtn.setAttribute('title','Play');
    music.pause();

}

prevbtn.addEventListener("click", (e) =>{
    //when we click the prev button
    musicIndex--;
    if(musicIndex < 0){
        length = songs.length;
        musicIndex = length;
    }
    console.log(musicIndex);
    loadMusic(songs[musicIndex]);
    playMusic();

  });


nextbtn.addEventListener("click", (e) =>{
    musicIndex++;
    length = songs.length;
    if(musicIndex > length){
        musicIndex = 0;

    }
    console.log(musicIndex);
    loadMusic(songs[musicIndex]);
    playMusic();

  });


function loadMusic(getsong){
    music.src = getsong.path;
    image.src = getsong.cover;
    title.textContent = getsong.displayName;
    artist.textContent = getsong.artist;
}


function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    endTime.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = progressCont.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}


    






playbtn.addEventListener("click",tooglePlay);
loadMusic(songs[musicIndex]);
music.addEventListener('timeupdate', updateProgressBar);
progressCont.addEventListener('click', setProgressBar);


