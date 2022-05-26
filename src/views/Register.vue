<template>
  <a-row type="flex" justify="center">
    <a-col>
      <a-divider orientation="left">Register</a-divider>
      <a-form
        :model="formState"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="First name"
          name="firstName"
          :rules="[
            { required: true, message: 'Please input your first name!' },
          ]"
        >
          <a-input v-model:value="formState.firstName" />
        </a-form-item>
        <a-form-item
          label="Last name"
          name="lastName"
          :rules="[{ required: true, message: 'Please input your last name!' }]"
        >
          <a-input v-model:value="formState.lastName" />
        </a-form-item>
        <a-form-item
          label="Email"
          name="email"
          :rules="[{ required: true, message: 'Please input your email!' }]"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" @click="onFinish">Register</a-button>
        </a-form-item>
      </a-form>
      <a-divider />
      <router-link to="/account/login"
        >Have an account? Login here!</router-link
      >
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { AccountService } from "../services/AccountService";
import { createPinia } from "pinia";
//import useIdentityStore from "../stores/identity";
//const identityStore = useIdentityStore();
const accService = new AccountService();
interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    const onFinish = async () => {
      var res = await accService.register(
        formState.email,
        formState.firstName,
        formState.lastName,
        formState.password
      );

      if ((res.status = 200)) {
        return true;
      } else {
        return false;
      }
    };

    const onFinishFailed = (errorInfo: any) => {};
    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
  beforeCreate() {
    if (localStorage.getItem("userInfo")) {
      this.$router.push({ name: "dashboard" });
    }
  },
  methods: {
    async register() {
      const res = await this.onFinish();

      if (res) {
        this.$router.push("/account/login");
      } else {
        alert("errors here");
      }
    },
  },
});
</script>