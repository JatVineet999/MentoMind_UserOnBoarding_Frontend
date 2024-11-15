<template>
  <DynamicBackground :progress="progressValue">
    <template #progress-bar>
      <div class="progress-bar-container">
        <ProgressBar :progress="progressValue" />
      </div>
    </template>

    <div class="otp-entry-content">
      <h2 class="heading">Enter OTP !🔐</h2>
      <p>OTP sent to provided number</p>

      <div class="otp-input-container">
        <v-text-field
          v-for="(digit, index) in otpDigits"
          :key="index"
          v-model="otpDigits[index]"
          outlined
          maxlength="1"
          class="otp-input-box"
          :ref="`otp${index}`"
          @input="moveFocus(index)"
          type="tel"
        />
      </div>

      <p class="resend-text" @click="resendOtp">Did not receive yet? Resend</p>

      <v-btn color="#009afe" @click="verifyOtp">Verify</v-btn>
    </div>
  </DynamicBackground>
</template>

<script>
import { mapGetters } from "vuex";
import DynamicBackground from "@/components/DynamicBackground.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import apiService from "@/services/apiService";

export default {
  components: { DynamicBackground, ProgressBar },
  data() {
    return {
      otpDigits: ["", "", "", "", ""],
      progressValue: 100, 
    };
  },
  computed: {
    ...mapGetters([
      "tempUserId",
      "deviceId",
      "mobileCountryCode",
      "mobileCountry",
      "mobileNumber",
      "name",
    ]),
  },
  methods: {
    verifyOtp() {
      const otp = this.otpDigits.join("");
      if (otp.length === 5) {
        console.log("Verifying OTP:", otp);
      } else {
        alert("Please enter a complete 5-digit OTP.");
      }
    },
    async resendOtp() {
      try {
        const data = {
          tempUserId: this.tempUserId,
          deviceId: this.deviceId,
          mobileCountryCode: this.mobileCountryCode,
          mobileCountry: this.mobileCountry,
          mobileNumber: this.mobileNumber,
          name: this.name,
        };

        const response = await apiService.sendOtp(data);
        console.log("OTP resent successfully:", response);
      } catch (error) {
        console.error("Error resending OTP:", error);
      }
    },
    moveFocus(index) {
      if (index < this.otpDigits.length - 1) {
        const nextRef = this.$refs[`otp${index + 1}`][0];
        if (nextRef && typeof nextRef.focus === "function") {
          nextRef.focus();
        }
      }
    },
  },
};
</script>

<style scoped>
.otp-entry-content {
  font-family: "Poppins", sans-serif;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.otp-input-container {
  display: flex;
  gap: 0.5rem;
  margin: 20px 0;
}

.otp-input-box {
  width: 50px;
  max-height: 3.5em;
  background-color: white;
  border-radius: 10px;
  text-align: center;
}

.resend-text {
  margin: 10px 0;
  color: #009afe;
  font-size: 0.9rem;
  cursor: pointer;
}

.resend-text:hover {
  text-decoration: underline;
}
</style>
