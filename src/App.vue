<template>
  <RouterView />
</template>


<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Dashboard from "./views/Dashboard.vue";

export default defineComponent({
  name: "App",
  components: {
    Dashboard,
  },

  async mounted() {
    /*  const courses = useCoursesStore();

    const courseService = new CourseService();
    courses.$state.courses = await courseService.getAll(); */
  },
});
</script>