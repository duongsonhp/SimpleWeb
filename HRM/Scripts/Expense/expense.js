$.fn.editable.defaults.mode = 'inline'; 

try {
    let newProduct = {
        id: "",
        product_name: $("#textbox-product-name").val().trim(),
        proposed_price: Number($("#textbox-proposed-price").val().trim()),
        unit_1: "",
        sale_price: Number($("#textbox-sale-price").val().trim()),
        unit_2: "",
        prefix_code: $("#textbox-product-code").val().trim(),
        vendor_tax: $("#textbox-vendor-tax").val().trim(),
        customer_tax: $("#textbox-customer-tax").val().trim()
    }
}
catch {

}

// let filters = [];
let _filter = {
    filterDate: "",
    filterMonth: "",
    filterYear: "",
    filterStatus: "",
    filterDepartment: "",
    filterEmployee: ""
};
let products = [];
let reports = [];
let sourceProducts = [];

$(document).ready(function () {
    let proccessDate = ProccessDate();

    $(".select2-cols").select2({
        maximumSelectionLength: 1
    });
    $(".select2-rows").select2();
    $(".select2-filters").select2();

    $.ajax({
        url: '/Expense/RenderProducts',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'get',
        success: function (response) {
            products = response;

            sourceProducts = $.map(products, (p) => {
                return {
                    value: products.indexOf(p) + 1,
                    text: p.product_name
                }
            })

            $.ajax({
                url: '/Expense/RenderExpenses',
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                type: 'get',
                success: function (response) {
                    $("#table-expense").find("tbody tr").remove();
                    // names = response;
                    $.each(response, (idx, itm) => {
                        $("#table-expense").find("tbody").append(`
                <tr class="updated" data-expenseid="${itm.id}">
                    <th scope="row">${itm.id}</th>
                    <td><a href="#" class="product">${itm.product_name}</a></td>
                    <td><a href="#" class="quantity">${itm.quantity}</a></td>
                    <td><a href="#" class="unit">${itm.unit}</a></td>
                    <td><a href="#" class="expensedate">${itm.expense_date}</a></td>
                    <td class="verify-update"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill btn-save-standard-work-time" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg></td>
                    <td class="verify-delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill btn-remove-standard-work-time" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg></td>
                </tr>
            `);

                        $(`.product`).last().editable({
                            type: 'select',
                            // pk: 1,
                            url: '',
                            title: 'Sản phẩm',
                            value: sourceProducts.filter(s => s.text == itm.product_name)[0],
                            source: sourceProducts
                        });

                        $(`.quantity`).last().editable({
                            type: 'text',
                            // pk: 1,
                            url: '',
                            title: 'Số lượng',
                            value: itm.quantity
                        });

                        $(`.unit`).last().editable({
                            type: 'text',
                            // pk: 1,
                            url: '',
                            title: 'Đơn vị',
                            value: itm.unit
                        });

                        $(`.expensedate`).last().editable({
                            type: 'date',
                            // pk: 1,
                            url: '',
                            title: 'Ngày chi tiêu',
                            value: proccessDate.formatDate(itm.expense_date)
                        });
                    });

                }
            });

            $(".row-product").remove();
            //if (response.length % 3 == 0) {
            //    $(".contain-grid-employee").append('<div class="row-employee"></div>');
            //    let 
            //}
            let numberOfRows = Math.ceil(response.length / 3);
            let floorNumberOfRows = Math.floor(response.length / 3);
            for (let i = 0; i < numberOfRows; ++i) {
                $(".contain-grid-product").append('<div class="row-product d-flex justify-content-between"></div>');
                if (i > floorNumberOfRows - 1) {
                    for (let j = 0; j < response.length % 3; ++j) {
                        $(".row-product").last().append(`
                            <div class="box-product" id="pro-${response[3 * i + j].id}" data-pro='${JSON.stringify(response[3 * i + j])}' data-toggle="modal" data-target="#modal-view-employee">
                                <div class="mix-ava-actions d-flex justity-content-center">
                                    <div class="ava-product"><img src="/Store/Pics/box-avatar.png" class="rounded-circle" width="100" height="100"/></div>
                                    <div class="toolbox-actions">
                                        <div class="tool-remove-product">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="contain-info-product">
                                    <div class="line-info-product product-name">${response[3 * i + j].product_name}</div>
                                    <div class="line-info-product product-prefixcode">${response[3 * i + j].prefix_code}</div>
                                </div>
                            </div>`);
                    }
                } // Nếu đang xét hàng lẻ
                else {
                    for (let j = 0; j < 3; ++j) {
                        $(".row-product").last().append(`
                            <div class="box-product" id="pro-${response[3 * i + j].id}" data-pro='${JSON.stringify(response[3 * i + j])}' data-toggle="modal" data-target="#modal-view-employee">
                                <div class="mix-ava-actions d-flex justity-content-center">
                                    <div class="ava-product"><img src="/Store/Pics/box-avatar.png" class="rounded-circle" width="100" height="100"/></div>
                                    <div class="toolbox-actions">
                                        <div class="tool-remove-product">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="contain-info-product">
                                    <div class="line-info-product product-name">${response[3 * i + j].product_name}</div>
                                    <div class="line-info-product product-prefixcode">${response[3 * i + j].prefix_code}</div>
                                </div>
                            </div>`);
                    }
                } // Nếu đang xét hàng đủ
            }
        }
    });


    $.ajax({
        url: '/Expense/RenderReports',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'get',
        success: function (response) {
            let getValueOfCode = GetValueOfCode();
            reports = response;

            $(".row-product").remove();
            //if (response.length % 3 == 0) {
            //    $(".contain-grid-employee").append('<div class="row-employee"></div>');
            //    let 
            //}
            let numberOfRows = Math.ceil(response.length / 3);
            let floorNumberOfRows = Math.floor(response.length / 3);
            for (let i = 0; i < numberOfRows; ++i) {
                $(".contain-grid-report").append('<div class="row-report d-flex justify-content-between"></div>');
                if (i > floorNumberOfRows - 1) {
                    for (let j = 0; j < response.length % 3; ++j) {
                        $(".row-report").last().append(`
                            <div class="box-report" id="pro-${response[3 * i + j].report_id}" data-report='${JSON.stringify(response[3 * i + j])}' data-toggle="modal" data-target="#modal-view-employee">
                                <div class="mix-ava-actions d-flex justity-content-center">
                                    <div class="ava-report"><img src="/Store/Pics/report-icon-svg.svg" class="rounded-circle" width="100" height="100"/></div>
                                    <div class="toolbox-actions">
                                        <div class="tool-remove-report">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="contain-info-report">
                                    <div class="line-info-product report-name">${response[3 * i + j].report_name}</div>
                                    <div class="line-info-product report-status">${getValueOfCode.getStatusOfExpenseReport(response[3 * i + j].status)}</div>
                                </div>
                            </div>`);
                    }
                } // Nếu đang xét hàng lẻ
                else {
                    for (let j = 0; j < 3; ++j) {
                        $(".row-report").last().append(`
                            <div class="box-report" id="pro-${response[3 * i + j].report_id}" data-report='${JSON.stringify(response[3 * i + j])}' data-toggle="modal" data-target="#modal-view-employee">
                                <div class="mix-ava-actions d-flex justity-content-center">
                                    <div class="ava-report"><img src="/Store/Pics/report-icon-svg.svg" class="rounded-circle" width="100" height="100"/></div>
                                    <div class="toolbox-actions">
                                        <div class="tool-remove-report">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="contain-info-report">
                                    <div class="line-info-product report-name">${response[3 * i + j].report_name}</div>
                                    <div class="line-info-product report-status">${getValueOfCode.getStatusOfExpenseReport(response[3 * i + j].status)}</div>
                                </div>
                            </div>`);
                    }
                } // Nếu đang xét hàng đủ
            }
        }
    });
});

