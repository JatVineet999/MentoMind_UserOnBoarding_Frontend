<!-- DynamicBackground.vue -->
<template>
  <div :class="backgroundClass" class="background-container">
    <div class="content-box">
      <!-- Progress Bar Slot -->
      <slot name="progress-bar"></slot>

      <!-- Main Content Slot -->
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0, // Default progress, can be set dynamically
    },
  },
  data() {
    return {
      dayBackground: require("@/assets/images/background-day.png"),
      nightBackground: require("@/assets/images/background-night.png"),
    };
  },
  computed: {
    backgroundClass() {
      const hour = new Date().getHours();
      const isDay = hour >= 6 && hour < 18;
      return isDay ? "daytime-background" : "nighttime-background";
    },
  },
};
</script>

<style scoped>
.background-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-box {
  /* background-color: white; */
  border-radius: 15px;
  padding: 20px;
  width: 90%;
  max-width: 650px;
  text-align: center;
}

.content {
  margin-top: 20px;
}

.daytime-background {
  background-image: url("@/assets/images/background-day.png");
  background-size: cover;
  background-position: center center;
}

.nighttime-background {
  background-image: url("@/assets/images/background-night.png");
  background-size: cover;
  background-position: center center;
}
</style>
