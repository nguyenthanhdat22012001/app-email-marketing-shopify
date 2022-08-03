export default {
    methods: {
        redirect(route) {
            this.$router.push(route)
        },
        toastMessage() {

        },
        getFullName(firstName,lastName){
            return `${firstName} ${lastName}`
        }
    }
}