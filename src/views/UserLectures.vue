<template>
  <a-layout has-sider :style="{ background: '#fff' }">
    <Menu />
    <a-layout :style="{ marginLeft: '200px', marginTop: '20px' }">
      <a-layout-header :style="{ background: '#fff', paddingTop: 10 }">
        <a-typography-title>Your lectures: </a-typography-title>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px 0',
          overflow: 'initial',
          padding: '0 50px ',
        }"
      >
        <a-row v-bind:style="{ paddingRight: 3 }" v-if="lectures.length > 0">
          <div
            :style="{ marginLeft: '30px', marginTop: '10px' }"
            v-for="l in lectures"
          >
            <Lecture
              :date="l?.lecture.happened"
              :isUserLecture="true"
              :courseName="`${l?.lecture.courseWithAProfessor.course.name}`"
              :professor="`${l?.lecture.courseWithAProfessor.professor.firstName} ${l?.lecture.courseWithAProfessor.professor.lastName}`"
              :id="l?.lecture.recordingId"
              :lectureId="l?.id"
            />
          </div>
        </a-row>
      </a-layout-content>
      <a-layout-footer
        :style="{ textAlign: 'center' }"
        v-if="lectures.length > 0"
      >
        Sample project
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import Menu from "../components/Menu.vue";
import Lecture from "../components/Lecture.vue";
import { defineComponent } from "vue";
import { UserService } from "@/services/UserService";
export default defineComponent({
  components: {
    Menu,
    Lecture,
  },
  data() {
    return {
      lectures: [] as any,
    };
  },
  async created() {
    const userService = new UserService();

    const lectures = await userService.getUserFavorites();
    this.lectures = lectures.data;

    console.log(this.lectures[0].lecture);
  },
  beforeCreate() {
    if (!localStorage.getItem("userInfo")) {
      this.$router.push({ name: "login" });
    }
  },
  setup() {
    return {};
  },
});
</script>