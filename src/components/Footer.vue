<template lang="pug">
	footer
		div.container
			div.left
				div.col-1
					router-link.header(:to="{ name: 'Home' }") FireBlogs
					ul
						li
							a(href="#" style="fill: white ")
								github.svg-icon
						li
							a(href="#")
								linkedin.svg-icon
						li
							a(href="#")
								twitter.svg-icon
						li
							a(href="#")
								instagram.svg-icon
				div.col-2
					ul
						router-link.link(:to="{ name: 'Home' }") Início
						router-link.link(:to="{ name: 'Blogs' }") FireBlogs
						router-link.link(v-if="user" :to="{ name: 'New Post' }") Crie um novo post
						router-link.link(v-if="!user" :to="{ name: 'Login' }") Entrar/Registrar
			div.right
				p Copyright 2021 All Rights Reserved
</template>

<script>
import github from '../assets/Icons/github-brands.svg';
import linkedin from '../assets/Icons/linkedin-brands.svg';
import twitter from '../assets/Icons/twitter-brands.svg';
import instagram from '../assets/Icons/instagram-brands.svg';

export default {
  name: 'footer-vue',
  components: {
    github,
    linkedin,
    twitter,
    instagram,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;

  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 32px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;

      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }

      .header {
        text-align: center;
        font-size: 24px;
        color: #fff;
        margin-bottom: 16px;
        text-decoration: none;
        font-weight: 700;

        @media (min-width: 800px) {
          text-align: initial;
        }
      }

      ul {
        gap: 16px;
        list-style: none;
        display: flex;
      }

      .col-1,
      .col-2 {
        gap: 32px;
        display: flex;
        flex: 1;

        @media (min-width: 800px) {
          gap: 0;
        }
      }

      .col-1 {
        flex-direction: column;

        h2 {
          text-align: center;
          @media (min-width: 800px) {
            text-align: initial;
          }
        }

        ul {
          margin-top: auto;

          li {
            display: flex;
            align-items: center;

            .svg-icon {
              width: 24px;
              height: auto;
              color: #fff;
            }
          }
        }
      }

      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          @media (min-width: 800px) {
            flex-direction: column;
          }

          .link {
            font-size: 16px;
            font-weight: 500;
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }

    .right {
      gap: 32px;
      color: #fff;
      align-items: center;
      flex-direction: column;

      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }

    p {
      margin-top: auto;
    }
  }
}
</style>
