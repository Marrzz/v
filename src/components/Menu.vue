<template>
  <a-layout-sider
    :style="{
      overflow: 'auto',
      height: '300vh',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      background: '#fff',
      marginTop: '30px',
    }"
  >
    <div />

    <a-menu :style="{ lineHeight: '64px' }">
      <a-menu-item key="1">
        <router-link to="/">Home</router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <span class="nav-text">
          <router-link to="/my/lectures">My lectures</router-link>
        </span>
      </a-menu-item>
      <a-menu-item key="3">
        <span class="nav-text"
          ><router-link to="/courses">Explore!</router-link></span
        >
      </a-menu-item>
    </a-menu>
    <div :style="{ textAlign: 'center', paddingTop: '10%' }">
      <a-button type="primary" danger @click="logOut">Log out</a-button>
    </div>
  </a-layout-sider>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  methods: {
    logOut() {
      localStorage.removeItem("userInfo");
      this.$router.push({
        name: "login",
        query: { redirect: "/account/login" },
      });
      this.$router.push(
        (this.$route.query.redirect as string) || "/account/login"
      );
    },
  },
});
</script>