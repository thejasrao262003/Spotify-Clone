console.log("Welcome To Spotify");

let songIndex = 0;
let audioElement = new Audio("Arctic Monkeys - Do I Wanna Know (Official Video).mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let caption = Array.from(document.getElementsByClassName('caption'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let backward = Array.from(document.getElementsByClassName('backward'));
let songs = [
  {songName: "Arctic Monkeys - Do I Wanna Know", filepath:"Arctic Monkeys - Do I Wanna Know (Official Video).mp3", coverPath:"arcticmonkeys.jfif"},
  {songName: "One Republic - Counting stars", filepath:"OneRepublic - Counting Stars (Official Music Video).mp3", coverPath:"countingstars.jpg"},
  {songName: "Alan Walker - Faded", filepath:"Alan Walker - Faded.mp3", coverPath:"faded.jpg"},
  {songName: "Coldplay - Hymn For The Weekend", filepath:"Coldplay - Hymn For The Weekend (Official Video).mp3", coverPath:"hymnfortheweekend.jfif"},
  {songName: "Adam Lambert - Never Close Our Eyes", filepath:"Adam Lambert - Never Close Our Eyes (Official Video).mp3", coverPath:"neverclose.jpg"},
  {songName: "Ed Sheeran - Perfect", filepath:"Ed Sheeran - Perfect (Official Music Video).mp3", coverPath:"perfect.jfif"},
  {songName: "Bastille - Pompeii", filepath:"Bastille - Pompeii.mp3", coverPath:"pompei.jpg"},
  {songName: "Wiz Khalifa - See You Again", filepath:"Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack.mp3", coverPath:"seeyouagain.jpg"},
  {songName: "Avicci - Wake Me Up", filepath:"Avicii - Wake Me Up (Official Video).mp3", coverPath:"wakemeup.jpg"},
  {songName: "Chainsmokers - Something Just Like This", filepath:"The Chainsmokers & Coldplay - Something Just Like This (Lyric).mp3", coverPath:"somethingjustlikethis.jpg"},
]

songItems.forEach((element, i)=>{
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    if(songIndex!=0){
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    songItemPlay[songIndex].classList.remove("fa-circle-play");
    songItemPlay[songIndex].classList.add("fa-circle-pause");
    gif.style.opacity = 1;}
    else{
      audioElement.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      songItemPlay[0].classList.remove("fa-circle-play");
      songItemPlay[0].classList.add("fa-circle-pause");
      gif.style.opacity = 1;
    }

  }
  else{
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    makeAllPlays();
  }
})
//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
  //Updating seek-bar
  var progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
  if(progress!=100){
    myProgressBar.value = progress;
  }
  else{
    progress=0;
    myProgressBar.value = progress;
    audioElement.currentTime = 0;
    audioElement.play();
  }

})

myProgressBar.addEventListener('change', ()=>{
  audioElement.currentTime = (myProgressBar.value *audioElement.duration)/100;
})

const makeAllPlays = () =>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-circle-pause')
    element.classList.add('fa-circle-play')
  })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click', (e)=>{
    makeAllPlays();
    songIndex = parseInt(e.target.id)-1;
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    audioElement.src = songs[songIndex].filepath;
    caption[0].innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  })
})

document.getElementById('previous').addEventListener('click', ()=>{
  if(songIndex==0){
    songIndex=9;
  }
  else{
    songIndex-=1;
  }
  makeAllPlays();
  songItemPlay[songIndex].classList.remove("fa-circle-play");
  songItemPlay[songIndex].classList.add("fa-circle-pause");
  audioElement.src = songs[songIndex].filepath;
  caption[0].innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  gif.style.opacity = 1;
})

document.getElementById('next').addEventListener('click', ()=>{
  if(songIndex==9){
    songIndex=0;
  }
  else{
    songIndex+=1;
  }
  makeAllPlays();
  songItemPlay[songIndex].classList.remove("fa-circle-play");
  songItemPlay[songIndex].classList.add("fa-circle-pause");
  audioElement.src = songs[songIndex].filepath;
  caption[0].innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  gif.style.opacity = 1;
})
