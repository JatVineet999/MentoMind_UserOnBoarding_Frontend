<template>
  <DynamicBackground :progress="progress">
    <template #progress-bar>
      <div class="progress-bar-container">
        <ProgressBar :progress="progress" />
      </div>
    </template>

    <div class="user-info-content">
      <h3 class="heading">Great! Almost There</h3>

      <!-- Name Input Field -->
      <v-text-field
        v-model="name"
        label="Name"
        outlined
        dense
        class="input-field"
      />

      <!-- Country Code Dropdown with Flags and Phone Number Input Field -->
      <v-row>
        <v-col cols="4">
          <v-select
            v-if="countryCodes && countryCodes.length > 0"
            v-model="selectedCountryCode"
            :items="countryCodes"
            item-text="display"
            item-value="code"
            label="Country Code"
            outlined
            dense
            class="country-code-select"
          >
            <!-- Selection Template -->
            <template #selection="{ item }">
              <span v-if="item">
                <img :src="item.flagUrl" alt="Flag" class="country-flag" />
                <span>{{ item.display || item.code }}</span>
              </span>
            </template>

            <!-- Item Template -->
            <template #item="{ item }">
              <div v-if="item">
                <img :src="item.flagUrl" alt="Flag" class="country-flag" />
                <span>{{ item.display || item.code }}</span>
              </div>
            </template>
          </v-select>
        </v-col>

        <!-- Mobile Number Input Field -->
        <v-col cols="8">
          <v-text-field
            v-model="mobileNumber"
            label="Mobile Number"
            outlined
            dense
            class="input-field"
          />
        </v-col>
      </v-row>

      <!-- Next Button -->
      <v-btn @click="submitInfo" color="primary" class="next-button">
        Next
      </v-btn>
    </div>
  </DynamicBackground>
</template>

<script>
import { mapState } from "vuex";
import DynamicBackground from "@/components/DynamicBackground.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import { getCountryCallingCode, getCountries } from "libphonenumber-js";

export default {
  components: {
    DynamicBackground,
    ProgressBar,
  },
  data() {
    return {
      name: "",
      mobileNumber: "",
      selectedCountryCode: "+91", // Default to India
      countryCodes: [], // Store country codes here
    };
  },
  computed: {
    ...mapState(["progress"]),
  },
  created() {
    // Initialize country codes only once in a data property
    const countries = getCountries();
    this.countryCodes = countries.map((country) => ({
      code: `+${getCountryCallingCode(country)}`,
      flagUrl: `https://flagcdn.com/16x12/${country.toLowerCase()}.png`,
      display: `+${getCountryCallingCode(country)}`,
    }));

    // Log each entry to check its structure
    this.countryCodes.forEach((country) => {
      console.log("Country Code Entry:", country);
    });
  },
  methods: {
    submitInfo() {
      if (this.name && this.mobileNumber) {
        console.log("Name:", this.name);
        console.log(
          "Mobile Number:",
          this.selectedCountryCode + this.mobileNumber
        );
        this.$router.push({ name: "NextPage" });
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
  margin-top: 20px;
  text-align: center;
  color: white;
}

.heading {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
}

.country-code-select {
  display: flex;
  align-items: center;
}

.country-flag {
  width: 20px;
  height: 15px;
  margin-right: 5px;
}

.next-button {
  margin-top: 20px;
}
</style>
