<template>
  <a-card v-bind:title="course?.name" style="width: 300px">
    <div v-if="isActiveCourse">
    <p>Language: {{ language }}</p>
    <p>
      Professor:
      {{ professor?.firstName + " " + professor?.lastName }}
    </p>
    <p>
      University:
      <router-link v-bind:to="/university/ + university?.id">{{
        university?.name
      }}</router-link>
    </p>
    <p>
      <router-link v-bind:to="courseUrl">Go to course...</router-link>
    </p>
    </div>
   
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      courseUrl: "/course/" + this?.course?.id + "/lectures",
    };
  },
  props: {
    professor: Object,
    university: Object,
    language: String,
    course: Object,
    lectureId: String,
    isActiveCourse: null
  },
  setup() {},
});
</script>
