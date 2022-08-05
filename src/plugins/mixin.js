import notify from "@/helper/notify"

export default {
    methods: {
        redirect(route) {
            this.$router.push(route)
        },
        toastMessageError() {
            const { title = 'Error', message = "Something wrong!! Try again" } = arguments[0]
            notify.showNotify('error', title, message)
        },
        getFullName(firstName, lastName) {
            return `${firstName} ${lastName}`
        }
    }
}