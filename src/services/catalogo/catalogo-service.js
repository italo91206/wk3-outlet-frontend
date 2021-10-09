import api from '../api/instanceApi';

const CatalogoService = {
    getProduto: async(url) => {
        try{
            const response = await api.get('/catalogo/produto', {
                params: { url: url }
            });
            return response;
        }
        catch(err){
            console.log(err);
        }
    }
}

export default CatalogoService;