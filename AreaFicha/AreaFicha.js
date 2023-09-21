// Make the DIV element draggable:
var divs = document.getElementsByClassName("dragarea")

Array.from(divs).forEach(element => {
  dragElement(element);
});

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.addEventListener('mousedown', dragMouseDown);

  function dragMouseDown(e) {
    // Verifique se o elemento clicado não é o elemento com a classe "statsfield"
    if (!e.target.classList.contains('statsfield') && !e.target.classList.contains('mod')) {
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
