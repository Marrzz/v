<template>
  <a-layout has-sider :style="{ background: '#fff' }">
    <Menu />
    <a-layout :style="{ marginLeft: '200px', marginTop: '20px' }">
      <a-layout-header :style="{ background: '#fff', paddingTop: 10 }">
        <a-typography-title
          >{{ course?.course?.university?.name + ": " + course?.course?.name }}
        </a-typography-title>
      </a-layout-header>

      <a-layout-content
        :style="{
          margin: '24px 16px 0',
          overflow: 'initial',
          padding: '0 50px ',
        }"
      >
        <div
          :style="{ padding: '24px', background: '#fff', textAlign: 'center' }"
        >
          <a-grid>
            <a-row justify="space-between" :gutter="16">
              <a-col>
                <Lecture
                  v-for="l in lectures"
                  :lectureId="l.id"
                  :id="l.recordingId"
                  :date="l?.happened"
                  :isUserLecture="false"
                  :professor="
                    l?.courseWithAProfessor?.professor.academicTitle +
                    ' ' +
                    l?.courseWithAProfessor?.professor.firstName +
                    ' ' +
                    l?.courseWithAProfessor?.professor.lastName
                  "
                />
              </a-col>
            </a-row>
          </a-grid>
        </div>
      </a-layout-content>
      <a-layout-footer
        :style="{
          textAlign: 'center',
        }"
      >
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import Menu from "../components/Menu.vue";
import Lecture from "../components/Lecture.vue";
import { LectureService } from "@/services/LectureService";
import { CourseService } from "@/services/CoursesService";

export default defineComponent({
  components: {
    Menu,
    Lecture,
  },
  data() {
    return {
      lectures: [] as any,
      course: {} as any,
    };
  },
  beforeCreate() {
    if (!localStorage.getItem("userInfo")) {
      this.$router.push({ name: "login" });
    }
  },

  async created() {
    const route = useRoute();

    const lectureService = new LectureService();
    const courseService = new CourseService();

    const id = route.params.courseId as string;

    const lectures = await lectureService.getLecturesByCourse(id);
    const course = await courseService.getCourse(id as string);

    this.lectures = lectures;
    this.course = course;
  },
});
</script>