$(document).on("click", "#btn-create-product", (e) => {
    $(".modal").modal("hide");
    $("#modal-create-product").modal('toggle');
})

$(".dropdown-menu").on("click", ".dropdown-item", (e) => {
    $(e.target).siblings().find(".pre-selected").hide();
    $(e.target).find(".pre-selected").show();
    switch ($(e.target).parents(".dropdown").find("button").attr("id")) {
        case "drop-unit1": {
            newProduct.unit_1 = $(e.target).text().trim();
            break;
        }
        case "drop-unit2": {
            newProduct.unit_2 = $(e.target).text().trim();
            break;
        }
        case "drop-modify-unit1": {
            newProduct.unit_1 = $(e.target).text().trim();
            break;
        }
        case "drop-modify-unit2": {
            newProduct.unit_2 = $(e.target).text().trim();
            break;
        }
        default: {
            break;
        }
    }
})

$(document).on("click", "#btn-save-product", (e) => {
    $.extend(newProduct, {
        product_name: $("#textbox-product-name").val().trim(),
        proposed_price: Number($("#textbox-proposed-price").val().trim()),
        sale_price: Number($("#textbox-sale-price").val().trim()),
        prefix_code: $("#textbox-product-code").val().trim(),
        vendor_tax: $("#textbox-vendor-tax").val().trim(),
        customer_tax: $("#textbox-customer-tax").val().trim()
    });

    $.ajax({
        url: '/Expense/SaveProduct',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: {
            newProduct: newProduct
        },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Thêm mới sản phẩm thành công!");
                location.reload();
            }
        }
    });
})

