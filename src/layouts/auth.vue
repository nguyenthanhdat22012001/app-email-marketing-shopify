<template>
    <div class="auth-layout relative max-w-[1400px] my-0 mx-auto">
        <img src="@/assets/images/bg-auth.png" class="absolute top-0 right-0" alt="">
        <img src="@/assets/icons/logo-auth.svg" class="absolute top-8 left-8" alt="">
        <img src="@/assets/icons/art-work.svg" class="absolute top-[188px] right-[125px]" alt="">
        <div class="w-[450px] absolute top-[345px] left-[139px]">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>