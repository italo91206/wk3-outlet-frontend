import api from '../api/instanceApi';

const MotivosService = {
  listarMotivos: async () => {
    try {
      const response = await api.get('/motivo/motivos');
      return response;
    }
    catch (error) {
      console.log(error);
    }
  },

  getMotivo: async (id) => {
    try {
      const response = await api.get('/motivo/motivo', {
        params: { id: id }
      });
      return response;
    }
    catch (error) {
      console.log(error);
    }
  },

  atualizarMotivo: async (motivo) => {
    try {
      const response = await api.put('/motivo/atualizar', { motivo: motivo });
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  deletarMotivo: async (id) => {
    try {
      const response = await api.delete('/motivo/deletar', {
        params: { id: id }
      });
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  novoMotivo: async(motivo) => {
    try {
      const response = await api.post('/motivo/novo', { motivo: motivo });
      return response;
    }
    catch(error){
      console.log(error);
    }
  }
}

export default MotivosService;