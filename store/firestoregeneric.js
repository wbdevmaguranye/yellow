import { performAction } from '~/utils/store-utilsgeneric'
import Vue from 'vue'
export const state = () => ({
  forms: {},
  headers: {},
  recordsets: {},
  records: [],
  loading: {},
  firstDoc: null,
  lastDoc: null,
  paging: {},
  firstDoc: null,
  lastDoc: null,
})

export const mutations = {
  UPDATE_RECORDS: (state, records) => {
    state.records = records
  },
  UPDATE_TABLE_RECORDS: (state, { records, tableId }) => {
    Vue.set(state.recordsets, tableId, records)
  },
  UPDATE_TABLE_LOADING: (state, payload) => {
    Vue.set(state.loading, payload.tableId, payload.loading)
  },
  UPDATE_SINGLE_RECORD: (state, { records, tableId }) => {
    Vue.set(state.recordsets, tableId, records)
  },

  UPDATE_FORM_META: (state, { records, tableId }) => {
    Vue.set(state.forms, tableId, records)
    let headers = []
    records.forEach((element) => {
      if (element.showingrid) {
        headers.push({
          text: element.label,
          value: element.model,
          sortable: true,
        })
      }
    })
    headers.push({
      text: 'Actions',
      value: 'btnactions',
      sortable: false,
    })
    Vue.set(state.headers, tableId, headers)
  },
  UPDATE_FIRST_DOC: (state, doc, tableId) => {
    Vue.set(state.paging, tableId)
    state.firstDoc = doc
  },

  UPDATE_LAST_DOC: (state, doc, tableId) => {
    state.lastDoc = doc
  },
}

const listeners = []

// Utility functions
const updatePaging = function (store, snapshot, paging, tableId) {
  if (snapshot.docs.length > 0) {
    const first = snapshot.docs[0]
    const last = snapshot.docs[snapshot.docs.length - 1]
    if (paging) {
      if (paging.mutations) {
        store.commit(paging.mutations.firstItemMutation, first, tableId)
        if (first !== last) {
          store.commit(paging.mutations.lastItemMutation, last, tableId)
        }
      } else {
        console.error(
          'paging.mutations are required to keep track of first and last elements.'
        )
      }
    }
  } else {
    if (paging) {
      if (paging.mutations) {
        if (paging.firstDoc) {
          // we were going backwards
          store.commit(paging.mutations.lastItemMutation, null, tableId)
        } else if (paging.lastDoc) {
          // we were going forward
          // FIXME: We need to find a better solution for this scenario
        }
      } else {
        console.error(
          'paging.mutations are required to keep track of first and last elements.'
        )
      }
    }
  }
}

const processSnapshot = function (store, snapshot, onCompleteAction, tableId) {
  const list = []

  snapshot.forEach((doc) => {
    let path = doc.ref.path
    let parent = doc.ref.parent.path

    let data = doc.data()
    data['key'] = doc.id
    data['path'] = path
    data['parent'] = parent
    list.push(data)
  })

  if (onCompleteAction) {
    onCompleteAction['payload'] = { records: list, tableId: tableId }

    performAction(
      { commit: store.commit, dispatch: store.dispatch },
      onCompleteAction
    )
    return list
  } else {
    throw 'Complete action is required'
  }
}

const processDocument = function (store, doc, onCompleteAction, tableId) {
  const list = []
  let data = null
  if (doc.exists) {
    let path = doc.ref.path
    let parent = doc.ref.parent.path
    data = doc.data()
    data['key'] = doc.id
    data['path'] = path
    data['parent'] = parent
    list.push(data)
  }

  if (onCompleteAction) {
    onCompleteAction['payload'] = { records: list, tableId: tableId }
    performAction(
      { commit: store.commit, dispatch: store.dispatch },
      onCompleteAction
    )
    return data
  } else {
    throw 'Complete action is required'
  }
}

const processDocumentObj = function (store, doc, onCompleteAction, tableId) {
  const list = []
  let data = null
  if (doc.exists) {
    let path = doc.ref.path
    let parent = doc.ref.parent.path
    data = doc.data()
    data['key'] = doc.id
    data['path'] = path
    data['parent'] = parent
    //list.push(data)
  }

  if (onCompleteAction) {
    onCompleteAction['payload'] = { records: data, tableId: tableId }
    performAction(
      { commit: store.commit, dispatch: store.dispatch },
      onCompleteAction
    )
    return data
  } else {
    throw 'Complete action is required'
  }
}

