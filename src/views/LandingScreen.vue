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

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default {
  components: {
    DynamicBackground,
    ProgressBar,
    CardOption,
  },
  computed: {
    ...mapState(["progress", "deviceId"]),
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
    if (!this.deviceId) {
      const newDeviceId = generateUUID();
      this.saveDeviceId(newDeviceId);
    }

    try {
      const data = await apiService.fetchOnboardingData();
      this.s3url = data.appurls.s3url;
      this.domainSelectionMessage = data.domainSelectionMessage;
      this.domainSelectionMessageDetails = data.domainSelectionMessageDetails;
      this.domains = data.domains;

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
    ...mapActions([
      "updateProgress",
      "saveTempUserId",
      "saveSelectedDomainId",
      "saveDeviceId",
    ]),
    selectDomain(domain) {
      if (!domain || !domain.domainId) {
        console.error("No domain selected");
        return;
      }

      this.saveSelectedDomainId(domain.domainId);
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
  margin-top: 2rem;
  text-align: center;
  color: white;
}

.heading {
  font-size: 1.2rem;
}

.subheading {
  font-size: 0.8rem;
  color: white;
  margin-bottom: 2rem;
}

.domain-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.progress-bar-container {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

@media (max-width: 576px) {
  .heading {
    font-size: 1rem;
  }
  .subheading {
    font-size: 0.65rem;
  }
  .domain-options {
    gap: 1rem;
  }
}
</style>
