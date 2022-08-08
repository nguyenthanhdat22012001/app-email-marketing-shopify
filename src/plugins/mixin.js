import notify from "@/helper/notify"

export default {
    methods: {
        redirect(route) {
            this.$router.push(route)
        },
        toastMessageError(payload) {
            const titleToast = payload?.title || "Error"
            const messageToast = payload?.message || "Something wrong!! Try again"
            notify.showNotify('error', titleToast, messageToast)
        },
        getFullName(firstName, lastName) {
            return `${firstName} ${lastName}`
        }
    }
}