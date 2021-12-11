import { data } from "autoprefixer";

export const state = () => ({
  application: {},
  applications: [],
  personalInfo: null,
  employmentInfo: null,
  nextOfKin: null,
  bankingInfo: null,
  loanInfo: null,
  incomeExpenditure: null,
  dependents: null,
  livingCircumstances: null,
  documents: null,
  adminLoanSetUpInfo: null,
  profiles: null
});

export const mutations = {
  setApplication(state, application) {
    state.application = application;
  },
  setPersonalInformation(state, personalInfo) {
    state.personalInfo = personalInfo;
  },
  setEmployment(state, employmentInfo) {
    state.employmentInfo = employmentInfo;
  },
  setNextOfKinInformation(state, nextOfKin) {
    state.nextOfKin = nextOfKin;
  },
  setBankingDetails(state, bankingInfo) {
    state.bankingInfo = bankingInfo;
  },
  setLaonDetails(state, loanInfo) {
    state.loanInfo = loanInfo;
  },
  setExpenditureDetails(state, incomeExpenditure) {
    state.incomeExpenditure = incomeExpenditure;
  },
  setDependantDetails(state, dependents) {
    state.dependents = dependents;
  },
  setLivingDetails(state, livingCircumstances) {
    state.livingCircumstances = livingCircumstances;
  },
  setAddedDocument(state, documents) {
    state.documents = documents;
  },
  setadminLoanSetUpInformation(state, adminLoanSetUpInfo) {
    state.adminLoanSetUpInfo = adminLoanSetUpInfo;
  },
  setProfiles(state, profiles) {
    state.profiles = profiles;
  }
};

