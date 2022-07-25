<!--  EX
<v-avatar prop_string_name="nguyen dat"></v-avatar>
    -->

<template>
  <div class="inline-flex w-8 h-8 items-center justify-center rounded-full bg-gray-light text-[13px] font-medium text-muted">
    {{stringAvatar(prop_string_name)}}
  </div>
</template>
<script>
export default {
  props: {
    prop_string_name: {
      type: String,
      default: "",
    },
  },
  methods:{
    stringAvatar(string_name){
        let name = string_name.toLocaleUpperCase();
        let arr_name = name.split(' ');

        if(arr_name.length > 1){
            return `${arr_name[0][0]}${arr_name[1][0]}`
        }else{
            return `${arr_name[0][0]}`
        }
    }
  },
};
</script>

<style lang="scss" scoped></style>
