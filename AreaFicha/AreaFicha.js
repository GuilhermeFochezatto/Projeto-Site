// Make the DIV element draggable:
const divs = document.getElementsByClassName("dragarea");
const buttonHide = document.getElementsByClassName("hidden");
const show = document.getElementsByClassName("show");
const valor = document.getElementsByClassName("valor");

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

function mostraElemento(elmnt){
  const divPai = elmnt.parentNode;
  
  elmnt.addEventListener('dblclick', function() {
    divPai.style.visibility = 'visible';
    elmnt.style.visibility = 'hidden';
    elmnt.style.display = 'none';
  });
}

function mod(elmnt) {
  const classePai = elmnt.parentNode.classList;
  const nomemod = classePai + 'mod';

  elmnt.addEventListener('keydown', function(event) {
    if (event.key === "Tab")  {
      const valorElmnt = parseInt(elmnt.value, 10);

      const valorMod = Math.floor((valorElmnt - 10) / 2);
      document.getElementById(nomemod).value = valorMod;
      atribuiMod();
      function atribuiMod(){
        const textPericia = document.getElementsByClassName(classePai + 'per');
        console.log(textPericia)
        Array.from(textPericia).forEach(element => {
          element.value = valorMod;
        });
        
      }
    }
  });
}
