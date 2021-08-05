import api from '../api/instanceApi';

const CorService = {
    listarCores: async() => {
        try {
            const response = await api.get('/cor/cores');
            return response;
        }
        catch(error){
            console.log(error)
        }   
    },

    listarCor: async(id) => {
        const response = await api.get('/cor/cor', { 
            params: { id: id }
        });
        return response;
    },

    deletarCor: async(id) => {
        const response = await api.delete('/cor/deletar', {
            params: { id: id }
        })
        return response;
    },

    salvarCor: async(cor) => {
        const response = await api.post('/cor/novo', { cor: cor });
        return response;
    },

    atualizarCor: async(cor) => {
        const response = await api.put('/cor/atualizar', { cor: cor });
        return response;
    }
}

export default CorService;