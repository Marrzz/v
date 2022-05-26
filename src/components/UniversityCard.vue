<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title-text-left">
        {{ name }}
      </h5>
      <p>{{ city + ", " + country }}</p>
      <router-link v-bind:to="uniUrl">See more</router-link>
    </div>
  </div>
  <!-- <span class="border border-dark">
    <a-typography-title :level="2">{{ name }}, </a-typography-title>
    <a-typography-title :level="3">{{ city }} {{ country }}</a-typography-title>
  </span> -->
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  props: {
    name: String,
    city: String,
    country: String,
    id: String,
  },
  data() {
    return {
      uniUrl: "/university/" + this.id,
    };
  },
});
</script>
