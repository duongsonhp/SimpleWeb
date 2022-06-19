function GenRandom() {
    return {
        genId: function (length) {
            let result = [];
            for (let i = 0; i < length; ++i) {
                result.push(String(this.getRandomInt(10)));
            }

            return result.join("");
        },
        getRandomInt: function(max) {
            return Math.floor(Math.random() * max);
        }
    };
}