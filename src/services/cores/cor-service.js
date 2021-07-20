import api from '../api/instanceApi';

const CorService = {
    listarCores: async() => {
        try {
            const response = await api.get('/cor/cores');
            return response;
        }
        catch(error){
            console.log(error)
        }   
    }
}

export default CorService;