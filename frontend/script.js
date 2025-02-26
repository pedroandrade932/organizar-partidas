const partidasDiv = document.getElementById('partidas');

// Função para buscar e exibir as partidas
async function exibirPartidas() {
  const response = await fetch('/partidas');
  const partidas = await response.json();
  partidasDiv.innerHTML = JSON.stringify(partidas);
}

exibirPartidas();