export const actions = {
  /**
   * Gets a single document from Firestore
   */
  async readSingleDocument(
    _,
    { path, shouldSync, onCompleteAction, tableId, asObj = true }
  ) {
    await this.$fire.firestoreReady()
    const ref = this.$fire.firestore.doc(path)
    let resultdata = null
    try {
      if (shouldSync) {
        let listener = ref.onSnapshot((doc) => {
          if (asObj) {
            resultdata = processDocumentObj(
              this,
              doc,
              onCompleteAction,
              tableId
            )
          } else {
            resultdata = processDocument(this, doc, onCompleteAction, tableId)
          }
        })
        listeners.push(listener)
      } else {
        const doc = await ref.get()
        if (asObj) {
          resultdata = processDocumentObj(this, doc, onCompleteAction, tableId)
        } else {
          resultdata = processDocument(this, doc, onCompleteAction, tableId)
        }
      }
      return resultdata
    } catch (e) {
      console.error(e)
      this.commit('error/SET_ERROR', e)
      this.commit('UPDATE_LOADING_STATUS', false)
    }
  },

  /**
   * Adds a document to a location inside Firestore
   */
  async addDocument(_, { path, data, onCompleteAction }) {
    await this.$fire.firestoreReady()
    const ref = this.$fire.firestore.doc(path)

    try {
      this.commit('error/CLEAR_ERROR')
      this.commit('UPDATE_LOADING_STATUS', true)
      await ref.set(data)
      this.commit('UPDATE_LOADING_STATUS', false)
      performAction(
        { commit: this.commit, dispatch: this.dispatch },
        onCompleteAction
      )
    } catch (e) {
      console.error(e)
      this.commit('error/SET_ERROR', e)
      this.commit('UPDATE_LOADING_STATUS', false)
    }
  },

  /**
   * Gets a list of documents from a Firestore collection
   */
  async readListData(
    _,
    { path, shouldSync, onCompleteAction, paging, sorting, filtering, tableId }
  ) {
    await this.$fire.firestoreReady()
    let ref = this.$fire.firestore.collection(path)
    const equalityFilterFields = []

    if (filtering) {
      filtering.forEach((filter) => {
        ref = ref.where(filter.field, filter.whereOperator, filter.value)
        if (filter.whereOperator === '==') {
          equalityFilterFields.push(filter.field)
        }
      })
    }

    if (sorting) {
      sorting.forEach((item) => {
        // check if sort key is not in equality filter fields
        // to avoid an error : "Order by clause cannot contain a field with an equality filter..."
        if (equalityFilterFields.indexOf(item.key) === -1) {
          ref = ref.orderBy(item.key, item.ascending ? 'asc' : 'desc')
        }
      })
    }

    if (paging) {
      if (paging.lastDoc && paging.pageSize) {
        ref = ref.startAfter(paging.lastDoc)
        ref = ref.limit(paging.pageSize)
      } else if (paging.firstDoc && paging.pageSize) {
        ref = ref.endBefore(paging.firstDoc)
        ref = ref.limitToLast(paging.pageSize)
      } else if (paging.pageSize) {
        ref = ref.limit(paging.pageSize)
      }
    }
    var list = []
    try {
      this.commit('error/CLEAR_ERROR')
      this.commit('UPDATE_LOADING_STATUS', true)

      if (!onCompleteAction) {
        onCompleteAction = {
          actionType: 'commit',
          actionName: 'UPDATE_RECORDS',
        }
      }
      if (shouldSync) {
        let listener = ref.onSnapshot((snapshot) => {
          updatePaging(this, snapshot, paging, tableId)
          list = processSnapshot(this, snapshot, onCompleteAction, tableId)
        })

        listeners.push(listener)
      } else {
        const snapshot = await ref.get()
        updatePaging(this, snapshot, paging, tableId)
        list = processSnapshot(this, snapshot, onCompleteAction, tableId)
      }

      this.commit('UPDATE_LOADING_STATUS', false)
      return list
    } catch (e) {
      console.error(e)
      this.commit('error/SET_ERROR', e)
      this.commit('UPDATE_LOADING_STATUS', false)
    }
  },

  /**
   * Adds a document to a Firestore collection
   */
  async addDataToList(_, { path, data, onCompleteAction }) {
    await this.$fire.firestoreReady()
    const ref = this.$fire.firestore.collection(path)

    try {
      this.commit('error/CLEAR_ERROR')
      this.commit('UPDATE_LOADING_STATUS', true)

      const addedDoc = await ref.add(data)

      this.commit('UPDATE_LOADING_STATUS', false)

      performAction(
        { commit: this.commit, dispatch: this.dispatch },
        onCompleteAction
      )
      return { path: addedDoc.path, id: addedDoc.id }
    } catch (e) {
      console.error(e)
      this.commit('error/SET_ERROR', e)
      this.commit('UPDATE_LOADING_STATUS', false)
    }
  },

  /**
   * Deletes a Firestore document
   */
  async deleteDocument(_, { path, onCompleteAction }) {
    await this.$fire.firestoreReady()
    const ref = this.$fire.firestore.doc(path)

    try {
      this.commit('error/CLEAR_ERROR')
      this.commit('UPDATE_LOADING_STATUS', true)

      await ref.delete()

      this.commit('UPDATE_LOADING_STATUS', false)

      performAction(
        { commit: this.commit, dispatch: this.dispatch },
        onCompleteAction
      )
    } catch (e) {
      console.error(e)
      this.commit('error/SET_ERROR', e)
      this.commit('UPDATE_LOADING_STATUS', false)
    }
  },

  /**
   * Updates a Firestore document
   */
  async updateDocument(_, { path, doc, onCompleteAction }) {
    await this.$fire.firestoreReady()
    const ref = this.$fire.firestore.doc(path)
    try {
      this.commit('error/CLEAR_ERROR')
      this.commit('UPDATE_LOADING_STATUS', true)
      await ref.set(doc)
      this.commit('UPDATE_LOADING_STATUS', false)
      performAction(
        { commit: this.commit, dispatch: this.dispatch },
        onCompleteAction
      )
    } catch (e) {
      console.error(e)
      this.commit('error/SET_ERROR', e)
      this.commit('UPDATE_LOADING_STATUS', false)
    }
  },

  async clearListeners(_) {
    console.info('unsubscribing all listeners')
    listeners.forEach((unsubscribe) => {
      unsubscribe()
    })

    listeners.length = 0
  },
}
