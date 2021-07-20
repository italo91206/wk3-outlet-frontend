import api from '../api/instanceApi';

const ModelosService = {
    getModelos: async() => {
        try {
            const response = await api.get('/modelo/modelos');
            return response;
        }
        catch(error){
            console.log(error)
        }
    }
}

export default ModelosService;