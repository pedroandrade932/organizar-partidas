const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

const partidasFilePath = 'partidas.json';

// Função para ler os dados do arquivo JSON
function lerPartidas() {
  try {
    const data = fs.readFileSync(partidasFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Função para escrever os dados no arquivo JSON
function escreverPartidas(partidas) {
  fs.writeFileSync(partidasFilePath, JSON.stringify(partidas, null, 2));
}

// Rotas da API
app.get('/partidas', (req, res) => {
  const partidas = lerPartidas();
  res.json(partidas);
});

app.post('/partidas', (req, res) => {
  const novaPartida = req.body;
  const partidas = lerPartidas();
  partidas.push(novaPartida);
  escreverPartidas(partidas);
  res.status(201).json(novaPartida);
});

app.put('/partidas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const partidaAtualizada = req.body;
  const partidas = lerPartidas();
  const index = partidas.findIndex(partida => partida.id === id);
  if (index !== -1) {
    partidas[index] = partidaAtualizada;
    escreverPartidas(partidas);
    res.json(partidaAtualizada);
  } else {
    res.status(404).send('Partida não encontrada');
  }
});

app.delete('/partidas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const partidas = lerPartidas();
  const index = partidas.findIndex(partida => partida.id === id);
  if (index !== -1) {
    partidas.splice(index, 1);
    escreverPartidas(partidas);
    res.status(204).send();
  } else {
    res.status(404).send('Partida não encontrada');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});