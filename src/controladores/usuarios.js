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
                let ola = `Olá, ${nome_usuario}!`;
                let apresentacao = `Eu sou a versão IA da Ellen Daniel, estudante do curso técnico em Astrologia e estagiária da SmartLevel. Atualmete, moro em Barreiras, tenho 40 anos de idade, cinco animais (um cachorro, um gato, um rato, uma cobra e um(a) namorado(a)), sou gótica, de Áries e, nas horas vagas, gosto de ouvir rock e assistir filmes e séries de terror e ficção científica. Estou estudando horrores neste ano (pegando 34 matérias), mais que o Mark Zuckerberg nos tempos da Havard, porque o meu objetivo é ficar rica e ir morar em Dubai. Mas por hora, no estágio, estou tendo que aturar um chato, com nome de jogador famoso, de futebol, que, a cada manhã, me pede para instalar alguma coisa em minha máquina, e à noite, me arruma mais dores de cabeça no meu horário de estudo. Ai, meu Deus do céu, socorro!!!`;
                let Aperguntar = `Sem mais sobre mim, eu lhe pergunto:`;
                resposta.push(ola);
                resposta.push(apresentacao);
                resposta.push(Aperguntar)

            } else if (apresentar_IA == "Não" || apresentar_IA == "não") {
                let ola = `Olá, ${nome_usuario}!`;
                let apresentacao = `Que pena que você não quis que eu me apresentasse, meu bem!`;
                let Aperguntar = `Já que não sou rancorosa, vou lhe perguntar assim mesmo:`;
                resposta.push(ola);
                resposta.push(apresentacao);
                resposta.push(Aperguntar)

            } else {
                let ola = `Olá, ${nome_usuario}!`;
                let apresentacao = `Você entendeu que deve responder sim ou não, meu amor?`;
                resposta.push(ola);
                resposta.push(apresentacao);
                return res.status(400).json(resposta);

            }

        }
        else {
            let ola = `Olá, ${nome_usuario}!`;
            let apresentacao = `Você precisa responder a pergunta, baby.`;
            resposta.push(ola);
            resposta.push(apresentacao);
            return res.status(400).json(resposta);

        }

        for (let i = 0; i < pergunto_quantas_vezes; i++) {

            let repetir = "Vou repetir:";

            if (sexo_usuario == "masculino" || sexo_usuario == "Masculino") {

                let saudacao = `${nome_usuario}, está disposto a aprender sobre tecnologia hoje, meu querido? `;

                if (pergunto_quantas_vezes == 1) {

                    resposta.push(saudacao)

                } else {

                    resposta.push(saudacao)

                    if (i < pergunto_quantas_vezes - 1) {

                        resposta.push(repetir);
                    }
                }

            } else if (sexo_usuario == "feminino" || sexo_usuario == "Feminino") {

                let saudacao = `${nome_usuario}, está disposta a aprender sobre tecnologia hoje, minha querida? `;

                if (pergunto_quantas_vezes == 1) {

                    resposta.push(saudacao)

                } else {

                    resposta.push(saudacao)

                    if (i < pergunto_quantas_vezes - 1)
                        resposta.push(repetir);
                }
            } else {
                return res.status(400).json(`Desculpe, ${nome_usuario}, mas eu não entendi o que você é, meu bem...`);
            }
        }

        return res.status(200).json(resposta)

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