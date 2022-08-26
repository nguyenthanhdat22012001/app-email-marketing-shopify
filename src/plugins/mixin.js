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
        },
        convertDateTime(date) {
            const newDate = new Date(date);
            if (newDate instanceof Date && !isNaN(newDate.valueOf())) {
                const monthConvert = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
                const day = newDate.getDate();
                const month = newDate.getMonth();
                const year = newDate.getFullYear();
                return `${monthConvert[month]} ${day}, ${year}`
            }
            return "Invalid Date"
        }
    }
}