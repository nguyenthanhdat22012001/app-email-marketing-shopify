<!--  EX
 <v-date-range prop_label="Total spent1" @emitVDateRangeRange="(payload) => objData = payload" />
-->

<template>
  <div class="relative">
    <div
      @click="is_open = !is_open"
      class="z-0 inline-flex justify-center gap-x-2.5 cursor-pointer py-2 px-3.5 border border-[#EBEBF0] bg-secondary font-medium text-muted"
    >
      <span>{{ prop_label }}</span>
      <img src="@/assets/icons/caret-down.svg" alt="" />
    </div>
    <div
      v-show="is_open"
      id="dropdown"
      class="z-10 absolute right-0 top-full w-[300px] border border-[#EBEBF0] rounded py-3.5 pl-3 pr-4 bg-secondary"
    >
      <div class="flex gap-2">
        <input
          type="date"
          v-model="date_input.start"
          class="flex-1 w-[104px] px-2.5 py-2 border border-[#EBEBF0] rounded focus:outline-0"
        />
        <input
          type="date"
          v-model="date_input.end"
          class="flex-1 w-[104px] px-2.5 py-2 border border-[#EBEBF0] rounded focus:outline-0"
        />
      </div>
     
      <div class="flex justify-between items-center pt-2.5">
        <v-button variant="primary" @click="handEmitDataChange()">Ok</v-button>
        <a class="cursor-pointer text-primary" @click="onClearInputs()"
          >Clear</a
        >
      </div>
      <div class="hidden"> {{ validateDate }}</div>
    </div>
  </div>
</template>

<script>
import VButton from "@/components/VButton.vue";
import { formatdateYMD } from "@/helper/formatDate.js";

export default {
  components: {
    VButton,
  },
  props: {
    prop_label: {
      type: String,
      default: "",
    },
    date_from:{
      type: String,
      default:""
    },
    date_to:{
      type: String,
      default:""
    }
  },
  data() {
    return {
      is_open: false,
      date_input: {
        start: this.date_from,
        end: this.date_to,
      },
    };
  },
  methods: {
    onClose() {
      this.is_open = false;
    },
    handEmitDataChange() {
      this.$emit("emitVDateRangeRange", this.date_input);
      this.onClose();
    },
    onClearInputs() {
      this.date_input = {
        start: "",
        end: "",
      };
      this.$emit("emitVDateRangeRange", this.date_input);
    },
    handleValidateDate(string_date_start, string_date_end) {
      let today = new Date();
      let date_start = "";
      let date_end = "";

      if (string_date_start !== "") {
        date_start = new Date(string_date_start).getTime();

        if (string_date_start !== "") {
          if (date_start > today.getTime()) {
            this.date_input.start = formatdateYMD();
          }
        }
      }

      if (string_date_end !== "") {
        date_end = new Date(string_date_end).getTime();

        if (string_date_end !== "") {
          if (date_end > today.getTime()) {
            this.date_input.end = formatdateYMD();
          }
        }
      }

      if (string_date_start !== "" && string_date_end !== "") {
        if (date_end < date_start) {
          this.date_input.end = string_date_start;
        }
      }
    },
  },
  computed: {
    validateDate() {
      let string_date_start = this.date_input.start;
      let string_date_end = this.date_input.end;
      this.handleValidateDate(string_date_start, string_date_end);
      return "validate";
    },
  },
  created: function () {
    let self = this;
    window.addEventListener("click", function (e) {
      if (!self.$el.contains(e.target)) {
        self.is_open = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
