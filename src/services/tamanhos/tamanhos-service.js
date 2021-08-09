import api from '../api/instanceApi';

const TamanhosService = {
  listarTamanhos: async () => {
    let response;
    try {
      response = await api.get('/tamanho/tamanhos');
      return response;
    }
    catch(err){
      console.log(err.message);
    }
  },
  listarTamanho: async (id) => { 
    let response;
    try{
      response = await api.get('/tamanho/tamanho', {
        params: { id: id}
      });
      return response;
    }
    catch(err){
      console.log(err.message);
    }
  },
  deletarTamanho: async (id) => {
    let response;
    try{
      response = await api.delete('/tamanho/deletar', {
        params: {id: id}
      });
      return response;
    }
    catch(err){
      console.log(err.message);
    }
  },
  atualizarTamanho: async (tamanho) => { 
    let response;
    try{
      response = await api.put('/tamanho/atualizar', { tamanho: tamanho });
      return response;
    }
    catch(err){
      console.log(err.message);
    }
  },
  novoTamanho: async (tamanho) => {
    let response;
    try{
      response = await api.post('/tamanho/novo', { tamanho: tamanho });
      return response;
    }
    catch(err){
      console.log(err.message);
    }
  }
}

export default TamanhosService;