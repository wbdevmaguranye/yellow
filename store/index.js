import { performAction } from "~/utils/store-utils";

export const strict = false;

export const state = () => ({
  authUser: null,
  isLoading: false
});

export const actions = {
  async nuxtServerInit({ dispatch }, ctx) {
    console.info("nuxtServerInit() called");
    /** Get the VERIFIED authUser from the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      console.log(ctx.res.locals.user);
      const {
        allClaims: claims,
        idToken: token,
        ...authUser
      } = ctx.res.locals.user;

      console.info(
        "Auth User verified on server-side. User: ",
        authUser,
        "Claims:",
        claims
      );

      await dispatch("onAuthStateChangedAction", {
        authUser,
        claims,
        token
      });
    }
  },
  onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      // commit('LOGOUT')
      return;
    }
    commit("SET_AUTH_USER", { authUser });
  },
  async login({ commit }, { email, password, routerInfo }) {
    try {
      await this.$fire.authReady();
      this.$fireAuthStore.subscribe();
      this.commit("error/CLEAR_ERROR");
      this.commit("UPDATE_LOADING_STATUS", true);
      const user = await this.$fire.auth.signInWithEmailAndPassword(
        email,
        password
      );

      this.commit("UPDATE_LOADING_STATUS", false);
      if (routerInfo) {
        this.$router.replace(routerInfo);
      }
    } catch (e) {
      console.error(e);
      this.commit("error/SET_ERROR", e);
      this.commit("UPDATE_LOADING_STATUS", false);
    }
  },

  async loginGoogle({ commit }) {
    try {
      await this.$fire.authReady();
      this.$fireAuthStore.subscribe();
      this.commit("error/CLEAR_ERROR");
      this.commit("UPDATE_LOADING_STATUS", true);

      var provider = new this.$fireModule.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      const user = await this.$fire.auth.signInWithPopup(provider);

      this.commit("UPDATE_LOADING_STATUS", false);
      this.$router.replace("/");
    } catch (e) {
      console.error(e);
      this.commit("error/SET_ERROR", e);
      this.commit("UPDATE_LOADING_STATUS", false);
    }
  },

  async register({ commit }, { email, password, data, routeInfo = null }) {
    try {
      await this.$fire.authReady();
      this.commit("error/CLEAR_ERROR");
      this.commit("UPDATE_LOADING_STATUS", true);
      const credential = await this.$fire.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      data["email"] = email;

      credential.user
        .updateProfile({
          displayName: "",
          photoURL:
            "https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
        })
        .then(
          function() {
            console.log("Profile Updated Successfully");
          },
          function(error) {
            console.log(error);
          }
        );

      this.$fire.auth.currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        alert("Email Verification Sent!");
      });

      this.commit("UPDATE_LOADING_STATUS", false);
      if (routeInfo) {
        this.$router.replace(routeInfo.routeTo);
      }
    } catch (e) {
      console.error(e);
      this.commit("error/SET_ERROR", e);
      this.commit("UPDATE_LOADING_STATUS", false);
    }
  },

  async signOut(store, _) {
    try {
      await this.$fire.authReady();
      await this.$fire.auth.signOut();
      this.commit("LOGOUT");

      localStorage.clear();
      this.$router.push("/");
    } catch (e) {
      console.error(e);
    }
  },

  async forgotPassword({ commit }, { email }) {
    try {
      await this.$fire.authReady();
      this.commit("error/CLEAR_ERROR");
      this.commit("UPDATE_LOADING_STATUS", true);
      await this.$fire.auth.sendPasswordResetEmail(email);
      this.commit("UPDATE_LOADING_STATUS", false);
      this.$router.replace("/");
    } catch (e) {
      console.error(e);
      this.commit("error/SET_ERROR", e);
      this.commit("UPDATE_LOADING_STATUS", false);
    }
  },

  async onAuthStateChangedAction(
    { commit, dispatch },
    { authUser, claims, token }
  ) {
    if (!authUser) {
      console.log("onAuthStateChanged - no auth user, logging out");
      await dispatch("signOut");
      return;
    }

    const idToken = await authUser.getIdToken();

    // you can request additional fields if they are optional (e.g. photoURL)
    const {
      uid,
      email,
      emailVerified,
      displayName,

      refreshToken
    } = authUser;
    var photoURL;
    if (claims && claims.picture) {
      photoURL = claims.picture;
    }
    if (authUser && authUser.photoURL) {
      photoURL = authUser.photoURL;
    }
    commit("SET_USER_NEW", {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL: photoURL, // results in photoURL being undefined for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      // isAdmin: claims.custom_claim,
      refreshToken: refreshToken,
      idToken: idToken,
      claims: claims
    });
  }
};

export const mutations = {
  SET_AUTH_USER: (state, { authUser }) => {
    console.log("USER ID: " + authUser.uid);
    state.authUser = {
      id: authUser.uid,
      email: authUser.email,
      last_name: authUser.last_name,
      refreshToken: authUser.refreshToken,
      emailVerified: authUser.emailVerified
    };
  },
  LOGOUT: (state, _) => {
    state.authUser = null;
  },
  UPDATE_LOADING_STATUS: (state, status) => {
    state.isLoading = status;
  },
  SET_USER_NEW: (
    state,
    {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL,
      isAdmin,
      refreshToken,
      idToken,
      claims
    }
  ) => {
    state.authUser = {
      id: uid,
      email: email,
      emailVerified: emailVerified,
      displayName: displayName,
      photoURL: photoURL,
      isAdmin: isAdmin,
      refreshToken: refreshToken,
      idToken: idToken,
      claims: claims
    };
  },

  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
    // you can request additional fields if they are optional (e.g. photoURL)
    if (authUser && authUser.uid) {
      const {
        uid,
        email,
        emailVerified,
        displayName,
        photoURL,
        refreshToken
      } = authUser;

      state.authUser = {
        uid,
        displayName,
        email,
        emailVerified,
        photoURL: photoURL || null, // results in photoURL being null for server auth
        // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
        isAdmin: claims.custom_claim,
        refreshToken: refreshToken
      };
    } else {
    }
  }
};

export const getters = {
  isAuthenticated: state => {
    try {
      return state.authUser.id !== null;
    } catch {
      return null;
    }
  }
};
