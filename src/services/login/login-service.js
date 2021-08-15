import api from '../api/instanceApi';

const LoginService = {
  fazerLogin: async (usuario) => {
    try {
      const response = await api.post('/login/login', {
        email: usuario.email,
        password: usuario.senha
      });
      return response;
    }
    catch (error) {
      console.log(error);
    }
  }
}

export default LoginService;