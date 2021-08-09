import api from '../api/instanceApi';

const CupomService = {
  listarCupons: async () => {
    let dados;
    try{
      dados = await api.get('/cupom/cupons');
      return dados;
    }
    catch(err){
      console.log(err.message);
    }
  },

  listarCupom: async (id) => {
    let dados;
    try{
      dados = await api.get('/cupom/cupom', {
        params: { id: id }
      });
      return dados;
    }
    catch(err){
      console.log(err.message);
    }
  },

  novoCupom: async (cupom) => {
    let dados;
    try{
      dados = await api.post('/cupom/novo', { cupom: cupom });
      return dados;
    }
    catch(err){
      console.log(err.message);
    }
  },

  atualizarCupom: async (cupom) => {
    let dados;
    try{
      dados = await api.put('/cupom/atualizar', { cupom: cupom });
      return dados;
    }
    catch(err){
      console.log(err.message);
    }
  },

  deletarCupom: async (id) => {
    let dados;
    try{
      dados = await api.delete('/cupom/deletar', {
        params: { id: id }
      });
      return dados;
    }
    catch(err){
      console.log(err.message);
    }
  }
}

export default CupomService;