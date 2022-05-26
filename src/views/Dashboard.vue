<template>
  <a-layout has-sider :style="{ background: '#fff' }">
    <Menu />
    <a-layout :style="{ marginLeft: '200px', marginTop: '20px' }">
      <a-layout-header :style="{ background: '#fff', paddingTop: 10 }">
        <a-typography-title>Welcome </a-typography-title>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div
          :style="{ padding: '24px', background: '#fff', textAlign: 'center' }"
        >
          <a-grid>
            <a-divider orientation="left"
              ><a-typography-title :level="2"> </a-typography-title
            ></a-divider>
            <Carousel />
          </a-grid>
        </div>
        <br />
        <div
          :style="{ padding: '24px', background: '#fff', textAlign: 'center' }"
        >
          <a-grid>
            <a-divider orientation="center">Member count </a-divider>
          </a-grid>
          <h1>{{ memberCount }}</h1>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Sample project
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import Menu from "../components/Menu.vue";
import Carousel from "../components/Carousel.vue";

import { defineComponent } from "vue";
import { AccountService } from "../services/AccountService";
export default defineComponent({
  components: {
    Menu,
    Carousel,
  },
  data() {
    return {
      memberCount: 0,
    };
  },
  beforeCreate() {
    if (!localStorage.getItem("userInfo")) {
      this.$router.push({ name: "login" });
    }
  },
  async created() {
    const accService = new AccountService();

    const memberCount = await accService.getMemberCount();

    this.memberCount = memberCount.data;
  },
  setup() {
    return {};
  },
});
</script>
