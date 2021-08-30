<template lang="pug">
	div.admin
		div.container
			h2 Admin
			div.admin-info
				h2 Adicionar administradores
				div.input
					input(placeholder="Digite o email do usuário" type="text" id="add-admin" v-model="adminEmail")
				span {{ this.functionMessage }}
				button.button(@click="addAdmin") Enviar
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/functions';

export default {
  name: 'admin',
  data() {
    return {
      adminEmail: '',
      functionMessage: null,
    };
  },
  methods: {
    async addAdmin() {
      if (this.adminEmail === '') {
				this.functionMessage = 'Preencha o campo primeiro'
				return
			}
      const addAdmin = firebase.functions().httpsCallable('addAdminRole');
      const result = await addAdmin({ email: this.adminEmail });
      this.functionMessage = await result.data.message;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .admin-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      span {
        font-size: 14px;
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
