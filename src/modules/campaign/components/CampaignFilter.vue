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
          prop_label="Last created"
          prop_input_value="DESC"
          v-model="sort"
        ></v-input-radio>
        <v-input-radio
          prop_label="First created"
          prop_input_value="ASC"
          v-model="sort"
        ></v-input-radio>
        <v-input-radio
          prop_label="Campaign name (A-Z)"
          prop_input_value="A-Z"
          v-model="sort"
        ></v-input-radio>
        <v-input-radio
          prop_label="Campaign name (Z-A)"
          prop_input_value="Z-A"
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
        await this.handleFilterCampaign();
      }, 500);
    },
    // hanlde filter campaign
    async handleFilterCampaign() {
      let payload = {
        status: this.status.toString(),
        keywords: this.keywords,
      };
      if (this.sort !== "") {
        payload = {
          ...payload,
          ...this.handleReturnKeySortAndSort(),
        };
      }
      try {
        this.$emit("emitSetLoading", true);
        let res = await api.CAMPAIGN.fetch(payload);
        if (res.status) {
          this.$emit("emitUpdateListCampaign", res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
      this.$emit("emitSetLoading", false);
    },
    handleReturnKeySortAndSort() {
      if (this.sort == "A-Z" || this.sort == "Z-A") {
        if (this.sort == "A-Z") {
          return {
            key_sort: "name",
            sort: "ASC",
          };
        } else {
          return {
            key_sort: "name",
            sort: "DESC",
          };
        }
      } else {
        if (this.sort == "ASC") {
          return {
            key_sort: "created_at",
            sort: "ASC",
          };
        } else {
          return {
            key_sort: "created_at",
            sort: "DESC",
          };
        }
      }
    },
  },
  watch: {
    async sort(value) {
      await this.handleFilterCampaign();
    },
    async status(value) {
      await this.handleFilterCampaign();
    },
  },
};
</script>

<style lang="scss" scoped></style>
