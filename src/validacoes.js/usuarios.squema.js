const yup = require('yupConfig');



const saudarSchema = yup.object().shape({
    nome: yup.string().required(),
    sexo: yup.string().required(),
    vezes: yup.number().required()
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