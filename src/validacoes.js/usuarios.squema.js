const yup = require('./yupConfig');



const saudarSchema = yup.object().shape({
    nome_usuario: yup.string().required(),
    sexo_usuario: yup.string().required(),
    pergunto_quantas_vezes: yup.number().required(),
    apresentar_IA: yup.string().required()

});


const cadastroUsuarioSchema = yup.object().shape({
    nome: yup.string().required(),
    endereço: yup.string(),
    telefone: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string().min(6).max(10).required()
});

module.exports = {
    saudarSchema,
    cadastroUsuarioSchema
}