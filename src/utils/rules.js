const rules = {
  required: (value) => !!value || 'Este campo precisa ser preenchido',
  counter: (value) => value.length <= 20 || 'Até no máximo 20 caracteres',
  email: (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail inválido'
  },
  specialCharacters: (value) => {
    const pattern = /[^çÇ-\s\w\u00C0-\u00FF]/g;
    return !pattern.test(value) || 'Não é permitido caracteres especiais'
  },
  onlyCharacters: (value) => {
    const pattern = /[^çÇ-\s\w]/g;
    return !pattern.test(value) || 'Não é permitido caracteres especiais'
  },
  onlyNumbers: (value) => {
    const pattern = /[0-9]/g;
    return pattern.test(value) || 'Não é permitido letras'
  },
  positiveNumber: (value) => {
    return value > 0 || 'Não é permitido valor negativo'
  },
  positiveNotNull: (value) => {
    return value >= 0 || 'Não é permitido valor negativo'
  },
  selectRequired: (value) => {
    console.log("valor", value)
    return value == null || 'Selecione uma opção.';
  },
  dateNotOnPast: (value) => {
    const data = new Date(value)
    const hoje = new Date();

    return data > hoje || "Data precisa ser válida"
  }
};

export default rules;
