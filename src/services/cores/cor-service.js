import api from '../api/instanceApi';

const CorService = {
    listarCores: async() => {
        const cores = await api.get('/cor/cores');
        return cores;
    }
}

export default CorService;