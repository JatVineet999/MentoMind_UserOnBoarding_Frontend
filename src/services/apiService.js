// src/services/apiService.js
// import axios from "axios";

// const apiService = {
//   async fetchOnboardingData() {
//     try {
//       const response = await axios.post(
//         "/api/mentoassignment/assignment/onboarding/start",
//         { newUser: true, deviceId: "387c2863-6ee3-4a56-8210-225f774edade" },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       throw error;
//     }
//   },
// };

// export default apiService;
// src/services/apiService.js
import axios from "axios";

const apiService = {
  async fetchOnboardingData() {
    try {
      const response = await axios.post(
        "/api/mentoassignment/assignment/onboarding/start",
        { newUser: true, deviceId: "387c2863-6ee3-4a56-8210-225f774edade" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching onboarding data:", error);
      throw error;
    }
  },

  async fetchSkillLearningData(tempUserId, selectedDomainId) {
    try {
      const response = await axios.post(
        "/api/mentoassignment/assignment/onboarding/domains",
        {
          tempUserId: tempUserId,
          selectedDomainId: selectedDomainId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching skill learning data:", error);
      throw error;
    }
  },
};

export default apiService;
