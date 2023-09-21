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
    <input type="text" id="user">
    <br>
    <br> 
    <h2>Senha</h2>
    <input type="password" id="pass">
    <br>
    <input type="button" id="login" value="LOGIN">
    <input type="button" id="register" value="REGISTRE-SE">
    `;
    container.appendChild(buttons);

    /* função que será chamada ao momento do login (função para testar os botões e o pressionar da tecla enter)*/
    function escondeElementos() {
        homeview.style.animation = 'fade-out 0.5s'; //frescura 1
        homeview.style.animationFillMode = 'forwards'; //frescura 2
        setTimeout(function() {
            homeview.addEventListener('animationend', (event) => {homeview.style.display = 'none'}); //Some da tela após acabar a frescura
        }, 200);
    }

    /* aqui são os argumentos relacionados aos botões da nova UI */
    /* está em time-out pois não identifica os elementos recém criados se carregado junto com clique do botão "Start" */
    setTimeout(function() {
        const login = document.getElementById('login');
        const pass = document.getElementById('pass');
        const register = document.getElementById('register');

            pass.addEventListener('keydown', function(event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Evita o envio do formulário
                escondeElementos();
                }
            });
        
            login.addEventListener('click', function() {
                escondeElementos();
            });

            register.addEventListener('click', function() {
                escondeElementos();
            });

    }, 100);

});