$(document).on("click", ".box-product", (e) => {
    // Đóng các modal không liên quan
    // Mở modal
    // Đổ thông tin
    // Disable control

    $(".modal").modal("hide");
    $("#modal-modify-product").modal("toggle");
    $("#modal-modify-product").attr("data-pro", $(e.currentTarget).attr("data-pro"));

    let data = JSON.parse($(e.currentTarget).attr("data-pro"));
    //$("#textbox-view-lastname").val(data.last_name);
    //$("#textbox-view-lastname").prop("disabled", true);
    //$("#textbox-view-firstname").val(data.first_name);
    //$("#textbox-view-firstname").prop("disabled", true);
    //$("#textbox-view-material").val(data.material_status);
    //$("#textbox-view-material").prop("disabled", true);
    //$("#textbox-view-children").val(data.number_of_children);
    //$("#textbox-view-children").prop("disabled", true);
    //$("#textbox-view-degree").val(data.degree);
    //$("#textbox-view-degree").prop("disabled", true);
    //$("#textbox-view-major").val(data.major);
    //$("#textbox-view-major").prop("disabled", true);
    //$("#textbox-view-college").val(data.college);
    //$("#textbox-view-college").prop("disabled", true);
    //$("#textbox-view-bank").val(data.bank_account);
    //$("#textbox-view-bank").prop("disabled", true);
    //$("#textbox-view-department").val(data.department);
    //$("#textbox-view-department").prop("disabled", true);
    //$("#textbox-view-title").val(data.title);
    //$("#textbox-view-title").prop("disabled", true);
    //$("#textbox-view-manager").val(`${data.manager_id} - ${data.manager}`);
    //$("#textbox-view-manager").prop("disabled", true);
    //$("#textbox-view-time-manager").val(`${data.time_manager_id} - ${data.time_manager}`);
    //$("#textbox-view-time-manager").prop("disabled", true);
    //$("#textbox-view-expense-manager").val(`${data.expense_manager_id} - ${data.expense_manager}`);
    //$("#textbox-view-expense-manager").prop("disabled", true);
    //$("#textbox-view-distance").val(data.distance_from_home);
    //$("#textbox-view-distance").prop("disabled", true);
    //$("#textbox-view-gender").val(data.gender);
    //$("#textbox-view-gender").prop("disabled", true);
    //$("#textbox-view-birth").val(data.birthday);
    //$("#textbox-view-birth").prop("disabled", true);
    //$("#textbox-view-birthwhere").val(data.born_place);
    //$("#textbox-view-birthwhere").prop("disabled", true);
    //$("#textbox-view-phone").val(data.phone);
    //$("#textbox-view-phone").prop("disabled", true);
    //$("#textbox-view-phone-emergency").val(data.emergency_phone);
    //$("#textbox-view-phone-emergency").prop("disabled", true);
    //$("#textbox-view-contact-emergency").val(data.emergency_contact_man);
    //$("#textbox-view-contact-emergency").prop("disabled", true);
    //$("#textbox-view-address").val(data.address);
    //$("#textbox-view-address").prop("disabled", true);
    //$("#textbox-view-mail").val(data.email);
    //$("#textbox-view-mail").prop("disabled", true);
    //$("#textbox-view-identity-card").val(data.identity_citizen_id);
    //$("#textbox-view-identity-card").prop("disabled", true);

    $("#textbox-modify-product-name").val(data.product_name);
    $("#textbox-modify-product-code").val(data.prefix_code);
    $("#textbox-modify-proposed-price").val(data.proposed_price);
    $("#textbox-modify-sale-price").val(data.sale_price);
    $("#textbox-modify-vendor-tax").val(data.vendor_tax);
    $("#textbox-modify-customer-tax").val(data.customer_tax);

    $("#drop-modify-unit1").next(".dropdown-menu").find(".pre-selected").hide();
    let unit1Item = $("#drop-modify-unit1").next(".dropdown-menu").find(".dropdown-item");
    $(unit1Item).each((idx, itm) => {
        if ($(itm).text().trim() == data.unit_1.trim()) {
            $(itm).find(".pre-selected").show();
        }
    });

    $("#drop-modify-unit2").next(".dropdown-menu").find(".pre-selected").hide();
    let unit2Item = $("#drop-modify-unit2").next(".dropdown-menu").find(".dropdown-item");
    $(unit2Item).each((idx, itm) => {
        if ($(itm).text().trim() == data.unit_1.trim()) {
            $(itm).find(".pre-selected").show();
        }
    });
});