export const actions = {
  setApplicationAction({ commit }, application) {
    commit("setApplication", application);
  },
  setPersonalInformationAction({ commit }, personalInfo) {
    commit("setPersonalInformation", personalInfo);
  },
  setEmploymentAction({ commit }, employmentInfo) {
    commit("setEmployment", employmentInfo);
  },
  setNextOfKinInformationAction({ commit }, nextOfKin) {
    commit("setNextOfKinInformation", nextOfKin);
  },
  setBankingDetailsAction({ commit }, bankingInfo) {
    commit("setBankingDetails", bankingInfo);
  },
  setLoanDetailsAction({ commit }, loanInfo) {
    commit("setLaonDetails", loanInfo);
  },
  setExpenditureDetailsAction({ commit }, incomeExpenditure) {
    commit("setExpenditureDetails", incomeExpenditure);
  },
  setDependantDetailsAction(state, dependents) {
    state.commit("setDependantDetails", dependents);
  },
  setLivingDetailsAction({ commit }, livingCircumstances) {
    commit("setLivingDetails", livingCircumstances);
  },
  setDocumentsAction({ commit }, documents) {
    commit("setAddedDocument", documents);
  },
  setAdminLoanSetUpInfoAction({ commit }, adminLoanSetUpInfo) {
    commit("setadminLoanSetUpInformation", adminLoanSetUpInfo);
  },
  setProfilesAction({ commit }, profiles) {
    commit("setApplication", profiles);
  },
  async getApplication({ commit }, r) {
    await this.$fire.firestoreReady();
    if (r.record.id) {
      const path = `Applications/${r.record.id}`;
      const ref = this.$fire.firestore.doc(path);
      console.log(path);
      let snap;
      try {
        snap = await ref.get();
        if (snap.exists) {
          const formData = snap.data();
          let FormData = { ...formData, id: snap.id };
          commit("setPersonalInformation", FormData);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (r.record.id) {
      const path = `AppDetails/${r.authUser.id}/EmploymentInfo/${r.record.id}`;
      const ref = this.$fire.firestore.doc(path);
      let snap;
      try {
        snap = await ref.get();
        if (snap.exists) {
          const formData = snap.data();
          let FormData = { ...formData, id: snap.id };
          commit("setEmployment", FormData);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (r.record.id) {
      const path = `AppDetails/${r.authUser.id}/NextOfKinInfo/${r.record.id}`;
      const ref = this.$fire.firestore.doc(path);
      let snap;
      try {
        snap = await ref.get();
        if (snap.exists) {
          const formData = snap.data();
          let FormData = { ...formData, id: snap.id };
          commit("setNextOfKinInformation", FormData);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (r.record.id) {
      const path = `AppDetails/${r.authUser.id}/BankingInfo/${r.record.id}`;
      const ref = this.$fire.firestore.doc(path);
      let snap;
      try {
        snap = await ref.get();
        if (snap.exists) {
          const formData = snap.data();
          let FormData = { ...formData, id: snap.id };
          commit("setBankingDetails", FormData);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (r.record.id) {
      const path = `Applications/${r.authUser.id}/Apply/${r.record.id}`;
      const ref = this.$fire.firestore.doc(path);
      let snap;
      try {
        snap = await ref.get();
        if (snap.exists) {
          const formData = snap.data();

          let FormData = { ...formData.finance_info, ...formData };

          commit("setLaonDetails", FormData);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (r.record.id) {
      const path = `AppDetails/${r.authUser.id}/ExpenditureInfo/${r.record.id}`;
      const ref = this.$fire.firestore.doc(path);
      let snap;
      try {
        snap = await ref.get();
        if (snap.exists) {
          const formData = snap.data();
          let FormData = { ...formData, id: snap.id };
          commit("setExpenditureDetails", FormData);
          // let application = this.$route.params.snap;
          // console.log(application);
          // this.goToNext();
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (r.record.id) {
      const path = `AppDetails/${r.authUser.id}/DependantsInfo/${r.record.id}`;
      const ref = this.$fire.firestore.doc(path);
      let snap;
      try {
        snap = await ref.get();
        if (snap.exists) {
          const formData = snap.data();
          let FormData = { ...formData, id: snap.id };
          commit("setDependantDetails", FormData);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (r.record.id) {
      const path = `AppDetails/${r.authUser.id}/LivingDetailsInfo/${r.record.id}`;
      const ref = this.$fire.firestore.doc(path);
      let snap;
      try {
        snap = await ref.get();
        if (snap.exists) {
          const formData = snap.data();
          let FormData = { ...formData, id: snap.id };
          commit("setLivingDetails", FormData);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (r.record.id) {
      const path = `AppDetails/${r.authUser.id}/DocInfo/${r.record.id}/files`;
      const ref = this.$fire.firestore.collection(path);
      let snap;
      let list = [];
      try {
        snap = await ref.get();
        snap.forEach(doc => {
          let path = doc.ref.path;
          let parent = doc.ref.parent.path;

          let data = doc.data();
          data["id"] = doc.id;
          data["path"] = path;
          data["parent"] = parent;
          list.push(data);
        });

        let FormData = list;

        commit("setAddedDocument", FormData);

        // console.log(snap)

        // if (snap.exists) {
        //   const formData = snap.data();
        //   this.FormData = { ...formData, id: snap.id };
        //   //this.setBankingDetailsAction({ ...formData, id: snap.id });
        // }
      } catch (e) {
        console.error(e);
      }
    }
  }
};

//  export const getters = {

//   dependents:state =>{
//     return state.dependents
//   }
// }

export const getters = {
  // getDocs: state => {
  //   return state.documents;
  // },
  getBankingInfo: state => {
    if (state.bankingInfo) {
      return true;
    } else {
      return false;
    }
  },
  getPersonalInfo: state => {
    if (state.personalInfo) {
      return true;
    } else {
      return false;
    }
  },
  getEmploymentInfo: state => {
    if (state.employmentInfo) {
      return true;
    } else {
      return false;
    }
  },
  getNextofkinInfo: state => {
    if (state.nextOfKin) {
      return true;
    } else {
      return false;
    }
  },

  getloanInfo: state => {
    if (state.loanInfo) {
      return true;
    } else {
      return false;
    }
  },
  getExpenditureInfo: state => {
    if (state.incomeExpenditure) {
      return true;
    } else {
      return false;
    }
  },
  getDependentsInfo: state => {
    if (state.dependents) {
      return true;
    } else {
      return false;
    }
  },
  getlivingInfo: state => {
    if (state.livingCircumstances) {
      return true;
    } else {
      return false;
    }
  },
  ifLivingCircustancesisComplete: state => {
    let loaded = false;

    if (state.livingCircumstances) {
      this.$store.dispatch("livingCircumstances").then(() => {
        return (loaded = true);
      });
    }
  },

  getDocs: state => {
    // var destinationObj = {};

    return state.documents;
  },
  ifUploadedDocumentIsComplete: state => {
    let completedocscheck = false;
    const docsFlat = Object.keys(state.documents || {});
    if (state.documents && docsFlat.length == 6) {
      return (completedocscheck = true);
    } else {
      return completedocscheck;
    }
  },
  isAllComplete: state => {
    const docsFlat = Object.keys(state.documents || {});
    if (
      state.documents &&
      docsFlat.length == 6 &&
      state.dependents &&
      state.livingCircumstances &&
      state.loanInfo &&
      state.bankingInfo &&
      state.nextOfKin &&
      state.employmentInfo &&
      state.employmentInfo &&
      state.incomeExpenditure
    ) {
      return true;
    } else {
      return false;
    }
  }
};
