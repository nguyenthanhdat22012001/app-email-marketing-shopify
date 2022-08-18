<template>
  <v-modal v-model="visible">
    <div class="w-[400px] h-[200px] p-6 flex flex-col gap-2">
      <h1 class="font-medium text-lg"><slot name="title">Message</slot></h1>
      <slot name="message"></slot>
      <div class="flex justify-end gap-2 mt-auto items-end">
        <v-button variant="secondary" @click="visible = false">Cancel</v-button>
        <v-button @click="handleExportCSV">Confirm</v-button>
      </div>
    </div>
  </v-modal>
</template>

<script>
import VModal from "@/components/VModal.vue";
import VButton from "@/components/VButton.vue";
import notify from "@/helper/notify";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    VModal,
    VButton,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    exportAll: {
      type: Boolean,
    },
  },

  methods: {
    ...mapActions({
      exportCSV: "customerStore/exportCSV",
    }),
    handleExportCSV() {
      try {
        if (this.exportAll) {
          this.exportCSV({
            shop: this.user.domain,
          }).then((res) => {
            notify.showNotify("success", "Success", res.message);
          });
        } else {
          this.exportCSV({
            shop: this.user.domain,
            list_customer: this.selectedCustomers,
          }).then((res) => {
            notify.showNotify("success", "Success", res.message);
          });
        }
      } catch (error) {
        notify.showNotify("error", "Error", error.message);
      }

      this.visible = false;
    },
  },
  computed: {
    ...mapGetters({
      selectedCustomers: "customerStore/getSelectedCustomers",
      user: "auth/getUser",
    }),
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
