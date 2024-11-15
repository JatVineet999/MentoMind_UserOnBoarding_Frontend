<template>
  <DynamicBackground :progress="progress">
    <template #progress-bar>
      <div class="progress-bar-container">
        <ProgressBar :progress="progress" />
      </div>
    </template>

    <div class="user-info-content">
      <h3 class="heading">Great! Almost There</h3>

      <v-form ref="form" class="form">
        <p class="input-label">What should we call you?</p>
        <v-text-field
          v-model="name"
          label="Name"
          outlined
          hide-details="auto"
          dense
          class="input-field"
          :rules="[rules.required]"
        />

        <p class="input-label">Please Provide your Mobile number</p>
        <div class="phone-number-field">
          <v-row no-gutters>
            <v-col cols="4">
              <v-select
                v-if="flattenedCountryCodes.length > 0"
                v-model="selectedCountryCode"
                :items="flattenedCountryCodes"
                item-text="display"
                item-value="code"
                outlined
                dense
                hide-details="auto"
                class="country-code-select"
              >
                <template #selection="{ item }">
                  <span v-if="item">
                    <img
                      :src="item.raw.flagUrl"
                      alt="Flag"
                      class="country-flag"
                    />
                    {{ item.raw.code }}
                  </span>
                </template>
                <template #item="{ item }">
                  <div v-if="item">
                    <img
                      :src="item.props.title.flagUrl"
                      alt="Flag"
                      class="country-flag"
                    />
                    {{ item.raw.code }}
                  </div>
                </template>
              </v-select>
            </v-col>

            <v-col cols="8">
              <v-text-field
                v-model="mobileNumber"
                label="Mobile Number"
                outlined
                dense
                hide-details
                class="phone-number-input"
                :rules="[rules.required, rules.phoneNumber]"
                type="tel"
                @keypress="onlyDigits"
              />
            </v-col>
          </v-row>
        </div>

        <v-btn @click="submitInfo" color="primary" class="next-button">
          Next
        </v-btn>
      </v-form>
    </div>
  </DynamicBackground>
</template>

<script>
import { mapState } from "vuex";
import DynamicBackground from "@/components/DynamicBackground.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import { getCountryCallingCode, getCountries } from "libphonenumber-js";
import apiService from "@/services/apiService";

const flattenedCountryCodes = getCountries().map((country) => ({
  code: `+${getCountryCallingCode(country)}`,
  flagUrl: `https://flagcdn.com/16x12/${country.toLowerCase()}.png`,
  display: `+${getCountryCallingCode(country)}`,
}));

export default {
  components: { DynamicBackground, ProgressBar },
  data() {
    return {
      name: "",
      mobileNumber: "",
      selectedCountryCode: "+91",
      rules: {
        required: (value) => !!value || "This field is required",
        phoneNumber: (value) =>
          /^\d{10}$/.test(value) || "Enter a valid 10-digit phone number",
      },
    };
  },
  computed: {
    ...mapState(["progress", "tempUserId", "deviceId"]),
    flattenedCountryCodes() {
      return flattenedCountryCodes;
    },
  },
  methods: {
    onlyDigits(event) {
      const char = String.fromCharCode(event.keyCode);
      if (!/[0-9]/.test(char)) {
        event.preventDefault();
      }
    },
    async submitInfo() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("saveUserInfo", {
          name: this.name,
          mobileNumber: this.mobileNumber,
          mobileCountryCode: this.selectedCountryCode,
          mobileCountry: "INDIA",
        });

        try {
          const response = await apiService.sendOtp({
            tempUserId: this.tempUserId,
            deviceId: this.deviceId,
            mobileCountryCode: this.selectedCountryCode,
            mobileCountry: "INDIA",
            mobileNumber: this.mobileNumber,
            name: this.name,
          });

          if (response.status === 200) {
            this.$store.commit("updateProgress", 100);
            this.$router.push({ name: "OtpEntryPage" });
          } else {
            alert("Failed to send OTP. Please try again.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Error sending OTP. Please try again.");
        }
      } else {
        alert("Please fill in all required fields.");
      }
    },
  },
};
</script>

<style scoped>
.user-info-content {
  font-family: "Poppins", sans-serif;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.heading {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: white;
}

.input-label {
  font-size: 0.9rem;
  color: white;
  margin-bottom: 5px;
  width: 60%;
  text-align: left;
}

.input-field,
.phone-number-field {
  background-color: white;
  border-radius: 8px;
  width: 60%;
  margin-bottom: 20px;
}

.phone-number-field {
  display: flex;
  align-items: center;
  padding: 0 8px;
}

.country-code-select,
.phone-number-input {
  background-color: transparent;
  width: 100%;
}

.country-flag {
  width: 12px;
  height: 12px;
  margin-right: 5px;
}

.next-button {
  margin-top: 20px;
}
</style>
