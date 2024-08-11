const express = require('express');
const app = express();
const port = 3000;

const axios = require('axios');



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

/*app.get('/novarota', (req, res) => {
    res.send('Nova Rota Criada');
}); */

app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep; //Obtendo cep da URL
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/; //Validando CEP

    try{
        if(!cepRegex.test(cep)){
            res.status(400).send('CEP inválido. Formato: XXXXX-XXX')
            }else{ 
              const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            res.json(response.data) // Retorna a resposta
            }

    } catch (error) {
        console.error('Erro ao fazer a requisição', error);
        res.status(500).send('Erro ao consultar o CEP');
    }
});
