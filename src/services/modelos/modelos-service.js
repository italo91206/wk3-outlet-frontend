import api from '../api/instanceApi';

const ModelosService = {
  verModelos: async () => {
    try {
      const response = await api.get('/modelos/modelos');
      return response;
    }
    catch (error) {
      console.log(error)
    }
  },

  verModelo: async(id) => {
    try{
      const response = await api.get('/modelos/modelo', {
        params: { id: id}
      });
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  atualizarModelo: async(modelo) => {
    try{
      const response = await api.put('/modelos/atualizar', { modelo: modelo });
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  novoModelo: async(modelo) =>{
    try{
      const response = await api.post('/modelos/novo', { modelo: modelo });
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  deletarModelo: async(id) =>{
    try{
      const response = await api.delete('/modelos/deletar', {
        params: { id: id }
      });
      return response;
    }
    catch(error){
      console.log(error);
    }
  }
}

export default ModelosService;