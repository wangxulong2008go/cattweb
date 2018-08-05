
const  store = {
  state:{
    viewDirection:''
  },
  getters: {},
  actions: {
    // openTabActions({commit}, data){
    //   commit('OPEN_TAB', data)
    // }
  },
  mutations:{
   // OPEN_TAB(state, data){
   //    state.openTab = data;
   //  }
   setviewDirection(state, data){
     state.viewDirection = data;
   }
  }
}
export default store;