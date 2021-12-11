export const state = () => ({
  invhead: [
    { heading: 'Inv #', value: 'invno' },
    { heading: 'Inv Date', value: 'invdate' },
    { heading: 'From', value: 'from' },
    { heading: 'To', value: 'to' },
    { heading: 'Status', value: 'status' },
  ],
  invoices: [
    {
      invno: 1,
      invdate: '15-Jan-2020 15:00',
      from: 'Drain Surgeon',
      to: 'SCAD',
      status: 'Paid',
    },
    {
      invno: 2,
      invdate: '15-Jan-2020 15:00',
      from: 'Canadian Solar',
      to: 'SCAD',
      status: 'Unpaid',
    },
    {
      invno: 3,
      invdate: '15-Jan-2020 15:00',
      from: 'Canadian Solar',
      to: 'SCAD',
      status: 'Unpaid',
    },
    {
      invno: 4,
      invdate: '15-Jan-2020 15:00',
      from: 'Canadian Solar',
      to: 'SCAD',
      status: 'Unpaid',
    },
    {
      invno: 5,
      invdate: '15-Jan-2020 15:00',
      from: 'Canadian Solar',
      to: 'SCAD',
      status: 'Unpaid',
    },
    {
      invno: 6,
      invdate: '15-Jan-2020 15:00',
      from: 'Canadian Solar',
      to: 'SCAD',
      status: 'Unpaid',
    },
  ],
  invitems: [
    {
      invitemno: 1,
      description: 'Item 1',
      currency: 'USD',
      qty: 1,
      price: 5,
      total: 5,
    },
    {
      invitemno: 2,
      description: 'Item 2',
      currency: 'USD',
      qty: 10,
      price: 5,
      total: 50,
    },
  ],
  invitemhead: [
    { heading: 'Inv #', value: 'invitemno' },
    { heading: 'Description', value: 'description' },
    { heading: 'Currency', value: 'currency' },
    { heading: 'Qty', value: 'qty' },
    { heading: 'Price', value: 'price' },
    { heading: 'Total', value: 'total' },
  ],
  quotes: [],
  quoteitems: [],
  payments: [],
  companies: [],
  locations: [],
  employees: [],
  messages: [],
  clients: [],
})

export const mutations = {
  ADD_INVOICE: (state, invoice) => {
    state.invoices.push = invoice
  },

  EDIT_INVOICE: (state, invoice) => {
    state.records = records
  },
}
