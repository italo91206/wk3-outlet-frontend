const rules = { 
    required: (value) => !!value || 'Este campo precisa ser preenchido.',
    counter: (value) => value.length <= 20 || 'Até no máximo 20 caracteres',
    email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail inválido'
    }
};

export default rules;