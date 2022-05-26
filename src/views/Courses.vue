<template>
  <a-layout has-sider :style="{ background: '#fff' }">
    <Menu />
    <a-layout :style="{ marginLeft: '200px', marginTop: '20px' }">
      <a-layout-header :style="{ background: '#fff', paddingTop: 10 }">
        <a-typography-title>Explore </a-typography-title>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div
          :style="{ padding: '24px', background: '#fff', textAlign: 'center' }"
        >
          <a-divider orientation="left"> Find Courses: </a-divider>
          <a-row v-bind:style="{ paddingRight: 3 }">
            <div
              :style="{ marginLeft: '30px', marginTop: '10px' }"
              v-for="item in courses" :key="item.id"
            >
              <Course
                :key="item?.id"
                v-bind:language="item?.language"
                v-bind:professor="{
                  firstName: item?.professor.firstName,
                  lastName: item?.professor.lastName,
                }"
                v-bind:university="{
                  id: item?.course.university.id,
                  name: item?.course.university.name,
                }"
                v-bind:course="{
                  name: item?.course.name,
                  id: item?.id,
                }"
                v-bind:isActiveCourse="true"
              />
            </div>
          </a-row>
        </div>
        <br />
        <div
          :style="{ padding: '24px', background: '#fff', textAlign: 'center' }"
        >
          <a-divider orientation="left"> Find Universities: </a-divider>

          <a-row v-bind:style="{ paddingRight: 3 }">
            <div
              v-for="item in universities"
              :style="{ marginLeft: '30px', marginTop: '10px' }"
              :key="item.id"
            >
              <UniversityCard
                v-bind:name="item.name"
                v-bind:city="item.city"
                v-bind:country="item.country"
                v-bind:id="item.id"
              />
            </div>
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
import { CourseService } from "@/services/CoursesService";
import { UniversitiesService } from "@/services/UniversitiesService";
import { defineComponent } from "@vue/runtime-core";
import Course from "../components/Course.vue";
import Menu from "../components/Menu.vue";
import UniversityCard from "../components/UniversityCard.vue";
import type { IActiveCourse } from "@/domain/IActiveCourse";
import type { IUniversity } from "@/domain/IUniversity";
export default defineComponent({
  components: {
    Course,
    Menu,
    UniversityCard,
  },
  beforeCreate() {
    if (!localStorage.getItem("userInfo")) {
      this.$router.push({ name: "login" });
    }
  },
  data() {
    return {
      courses: [] as IActiveCourse[],
      universities: [] as IUniversity[],
    };
  },
  setup() {},

  async created() {
    const courseService = new CourseService();
    const universityService = new UniversitiesService();
    this.courses = await courseService.getAll();
    this.universities = await universityService.getAll();
  },
});
</script>