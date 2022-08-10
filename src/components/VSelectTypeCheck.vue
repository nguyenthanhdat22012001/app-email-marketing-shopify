<!--  EX
 --------- # default ------------- 
    <v-select-type-check
      prop_label="Status"
      @emitClearForm="check_list = []"
    >
      <v-checkbox
        prop_label="Completed"
        prop_input_value="Completed"
        v-model="check_list"
      ></v-checkbox>
    </v-select-type-check>
 --------- # Sort ------------- 
  <v-select-type-check
      prop_icon="sort"
      prop_label="Sort"
      @emitClearForm="sort = ''"
    >
       <v-input-radio
        prop_label="Campaign name (A-Z)"
        prop_input_value="Campaign name (A-Z)"
        v-model="sort"
      ></v-input-radio>
    </v-select-type-check>
-->

<template>
  <div class="relative">
    <div
      @click="is_open = !is_open"
      class="z-0 inline-flex justify-center gap-x-2.5 cursor-pointer py-2 px-3.5 border border-[#EBEBF0] bg-secondary font-medium text-muted"
    >
      <template v-if="prop_icon == 'sort'">
        <img src="@/assets/icons/sort.svg" alt="" />
      </template>
      <span>{{ prop_label }}</span>
      <template v-if="prop_icon == 'default'">
        <img src="@/assets/icons/caret-down.svg" alt="" />
      </template>
    </div>
    <div
      v-show="is_open"
      id="dropdown"
      class="z-10 absolute right-0 top-full w-[244px] border border-[#EBEBF0] rounded py-3.5 pl-3 pr-4 bg-secondary shadow-notify"
    >
      <div class="flex flex-col gap-y-3.5">
        <slot></slot>
      </div>
      <div class="flex justify-between items-center pt-2.5">
        <a class="cursor-pointer text-primary" @click="onClearInputs()"
          >Clear</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    prop_label: {
      type: String,
      default: "",
    },
    prop_icon: {
      type: String,
      default: "default",
    },
  },
  data() {
    return {
      is_open: false,
    };
  },
  methods: {
    onClearInputs() {
      this.$emit("emitClearForm");
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

<style lang="scss" scoped></style>
