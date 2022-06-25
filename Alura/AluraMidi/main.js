function tocaSom(idSom){
    const elemento = document.querySelector(idSom);
    
    if (elemento && elemento.localName === 'audio') {
        elemento.play();
    } else {
        console.log('Elemento não encontrado');
    }
}

const listaDeTeclas = document.querySelectorAll('.tecla');

for (i=0; i<listaDeTeclas.length; i++){
    const tecla = listaDeTeclas[i]
    const barulho = tecla.classList[1];
    const idAudio = `#som_${barulho}`;   // template string
    
    tecla.onclick =   function() {
        tocaSom(idAudio);
    }

    tecla.onkeydown = function (evento) {

        if (evento.code === 'Space' || evento.code === 'Enter') {
            tecla.classList.add('ativa');
        }
    }

    tecla.onkeyup = function(){
        tecla.classList.remove('ativa');
    }
}