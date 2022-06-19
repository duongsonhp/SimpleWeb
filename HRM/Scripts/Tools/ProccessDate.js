function ProccessDate() {
    return {
        formatDate: function (value) {
            value = value.trim();
            let date = value.match(/\d+/gi);
            if (date[0].length == 1)
                date[0] = `0${date[0]}`;
            if (date[1].length == 1)
                date[1] = `0${date[1]}`;
            return `${date[2]}-${date[0]}-${date[1]}`;
        }
    };
}