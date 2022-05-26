<template>
  <a-carousel autoplay>
    <h3>
      Did you know life is 100 times easier when you dont leave all of your
      course work on the last week?
    </h3>
    <h3>
      Listening your lectures on the go means you can study even when you might
      not be behind your computer
    </h3>
    <h2>Start listening today!</h2>
  </a-carousel>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style scoped>
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 300px;
  line-height: 300px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: black;
}
</style>