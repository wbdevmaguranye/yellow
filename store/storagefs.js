export const state = () => ({
  files: [],
  progress: null
});

export const actions = {
  async readData(_, { path }) {
    try {
      await this.$fire.firestoreReady();
      this.dispatch("firestoregeneric/readListData", {
        path: path,
        onCompleteAction: {
          actionType: "commit",
          actionName: "storagefs/UPDATE_FILES"
        },
        tableId: "files"
      });
    } catch (e) {
      console.error(e);
      this.commit("error/SET_ERROR", e);
    }
  },
  async uploadFile(_, { path, saveUrl, file, fileMeta = {} }) {
    await this.$fire.storageReady();
    let returnedFileData = {};
    const ref = this.$fire.storage.ref(path);
    const store = this;
    try {
      store.commit("error/CLEAR_ERROR");
      store.commit("UPDATE_LOADING_STATUS", true);

      const uploadTask = ref.put(file);
      uploadTask.on(
        "state_changed",
        snapshot => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          store.commit("storagefs/UPDATE_PROGRESS", progress);
        },
        function(e) {
          console.error(e);
          store.commit("error/SET_ERROR", e);
          store.commit("UPDATE_LOADING_STATUS", false);
        },
        async function() {
          store.commit("storagefs/UPDATE_PROGRESS", null);
          const contentType = uploadTask.snapshot.metadata.contentType;
          const url = await uploadTask.snapshot.ref.getDownloadURL();

          const fileData = {
            downloadUrl: url,
            name: file.name,
            filePath: path,
            contentType: contentType,
            meta: fileMeta
          };
          returnedFileData = fileData;
          store.commit("UPDATE_LOADING_STATUS", false);

          store.dispatch("firestoregeneric/addDataToList", {
            path: saveUrl,
            data: fileData,
            onCompleteAction: {
              actionType: "dispatch",
              actionName: "storagefs/readData",
              payload: { path: saveUrl }
            }
          });
          store.commit("storage/UPDATE_PROGRESS", null);
        }
      );
    } catch (e) {
      console.error(e);
      store.commit("error/SET_ERROR", e);
      store.commit("UPDATE_LOADING_STATUS", false);
    }
  },
  async deleteFile(_, { file, fileDatabasePath, baseDatabasePath }) {
    try {
      this.commit("error/CLEAR_ERROR");
      await this.$fire.storageReady();
      const fileRef = this.$fire.storage.ref(file.filePath);

      this.commit("UPDATE_LOADING_STATUS", true);

      await fileRef.delete();

      this.commit("UPDATE_LOADING_STATUS", false);

      this.dispatch("firestore/deleteDocument", {
        path: fileDatabasePath,
        onCompleteAction: {
          actionType: "dispatch",
          actionName: "storagefs/readData",
          payload: { path: baseDatabasePath }
        }
      });
    } catch (e) {
      console.error(e);
      this.commit("error/SET_ERROR", e);
      this.commit("UPDATE_LOADING_STATUS", false);
    }
  }
};

export const mutations = {
  UPDATE_FILES: (state, files) => {
    state.files = files;
  },

  UPDATE_PROGRESS: (state, progress) => {
    state.progress = progress;
  }
};
