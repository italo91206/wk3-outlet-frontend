import api from '../api/instanceApi';

const LoginService = {
    fazerLogin: async(email, senha) => {
        try {
            const response = await api.post('/login/login', {
                email: email,
                password: senha
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }
}

export default LoginService;