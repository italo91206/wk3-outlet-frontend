export const carrinho = {
  namespaced: true,
  state: {
    carrinho: []
  },
  actions: {
    getCarrinho({commit}){
      return commit('getCarrinho');
    },
    adicionarProduto({commit}, produto){
      return commit('adicionarProduto', produto);
    },
    removerProduto({commit}, produto){
      return commit('removerProduto', produto);
    },
  },
  mutations: {
    getCarrinho(state){
      return state.carrinho;
    },
    adicionarProduto(state, produto){
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