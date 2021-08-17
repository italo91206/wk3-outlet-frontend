import api from '../api/instanceApi';

const MarcasService = {
  getMarcas: async () => {
    try {
      const response = await api.get('/marcas/marcas')
      return response;
    }
    catch (error) {
      console.log(error)
    }
  },

  getMarca: async(id) => {
    try{
      const response = await api.get('/marcas/marca',{
        params: { id: id}
      })
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  salvarMarca: async(marca) =>{
    try{
      const response = await api.put('/marcas/atualizar',{
        marca: marca
      });
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  deletarMarca: async(id) => {
    try {
      const response = await api.delete('/marcas/deletar', {
        params: { id: id}
      });
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  novaMarca: async(marca) => {
    try{
      const response = await api.post('/marcas/novo', { marca: marca });
      return response;
    }
    catch(error){
      console.log(error);
    }
  }
}

export default MarcasService;