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
    },

    novoProduto: async(produto) => {
        const response = await api.post('/produto/novo', { produto: produto });
        return response;
    },

    deletarProduto: async(id) => {
        const response = await api.post('/produto/deletar', { id: id });
        return response;
    },

    atualizarProduto: async(produto) => {
        const response = await api.put('produto/atualizar', { produto: produto });
        return response;
    },

    recuperarUrlPorId: async(id) => {
        try {
            const response = await api.get('/produto/produtoPorId', {
                params: { id: id}
            });
            return response;
        }
        catch(err){
            console.log(err);
        }
    },

    recuperarVariacoes: async(id) => {
        try {
            const response = await api.get('/produto/filhos', {
                params: { id: id }
            });
            return response;
        }
        catch(err){
            console.log(err);
        }
    }
}

export default ProdutoService;