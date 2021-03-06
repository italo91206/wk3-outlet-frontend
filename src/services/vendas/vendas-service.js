import api from '../api/instanceApi';

const VendasService = {
  listarVendas: async() => {
    let response;
    try{
      response = await api.get('/vendas/vendas');
      return response;
    }
    catch(err){
      console.log(err.message);
    }
  },

  recuperarVenda: async(id) => {
    let response;
    try{
      response = await api.get(`/vendas/venda/${id}`);
      return response;
    }
    catch(err){
      console.log(err.message);
    }
  },

  cancelarVenda: async(id) => {
    let response;
    try{
      response = await api.delete(`/vendas/cancelar/${id}`);
      return response;
    }
    catch(err){
      console.log(err.message)
    }
  }
}

export default VendasService;
