import api from '../api/instanceApi';

const ProdutoService = {
    listarProdutos: async() => {
        const response = await api.get('/produto/produtos');
        return response;
    },

    recuperarProduto: async(data) => {
        const response = await api.get('/produto/produto', {
            params: { url: data }
        });
        return response;
    }
}

export default ProdutoService;