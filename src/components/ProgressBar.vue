<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.progress {
  height: 100%;
  background-color: #009afe;
  border-radius: 4px;
}
</style>
