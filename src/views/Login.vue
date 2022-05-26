<template v-show="localStorage.getItem('userInfo') == null">
  <a-row type="flex" justify="center">
    <a-col style="width: 300px">
      <a-alert
        v-if="response === false"
        message="Error"
        description="Login failure."
        type="error"
        show-icon
      />
      <a-divider orientation="left">Login</a-divider>
      <a-form
        v-on:submit.prevent
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item
          label="Username"
          name="email"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formValues.email" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formValues.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox>Remember me</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button @click.prevent="logIn">Login</a-button>
        </a-form-item>
      </a-form>
      <a-divider />
      <router-link to="/account/register"
        >Don't have an account? Register here!</router-link
      >
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useIdentityStore } from "../stores/identity";
import { AccountService } from "../services/AccountService";
import { createPinia } from "pinia";
//import { ref } from "@vue/composition-api";

interface FormState {
  email: string;
  password: string;
}

export default defineComponent({
  setup() {
    const formValues = reactive<FormState>({
      email: "",
      password: "",
    });
    const onSubmit = async () => {
      const accountService = new AccountService();

      const res = await accountService.login(
        formValues.email,
        formValues.password
      );

      if (res.status === 200) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      }

      return true;
    };

    return {
      onSubmit,
      formValues,
    };
  },
  data() {
    return {
      response: true,
    };
  },
  beforeCreate() {
    if (localStorage.getItem("userInfo")) {
      this.$router.push({ name: "dashboard" });
    }
  },
  methods: {
    async logIn() {
      const success = await this.onSubmit();

      if (success) {
        this.$router.push({ name: "login", query: { redirect: "/" } });
        this.$router.push((this.$route.query.redirect as string) || "/");
      } else {
        this.response = false;
      }
    },
  },
});
</script>