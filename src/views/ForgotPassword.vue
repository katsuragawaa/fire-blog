<template lang="pug">
	div.reset-password
		modal(v-if="modalActive" :modalMessage="modalMessage" @close-modal="closeModal")
		loading(v-if="loading")
		div.form-wrap
			form.reset
				p.login-register Volte para o 
					router-link.router-link(:to="{ name: 'Login' } ") Login
				h2 Redefinir Senha
				p Esqueceu sua senha? Digite seu email para redefinir
				div.inputs
					div.input
						input(type="text" placeholder="Email" v-model="email")
						email.icon
				button(@click.prevent="resetPassword") Redefinir
				div.angle
			div.background
</template>

<script>
import Email from '../assets/Icons/envelope-regular.svg';
import Modal from '../components/Modal.vue';
import Loading from '../components/Loading.vue';

import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'forgot-password',
  components: { Email, Modal, Loading },
  data() {
    return {
      email: '',
      modalActive: null,
      modalMessage: '',
      loading: null,
    };
  },
  methods: {
    resetPassword() {
      if (this.email !== '') {
        this.loading = true;
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.modalMessage = 'Verifique seu email';
            this.loading = false;
            this.modalActive = true;
          })
          .catch((err) => {
            this.modalMessage = err.message;
            this.loading = false;
            this.modalActive = true;
          });
      } else {
        this.modalMessage = 'Preencha seu email!';
        this.loading = false;
        this.modalActive = true;
      }
    },
    closeModal() {
      this.modalActive = false;
      this.email = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
