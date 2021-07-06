import api from '../api/instanceApi';

const ProdutoService = {
    listarProdutos: async() => {
        const response = await api.get('/produto/produtos');
        return response;
    }
}

export default ProdutoService;