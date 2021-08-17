import api from '../api/instanceApi';

const categoriaService = {
  verCategorias: async() => { 
    try{
      const response = await api.get('/categorias/categorias');
      return response;
    }
    catch(error){
      console.log(error);
    }
  },
  verCategoria: async(id) => { },
  novaCategoria: async(categoria) => { },
  deletarCategoria: async(id) => { },
  atualizarCategoria: async(categoria) => { },
}