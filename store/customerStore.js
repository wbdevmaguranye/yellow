export const state = () => ({
  customer: {},
  loans: []
})

export const mutations = {
  setCustomer (state, customer) {
    state.customer = customer
  },
  clearCustomer (state) {
    state.customer = {}
  }
}


export const actions = {
  setCustomer (state, customer) {
    state.customer = customer
  },
  clearCustomer (state) {
    state.customer = {}
  }
}
