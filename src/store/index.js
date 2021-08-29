import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase/app';
import db from '../firebase/firebaseInit';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: 'Blog Card Example',
        blogCoverPhoto: 'stock-1',
        blogDate: 'May 1, 2021',
      },
      {
        blogTitle: 'Blog Card Example',
        blogCoverPhoto: 'stock-2',
        blogDate: 'May 1, 2021',
      },
      {
        blogTitle: 'Blog Card Example',
        blogCoverPhoto: 'stock-3',
        blogDate: 'May 1, 2021',
      },
      {
        blogTitle: 'Blog Card Example',
        blogCoverPhoto: 'stock-4',
        blogDate: 'May 1, 2021',
      },
    ],
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join('') +
        state.profileLastName.match(/(\b\S)?/g).join('');
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
    changeEmail(state, payload) {
      state.profileEmail = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const dataBase = db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit('setProfileInfo', dbResults);
      commit('setProfileInitials');
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = db.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit('setProfileInitials');
    },
  },
  modules: {},
});
