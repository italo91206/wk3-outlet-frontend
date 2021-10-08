import api from '../api/instanceApi';

const AcertoEstoqueService = {
  gravarAcerto: async (produto, usuario, motivo) =>{
    let response;
    try{
      response = api.post('/acerto-de-estoque/acertar', {
        produto: produto,
        usuario: usuario,
        motivo:  motivo
      })
      return response;
    }
    catch(err){
      console.log(err.message);
    }
  },
  listarAcertos: async() => {
    let response;
    try{
      response = api.get('/acerto-de-estoque/acertos');
      return response;
    }
    catch(err){
      console.log(err.message);
    }
  },
  listarAcertosPorUsuario: async(id) => {
    let response;
    try { 
      response = api.get('/acerto-de-estoque/acertosPorUsuario', {
        params: { id: id } 
      });
      return response;
    }
    catch(err){
      console.log(err.message);
    }
  },
}

export default AcertoEstoqueService;