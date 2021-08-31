import api from '../api/instanceApi';

const ImagemService = {
	enviarImagens: async(formData) => {
		try {
			const response = await api.post('/imagens/upload', formData, {
				headers: {
					"Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
				}
			})
			return response;
		}
		catch(error){
			console.log(error)
		}
	},
	recuperarImagens: async(id) => {
		try {
			const response = await api.get('/imagens/recuperar', {
				params: { id: id },
			});
			return response;
		}
		catch(error){
			console.log(error);
		}
	}
}

export default ImagemService;