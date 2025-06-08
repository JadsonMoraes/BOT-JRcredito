
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Carrega o FAQ
const faq = JSON.parse(fs.readFileSync('perguntas_respostas_jrcredito.json', 'utf-8'));

const app = express();
app.use(bodyParser.json());

// Função para buscar resposta
function buscarResposta(mensagemCliente) {
    mensagemCliente = mensagemCliente.toLowerCase();
    const encontrado = faq.find(item => mensagemCliente.includes(item.pergunta.toLowerCase()));
    return encontrado ? encontrado.resposta : "Desculpe, não entendi. Vou te encaminhar para um atendente humano.";
}

// Rota para receber mensagem
app.post('/', (req, res) => {
    const mensagemCliente = req.body.message || '';
    const resposta = buscarResposta(mensagemCliente);
    res.json({ reply: resposta });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
