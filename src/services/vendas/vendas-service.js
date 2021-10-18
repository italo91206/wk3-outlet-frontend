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
      response = await api.get('/vendas/venda', {
        params: { id: id }
      });
      return response;
    }
    catch(err){
      console.log(err.message);
    }
  }
}

export default VendasService;