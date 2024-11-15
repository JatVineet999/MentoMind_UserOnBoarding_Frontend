import { createRouter, createWebHistory } from "vue-router";
import LandingScreen from "@/views/LandingScreen.vue";
import SkillLearningPriorities from "@/views/SkillLearningPriorities.vue";
import UserPersonalInfo from "@/views/UserPersonalInfo.vue";
import OtpEntry from "@/views/OtpEntryPage.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingScreen,
  },
  {
    path: "/skill-learning-priorities",
    name: "SkillLearningPriorities",
    component: SkillLearningPriorities,
  },
  {
    path: "/user-personal-info",
    name: "UserPersonalInfo",
    component: UserPersonalInfo,
  },
  {
    path: "/otp-entry-page",
    name: "OtpEntryPage",
    component: OtpEntry,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
