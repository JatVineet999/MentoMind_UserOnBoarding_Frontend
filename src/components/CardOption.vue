<template>
  <v-card class="card-option" outlined @click="handleClick">
    <div :class="['card-content', alignmentClass]">
      <img :src="imageSrc" alt="Option Image" class="option-image" />
      <h3>{{ title }}</h3>
      <p v-if="description">{{ description }}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    alignment: {
      type: String,
      default: "left", // 'left' or 'center'
    },
  },
  computed: {
    alignmentClass() {
      return this.alignment === "center" ? "align-center" : "align-left";
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.card-option {
  width: 200px;
  padding: 15px;
  cursor: pointer;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.align-center {
  align-items: center;
  text-align: center;
}

.align-left {
  align-items: flex-start;
  text-align: left;
}

.option-image {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

h3 {
  font-size: 0.84rem;
  font-weight: 600;
  margin: 0;
}

p {
  font-size: 0.6rem;
  font-weight: 500;
  margin: 5px 0 0 0;
}
</style>
