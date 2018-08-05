
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
     state.p = data;
   },
   setc(state, data){
     state.c = data;
   },
   sett(state, data){
     state.t = data;
   }
  }
}
export default store;