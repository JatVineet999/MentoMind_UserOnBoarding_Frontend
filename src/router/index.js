// import { createRouter, createWebHistory } from "vue-router";
// import LandingScreen from "@/views/LandingScreen.vue";
// import SkillLearningPriorities from "@/views/SkillLearningPriorities.vue"; // Ensure correct path

// const routes = [
//   {
//     path: "/",
//     name: "Landing",
//     component: LandingScreen,
//   },
//   {
//     path: "/skill-learning-priorities",
//     name: "SkillLearningPriorities",
//     component: SkillLearningPriorities,
//   },
//   // Add other routes here
// ];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

// export default router;
// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import LandingScreen from "@/views/LandingScreen.vue";
import SkillLearningPriorities from "@/views/SkillLearningPriorities.vue";
import UserPersonalInfo from "@/views/UserPersonalInfo.vue"; // Import the new component

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
