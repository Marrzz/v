<template>
  <a-layout has-sider :style="{ background: '#fff' }">
    <Menu />
    <a-layout :style="{ marginLeft: '200px', marginTop: '20px' }">
      <a-layout-header :style="{ background: '#fff', paddingTop: 10 }">
        <div>
          <a-typography-title
            >{{ `${university.name} : ` }} {{ `${university.city}, ` }}
            {{ `${university.country}` }}</a-typography-title
          >
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div
          :style="{ padding: '24px', background: '#fff', textAlign: 'center' }"
        >
          <a-divider orientation="left"> Ongoing courses: </a-divider>
          <a-row v-bind:style="{ paddingRight: 3 }">
            <a-col v-for="item in activeCourses">
              <div :style="{ marginLeft: '30px' }">
                <Course
                  :course="{ name: item.course.name, code: item.course.code }"
                  :language="item.language"
                  :professor="{
                    firstName: item.professor.firstName,
                    lastName: item.professor.lastName,
                  }"
                  :university="{ id: university.id, name: university.name }"
                />
              </div>
            </a-col>
          </a-row>
        </div>
        <br />
        <div
          :style="{ padding: '24px', background: '#fff', textAlign: 'center' }"
        >
          <a-divider orientation="left"> All Courses: </a-divider>
          <a-row v-bind:style="{ paddingRight: 3 }">
            <a-col v-for="item in allCourses">
              <div :style="{ marginLeft: '30px' }">
                <Course
                  :course="{ name: item.name, code: item.code }"
                  :language="item.language"
                />
              </div>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Sample project
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { CourseService } from "../services/CoursesService";
import { UniversitiesService } from "@/services/UniversitiesService";
import Menu from "../components/Menu.vue";
import Course from "./Course.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Menu,
    Course,
  },
  data() {
    return {
      university: {},
      allCourses: [],
      activeCourses: [] as any,
    };
  },
  async created() {
    const uniService = new UniversitiesService();
    const courseService = new CourseService();
    const uniId = this.$route.params.university as any;

    if (!!uniId) {
      const uni = await uniService.getUniversity(uniId as string);

      this.university = uni;

      const allCourses = await uniService.getCourses(uniId as string);

      const activeCourses = await courseService.getAllActiveCoursesByUniversity(
        uniId as string
      );

      this.activeCourses = activeCourses;
      this.allCourses = allCourses;
    }
  },
  methods: {
    async getUniversityData() {},
    async getCoursesOfUniversity() {},
  },
});
</script>