$(document).on("click", "#btn-modify-product", (e) => {
    $.extend(newProduct, {
        id: JSON.parse($(e.currentTarget).parents("#modal-modify-product").attr("data-pro")).id,
        proposed_price: Number($("#textbox-modify-proposed-price").val().trim()),
        sale_price: Number($("#textbox-modify-sale-price").val().trim()),
        prefix_code: $("#textbox-modify-product-code").val().trim(),
        vendor_tax: $("#textbox-modify-vendor-tax").val().trim(),
        customer_tax: $("#textbox-modify-customer-tax").val().trim()
    })

    $.ajax({
        url: '/Expense/UpdateProduct',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { newProduct: newProduct },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Cập nhật sản phẩm thành công!");
                $("#modal-modify-product").modal("toggle");
                location.reload();
            }
        }
    });
})

$(document).on("click", ".tool-remove-product", (e) => {
    let id = $(e.currentTarget).parents(".box-product").attr("id").split("-")[1].trim();

    $.ajax({
        url: '/Expense/RemoveProduct',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { proId: id },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Xóa sản phẩm thành công!");
                $("#modal-modify-product").modal("toggle");
                // newEmployee.id = response.new_id;
                // window.allEmps = [newEmployee].concat(window.allEmps);
                // renderEmployees(window.allEmps);
                location.reload();
            }
        }
    });
})

$(document).on("click", ".tool-remove-report", (e) => {
    let id = $(e.currentTarget).parents(".box-report").attr("id").split("-")[1].trim();

    $.ajax({
        url: '/Expense/RemoveReport',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { id: id },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Xóa báo cáo chi phí thành công!");
                $("#modal-modify-report").modal("toggle");
                // newEmployee.id = response.new_id;
                // window.allEmps = [newEmployee].concat(window.allEmps);
                // renderEmployees(window.allEmps);
                location.reload();
            }
        }
    });
})

