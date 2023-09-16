/*passagem dos elementos HTML para o JS*/
const startButton = document.getElementById('button-start');
const titulo = document.getElementById('titulo');
const homeview = document.getElementById('home-view');
const container = document.getElementById('container-centro');

/*eventos ao clicar o botão 'Começar Aventura!' */
startButton.addEventListener('click', function() {

    /* tira a visualização do botao e do titulo */
    this.style.display = 'none';
    titulo.style.display = 'none';
    
    /* cria um novo título identico ao anterior*/
    const title = document.createElement("div");
    title.innerHTML = '<h1 id="titulo">AUTO D&D</h1>';
    homeview.appendChild(title);

    /* cria a GUI de login */
    const buttons = document.createElement("div");
    buttons.innerHTML = `
    <h2>Usuário</h2>
    <input type="text" class="textfield" id="user">
    <br>
    <br> 
    <h2>Senha</h2>
    <input type="password" class="textfield" id="pass">
    <br>
    <input type="button" class="submit" id="login" value="LOGIN">
    <input type="button" class="submit" id="register" value="REGISTRE-SE">
    `;
    container.appendChild(buttons);

    /* aqui são os argumentos relacionados aos botões da nova UI */
    /* está em time-out pois não identifica os botões recém criados se carregado junto com clique do botão "Start" */
    setTimeout(function() {
        const submits = document.getElementsByClassName('submit');
        for (const submit of submits) {
            submit.addEventListener('click', function() {
                homeview.style.animation = 'fade-out 0.5s'; //frescura 1
                homeview.style.animationFillMode = 'forwards'; //frescura 2
                setTimeout(function() {
                    homeview.addEventListener('animationend', (event) => {homeview.style.display = 'none'}); //Some da tela após acabar a frescura
                }, 200);
            });
        }
    }, 100);



});

