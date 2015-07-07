var player = document.getElementById('player');
var playlist = document.getElementById('playlist'),
    parar = document.getElementById('parar'),
    mudo = document.getElementById('mudo'),
    volMaximo = document.getElementById('vol-max'),
    play = document.getElementById('play'),
    audio = document.getElementById('audio'),
    nivelVolume = document.getElementById('nivel-volume'),
    titulo = document.getElementById('titulo'),
    artista = document.getElementById('artista'),
    anterior = document.getElementById('anterior'),
    proximo = document.getElementById('proximo'),
    repetir = document.getElementById('repetir'),
    aleatorio = document.getElementById('aleatorio'),
    mTempoAtual = document.getElementById('m-tempo-atual'),
    mTempoDuracao = document.getElementById('m-tempo-duracao'),
    mProgresso = document.getElementById('m-progresso');

nivelVolume.onchange = function() {
  volume();
  verificaMaximo();
  verificaMudo();
};

function volume() {
  audio.volume = Math.floor(nivelVolume.value)/100;
}

function tocar() {
    audio.play();
    parar.classList.remove('ativo');
    play.classList.remove('icon-play');
    play.classList.add('icon-pause');
    contarTempo();
}

function pausar() {
    audio.pause();
    play.classList.remove('icon-pause');
    play.classList.add('icon-play');
}

function verificaMudo() {
  if (audio.muted || audio.volume == 0) {
    mudo.classList.add("ativo");
  } else {
    mudo.classList.remove("ativo");
  }
};
verificaMudo();

function verificaMaximo() {
  if (audio.volume == 1.0) {
    volMaximo.classList.add("ativo");
    nivelVolume.value = 100;
  } else {
    volMaximo.classList.remove("ativo");
  }
};
verificaMaximo();

mudo.onclick = function() {
    if(audio.muted) {
      audio.muted = false;
      verificaMaximo();
    }
    else {
      audio.muted = true;
      volMaximo.classList.remove("ativo");
    }
    verificaMudo();
};

volMaximo.onclick = function() {
    audio.volume = 1.0;
    audio.muted = false;
    verificaMudo();
    verificaMaximo();
};

playlist.onclick = function exibirPlaylist() {
    var mostrarPlaylist = document.getElementById('mostrar-playlist');
    mostrarPlaylist.classList.toggle('exibir');
}

play.style.visibility = "hidden";

audio.onloadedmetadata = function() {

play.style.visibility = "visible";  
  
var duracao = coverteDuracao(audio.duration); 

function coverteDuracao(tempo) {
  tempo = parseInt(tempo);
  var segundo = tempo % 60;
  var minuto = Math.floor(tempo / 60);
  return verificaUnidade(minuto) + ':' + verificaUnidade(segundo);
}

function verificaUnidade(tempo) {
  tempo += "";
  if (tempo.length < 2) tempo = "0" + tempo;
  return tempo;
}

parar.onclick = function () {
  parar.classList.toggle('ativo');
  audio.load();
  play.classList.remove('icon-pause');
  play.classList.add('icon-play');
  mTempoDuracao.innerHTML = '--:--';
  mTempoAtual.innerHTML = '--:--';
};

mProgresso.onchange = function atualizaProgresso() {
  audio.currentTime = mProgresso.value/100*audio.duration;
}
function contarTempo() {
  if (audio.currentTime < audio.duration){
    var tempo = setInterval(function(){
      var percentProgresso = (Math.round(audio.currentTime)*100/audio.duration).toFixed(2);
      var progresso = coverteDuracao(audio.currentTime);
      mTempoAtual.innerHTML = progresso;
      mTempoDuracao.innerHTML = duracao;
      mProgresso.value = percentProgresso;
      if ((progresso == duracao) & !(audio.loop)) {
        audio.ended = true;
        play.classList.remove('icon-pause');
        play.classList.add('icon-play');
        clearInterval(tempo);
      }
    }, 100);
  }
}

play.onclick = function() {
  var classPlay = play.classList; 
  if (classPlay == 'controle icon-play'){
    tocar();
  } else if (classPlay == 'controle icon-pause'){
    pausar();
  }
};
  
};
