<template lang="pug">
	div.profile
		modal(v-if="modalActive" :modalMessage="modalMessage" @close-modal="closeModal")
		div.container
			h2 Configurações da Conta
			div.profile-info
				div.initials {{ this.$store.state.profileInitials }}
				div.admin-badge
					admin-icon.icon
					span admin
				div.input
					label(for="firtName") Nome:
					input(type="text" id="firstName" v-model="firstName")
				div.input
					label(for="lastName") Sobrenome:
					input(type="text" id="lastName" v-model="lastName")
				div.input
					label(for="username") Usuário:
					input(type="text" id="username" v-model="username")
				div.input
					label(for="email") Email:
					input(disabled type="text" id="email" :value="this.$store.state.profileEmail")
				button(@click="updateProfile") Salvar
</template>

<script>
import Modal from '../components/Modal.vue';
import AdminIcon from '../assets/Icons/user-crown-light.svg';

export default {
  name: 'profile',
  components: { Modal, AdminIcon },
  data() {
    return {
      modalMessage: 'Seu perfil foi atualizado',
      modalActive: null,
    };
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },
      set(payload) {
        this.$store.commit('changeFirstName', payload);
      },
    },
    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },
      set(payload) {
        this.$store.commit('changeLastName', payload);
      },
    },
    username: {
      get() {
        return this.$store.state.profileUsername;
      },
      set(payload) {
        this.$store.commit('changeUsername', payload);
      },
    },
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateUserSettings');
      this.modalActive = true;
    },
    closeModal() {
      this.modalActive = false;
      this.email = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;

          @media (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>
