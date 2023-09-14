
const startButton = document.getElementById('button-start');
const titulo = document.getElementById('titulo');

if (startButton) {
startButton.addEventListener('click', function() {
    titulo.style.animationName = 'fade-out';
    titulo.style.animationDuration = '0.3s';

    startButton.style.animationName = 'fade-out';
    startButton.style.animationDuration = '0.3s';
    titulo.addEventListener('animationend', function() {
      this.style.display = 'none'; 
    });
    startButton.addEventListener('animationend', function() {
      this.style.display = 'none'; 
    });
});
}