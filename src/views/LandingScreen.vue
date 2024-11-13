<template>
  <DynamicBackground :progress="progress">
    <!-- Slot for Progress Bar -->
    <template #progress-bar>
      <ProgressBar :progress="progress" />
    </template>

    <!-- Main Content Slot -->
    <div class="onboarding-content">
      <h3 class="heading">{{ domainSelectionMessage }}</h3>
      <p class="subheading">{{ domainSelectionMessageDetails }}</p>

      <!-- Render each domain option as a clickable card -->
      <div class="domain-options">
        <CardOption
          v-for="domain in domains"
          :key="domain.domainId"
          :imageSrc="s3url + '/' + domain.image"
          :title="domain.name"
          :description="domain.description"
          alignment="left"
          @click="selectDomain(domain)"
        />
      </div>
    </div>
  </DynamicBackground>
</template>

<script>
import { mapState, mapActions } from "vuex";
import apiService from "@/services/apiService";
import DynamicBackground from "@/components/DynamicBackground.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import CardOption from "@/components/CardOption.vue";

export default {
  components: {
    DynamicBackground,
    ProgressBar,
    CardOption,
  },
  computed: {
    ...mapState(["progress"]),
  },
  data() {
    return {
      s3url: "",
      domainSelectionMessage: "",
      domainSelectionMessageDetails: "",
      domains: [],
    };
  },
  async created() {
    try {
      const data = await apiService.fetchOnboardingData();
      this.s3url = data.appurls.s3url;
      this.domainSelectionMessage = data.domainSelectionMessage;
      this.domainSelectionMessageDetails = data.domainSelectionMessageDetails;
      this.domains = data.domains;
      console.log(data.tempUserId);
      if (data.tempUserId) {
        this.saveTempUserId(data.tempUserId);
      } else {
        console.error("tempUserId not found in API response");
      }
    } catch (error) {
      console.error(
        "API response is missing expected fields or an error occurred:",
        error
      );
    }
  },
  methods: {
    ...mapActions(["updateProgress", "saveTempUserId", "saveSelectedDomainId"]),
    selectDomain(domain) {
      if (!domain || !domain.domainId) {
        console.error("No domain selected");
        return;
      }

      console.log("Selected domain ID:", domain.domainId);
      this.saveSelectedDomainId(domain.domainId); // Store selectedDomainId in Vuex
      this.updateProgress(50);
      this.$router.push({ name: "SkillLearningPriorities" });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

.onboarding-content {
  font-family: "Poppins", sans-serif;
  margin-top: 20px;
  text-align: center;
  color: white;
}

.heading {
  font-size: 1.3rem;
}

.subheading {
  font-size: 0.7rem;
  color: white;
  margin-bottom: 20px;
}

.domain-options {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.progress-bar-container {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
