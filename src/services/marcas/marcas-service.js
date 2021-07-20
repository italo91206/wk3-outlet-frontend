import api from '../api/instanceApi';

const MarcasService = {
    getMarcas: async() => {
        try {
            const response = await api.get('/marca/marcas')
            return response;
        }
        catch(error){
            console.log(error)
        }
    }
}

export default MarcasService;