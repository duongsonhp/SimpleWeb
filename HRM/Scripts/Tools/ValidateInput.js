function ValidateInput() {
    return {
        validateInt: function (value) {
            value = value.trim();
            return (!/\D/gi.test(value) && value[0] != '0') || value == "0";
        },
        validateIntWithLimit: function (value, low, high) {
            low = Number(low);
            high = Number(high);
            value = value.trim();
            if (this.validateInt(value) == true) {
                value = Number(value);
                if (value >= low && value <= high) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        },
        validateIntWithLowLimit: function (value, low) {
            low = Number(low);
            value = value.trim();
            if (this.validateInt(value) == true) {
                value = Number(value);
                if (value >= low) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        },
        validateIntWithHighLimit: function (value, high) {
            high = Number(high);
            value = value.trim();
            if (this.validateInt(value) == true) {
                value = Number(value);
                if (value <= high) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        },
        validateNumber: function (value) {
            value = value.trim();
            if (isNaN(value) == true)
                return false;
            else
                return true;
        },
        validateNumberWithLimit: function (value, low, high) {
            low = Number(low);
            high = Number(high);
            value = value.trim();
            if (isNaN(value) == true) {
                return false;
            }
            else {
                value = Number(value);
                if (value >= low && value <= high)
                    return true;
                else
                    return false;
            }
        },
        validateNumberWithLowLimit: function (value, low) {
            low = Number(low);
            value = value.trim();
            if (isNaN(value) == true) {
                return false;
            }
            else {
                value = Number(value);
                if (value >= low)
                    return true;
                else
                    return false;
            }
        },
        validateNumberWithHighLimit: function (value, high) {
            high = Number(high);
            value = value.trim();
            if (isNaN(value) == true) {
                return false;
            }
            else {
                value = Number(value);
                if (value <= high)
                    return true;
                else
                    return false;
            }
        },
        validateId: function (value) {
            value = value.trim();
            if (/\D/gi.test(value) == true)
                return false;
            else {
                return true;
            }
        },
        validateIdLimit: function (value, max) {
            value = value.trim();
            if (/\D/gi.test(value) == true)
                return false;
            else {
                if (value.length > max)
                    return false;
                else
                    return true;
            }
        },
        validatePhone: function (value) {
            value = value.trim();
            if (/\D/gi.test(value) == true)
                return false;
            else {
                if (value[0] != '0')
                    return false;
                else
                    return true;
            }
        },
        validateEmail: function (value) {
            value = value.trim();
            let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return pattern.test(value);
        },
        validateStringLength: function (value, max) {
            value = value.trim();
            if (value.length > max)
                return false;
            else
                return true;
        },
        validateNotEmpty: function (value) {
            value = value.trim();
            if (value === "")
                return false;
            else
                return true;
        }
    }
}