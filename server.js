import express from "express";
import princesas from './src/data/princesas.js';

const serverPort = 3001;
const app = express().use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <div style="
      background: linear-gradient(135deg, #ff69b4, #8a2be2);
      color: white;
      padding: 50px;
      text-align: center;
      font-family: 'Georgia', serif;
      min-height: 100vh;
      margin: 0;
    ">
      <h1 style="
        font-size: 3rem;
        color: #ffe4e1;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        margin-bottom: 20px;
      ">
        👑 Bem-vindo ao Reino Encantado das Princesas! 👑
      </h1>
      <p style="font-size: 1.5rem; margin: 20px 0;">
       ✨ Magia, coragem e coração verdadeiro ✨
      </p>
      <p style="font-size: 1.2rem; opacity: 0.9;">
        "Toda princesa carrega dentro de si a força de mudar o seu destino com gentileza, coragem e amor."
      </p>
      <p style="font-size: 1.5rem; margin: 20px 0;">
  👸 <a href="http://localhost:3001/princesas" style="color: #ffe4e1; text-decoration: none;">Veja as princesas por aqui!</a> 👸
</p>
    </div>
    `);
});

app.get("/princesas", (req, res) => {
    res.json(princesas);
});

app.get("/princesas/:id", (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    const princesa = princesas.find(b => b.id === id);
    if (princesa) {
        res.status(200).json(princesa);
    } else {
        res.status(404).json({
            error: "Princesa não encontrada"
        });
    }
});

app.get("/princesas/nome/:nome", (req, res) => {
    let nome = req.params.nome.toLowerCase();
    const princesasEncontradas = princesas.filter(b => b.nome.toLowerCase().includes(nome));
    if (princesasEncontradas.length > 0) {
        res.status(200).json(princesasEncontradas);
    } else {
        res.status(404).json({
            error: "princesa não encontrada"
        });
    }
});

app.get("/princesas/reino/:reino", (req, res) => {
    let nome = req.params.reino.toLowerCase();
    const reinoDasPrincesas = princesas.filter(b => b.reino.toLowerCase().includes(nome));
    if (reinoDasPrincesas.length > 0) {
        res.status(200).json(reinoDasPrincesas);
    } else {
        res.status(404).json({
            error: "Reino não encontrada"
        });
    }
});

app.get("/princesas/ativas/nao", (req, res) => {
    const resultado = princesas.filter((b) => b.ativa === false);

    if (resultado.length > 0) {
        res.status(200).json(resultado);
    } else {
        res.status(404).json({ erro: "Nenhuma princesa inativa encontrada" });
    }
});

app.get("/princesas/ativas/sim", (req, res) => {
    const resultado = princesas.filter((b) => b.ativa === true);

    if (resultado.length > 0) {
        res.status(200).json(resultado);
    } else {
        res.status(404).json({ erro: "Nenhuma princesa ativa encontrada" });
    }
});


app.listen(serverPort, () => {
    console.log(`👑 Servidor das princesas iniciado em: http://localhost:${serverPort}`)
});