let newExpense = {};
$("#btn-create-expense").on("click", (e) => {
    //let newId;
    //if ($("#table-expense").find("tbody tr").last().find("th").length > 0)
    //    newId = parseInt($("#table-expense").find("tbody tr").last().find("th").text(), 10) + 1;
    //else
    //    newId = 1;
    $("#table-expense").find("tbody").append(`
        <tr class="created">
            <th scope="row">0</th>
            <td><a href="#" class="product"></a></td>
            <td><a href="#" class="quantity"></a></td>
            <td><a href="#" class="unit"></a></td>
            <td><a href="#" class="expensedate"></a></td>
            <td class="verify-update"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill btn-save-standard-work-time" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg></td>
            <td class="verify-delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill btn-remove-standard-work-time" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg></td>
        </tr>
    `);

    $(`.quantity`).last().editable({
        type: 'text',
        // pk: 1,
        url: '',
        title: 'Số lượng',
        value: '1'
    });

    $(`.unit`).last().editable({
        type: 'text',
        // pk: 1,
        url: '',
        title: 'Đơn vị',
        value: 'Chiếc'
    });

    //$(`#product-${newId}`).editable({
    //    type: 'select',
    //    // pk: 1,
    //    url: '',
    //    title: 'Đơn vị',
    //    value: 1,
    //    source: [
    //        { value: 1, text: 'Giờ' },
    //        { value: 2, text: 'Ngày' },
    //    ]
    //});

    let countSource = 1;
    $(`.product`).last().editable({
        type: 'select',
        // pk: 1,
        url: '',
        title: 'Sản phẩm',
        value: 1,
        source: $.map(products, (p) => {
            countSource++;
            return {
                value: countSource,
                text: p.product_name
            };
        })
    });
    countSource = 1;

    $(`.expensedate`).last().editable({
        type: 'date',
        // pk: 1,
        url: '',
        title: 'Ngày chi tiêu',
        value: '1970-01-01'
    });
})

$(document).on("click", ".verify-update", (e) => {
    $.extend(newExpense, {
        id: $(e.currentTarget).parents("tr").find("th").text().trim(),
        product: $(e.currentTarget).parents("tr").find("td").eq(0).text().trim(),
        quantity: $(e.currentTarget).parents("tr").find("td").eq(1).text().trim(),
        unit: $(e.currentTarget).parents("tr").find("td").eq(2).text().trim(),
        expensedate: $(e.currentTarget).parents("tr").find("td").eq(3).text().trim()
    });

    if ($(e.currentTarget).parents("tr").hasClass("created") == true) {
        $.ajax({
            url: '/Expense/SaveExpense',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: { created: newExpense },
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Thêm mới chi phí thành công!");
                    location.reload();
                }
            }
        });
    }
    else {
        $.ajax({
            url: '/Expense/UpdateExpense',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: { updated: newExpense, id: newExpense.id },
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Cập nhật chi phí thành công!");
                    location.reload();
                }
            }
        });
    }
})

$(document).on("click", ".verify-delete", (e) => {
    let deletedId = $(e.currentTarget).parents("tr").find("th").text().trim();
    $.ajax({
        url: '/Expense/RemoveExpense',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { id: deletedId },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Xóa chi phí thành công!");
                location.reload();
            }
        }
    });
})

$(document).on("click", "#btn-save-report", (e) => {
    let approveMan;
    let payMan;
    let listExpense = [];

    $(".approve").each((idx, itm) => {
        if($(itm).is(":checked") == true)
            approveMan = $(itm).attr("id").trim().split('-')[1];
    });

    $(".pay").each((idx, itm) => {
        if ($(itm).is(":checked") == true)
            payMan = $(itm).attr("id").trim().split('-')[1];
    });

    $(".expense").each((idx, itm) => {
        if ($(itm).is(":checked") == true)
            listExpense.push($(itm).attr("id").trim().split('-')[1]);
    });

    let newReport = {
        report_name: $("#textbox-report-name").val().trim(),
        approve_man_id: approveMan,
        pay_man_id: payMan,
        expenses: listExpense
    }

    $.ajax({
        url: '/Expense/SaveReport',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { newReport: newReport },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Tạo báo cáo chi phí thành công!");
                location.reload();
            }
        }
    });
})

$(document).on("click", "#btn-create-report", (e) => {
    $(".modal").modal("hide");
    $("#modal-create-report").modal("toggle");
})

