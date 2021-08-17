import api from '../api/instanceApi';

const CorService = {
  listarCores: async () => {
    try {
      const response = await api.get('/cor/cores');
      return response;
    }
    catch (error) {
      console.log(error)
    }
  },

  listarCor: async (id) => {
    const response = await api.get('/cor/cor', {
      params: { id: id }
    });
    return response;
  },

  deletarCor: async (id) => {
    try{
      const response = await api.delete('/cor/deletar', {
        params: { id: id }
      })
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  salvarCor: async (cor) => {
    try{
      const response = await api.post('/cor/novo', { cor: cor });
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  atualizarCor: async (cor) => {
    try{
      const response = await api.put('/cor/atualizar', { cor: cor });
      return response;
    }
    catch(error){
      console.log(error);
    }
  }
}

export default CorService;