import notify from "@/helper/notify"

export default {
    methods: {
        redirect(route) {
            this.$router.push(route)
        },
        toastMessageError(title = "Error", message = "Something wrong!! Try again") {
            notify.showNotify('error', title, message)
        },
        getFullName(firstName, lastName) {
            return `${firstName} ${lastName}`
        }
    }
}