$(document).on("click", ".box-report", (e) => {
    // Đóng các modal không liên quan
    // Mở modal
    // Đổ thông tin
    // Disable control

    $(".modal").modal("hide");
    $("#modal-modify-report").modal("toggle");
    $("#modal-modify-report").attr("data-report", $(e.currentTarget).attr("data-report"));

    let data = JSON.parse($(e.currentTarget).attr("data-report"));

    $("#textbox-modify-report-name").val(data.report_name);
    $(".approve").prop("checked", false);
    $(`#approve-modify-${data.approve_man_id}`).prop("checked", true);
    $(".pay").prop("checked", false);
    $(`#pay-modify-${data.pay_man_id}`).prop("checked", true);

    $(".expense").prop("checked", false);
    $.each(data.expenses, (idx, itm) => {
        $(`#expense-modify-${itm}`).prop("checked", true);
    });
});

$(document).on("click", "#btn-modify-report", (e) => {
    let data = JSON.parse($(e.currentTarget).parents("#modal-modify-report").attr("data-report"));

    let updated = {
        expenses: []
    };

    $(".approve").each((idx, itm) => {
        if ($(itm).is(":checked") == true) {
            updated.approve_man_id = $(itm).attr("id").split('-')[2];
        }
    });
    $(".pay").each((idx, itm) => {
        if ($(itm).is(":checked") == true) {
            updated.pay_man_id = $(itm).attr("id").split('-')[2];
        }
    });
    $(".expense").each((idx, itm) => {
        if ($(itm).is(":checked") == true) {
            updated.expenses.push($(itm).attr("id").split('-')[2]);
        }
    });

    updated.report_id = data.report_id;

    $.ajax({
        url: '/Expense/UpdateReport',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { updated: updated },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Cập nhật báo cáo chi phí thành công!");
                location.reload();
            }
        }
    });
})

$(document).on("click", ".report-status", (e) => {
    let proccessDate = ProccessDate();

    e.stopPropagation();

    $(".modal").modal("hide");
    $("#modal-change-status").modal("toggle");
    $("#modal-change-status").attr("data-reportid", $(e.currentTarget).parents(".box-report").attr("id").split("-")[1]);

    let data = JSON.parse($(e.currentTarget).parents(".box-report").attr("data-report"));
    $("#modal-change-status").attr("data-currentStatus", Number(data.status));

    $(".checkbox-status").prop("checked", false);
    $(`.checkbox-status[id='checkbox-status-${$("#modal-change-status").attr("data-currentStatus")}']`).prop("checked", true);

    //$("#calendar-conduct-date").val(proccessDate.formatDate(data.interview_date));
    //$("#drop-conduct-employee").next(".dropdown-menu").find(".pre-selected").hide();
    //let conductorItem = $("#drop-conduct-employee").next(".dropdown-menu").find(".dropdown-item");
    //$(conductorItem).each((idx, itm) => {
    //    if ($(itm).text().trim().split(' ')[0] == `${data.interviewer_id}`) {
    //        $(itm).find(".pre-selected").show();
    //    }
    //});
})

$(document).on("click", "#btn-save-change-status", (e) => {
    let id = $("#modal-change-status").attr("data-reportid");
    let status = 0;
    $(".checkbox-status").each((idx, itm) => {
        if ($(itm).is(":checked") == true) {
            status = Number($(itm).attr("id").split("-")[2]);
        }
    })

    $.ajax({
        url: '/Expense/UpdateReportStatus',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { id: id, status: status },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Cập nhật trạng thái báo cáo thành công!");
                location.reload();
            }
        }
    });
})

$(document).on("click", ".select2-selection__choice", (e) => {
    if ($(e.currentTarget).parents(".section-filter").length > 0) {
        if ($(e.currentTarget).attr("title") == "Ngày") {
            $(".modal").modal("hide");
            $("#modal-filter-date").modal("toggle");
        }
        else if ($(e.currentTarget).attr("title") == "Tháng") {
            $(".modal").modal("hide");
            $("#modal-filter-month").modal("toggle");
        }
        else if ($(e.currentTarget).attr("title") == "Năm") {
            $(".modal").modal("hide");
            $("#modal-filter-year").modal("toggle");
        }
        else if ($(e.currentTarget).attr("title") == "Trạng thái") {
            $(".modal").modal("hide");
            $("#modal-filter-status").modal("toggle");
        }
        else if ($(e.currentTarget).attr("title") == "Phòng ban") {
            $(".modal").modal("hide");
            $("#modal-filter-department").modal("toggle");
        }
        else if ($(e.currentTarget).attr("title") == "Nhân viên") {
            $(".modal").modal("hide");
            $("#modal-filter-employee").modal("toggle");
        }
    }
})

