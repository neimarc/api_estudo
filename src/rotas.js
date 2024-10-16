const express = require('express');

const { saudar, cadastrarUsuario } = require('./controladores/usuarios.js');

const rotas = express();

rotas.post('/usuario/saudar', saudar);
rotas.post('/usuario/cadastrar', cadastrarUsuario);
