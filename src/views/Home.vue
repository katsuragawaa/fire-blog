<template lang="pug">
	div.home
		blog-post(v-if="!user" :post="welcomeScreen")
		blog-post(v-for="(post, index) in sampleBlogPosts" :post="post" :key="index")
		div.blog-card-wrap
			div.container
				h3 Veja outras postagens recentes
				div.blog-cards
					blog-card(v-for="(post, index) in sampleBlogCards" :post="post" :key="index")
		div.updates(v-if="!user")
			div.container
				h2 Não perca mais nenhuma postagem, registre sua conta grátis hoje!
				router-link.router-button(to="#") Restre-se no FireBlogs
					arrow.arrow.arrow-light

</template>

<script>
import BlogPost from '../components/BlogPost';
import BlogCard from '../components/BlogCard';
import Arrow from '../assets/Icons/arrow-right-light.svg';

export default {
  name: 'home',
  components: { BlogPost, BlogCard, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: 'Bem Vindo!',
        blogPost:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Neque sodales ut etiam sit amet nisl.',
        welcomeScreen: true,
        photo: 'coding',
      },
      sampleBlogPosts: [
        // vai remover depois que popular o banco de dados do Firebase
        {
          title: 'Aqui Vai o Título do Blog',
          blogHtml: 'Aqui é um filler para o título',
          blogCoverPhoto: 'beautiful-stories',
        },
        {
          title: 'Aqui Vai o Título do Blog',
          blogHtml: 'Aqui é um filler para o título',
          blogCoverPhoto: 'designed-for-everyone',
        },
      ],
    };
  },
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
