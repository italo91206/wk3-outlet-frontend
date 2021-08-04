import api from '../api/instanceApi';

const UsuarioService = {
    listarUsuarios: async() => {
        const response = await api.get('/usuario/usuarios')
        return response;
    },
    listarUsuario: async(id) => {
        const response = await api.post('/usuario/usuario', { id: id });
        return response;
    },
    novoUsuario: async(usuario) => {
        const response = await api.post('/usuario/novo', { usuario: usuario });
        return response;
    },
    deletarUsuario: async(id) => {
        const response = await api.post('/usuario/deletar', { id: id });
        return response;
    }
}

export default UsuarioService;