const validacao = {
	validarNumeroInteiro: function(e){
		let valor = parseInt(e);
		if (isNaN(valor))
			return 'Valor é nulo';
		else if(valor < 0)
			return 'Valor não pode ser menor que 0';
		else
			return null;
	},

	validarNome: function(string){
		if(/[^A-z\s\d][\\^]?/.test(string))
			return 'Não é possível inserir caracteres especiais';
		else
			return null;
	},

	validarNumeroFlutuante: function(e){
		let valor = parseFloat(e);
		if(isNaN(valor))
			return 'Valor é nulo';
		else if(valor <= 0)
			return 'Precisa ser maior que zero';
		else
			return null;
	},

	validarDataCupom: function(data){
		var hoje = new Date();

		if(data < hoje)
			return 'Data precisa ser válida';
		else
			return null;
	}
}

export default validacao;