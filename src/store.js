import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    users: [],
    categories: [],
    products: [],
    cart: []
  },
  getters: {
    users(state){
        return state.users
    },
    categories(state){
      return state.categories
    },
    products(state){
      return state.products
    },
    cart(state){
      return state.cart
    },
    counterCart(state){
      if(!state.cart.length) return
      const temp = []
      for(let i=0; i<state.cart.length; i++){
        if(!temp.some(el => el.id === state.cart[i].id)){
          temp.push(state.cart[i])
        }
      }
      return temp
    }
  },
  actions: {
    fetchUser({commit}) {
        axios
          .get('http://localhost:3000/users')
          .then(({ data }) => {
            commit('fetchUsers', data)
            console.log(data)
          })
          .catch( error => console.log(error))
      },
    fetchCategory({commit}) {
      axios
        .get('http://localhost:3000/categories')
        .then(({ data }) => {
          commit('fetchCategory', data)
        })
        .catch( error => console.log(error))
    },
    fetchProducts({commit}) {
      axios
        .get('http://localhost:3000/products')
        .then(({ data }) => {
          commit('fetchProduct', data)
        })
        .catch( error => console.log(error))
    },
    addCart({commit}, payload){
      commit('setCart', payload)
    },
    decreaseCart({commit, state}, payload){
      const getItem = state.cart.findIndex(ob => ob.id === payload.id)
      if(getItem > -1) {
        commit('unsetCart', getItem)
      }
    },
    removeCart({commit, state}, payload){
      const getItem = state.cart.filter(ob => ob.id !== payload.id)
      commit('removeCart', getItem)
    },
    printBill({commit}){
      commit('destroyCart')
    }
  },
  mutations: {
    fetchUsers(state, payload){
      state.users = payload;
    },
    fetchCategory(state, payload){
      state.categories = payload;
    },
    fetchProduct(state, payload){
      state.products = payload;
    },
    setCart(state, payload){
      state.cart.push(payload);
    },
    unsetCart(state, payload){
      state.cart.splice(payload, 1);
    },
    removeCart(state, payload){
      state.cart = payload;
    },
    destroyCart(state){
      state.cart = [];
    }
  }
});