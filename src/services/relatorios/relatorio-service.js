import api from '../api/instanceApi';

const RelatoriosService = {
  getVendas: async() => {
    const response = await api.get('/relatorios/vendas');
    return response;
  },

  getUsuarios: async() => {
    const response = await api.get('/relatorios/usuarios');
    return response;
  },

  getProdutos: async() => {
    const response = await api.get('/relatorios/produtos');
    return response;
  }
}

export default RelatoriosService;
