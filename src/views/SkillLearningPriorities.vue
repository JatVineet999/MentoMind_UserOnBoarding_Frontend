<template>
  <DynamicBackground :progress="progress">
    <template #progress-bar>
      <div class="progress-bar-container">
        <ProgressBar :progress="progress" />
      </div>
    </template>

    <div class="skill-learning-content">
      <h3 class="heading">{{ questionText }}</h3>
      <div class="options-container">
        <v-card
          v-for="option in options"
          :key="option.optionId"
          class="option-card"
          outlined
          @click="selectOption(option)"
        >
          <div class="card-content">
            <img
              :src="s3url + '/' + option.image"
              alt="Option Image"
              class="option-image"
            />
            <h3>{{ option.text }}</h3>
          </div>
        </v-card>
      </div>
    </div>
  </DynamicBackground>
</template>

<script>
import { mapState, mapActions } from "vuex";
import apiService from "@/services/apiService";
import DynamicBackground from "@/components/DynamicBackground.vue";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  components: {
    DynamicBackground,
    ProgressBar,
  },
  computed: {
    ...mapState(["progress", "tempUserId", "selectedDomainId"]),
  },
  data() {
    return {
      s3url: "https://mysa-img.devtest.thestudypod.com",
      questionText: "",
      options: [],
    };
  },
  async created() {
    try {
      if (!this.tempUserId || !this.selectedDomainId) {
        console.error(
          "No tempUserId or selectedDomainId found. Ensure they are saved in Vuex."
        );
        return;
      }

      const data = await apiService.fetchSkillLearningData(
        this.tempUserId,
        this.selectedDomainId
      );

      if (data && data.length > 0) {
        this.questionText = data[0].questionText;
        this.options = data[0].options;
      } else {
        console.error("API response missing questionText or options");
      }
    } catch (error) {
      console.error("API response error or missing fields:", error);
    }
  },
  methods: {
    ...mapActions(["updateProgress", "saveSelectedOptionId"]),
    selectOption(option) {
      this.updateProgress(75);
      this.saveSelectedOptionId(option.optionId); // Store selected option in Vuex
      this.$router.push({ name: "UserPersonalInfo" });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

.skill-learning-content {
  font-family: "Poppins", sans-serif;
  margin-top: 2rem; 
  text-align: center;
  color: white;
}

.heading {
  font-size: 1.2rem; 
  margin-bottom: 2rem; 
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem; 
  justify-content: center;
}

.option-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  text-align: center;
}
h3 {
  font-size: 0.84rem;
  font-weight: 600;
  margin: 0;
}

.option-image {
  width: 3rem;
  height: 2.7rem;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem; 
}

@media (max-width: 576px) {
  .heading {
    font-size: 1.4rem;
  }

  .option-card {
    width: 140px;
  }

  .option-image {
    width: 30px;
    height: 30px;
  }

  .options-container {
    gap: 0.8rem;
  }
}
</style>
