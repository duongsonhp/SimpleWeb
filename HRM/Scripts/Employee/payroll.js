$("#btn-calculate-payroll").on("click", (e) => {
    let employeeId;
    var completeEmployeeName;
    $(".select-employee .dropdown-item").each((idx, itm) => {
        if ($(itm).find("input").is(":checked") == true) {
            employeeId = $(itm).find("input").attr("id").split('-')[1].trim();
            completeEmployeeName = $(itm).find("label").text().trim();
        }
    });
    let payrollPeriod = $("#calendar-payroll-period").val();
    let prePayrollPeriod = $("#calendar-pre-payroll-period").val();

    $.ajax({
        url: '/Employee/GetPayrollInformation',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { employeeId: employeeId, payrollPeriod: payrollPeriod, prePayrollPeriod: prePayrollPeriod },
        type: 'post',
        success: function (response) {
            let getCodeTool = GetValueOfCode();
            if (response) {
                // alert("Xóa nhân viên thành công!");
                // $("#modal-modify-employee").modal("toggle");
                // newEmployee.id = response.new_id;
                // window.allEmps = [newEmployee].concat(window.allEmps);
                // renderEmployees(window.allEmps);
                let educateExtra = 0;
                if (response.require_educate == true) {
                    educateExtra = 0.07 * response.require_wage;
                }

                let productHtml = '';
                $.each(response.listProducts, (idx, itm) => {
                    productHtml += `
                        <tr class="quantity-${itm.id} hide by-product">
                            <td>Sản phẩm ${itm.name}</td>
                            <td><span class="quantity">${itm.quantity}</span> * <span class="price">${itm.value}</span> = <span class="result">${itm.value * itm.quantity}</span></td>
                        </tr>
                    `;
                })

                $(".table-payroll").find("table").remove();
                $(".table-payroll").append(`
                    <table class="table table-bordered">
                        <thead>
                            <tr class="employee-info">
                                <th colspan="2">${completeEmployeeName}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="payroll-method">
                                <td>Hình thức trả lương</td>
                                <td>${getCodeTool.getPayrollMethod(response.payroll_type)}</td>
                            </tr>
                            <tr class="payroll-period">
                                <td>Kì trả lương</td>
                                <td>${getCodeTool.getPayrollPeriod(response.period_type)}</td>
                            </tr>
                            <tr class="require-way">
                                <td>Lương thỏa thuận</td>
                                <td>${response.require_wage}</td>
                            </tr>
                            <tr class="educate-bonus">
                                <td>Phụ cấp đào tạo</td>
                                <td>${educateExtra}</td>
                            </tr>
                            <tr class="area-wage">
                                <td>Lương vùng</td>
                                <td>4420000</td>
                            </tr>
                            <tr class="not-allowed-absence hide by-time">
                                <td>Nghỉ không phép</td>
                                <td>${response.absences}</td>
                            </tr>
                            <tr class="normal-extra hide by-time">
                                <td>Làm thêm vào ngày thường</td>
                                <td>${response.normalExtraHours}</td>
                            </tr>
                            <tr class="weekend-extra hide by-time">
                                <td>Làm thêm vào ngày cuối tuần</td>
                                <td>${response.weekendExtraHours}</td>
                            </tr>
                            <tr class="holiday-extra hide by-time">
                                <td>Làm thêm vào ngày lễ tết</td>
                                <td>${response.holidayExtraHours}</td>
                            </tr>
                            ${productHtml}
                            <tr class="restrict hide by-restrict">
                                <td>Khoán</td>
                                <td>${response.restrict_product}</td>
                            </tr>
                            <tr class="restrict-complete hide by-restrict">
                                <td>Sản phẩm khoán hoàn thành</td>
                                <td>${response.completed_restrict_product}</td>
                            </tr>
                            <tr class="total-payroll">
                                <td>Thực nhận</td>
                                <td>${response.total}</td>
                            </tr>
                        </tbody>
                    </table>
                `);

                if (response.payroll_type == 1) {
                    $(".by-time").removeClass("hide");
                }
                else if (response.payroll_type == 2) {
                    $(".by-product").removeClass("hide");
                }
                else {
                    $(".by-restrict").removeClass("hide");
                }

                // location.reload();
            }
        }
    });
})