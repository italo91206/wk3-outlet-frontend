import api from '../api/instanceApi';

const CategoriaService = {
  verCategorias: async() => { 
    try{
      const response = await api.get('/categorias/categorias');
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  verCategoria: async(id) => {
    try{
      const response = await api.get('/categorias/categoria', {
        params: { id: id }
      });
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  novaCategoria: async(categoria) => {
    try{
      const response = await api.post('/categorias/novo', {
        categoria: categoria,
      })
      return response;
    }
    catch(error){
      console.log(error);
    }
  },
  
  deletarCategoria: async(id) => {
    try{
      const response = await api.delete('/categorias/deletar/', {
        params: { id: id }
      });
      return response;
    }
    catch(error){
      console.log(error);
    }
  },

  atualizarCategoria: async(categoria) => {
    try{
      const response = await api.put('/categorias/atualizar', { categoria: categoria });
      return response;
    }
    catch(error){
      console.log(error);
    }
  },
  
}

export default CategoriaService;