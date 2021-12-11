export const state = () => ({
  files: [],
  progress: null,
})

export const actions = {
  async readData(_, { path }) {
    try {
      this.dispatch('realtime-db/readData', {
        path: path,
        onCompleteAction: {
          actionType: 'commit',
          actionName: 'storage/UPDATE_FILES',
        },
      })
    } catch (e) {
      console.error(e)
      this.commit('error/SET_ERROR', e)
    }
  },
  async uploadFile(_, { path, saveUrl, file }) {
    const ref = this.$fire.storage.ref(path)
    const store = this
    try {
      store.commit('error/CLEAR_ERROR')
      store.commit('UPDATE_LOADING_STATUS', true)

      const uploadTask = ref.put(file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          store.commit('storage/UPDATE_PROGRESS', progress)
        },
        function (e) {
          console.error(e)
          store.commit('error/SET_ERROR', e)
          store.commit('UPDATE_LOADING_STATUS', false)
        },
        async function () {
          const url = await uploadTask.snapshot.ref.getDownloadURL()

          const fileData = {
            downloadUrl: url,
            name: file.name,
            path: path,
          }

          store.commit('UPDATE_LOADING_STATUS', false)

          store.dispatch('realtime-db/addData', {
            path: saveUrl,
            data: fileData,
            onCompleteAction: {
              actionType: 'dispatch',
              actionName: 'storage/readData',
              payload: { path: saveUrl },
            },
          })
          store.commit('storage/UPDATE_PROGRESS', null)
        }
      )
    } catch (e) {
      console.error(e)
      store.commit('error/SET_ERROR', e)
      store.commit('UPDATE_LOADING_STATUS', false)
    }
  },
  async deleteFile(_, { file, fileDatabasePath, baseDatabasePath }) {
    try {
      this.commit('error/CLEAR_ERROR')

      const fileRef = this.$fire.storage.ref(file.path)

      this.commit('UPDATE_LOADING_STATUS', true)

      await fileRef.delete()

      this.commit('UPDATE_LOADING_STATUS', false)

      this.dispatch('realtime-db/deleteDocument', {
        path: fileDatabasePath,
        onCompleteAction: {
          actionType: 'dispatch',
          actionName: 'storage/readData',
          payload: { path: baseDatabasePath },
        },
      })
    } catch (e) {
      console.error(e)
      this.commit('error/SET_ERROR', e)
      this.commit('UPDATE_LOADING_STATUS', false)
    }
  },
}

export const mutations = {
  UPDATE_FILES: (state, files) => {
    state.files = files
  },

  UPDATE_PROGRESS: (state, progress) => {
    state.progress = progress
  },
}
