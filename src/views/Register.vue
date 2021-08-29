<template lang="pug">
	div.form-wrap
		form.register
			p.login-register Já tem uma conta? 
				router-link.router-link(:to="{ name: 'Login' } ") Faça login
			h2 Registre-se no FireBlogs
			div.inputs
				div.input
					input(type="text" placeholder="Nome" v-model="firstName")
					user.icon
				div.input
					input(type="text" placeholder="Sobrenome" v-model="lastName")
					user.icon
				div.input
					input(type="text" placeholder="Usuário" v-model="username")
					user.icon
				div.input
					input(type="text" placeholder="Email" v-model="email")
					email.icon
				div.input
					input(type="password" placeholder="Senha" v-model="password")
					password.icon
				div.error(v-show="error") {{ this.errorMessage }}
			button(@click.prevent="register") Criar conta
			div.angle
		div.background
</template>

<script>
import Email from '../assets/Icons/envelope-regular.svg';
import Password from '../assets/Icons/lock-alt-solid.svg';
import User from '../assets/Icons/user-alt-light.svg';

import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase/firebaseInit';

export default {
  name: 'register',
  components: { Email, Password, User },
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      error: null,
      errorMessage: null,
    };
  },
  methods: {
    async register() {
      if (
        this.firstName !== '' &&
        this.lastName !== '' &&
        this.username !== '' &&
        this.email !== '' &&
        this.password !== ''
      ) {
        // password precisa ter no mínimo 6 caracteres
        if (this.password.length < 6) {
          this.error = true;
          this.errorMessage = 'A senha precisa ter no mínimo 6 caracteres';
          return;
        }

        this.error = false;
        this.errorMessage = '';

        const firebaseAuth = firebase.auth();
        const createUser = await firebaseAuth
          .createUserWithEmailAndPassword(this.email, this.password)
          .catch((firebaseError) => {
            this.error = true;
            if (firebaseError.code === 'auth/email-already-in-use') {
              this.errorMessage = 'Email já registrado';
            }
          });
        const result = createUser;

        const dataBase = db.collection('users').doc(result.user.uid);
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        });
        this.$router.push({ name: 'Home' });
        return;
      }
      this.error = true;
      this.errorMessage = 'Preencha todos os campos!';
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
