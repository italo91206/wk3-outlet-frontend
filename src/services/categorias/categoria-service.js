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
  // verCategoria: async(id) => { },
  novaCategoria: async(categoria, parentesco) => {
    try{
      const response = await api.post('/categorias/novo', {
        categoria: categoria,
        parentesco: parentesco
      })
      return response;
    }
    catch(error){
      console.log(error);
    }
  },
  // deletarCategoria: async(id) => { },
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