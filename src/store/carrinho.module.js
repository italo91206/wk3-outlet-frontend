export const carrinho = {
  namespaced: true,
  state: {
    carrinho: []
  },
  actions: {
    getCarrinho({commit}){
      return commit('getCarrinho');
    },
    adicionarProduto({commit}, payload){
      return commit('adicionarProduto', payload);
    },
    removerProduto({commit}, produto){
      return commit('removerProduto', produto);
    },
  },
  mutations: {
    getCarrinho(state){
      return state.carrinho;
    },
    adicionarProduto(state, payload){
      let produto = { ...payload };
      delete produto.variacoes;
      state.carrinho.push(produto);
    },
    removerProduto(state, produto){
      let i = 0;
      let achado;
      state.carrinho.forEach((item) => {
        if(item == produto)
          achado = i;
        i++;
      })
      state.carrinho.splice(achado, 1);
    },
  }
}