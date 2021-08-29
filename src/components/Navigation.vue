<template lang="pug">
	header
		nav.container
			div.branding
				router-link.header(:to="{name: 'Home'}") FireBlogs
			div.nav-links
				ul(v-show="!mobile")
					router-link.link(:to="{name: 'Home'}") Início
					router-link.link(:to="{name: 'Blogs'}") Blogs
					router-link.link(:to="{name: 'Blogs'}") Novo Post 
					router-link.link(v-if="!user" :to="{name: 'Login'}") Entrar/Registrar
				div.profile(v-if="user" ref="profile" @click="toggleProfileMenu")
					span {{ this.$store.state.profileInitials }}
					div.profile-menu(v-show="profileMenu")
						div.info
							p.initials {{ this.$store.state.profileInitials }}
							div.right
								p {{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}
								p {{ this.$store.state.profileUsername }}
								p {{ this.$store.state.profileEmail }}
						div.options
							div.option
								router-link.option(:to="{ name: 'Profile' }") 
									user-icon.icon
									p Perfil
							div.option
								router-link.option(:to="{ name: 'Admin' }") 
									admin-icon.icon
									p Admin
							div.option(@click="signOut")
								sign-out-icon.icon
								p Sair
		menuIcon.menu-icon(@click="toggleMobileNav" v-show="mobile")
		transition(name="mobile-nav")
			ul.mobile-nav(v-show="mobileNav")
				router-link.link(:to="{name: 'Home'}") Início
				router-link.link(:to="{name: 'Blogs'}") Blogs
				router-link.link(:to="{name: 'Blogs'}") Criar Post
				router-link.link(v-if="!user" :to="{name: 'Login'}") Entrar/Registrar
</template>

<script>
import MenuIcon from '../assets/Icons/bars-regular.svg';
import UserIcon from '../assets/Icons/user-alt-light.svg';
import AdminIcon from '../assets/Icons/user-crown-light.svg';
import SignOutIcon from '../assets/Icons/sign-out-alt-regular.svg';

import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'navigation',
  components: {
    MenuIcon,
    UserIcon,
    AdminIcon,
    SignOutIcon,
  },
  data() {
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu(event) {
      if (event.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    signOut() {
      firebase.auth().signOut();
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scope>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 600;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }
  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 700;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 65px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 50px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }

              p {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;

            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px;
                height: auto;
              }

              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX();
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>
