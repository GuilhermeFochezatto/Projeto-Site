const divs = document.getElementsByClassName("dragarea");
const buttonHide = document.getElementsByClassName("hidden");
const show = document.getElementsByClassName("show");
const valor = document.getElementsByClassName("valor");
const textSalva = document.getElementsByClassName('salv');
const prof = document.getElementById("bonusprof");

//convertendo o valor do Bonus de Proficiencia para Inteiro
let bonusProf = parseInt(prof.value, 10) || 0;
prof.addEventListener('change', function () {
  bonusProf = parseInt(prof.value, 10) || 0;
})

/*Chamando funções para cada elemento de uma classe*/
Array.from(valor).forEach(element => {
  mod(element);
});

Array.from(divs).forEach(element => {
  dragElement(element);
});

Array.from(buttonHide).forEach(element => {
  hide(element);
});

Array.from(show).forEach(element => {
  mostraElemento(element);
});


//função para arrastar todos os elementos da classe dragarea
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.addEventListener('mousedown', dragMouseDown);

  function dragMouseDown(e) {
    // Verifique se o elemento clicado não é da classe dragarea
    if (e.target.classList.contains('dragarea') || e.target.classList.contains('show') ) {
      // Inicializa as posições iniciais do mouse
      pos3 = e.clientX;
      pos4 = e.clientY;

      // Define os eventos de movimento e soltar do mouse
      document.addEventListener('mousemove', elementDrag);
      document.addEventListener('mouseup', closeDragElement);
    }
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // Limpa os eventos quando o botão do mouse é solto
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
  }

}

//função para alterar o display do elemento pai do botão classe hidden
function hide(elmnt){
  const divPai = elmnt.parentNode;
  const thisshow = divPai.getElementsByClassName("show");

    elmnt.addEventListener('click', function() {
      divPai.style.visibility = 'hidden';
      Array.from(thisshow).forEach(element => {
        element.value = divPai.id;
        element.style.display = 'flex';
        element.style.visibility = 'visible'
      });
    });
}

//função para alterar o display do elemento pai do botão classe show
function mostraElemento(elmnt){
  const divPai = elmnt.parentNode;
  
  elmnt.addEventListener('dblclick', function() {
    divPai.style.visibility = 'visible';
    elmnt.style.visibility = 'hidden';
    elmnt.style.display = 'none';
  });
}

//função que calcula os modificadores e os atribui nas perícias e salvaguardas (NÃO MEXER, ISSO TA UMA BAGUNÇA) 
let contador = 0;
function mod(elmnt) {
  const classePai = elmnt.parentNode.classList;
  const nomemod = classePai + 'mod'; 

  elmnt.addEventListener('change', function() {
    const valorElmnt = parseInt(elmnt.value, 10);
    const valorMod = Math.floor((valorElmnt - 10) / 2);
    const textPericia = document.getElementsByClassName(classePai + 'per');
    const textSalv = document.getElementsByClassName(classePai + 'salv');
    const percep = document.getElementById('percep');

    document.getElementById(nomemod).value = valorMod;
    atribuiModPer();
    atribuiModSalv();
      
    function atribuiModPer(){
      Array.from(textPericia).forEach((element, index )=> {
        element.value = valorMod;
        const checkboxes = element.parentNode.querySelectorAll('.check');
        let check = checkboxes[index];

        if (nomemod == "sabedoriamod"){
          percep.value = valorMod + 10;
        }

        check.addEventListener('change', function () {
          let valorAtual = parseInt(textPericia[index].value, 10) || 0;
            
          if (this.checked) {
            valorAtual += bonusProf;
          } else {
            valorAtual -= bonusProf;
          }

          textPericia[index].value = valorAtual;

          if ((nomemod == "sabedoriamod")&&(index == 3)){
            if (this.checked) {
              percep.value = parseInt(percep.value,10) + bonusProf;
              
            } else {
              percep.value = parseInt(percep.value,10) - bonusProf;
            }
          }

        });

      });
    }

    function atribuiModSalv(){
      Array.from(textSalv).forEach((element, index )=> {
        element.value = valorMod;
        const checkboxes = element.parentNode.querySelectorAll('.check');
        let check = checkboxes[contador];

        check.addEventListener('change', function () {
          let valorAtual = parseInt(textSalv[index].value, 10) || 0;
         
          if (this.checked) {
            
            valorAtual += bonusProf;
            
          } else {
            valorAtual -= bonusProf;
          }
          textSalv[index].value = valorAtual;
        });

        ++contador;
      });
    }
  });

}
