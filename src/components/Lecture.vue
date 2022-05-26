<template>
  <a-col>
    <div v-bind:key="id">
      <a-card
        v-bind:title="new Date(date).toUTCString()"
        :bordered="false"
        style="width: 350px"
      >
        <template #extra>
          <star-filled v-if="isUserLecture" @click="toggleFavorite" hidden />
          <star-outlined v-else @click="toggleFavorite" />
        </template>

        <p v-if="isUserLecture">Course: {{ courseName }}</p>
        <p>Professor: {{ professor }}</p>

        <p>
          <audio controls>
            <source
              v-bind:src="`https://lecturehub.azurewebsites.net/api/v1/lecturerecording/download/${id}`"
              type="audio/mp3"
            />
          </audio>
        </p>
      </a-card>
    </div>
  </a-col>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons-vue";
import { UserService } from "@/services/UserService";

export default defineComponent({
  setup() {},
  components: {
    StarOutlined,
    StarFilled,
    StarTwoTone,
  },
  data() {
    return {
      isFilled: this.isUserLecture,
      iconColor: "#52c41a",
    };
  },
  props: {
    id: String,
    lectureId: String,
    date: String,
    courseName: String,
    professor: String,
    isUserLecture: Boolean,
    url: String,
  },
  methods: {
    toggleFavorite() {
      const userService = new UserService();

      if (this.isUserLecture) {
        this.isFilled = false;
        userService.removeFromFavorites(this.lectureId as string);
      } else {
        this.isFilled = true;
        userService.addLectureToFavorites(this.lectureId as string);
      }
    },
  },
});
</script>
