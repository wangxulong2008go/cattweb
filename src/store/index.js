
const  store = {
  state:{
    viewDirection:'',
    p:0,
    t:0,
    c:0
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
   },
   setp(state, data){
     window.cats_p = data;
     state.p = data;
   },
   setc(state, data){
     window.cats_c = data;
     state.c = data;
   },
   sett(state, data){
     window.cats_t = data;
     state.t = data;
   }
  }
}
export default store;