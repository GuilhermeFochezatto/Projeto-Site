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
//este contador será importante mais para frente...
let contador = 0;
function mod(elmnt) {
  //os elementos do valor da habilidade e o modificador estão dentro de uma div com seu respectivo nome.
  //primeiro, chamamos essa div
  const classePai = elmnt.parentNode.classList;
  //depois achamos o nome do campo do modificador, que nada mais é que o nome da div pai com o adicional 'mod'
  const nomemod = classePai + 'mod';  

  //Esta parte do código deverá sair, já que aqui eu aguardo pela mudança do valor do campo para fazer os cálculos.
  elmnt.addEventListener('change', function() {
    //chamo o valor do campo como inteiro
    const valorElmnt = parseInt(elmnt.value, 10);
    //calculo o valor do modificador
    const valorMod = Math.floor((valorElmnt - 10) / 2);
    //chamo todos os campos de texto de perícia referentes à atual característica (Ex. carismaper = chama todas as perícias de carisma)
    const textPericia = document.getElementsByClassName(classePai + 'per');
    //faço o mesmo para salvaguardas
    const textSalv = document.getElementsByClassName(classePai + 'salv');

    //atribui o valor do modificador calculado anteriormente ao campo com o nome antes carregado (nomemod)
    document.getElementById(nomemod).value = valorMod;
    atribuiModPer();
    atribuiModSalv();
    

    function atribuiModPer(){
      //continuando no exemplo anterior, para cada elemento da classe 'carismaper'...
      Array.from(textPericia).forEach((element, index )=> {
        //irá atribuir o valor do modificador atual aos elementos da classe
        element.value = valorMod;
        //irá chamar todos os elementos checkboxes que estão dentro da mesma categoria (ex. carisma)
        const checkboxes = element.parentNode.querySelectorAll('.check');
        //vai chamar apenas UM elemento checkbox, sendo esse referente ao respetivo index da query (ou seja, à sua respectiva ordem de aparição)
        let check = checkboxes[index];

        //para este elemento, irá aguardar uma mudança...
        check.addEventListener('change', function () {
          //guarda o valor atual do campo respectivo (AQUI ESTAMOS FALANDO DE NUMERAÇÃO/INDEX/ORDEM DE APARIÇÃO)
          let valorAtual = parseInt(textPericia[index].value, 10) || 0;
          
          //se ESTE ESPECÍFICO checkbox for marcado, irá atribuir o valor de proficiência ao valor atual
          //se for desmarcado, irá subtrair este mesmo valor (não é a melhor técnica, preciso mudar isso)
          if (this.checked) {
            valorAtual += bonusProf;
          } else {
            valorAtual -= bonusProf;
          }

          //valor atual passa a ser o valor do campo de texto respectivo (de novo, falamos aqui de ordem de aparição)
          textPericia[index].value = valorAtual;
        });
      });
    }

    //função semelhante, porém com uma mudança pequena que faz completa diferença: o CONTADOR iniciado fora da função principal
    //a presença do contador indica a ordem que o campo da habilidade foi preenchida, e isso muda completamente a forma com que é designado os campos de texto e checkbox
    //por exemplo: ao preencher as habilidades em ordem (força > destreza > constituição...) a atribuição dos campos de texto e checkboxes respectivas estarão corretas.
    //ao preencher fora de ordem (força > constituição > destreza...) a atribuição das checkboxes respectivas estará errada, sendo assim:
    //marcando a primeira checkbox: campo de texto 1 (força) ganha proficiência (OK)
    //marcando a segunda checkbox: campo de texto 3 (constituição) ganha proficiência (ERRADO)
    function atribuiModSalv(){
      Array.from(textSalv).forEach((element, index )=> {
        element.value = valorMod;
        //basicamente, toda vez que um campo de habilidade é preenchido, é feita uma seleção de todas as checkboxes na área de salvaguardas
        const checkboxes = element.parentNode.querySelectorAll('.check');
        //aqui é armazenado apenas a checkbox que corresponde ao contador, ou seja, se foi a primeira vez que um campo de habilidade foi alterado, o contador vai ser 0
        //se foi a segunda vez, o contador vai ser 1
        //isso possibilita o erro descrito anteriormente, mas foi a solução que encontrei no momento
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

const percepMod = document.getElementById('sabedoriamod').value;
console.log(percepMod)

