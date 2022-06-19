function GetValueOfCode() {
    return {
        getApplicantStatus: function (code) {
            if (code == 0)
                return "Chưa tiếp nhận";
            else if (code == 1)
                return "Vào vòng phỏng vấn 1";
            else if (code == 2)
                return "Vào vòng phỏng vấn 2";
            else if (code == 3)
                return "Đàm phán hợp đồng";
            else if (code == 4)
                return "Kí kết hợp đồng";
            else if (code == 5)
                return "Bị loại";
        },
        getColorOfApplicationStatus: function (code) {
            if (code == 0)
                return "white";
            else if (code == 1)
                return "#dd96eb";
            else if (code == 2)
                return "#dbf549";
            else if (code == 3)
                return "#2b99c4";
            else if (code == 4)
                return "#24f2ae";
            else if (code == 5)
                return "#ed4e09";
        },
        getStatusOfExpenseReport: function (code) {
            if (code == 0)
                return "Đã chuyển duyệt";
            else if (code == 1)
                return "Duyệt";
            else if (code == 2)
                return "Chấp nhận thanh toán";
            else if (code == 3)
                return "Đã thanh toán";
            else if (code == 4)
                return "Từ chối duyệt";
            else if (code == 5)
                return "Từ chối thanh toán";
        },
        getNameOfCol: function (code) {
            if (code == "Ngày")
                return "expense_date";
            else if (code == "Tháng")
                return "expense_month";
            else if (code == "Năm")
                return "expense_year";
            else if (code == "Trạng thái")
                return "status";
            else if (code == "Phòng ban")
                return "department_name";
            else if (code == "Nhân viên")
                return "account";
        },
        getPayrollMethod: function (code) {
            if (code == "1")
                return "Theo thời gian";
            else if (code == "2")
                return "Theo sản phẩm";
            else if (code == "3")
                return "Theo khoán";
        },
        getPayrollPeriod: function (code) {
            if (code == "1")
                return "Sau nửa tháng";
            else if (code == "2")
                return "Sau 1 tháng";
            else if (code == "3")
                return "Sau 1 tuần";
            else if (code == "4")
                return "Sau 1 ngày";
        }
    };
}