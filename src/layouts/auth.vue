<template>
    <div class="auth-layout relative w-[100vw] h-[100vh] overflow-hidden my-0 mx-auto bg-gray-light">
        <img src="@/assets/images/bg-auth.png" class="absolute top-0 right-0" alt="">
        <img src="@/assets/icons/logo-auth.svg" class="absolute top-8 left-8" alt="">
        <div class="absolute top-[19.5%] right-[8.7%] text-center text-white">
            <img src="@/assets/icons/art-work.svg"  alt="">
            <h4 class="font-bold text-[32px] mb-2 mt-5">Welcome back</h4>
            <p class="text-[18px]">Shopify customer management system</p>
        </div>
       
        <div class="w-[450px] absolute top-[36%] left-[9.7%]">
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