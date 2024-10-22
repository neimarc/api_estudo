// const { knex } = require('');
const { saudarSchema } = require('../validacoes.js/usuarios.squema');


const saudar = async (req, res) => {

    let { nome_usuario, sexo_usuario, pergunto_quantas_vezes, apresentar_IA } = req.body;


    try {
        await saudarSchema.validate(req.body);

        nome_usuario = nome_usuario.trim();
        sexo_usuario = sexo_usuario.trim();
        apresentar_IA = apresentar_IA.trim();


        const resposta = [];

        if (apresentar_IA) {
            if (apresentar_IA == "Sim" || apresentar_IA == "sim") {
                const ola = `Olá, ${nome_usuario}!`;
                const apresentacao = `Eu sou a versão IA da Ellen Santos, estudante do curso técnico em Astrologia e estagiária da SmartLevel. Tenho 40 anos de idade, quatro filhos (um cachorro, um gato, um rato e uma cobra) e o meu objetivo é ficar rica e ir morar em Dubai.`;

                resposta.push(ola);
                resposta.push(apresentacao)
            } else {
                const ola = `Olá, ${nome_usuario}!`;
                const apresentacao = `Que pena que você não quis a minha apresentação!`;

                resposta.push(ola);
                resposta.push(apresentacao)
            }
        }

        for (let i = 0; i < pergunto_quantas_vezes; i++) {
            if (sexo_usuario == "masculino" || sexo_usuario == "Masculino") {
                if (pergunto_quantas_vezes == 1) {
                    const saudacao = `Então, ${nome_usuario}: Está disposto a aprender sobre tecnologia hoje, meu rapaz ? `;
                    resposta.push(saudacao)
                } else {
                    const saudacao = `Então, ${nome_usuario}: Está disposto a aprender sobre tecnologia hoje, meu rapaz ? `;
                    const repetir = "Vou repetir:";

                    resposta.push(saudacao)
                    if (i < pergunto_quantas_vezes - 1)
                        resposta.push(repetir);
                }

            } else if (sexo_usuario == "feminino" || sexo_usuario == "Feminino") {
                if (pergunto_quantas_vezes == 1) {
                    const saudacao = `Então, ${nome_usuario}: Está disposto a aprender sobre tecnologia hoje, minha senhora ? `;
                    resposta.push(saudacao)
                } else {
                    const saudacao = `Então, ${nome_usuario}: Está disposto a aprender sobre tecnologia hoje, minha senhora ? `;
                    const repetir = "Vou repetir:";

                    resposta.push(saudacao)
                    if (i < pergunto_quantas_vezes - 1)
                        resposta.push(repetir);
                }
            } else {
                res.status(404).send(`Desculpe, ${nome_usuario}, mas eu não entendi o que você é`);
            }
        }

        res.status(200).json(resposta)

    } catch (erro) {
        res.status(500).json({ mensagem: `Erro no servidor.Tente novamente mais tarde.` })
    }

}




const cadastrarUsuario = async (req, res) => {

    const { nome, endereco, telefone, email } = req.body;

    try {

        await cadastroUsuarioSchema.validate(res.body);

        nome = nome.trim();
        endereco = endereco.trim();
        telefone = telefone.trim();
        email = email.trim();

        const existeUsuario = await knex('usuarios').where({ email }).first();

        if (existeUsuario) {
            return res.status(400).json("O e-mail já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios')
            .insert({
                nome,
                endereco,
                telefone,
                email,
                senha: senhaCriptografada,
            }).returning('*')

        if (!usuario) {
            return res.status(400).json("O usuário não foi cadastrado")
        }

        const usuarioRetornado = {
            id_usuario: usuario[0].id_usuario,
            nome: usuario[0].nome,
            telefone: usuario[0].telefone,
            email: usuario[0].email
        }


        return res.status(200).json(usuarioRetornado)


    } catch (erro) {

    }
}

module.exports = {
    saudar,
    cadastrarUsuario
}