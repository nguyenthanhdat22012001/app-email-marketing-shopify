<template>
  <div class="px-5 pt-5 flex gap-5">
    <div
      class="search-bar flex gap-[10px] rounded border border-solid border-light p-[10px] flex-1"
    >
      <img src="@/assets/icons/search.svg" alt="" />
      <v-input
        placeholder="Search campaign..."
        @input="inputSearch"
        class="flex-1"
      />
    </div>
    <div class="flex gap-[10px] items-center">
      <!-- selecet default  -->
      <v-select-type-check prop_label="Status" @emitClearForm="status = []">
        <v-checkbox
          prop_label="Running"
          prop_input_value="running"
          v-model="status"
        ></v-checkbox>
        <v-checkbox
          prop_label="Completed"
          prop_input_value="completed"
          v-model="status"
        ></v-checkbox>
        <v-checkbox
          prop_label="Paused"
          prop_input_value="Paused"
          v-model="status"
        ></v-checkbox>
      </v-select-type-check>
      <!-- select sort  -->
      <v-select-type-check
        prop_icon="sort"
        prop_label="Sort"
        @emitClearForm="sort = ''"
      >
        <v-input-radio
          prop_label="Up"
          prop_input_value="ASC"
          v-model="sort"
        ></v-input-radio>
        <v-input-radio
          prop_label="Down"
          prop_input_value="DESC"
          v-model="sort"
        ></v-input-radio>
      </v-select-type-check>
    </div>
  </div>
</template>

<script>
import VInput from "@/components/VInput.vue";
import VCheckbox from "@/components/VCheckbox.vue";
import VInputRadio from "@/components/VInputRadio.vue";
import VSelectTypeCheck from "@/components/VSelectTypeCheck.vue";

import api from "@/plugins/api";
import { mapMutations } from "vuex";

export default {
  components: {
    VInput,
    VSelectTypeCheck,
    VCheckbox,
    VInputRadio,
  },
  data() {
    return {
      debounce: null,
      sort: "",
      status: [],
      keywords: "",
    };
  },
  methods: {
    ...mapMutations({
      setLoading: "setLoading",
    }),
    // function delay get value for event input search
    inputSearch(value) {
      this.keywords = value.trim();
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        await this.handleFiterCampaign();
      }, 500);
    },
    // hanlde filter campaign
    async handleFiterCampaign() {
      let payload = {
        status: this.status.toString(),
        sort: this.sort,
        keywords: this.keywords,
      };
      try {
        this.$emit("emitSetLoading", true);
        let res = await api.CAMPAIGN.filter(payload);
        if (res.status) {
          this.$emit("emitUpdateListCampaign", res.data);
        }
      } catch (error) {
        console.log(error);
      }
      this.$emit("emitSetLoading", false);
    },
  },
  watch: {
    async sort(value) {
      await this.handleFiterCampaign();
    },
    async status(value) {
      await this.handleFiterCampaign();
    },
  },
};
</script>

<style lang="scss" scoped></style>
