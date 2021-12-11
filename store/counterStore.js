export const state=() =>({
  counter: 100,
})

export const mutations = {
  setCounter: (state,counter)=>{
    state.counter = counter
  }
}
export const actions={
  setCounter({commit},counter){
    commit('setCounter',counter)
  },
}
