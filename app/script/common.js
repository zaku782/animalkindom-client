function fill0(number) {
    return number < 10 ? "0" + number : number
}

export default {
    getFormattedDate: function(date) {
        return date.getFullYear() + "-" + fill0(date.getMonth() + 1) + "-" + fill0(date.getDate())
    }
}
