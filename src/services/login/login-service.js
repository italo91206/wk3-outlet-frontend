import api from '../api/instanceApi';

const LoginService = {
  fazerLogin: async (usuario) => {
    try {
      const response = await api.post('/login/login', {
        email: usuario.email,
        password: usuario.senha
      });
      // localStorage.setItem('user', response.data.data.token);
      return response;
    }
    catch (error) {
      console.log(error);
    }
  }
}

export default LoginService;