$(document).on("click", "#btn-save-filter-month", (e) => {
    // filters = filters.filter(f => f != "Tháng");
    if ($("#calendar-before-month").val() != null && $("#calendar-after-month").val()) {
        // filters.push(`ConvertDateToMonth(t4.expense_date) >= '${$("#calendar-before-month").val()}' and ConvertDateToMonth(t4.expense_date) <= '${$("#calendar-after-month").val()}'`);
        _filter.filterMonth = `ConvertDateToMonth(t4.expense_date) >= '${$("#calendar-before-month").val()}' and ConvertDateToMonth(t4.expense_date) <= '${$("#calendar-after-month").val()}'`;
    }
    else if ($("#calendar-select-month").val() != null) {
        // filters.push(`ConvertDateToMonth(t4.expense_date) = '${$("#calendar-select-month").val()}'`);
        _filter.filterMonth = `ConvertDateToMonth(t4.expense_date) = '${$("#calendar-select-month").val()}'`;
    }
    else {
        // filters.push("1 = 1");
        _filter.filterMonth = "1 = 1";
    }

    $(".modal").modal("hide");
})

$(document).on("click", "#btn-save-filter-year", (e) => {
    // filters = filters.filter(f => f != "Năm");
    if ($("#calendar-before-year").val() != null && $("#calendar-after-year").val()) {
        // filters.push(`ConvertDateToYear(t4.expense_date) >= '${$("#calendar-before-year").val()}' and ConvertDateToYear(t4.expense_date) <= '${$("#calendar-after-year").val()}'`);
        _filter.filterYear = `ConvertDateToYear(t4.expense_date) >= '${$("#calendar-before-year").val()}' and ConvertDateToYear(t4.expense_date) <= '${$("#calendar-after-year").val()}'`;
    }
    else if ($("#calendar-select-year").val() != null) {
        // filters.push(`ConvertDateToYear(t4.expense_date) = '${$("#calendar-select-year").val()}'`);
        _filter.filterYear = `ConvertDateToYear(t4.expense_date) = '${$("#calendar-select-year").val()}'`;
    }
    else {
        // filters.push("1 = 1");
        _filter.filterYear = "1 = 1";
    }

    $(".modal").modal("hide");
})

$(document).on("click", "#btn-save-filter-date", (e) => {
    // filters = filters.filter(f => f != "Ngày");
    if ($("#calendar-before-date").val() != null && $("#calendar-after-date").val()) {
        // filters.push(`t4.expense_date >= '${$("#calendar-before-date").val()}' and t4.expense_date <= '${$("#calendar-after-date").val()}'`);
        _filter.filterDate = `t4.expense_date >= '${$("#calendar-before-date").val()}' and t4.expense_date <= '${$("#calendar-after-date").val()}'`;
    }
    else if ($("#calendar-select-date").val() != null) {
        // filters.push(`t4.expense_date = '${$("#calendar-select-date").val()}'`);
        _filter.filterDate = `t4.expense_date = '${$("#calendar-select-date").val()}'`;
    }
    else {
        // filters.push("1 = 1");
        _filter.filterDate = "1 = 1";
    }

    $(".modal").modal("hide");
})

$(document).on("click", "#btn-save-filter-status", (e) => {
    // filters = filters.filter(f => f != "Trạng thái");
    let statuses = [];
    $(".checkbox-status").each((idx, itm) => {
        if($(itm).is(":checked"))
            statuses.push(`t1.status = ${Number($(itm).attr("id").split("-")[2])}`);
    });

    if (statuses.length != 0) {
        _filter.filterStatus = `(${statuses.join(" or ")})`;
    }
    else {
        // filters.push("1 = 1");
        _filter.filterStatus = "1 = 1";
    }

    $(".modal").modal("hide");
})

