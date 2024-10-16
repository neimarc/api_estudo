const { knex } = require('');
const { saudarSchema } = require('../validacoes.js/usuarios.squema');


const saudar = async (req, res) => {

    let { nome, sexo, vezes } = req.body;


    try {
        await saudarSchema.validate(req.body);

        nome = nome.trim();
        sexo = sexo.trim();

        const resposta = [];
        for (let i = 0; i < vezes; i++) {
            if (sexo == "masculino") {
                const saudacao = `Olá, ${nome}! 
                Está disposto a aprender sobre tecnologia hoje, meu rapaz?`;
                resposta.push(saudacao)
            } else if (sexo == "feminino") {
                const saudacao = `Olá, ${nome}! 
                Está disposta a aprender sobre tecnologia hoje, minha senhora?`;
                resposta.push(saudacao)
            } else {
                res.status(404).send(`Desculpe, ${nome}, mas eu não entendi o que você é`);
            }
        }

        res.status(204).send(resposta)

    } catch (erro) {
        res.status(500).json({ mensagem: `Erro no servidor. Tente novamente mais tarde.` })
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