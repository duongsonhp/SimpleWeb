function ProccessUrl() {
    return {
        getParam: function (url) {
            var vars = {};
            var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
            return vars;
        },
        getLastPartition: function (url) {
            var partitions = url.split('/');
            return partitions.slice(-1)[0].trim();
        }
    };
}