$(document).on("click", "#btn-save-filter-department", (e) => {
    // filters = filters.filter(f => f != "Phòng ban");
    let depts = [];
    $(".filter-department").each((idx, itm) => {
        if ($(itm).is(":checked"))
            depts.push(`t3.department_id = '${$(itm).attr("id").substring(18)}'`);
    });

    if (depts.length != 0) {
        // filters.push(depts.join(" and "));
        _filter.filterDepartment = `(${depts.join(" or ")})`;
    }
    else {
        // filters.push("1 = 1");
        _filter.filterDepartment = "1 = 1";
    }

    $(".modal").modal("hide");
})

$(document).on("click", "#btn-save-filter-employee", (e) => {
    // filters = filters.filter(f => f != "Nhân viên");
    let emps = [];
    $(".filter-employee").each((idx, itm) => {
        if ($(itm).is(":checked"))
            emps.push(`t2.id = '${$(itm).attr("id").substring(16)}'`);
    });

    if (emps.length != 0) {
        // filters.push(emps.join(" and "));
        _filter.filterEmployee = `(${emps.join(" or ")})`;
    }
    else {
        // filters.push("1 = 1");
        _filter.filterEmployee = "1 = 1";
    }

    $(".modal").modal("hide");
})

//$(document).on("click", ".btn-save-filter", (e) => {
//    $(".modal").modal("hide");
//})

$(document).on("click", "#btn-analysis", (e) => {
    let getValueOfCode = GetValueOfCode();
    let col;
    let rows = [];
    let filters = [];

    col = $(".section-col").find(".select2-selection__choice").attr("title");
    $(".section-row").find(".select2-selection__choice").each((idx, itm) => {
        rows.push($(itm).attr("title"));
    })
    $(".section-filter").find(".select2-selection__choice").each((idx, itm) => {
        // filters.push($(itm).attr("title"));
        if ($(itm).attr("title") == "Ngày") {
            filters.push({
                name: "Ngày",
                condition: _filter.filterDate
            });
        }
        else if ($(itm).attr("title") == "Tháng") {
            filters.push({
                name: "Tháng",
                condition: _filter.filterMonth
            });
        }
        else if ($(itm).attr("title") == "Năm") {
            filters.push({
                name: "Năm",
                condition: _filter.filterYear
            });
        }
        else if ($(itm).attr("title") == "Trạng thái") {
            filters.push({
                name: "Trạng thái",
                condition: _filter.filterStatus
            });
        }
        else if ($(itm).attr("title") == "Phòng ban") {
            filters.push({
                name: "Phòng ban",
                condition: _filter.filterDepartment
            });
        }
        else if ($(itm).attr("title") == "Nhân viên") {
            filters.push({
                name: "Nhân viên",
                condition: _filter.filterEmployee
            });
        }
    })

    $.ajax({
        url: '/Expense/AnalysisExpense',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { col: col, rows: rows, filters: filters },
        type: 'post',
        success: function (response) {
            if (response != null) {
                if (response !== "") {
                    if (response.length != 0) {
                        // alert("Cập nhật trạng thái báo cáo thành công!");
                        $.each(response, (idx, itm) => {
                            response[idx] = JSON.parse(itm);
                        })

                        $("#area-show-chart").children().remove();
                        Highcharts.chart('area-show-chart', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Phân tích chi phí'
                            },
                            subtitle: {
                                text: 'HRM - Human Resource Management'
                            },
                            xAxis: {
                                categories: $.map(response, (re) => {
                                    if (col != "Trạng thái")
                                        return re[getValueOfCode.getNameOfCol(col)];
                                    else
                                        return getValueOfCode.getStatusOfExpenseReport(re[getValueOfCode.getNameOfCol(col)])
                                }),
                                crosshair: true
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Tổng phí (đồng)'
                                }
                            },
                            tooltip: {
                                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                    '<td style="padding:0"><b>{point.y:.1f} (đồng)</b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                }
                            },
                            series: [{
                                name: 'Tổng phí',
                                data: $.map(response, (re) => {
                                    return Number(re["total_value"]);
                                })

                            }]
                        });
                        // location.reload();
                    }
                }
                else {
                    $("#area-show-chart").children().remove();
                }
            }
            else {
                $("#area-show-chart").children().remove();
            }
        }
    });


})