let departments = [];
let titles = [];
let names = [];
let newEmployee = {};
let standardWorkTimes = [];

$(document).ready(function () {
    newEmployee = {
        last_name: $("#textbox-lastname").val(),
        first_name: $("#textbox-firstname").val(),
        material_status: "Độc thân",
        number_of_children: $("#textbox-children").val(),
        degree: "Cử nhân",
        major: $("#textbox-major").val(),
        college: $("#textbox-college").val(),
        bank_account: $("#textbox-bank").val(),
        department: $("#drop-department").next(".dropdown-menu").find(".dropdown-item").eq(0).text(),
        title: $("#drop-title").next(".dropdown-menu").find(".dropdown-item").eq(0).text(),
        manager: $("#drop-manager").next(".dropdown-menu").find(".dropdown-item").eq(0).text(),
        time_manager: $("#drop-time-manager").next(".dropdown-menu").find(".dropdown-item").eq(0).text(),
        expense_manager: $("#drop-expense-manager").next(".dropdown-menu").find(".dropdown-item").eq(0).text(),
        distance_from_home: $("#textbox-distance").val(),
        unit: "m",
        gender: "Nam",
        birthday: $("#calendar-birth").val(),
        born_place: $("#textbox-birthwhere").val(),
        phone: $("#textbox-phone").val(),
        emergency_phone: $("#textbox-phone-emergency").val(),
        emergency_contact_man: $("#textbox-contact-emergency").val(),
        address: $("#textbox-address").val(),
        email: $("#textbox-mail").val(),
        identity_citizen_id: $("#textbox-identity-card").val(),
        standard_work_time: [
            {
                standard_work_time: "26 Ngày/Tháng",
                month: 1
            },
            {
                standard_work_time: "24 Ngày/Tháng",
                month: 2
            },
            {
                standard_work_time: "26 Ngày/Tháng",
                month: 3
            },
            {
                standard_work_time: "26 Ngày/Tháng",
                month: 4
            },
            {
                standard_work_time: "26 Ngày/Tháng",
                month: 5
            },
            {
                standard_work_time: "26 Ngày/Tháng",
                month: 6
            },
            {
                standard_work_time: "26 Ngày/Tháng",
                month: 7
            },
            {
                standard_work_time: "26 Ngày/Tháng",
                month: 8
            },
            {
                standard_work_time: "26 Ngày/Tháng",
                month: 9
            },
            {
                standard_work_time: "26 Ngày/Tháng",
                month: 10
            },
            {
                standard_work_time: "26 Ngày/Tháng",
                month: 11
            },
            {
                standard_work_time: "12 Ngày/Tháng",
                month: 12
            }
        ]
    };

    $.ajax({
        url: 'Employee/RenderListDepartments',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'get',
        success: function (response) {
            departments = response;
        }
    });

    $.ajax({
        url: 'Employee/RenderListTitles',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'get',
        success: function (response) {
            titles = response;
        }
    });

    $.ajax({
        url: 'Employee/RenderListEmployees',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'get',
        success: function (response) {
            names = response;
        }
    });

    $.ajax({
        url: 'Employee/GetEmployees',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'get',
        data: {
            offset: 0,
            amount: 12,
            departmentId: ""
        },
        success: function (response) {
            renderEmployees(response);
        }
    });

    $.ajax({
        url: '/StandardWorkTime/RenderListStandardWorkTime',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'get',
        success: function (response) {
            $.each(response, (idx, itm) => {
                standardWorkTimes.push({
                    value: idx + 1,
                    text: `${itm.amount_time} ${itm.unit}/${itm.period}`
                });
            });
        }
    });
});

$(document).on("click", ".box-employee", (e) => {
    // Đóng các modal không liên quan
    // Mở modal
    // Đổ thông tin
    // Disable control

    $(".modal").modal("hide");
    $("#modal-view-employee").modal("toggle");
    $("#modal-view-employee").attr("data-emp", $(e.currentTarget).attr("data-emp"));

    let data = JSON.parse($(e.currentTarget).attr("data-emp"));
    $("#textbox-view-lastname").val(data.last_name);
    $("#textbox-view-lastname").prop("disabled", true);
    $("#textbox-view-firstname").val(data.first_name);
    $("#textbox-view-firstname").prop("disabled", true);
    $("#textbox-view-material").val(data.material_status);
    $("#textbox-view-material").prop("disabled", true);
    $("#textbox-view-children").val(data.number_of_children);
    $("#textbox-view-children").prop("disabled", true);
    $("#textbox-view-degree").val(data.degree);
    $("#textbox-view-degree").prop("disabled", true);
    $("#textbox-view-major").val(data.major);
    $("#textbox-view-major").prop("disabled", true);
    $("#textbox-view-college").val(data.college);
    $("#textbox-view-college").prop("disabled", true);
    $("#textbox-view-bank").val(data.bank_account);
    $("#textbox-view-bank").prop("disabled", true);
    $("#textbox-view-department").val(data.department);
    $("#textbox-view-department").prop("disabled", true);
    $("#textbox-view-title").val(data.title);
    $("#textbox-view-title").prop("disabled", true);
    $("#textbox-view-manager").val(`${data.manager_id} - ${data.manager}`);
    $("#textbox-view-manager").prop("disabled", true);
    $("#textbox-view-time-manager").val(`${data.time_manager_id} - ${data.time_manager}`);
    $("#textbox-view-time-manager").prop("disabled", true);
    $("#textbox-view-expense-manager").val(`${data.expense_manager_id} - ${data.expense_manager}`);
    $("#textbox-view-expense-manager").prop("disabled", true);
    $("#textbox-view-distance").val(data.distance_from_home);
    $("#textbox-view-distance").prop("disabled", true);
    $("#textbox-view-gender").val(data.gender);
    $("#textbox-view-gender").prop("disabled", true);
    $("#textbox-view-birth").val(data.birthday);
    $("#textbox-view-birth").prop("disabled", true);
    $("#textbox-view-birthwhere").val(data.born_place);
    $("#textbox-view-birthwhere").prop("disabled", true);
    $("#textbox-view-phone").val(data.phone);
    $("#textbox-view-phone").prop("disabled", true);
    $("#textbox-view-phone-emergency").val(data.emergency_phone);
    $("#textbox-view-phone-emergency").prop("disabled", true);
    $("#textbox-view-contact-emergency").val(data.emergency_contact_man);
    $("#textbox-view-contact-emergency").prop("disabled", true);
    $("#textbox-view-address").val(data.address);
    $("#textbox-view-address").prop("disabled", true);
    $("#textbox-view-mail").val(data.email);
    $("#textbox-view-mail").prop("disabled", true);
    $("#textbox-view-identity-card").val(data.identity_citizen_id);
    $("#textbox-view-identity-card").prop("disabled", true);
});

$(document).on("click", "#btn-modify-employee", (e) => {
    let proccessDate = ProccessDate();

    $(".modal").modal("hide");
    $("#modal-modify-employee").modal("toggle");

    $("#drop-modify-department").next(".dropdown-menu").find(".dropdown-item").remove();
    for (let i = 0; i < departments.length; ++i) {
        $("#drop-modify-department").next(".dropdown-menu").append(`<div class="dropdown-item"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${departments[i].department_name}</div>`);
    }

    $("#drop-modify-title").next(".dropdown-menu").find(".dropdown-item").remove();
    for (let i = 0; i < titles.length; ++i) {
        $("#drop-modify-title").next(".dropdown-menu").append(`<div class="dropdown-item"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${titles[i].title_name}</div>`);
    }

    $(".drop-employee").next(".dropdown-menu").find(".dropdown-item").remove();
    for (let i = 0; i < names.length; ++i) {
        $(".drop-employee").next(".dropdown-menu").append(`<div class="dropdown-item"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${names[i].id} - ${names[i].last_name} ${names[i].first_name}</div>`);
    }

    let data = JSON.parse($(e.target).parents(".modal").eq(0).attr("data-emp"));

    $("#modal-modify-employee").attr("data-emp-id", data.id);
    $("#textbox-modify-lastname").val(data.last_name);
    $("#textbox-modify-firstname").val(data.first_name);

    $("#drop-modify-martial").next(".dropdown-menu").find(".pre-selected").hide();
    let materialItem = $("#drop-modify-martial").next(".dropdown-menu").find(".dropdown-item");
    $(materialItem).each((idx, itm) => {
        if ($(itm).text().trim() == data.material_status.trim()) {
            $(itm).find(".pre-selected").show();
        }
    });
    // $("#drop-modify-material").val(data.material_status);
    $("#textbox-modify-children").val(data.number_of_children);

    $("#drop-modify-degree").next(".dropdown-menu").find(".pre-selected").hide();
    let degreeItem = $("#drop-modify-degree").next(".dropdown-menu").find(".dropdown-item");
    $(degreeItem).each((idx, itm) => {
        if ($(itm).text().trim() == data.degree.trim()) {
            $(itm).find(".pre-selected").show();
        }
    });
    // $("#drop-modify-degree").val(data.degree);
    $("#textbox-modify-major").val(data.major);
    $("#textbox-modify-college").val(data.college);
    $("#textbox-modify-bank").val(data.bank_account);

    $("#drop-modify-department").next(".dropdown-menu").find(".pre-selected").hide();
    let departmentItem = $("#drop-modify-department").next(".dropdown-menu").find(".dropdown-item");
    $(departmentItem).each((idx, itm) => {
        if ($(itm).text().trim() == data.department.trim()) {
            $(itm).find(".pre-selected").show();
        }
    });
    // $("#drop-modify-department").val(data.department);

    $("#drop-modify-title").next(".dropdown-menu").find(".pre-selected").hide();
    let titleItem = $("#drop-modify-title").next(".dropdown-menu").find(".dropdown-item");
    $(titleItem).each((idx, itm) => {
        if ($(itm).text().trim() == data.title.trim()) {
            $(itm).find(".pre-selected").show();
        }
    });
    // $("#drop-modify-title").val(data.title);

    $("#drop-modify-manager").next(".dropdown-menu").find(".pre-selected").hide();
    let managerItem = $("#drop-modify-manager").next(".dropdown-menu").find(".dropdown-item");
    $(managerItem).each((idx, itm) => {
        if ($(itm).text().trim() == `${data.manager_id} - ${data.manager.trim()}`) {
            $(itm).find(".pre-selected").show();
        }
    });
    // $("#drop-modify-manager").val(data.manager);

    $("#drop-modify-time-manager").next(".dropdown-menu").find(".pre-selected").hide();
    let timeManagerItem = $("#drop-modify-time-manager").next(".dropdown-menu").find(".dropdown-item");
    $(timeManagerItem).each((idx, itm) => {
        if ($(itm).text().trim() == `${data.time_manager_id} - ${data.time_manager.trim()}`) {
            $(itm).find(".pre-selected").show();
        }
    });
    //  $("#drop-modify-time-manager").val(data.time_manager);

    $("#drop-modify-expense-manager").next(".dropdown-menu").find(".pre-selected").hide();
    let expenseManagerItem = $("#drop-modify-expense-manager").next(".dropdown-menu").find(".dropdown-item");
    $(expenseManagerItem).each((idx, itm) => {
        if ($(itm).text().trim() == `${data.expense_manager_id} - ${data.expense_manager.trim()}`) {
            $(itm).find(".pre-selected").show();
        }
    });
    // $("#drop-modify-expense-manager").val(data.expense_manager);

    $("#textbox-modify-distance").val(data.distance_from_home);

    $("#drop-modify-gender").next(".dropdown-menu").find(".pre-selected").hide();
    let genderItem = $("#drop-modify-gender").next(".dropdown-menu").find(".dropdown-item");
    $(genderItem).each((idx, itm) => {
        if ($(itm).text().trim() == data.gender.trim()) {
            $(itm).find(".pre-selected").show();
        }
    });
    // $("#drop-modify-gender").val(data.gender);

    $("#calendar-modify-birth").val(proccessDate.formatDate(data.birthday));
    $("#textbox-modify-birthwhere").val(data.born_place);
    $("#textbox-modify-phone").val(data.phone);
    $("#textbox-modify-phone-emergency").val(data.emergency_phone);
    $("#textbox-modify-contact-emergency").val(data.emergency_contact_man);
    $("#textbox-modify-address").val(data.address);
    $("#textbox-modify-mail").val(data.email);
    $("#textbox-modify-identity-card").val(data.identity_citizen_id);
});

$(document).on("click", "#btn-delete_employee", (e) => {
    let empId = JSON.parse($(e.target).parents(".modal").eq(0).attr("data-emp")).id;
    $.ajax({
        url: 'Employee/RemoveEmployee',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { empId: empId },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Xóa nhân viên thành công!");
                $("#modal-modify-employee").modal("toggle");
                // newEmployee.id = response.new_id;
                // window.allEmps = [newEmployee].concat(window.allEmps);
                // renderEmployees(window.allEmps);
                location.reload();
            }
        }
    });
})

$("#btn-create-employee").on("click", () => {
    $.fn.editable.defaults.mode = 'inline';
    $("#modal-create-employee").modal("toggle");

    let defaultStandardWorkTime31 = standardWorkTimes.filter((x) => { return x.text.toLowerCase() == "26 ngày/tháng" })[0].value;

    $(".standard-work-time-31").each((idx, itm) => {
        $(itm).editable({
            type: 'select',
            // pk: 1,
            url: '',
            title: 'Ngày công tiêu chuẩn',
            value: defaultStandardWorkTime31,
            source: standardWorkTimes
        });
    });

    let defaultStandardWorkTime30 = standardWorkTimes.filter((x) => { return x.text.toLowerCase() == "26 ngày/tháng" })[0].value;
    $(".standard-work-time-30").each((idx, itm) => {
        $(itm).editable({
            type: 'select',
            // pk: 1,
            url: '',
            title: 'Ngày công tiêu chuẩn',
            value: defaultStandardWorkTime30,
            source: standardWorkTimes
        });
    })

    let defaultStandardWorkTime28 = standardWorkTimes.filter((x) => { return x.text.toLowerCase() == "24 ngày/tháng" })[0].value;
    $(".standard-work-time-28").each((idx, itm) => {
        $(itm).editable({
            type: 'select',
            // pk: 1,
            url: '',
            title: 'Ngày công tiêu chuẩn',
            value: defaultStandardWorkTime28,
            source: standardWorkTimes
        });
    })

    $("#drop-department").next(".dropdown-menu").find(".dropdown-item").remove();
    for (let i = 0; i < departments.length; ++i) {
        $("#drop-department").next(".dropdown-menu").append(`<div class="dropdown-item"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${departments[i].department_name}</div>`);
    }

    $("#drop-title").next(".dropdown-menu").find(".dropdown-item").remove();
    for (let i = 0; i < titles.length; ++i) {
        $("#drop-title").next(".dropdown-menu").append(`<div class="dropdown-item"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${titles[i].title_name}</div>`);
    }

    $(".drop-employee").next(".dropdown-menu").find(".dropdown-item").remove();
    for (let i = 0; i < names.length; ++i) {
        $(".drop-employee").next(".dropdown-menu").append(`<div class="dropdown-item"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${names[i].id} - ${names[i].last_name} ${names[i].first_name}</div>`);
    }
})

$(document).on("click", "#btn-save-employee", () => {
    let isValidate = true;

    $.extend(newEmployee, {
        last_name: $("#textbox-lastname").val(),
        first_name: $("#textbox-firstname").val(),
        number_of_children: $("#textbox-children").val(),
        major: $("#textbox-major").val(),
        college: $("#textbox-college").val(),
        bank_account: $("#textbox-bank").val(),
        distance_from_home: $("#textbox-distance").val(),
        birthday: $("#calendar-birth").val(),
        born_place: $("#textbox-birthwhere").val(),
        phone: $("#textbox-phone").val(),
        emergency_phone: $("#textbox-phone-emergency").val(),
        emergency_contact_man: $("#textbox-contact-emergency").val(),
        address: $("#textbox-address").val(),
        email: $("#textbox-mail").val(),
        identity_citizen_id: $("#textbox-identity-card").val()
    });

    let validateInput = ValidateInput();

    if (!validateInput.validateStringLength(newEmployee.last_name, 200) || !validateInput.validateNotEmpty(newEmployee.last_name)) {
        $(".warn").hide();
        $("#warn-lastname").show();
        isValidate = false;
    }
    else if (!validateInput.validateStringLength(newEmployee.first_name, 200) || !validateInput.validateNotEmpty(newEmployee.first_name)) {
        $(".warn").hide();
        $("#warn-firstname").show();
        isValidate = false;
    }
    else if (!validateInput.validateIntWithLowLimit(newEmployee.number_of_children, 0) || !validateInput.validateNotEmpty(newEmployee.number_of_children)) {
        $(".warn").hide();
        $("#warn-children").show();
        isValidate = false;
    }
    else if (!validateInput.validateStringLength(newEmployee.major, 200) || !validateInput.validateNotEmpty(newEmployee.major)) {
        $(".warn").hide();
        $("#warn-major").show();
        isValidate = false;
    }
    else if (!validateInput.validateStringLength(newEmployee.college, 200) || !validateInput.validateNotEmpty(newEmployee.college)) {
        $(".warn").hide();
        $("#warn-college").show();
        isValidate = false;
    }
    else if (!validateInput.validateIdLimit(newEmployee.bank_account, 20) || !validateInput.validateNotEmpty(newEmployee.bank_account)) {
        $(".warn").hide();
        $("#warn-bank").show();
        isValidate = false;
    }
    else if (!validateInput.validateNumberWithLowLimit(newEmployee.distance_from_home, 0) || !validateInput.validateNotEmpty(newEmployee.distance_from_home)) {
        $(".warn").hide();
        $("#warn-distance").show();
        isValidate = false;
    }
    else if (!validateInput.validateStringLength(newEmployee.born_place, 200) || !validateInput.validateNotEmpty(newEmployee.born_place)) {
        $(".warn").hide();
        $("#warn-birthwhere").show();
        isValidate = false;
    }
    else if (!validateInput.validatePhone(newEmployee.phone) || !validateInput.validateNotEmpty(newEmployee.phone)) {
        $(".warn").hide();
        $("#warn-phone").show();
        isValidate = false;
    }
    else if (!validateInput.validatePhone(newEmployee.emergency_phone) || !validateInput.validateNotEmpty(newEmployee.emergency_phone)) {
        $(".warn").hide();
        $("#warn-phone-emergency").show();
        isValidate = false;
    }
    else if (!validateInput.validateStringLength(newEmployee.emergency_contact_man, 200) || !validateInput.validateNotEmpty(newEmployee.emergency_contact_man)) {
        $(".warn").hide();
        $("#warn-contact-emergency").show();
        isValidate = false;
    }
    else if (!validateInput.validateStringLength(newEmployee.address, 200) || !validateInput.validateNotEmpty(newEmployee.address)) {
        $(".warn").hide();
        $("#warn-address").show();
        isValidate = false;
    }
    else if (!validateInput.validateEmail(newEmployee.email, 200) || !validateInput.validateNotEmpty(newEmployee.email)) {
        $(".warn").hide();
        $("#warn-mail").show();
        isValidate = false;
    }
    else if (!validateInput.validateIdLimit(newEmployee.identity_citizen_id, 20) || !validateInput.validateNotEmpty(newEmployee.identity_citizen_id)) {
        $(".warn").hide();
        $("#warn-identity-card").show();
        isValidate = false;
    }

    let listStandardWorkTimes = [];
    for (let i = 0; i < 12; ++i) {
        listStandardWorkTimes.push({
            month: i + 1,
            standard_work_time: $(".standard-work-time").eq(i).text().trim()
        });
    }

    newEmployee.standard_work_time = listStandardWorkTimes;

    if (isValidate == true) {
        $(".warn").hide();
        for ([key, value] of Object.entries(newEmployee)) {
            if (key.trim() != "standard_work_time")
                newEmployee[key] = newEmployee[key].trim();
        }
        $.ajax({
            url: 'Employee/SaveEmployee',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: newEmployee,
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Tạo mới nhân viên thành công!");
                    $("#modal-create-employee").modal("toggle");
                    newEmployee.id = response.new_id;
                    window.allEmps = [newEmployee].concat(window.allEmps);
                    renderEmployees(window.allEmps);
                }
            }
        });
    }
});

$(document).on("click", "#btn-save-modify-employee", () => {
    let isValidate = true;

    $.extend(newEmployee, {
        id: $("#modal-modify-employee").attr("data-emp-id"),
        last_name: $("#textbox-modify-lastname").val(),
        first_name: $("#textbox-modify-firstname").val(),
        number_of_children: $("#textbox-modify-children").val(),
        major: $("#textbox-modify-major").val(),
        college: $("#textbox-modify-college").val(),
        bank_account: $("#textbox-modify-bank").val(),
        distance_from_home: $("#textbox-modify-distance").val(),
        birthday: $("#calendar-modify-birth").val(),
        born_place: $("#textbox-modify-birthwhere").val(),
        phone: $("#textbox-modify-phone").val(),
        emergency_phone: $("#textbox-modify-phone-emergency").val(),
        emergency_contact_man: $("#textbox-modify-contact-emergency").val(),
        address: $("#textbox-modify-address").val(),
        email: $("#textbox-modify-mail").val(),
        identity_citizen_id: $("#textbox-modify-identity-card").val()
        //material_status: $("#drop-modify-martial").next(".dropdown-menu").find(".pre-selected:visible").parents(".dropdown-item").text(),
        //degree: $("#drop-modify-degree").next(".dropdown-menu").find(".pre-selected:visible").parents(".dropdown-item").text(),
        //department: $("#drop-modify-department").next(".dropdown-menu").find(".pre-selected:visible").parents(".dropdown-item").text(),
        //title: $("#drop-modify-title").next(".dropdown-menu").find(".pre-selected:visible").parents(".dropdown-item").text(),
        //manager: $("#drop-modify-manager").next(".dropdown-menu").find(".pre-selected:visible").parents(".dropdown-item").text(),
        //time_manager: $("#drop-modify-time-manager").next(".dropdown-menu").find(".pre-selected:visible").parents(".dropdown-item").text(),
        //expense_manager: $("#drop-modify-expense-manager").next(".dropdown-menu").find(".pre-selected:visible").parents(".dropdown-item").text(),
        //gender: $("#drop-modify-gender").next(".dropdown-menu").find(".pre-selected:visible").parents(".dropdown-item").text()
    });

    newEmployee.material_status = "Độc thân";
    $("#drop-modify-martial").next(".dropdown-menu").find(".pre-selected").each((idx, itm) => {
        if ($(itm).css("display") != "none")
            newEmployee.material_status = $(itm).parents(".dropdown-item").text().trim();
    });

    newEmployee.degree = "Cử nhân";
    $("#drop-modify-degree").next(".dropdown-menu").find(".pre-selected").each((idx, itm) => {
        if ($(itm).css("display") != "none")
            newEmployee.degree = $(itm).parents(".dropdown-item").text().trim();
    });

    newEmployee.department = "Nhân viên mới";
    $("#drop-modify-department").next(".dropdown-menu").find(".pre-selected").each((idx, itm) => {
        if ($(itm).css("display") != "none")
            newEmployee.department = $(itm).parents(".dropdown-item").text().trim();
    });

    newEmployee.title = "Nhân viên mới";
    $("#drop-modify-title").next(".dropdown-menu").find(".pre-selected").each((idx, itm) => {
        if ($(itm).css("display") != "none")
            newEmployee.title = $(itm).parents(".dropdown-item").text().trim();
    });

    newEmployee.manager = "";
    $("#drop-modify-manager").next(".dropdown-menu").find(".pre-selected").each((idx, itm) => {
        if ($(itm).css("display") != "none")
            newEmployee.manager = $(itm).parents(".dropdown-item").text().trim();
    });

    newEmployee.time_manager = "";
    $("#drop-modify-time-manager").next(".dropdown-menu").find(".pre-selected").each((idx, itm) => {
        if ($(itm).css("display") != "none")
            newEmployee.time_manager = $(itm).parents(".dropdown-item").text().trim();
    });

    newEmployee.expense_manager = "";
    $("#drop-modify-expense-manager").next(".dropdown-menu").find(".pre-selected").each((idx, itm) => {
        if ($(itm).css("display") != "none")
            newEmployee.expense_manager = $(itm).parents(".dropdown-item").text().trim();
    });

    newEmployee.gender = "Nam"
    $("#drop-modify-gender").next(".dropdown-menu").find(".pre-selected").each((idx, itm) => {
        if ($(itm).css("display") != "none")
            newEmployee.gender = $(itm).parents(".dropdown-item").text().trim();
    });

    let validateInput = ValidateInput();

    if (!validateInput.validateStringLength(newEmployee.last_name, 200) || !validateInput.validateNotEmpty(newEmployee.last_name)) {
        $(".warn").hide();
        $("#warn-modify-lastname").show();
        isValidate = false;
    }
    else if (!validateInput.validateStringLength(newEmployee.first_name, 200) || !validateInput.validateNotEmpty(newEmployee.first_name)) {
        $(".warn").hide();
        $("#warn-modify-firstname").show();
        isValidate = false;
    }
    else if (!validateInput.validateIntWithLowLimit(newEmployee.number_of_children, 0) || !validateInput.validateNotEmpty(newEmployee.number_of_children)) {
        $(".warn").hide();
        $("#warn-modify-children").show();
        isValidate = false;
    }
    else if (!validateInput.validateStringLength(newEmployee.major, 200) || !validateInput.validateNotEmpty(newEmployee.major)) {
        $(".warn").hide();
        $("#warn-modify-major").show();
        isValidate = false;
    }
    else if (!validateInput.validateStringLength(newEmployee.college, 200) || !validateInput.validateNotEmpty(newEmployee.college)) {
        $(".warn").hide();
        $("#warn-modify-college").show();
        isValidate = false;
    }
    else if (!validateInput.validateIdLimit(newEmployee.bank_account, 20) || !validateInput.validateNotEmpty(newEmployee.bank_account)) {
        $(".warn").hide();
        $("#warn-modify-bank").show();
        isValidate = false;
    }
    else if (!validateInput.validateNumberWithLowLimit(newEmployee.distance_from_home, 0) || !validateInput.validateNotEmpty(newEmployee.distance_from_home)) {
        $(".warn").hide();
        $("#warn-modify-distance").show();
        isValidate = false;
    }
    else if (!validateInput.validateStringLength(newEmployee.born_place, 200) || !validateInput.validateNotEmpty(newEmployee.born_place)) {
        $(".warn").hide();
        $("#warn-modify-birthwhere").show();
        isValidate = false;
    }
    else if (!validateInput.validatePhone(newEmployee.phone) || !validateInput.validateNotEmpty(newEmployee.phone)) {
        $(".warn").hide();
        $("#warn-modify-phone").show();
        isValidate = false;
    }
    else if (!validateInput.validatePhone(newEmployee.emergency_phone) || !validateInput.validateNotEmpty(newEmployee.emergency_phone)) {
        $(".warn").hide();
        $("#warn-modify-phone-emergency").show();
        isValidate = false;
    }
    else if (!validateInput.validateStringLength(newEmployee.emergency_contact_man, 200) || !validateInput.validateNotEmpty(newEmployee.emergency_contact_man)) {
        $(".warn").hide();
        $("#warn-modify-contact-emergency").show();
        isValidate = false;
    }
    else if (!validateInput.validateStringLength(newEmployee.address, 200) || !validateInput.validateNotEmpty(newEmployee.address)) {
        $(".warn").hide();
        $("#warn-modify-address").show();
        isValidate = false;
    }
    else if (!validateInput.validateEmail(newEmployee.email, 200) || !validateInput.validateNotEmpty(newEmployee.email)) {
        $(".warn").hide();
        $("#warn-modify-mail").show();
        isValidate = false;
    }
    else if (!validateInput.validateIdLimit(newEmployee.identity_citizen_id, 20) || !validateInput.validateNotEmpty(newEmployee.identity_citizen_id)) {
        $(".warn").hide();
        $("#warn-modify-identity-card").show();
        isValidate = false;
    }

    if (isValidate == true) {
        $(".warn").hide();
        for ([key, value] of Object.entries(newEmployee)) {
            newEmployee[key] = newEmployee[key].trim();
        }
        $.ajax({
            url: 'Employee/UpdateEmployee',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: newEmployee,
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Cập nhật nhân viên thành công!");
                    $("#modal-modify-employee").modal("toggle");
                    // newEmployee.id = response.new_id;
                    // window.allEmps = [newEmployee].concat(window.allEmps);
                    // renderEmployees(window.allEmps);
                    location.reload();
                }
            }
        });
    }
});

$(".dropdown-menu").on("click", ".dropdown-item", (e) => {
    $(e.target).siblings().find(".pre-selected").hide();
    $(e.target).find(".pre-selected").show();
    switch ($(e.target).parents(".dropdown").find("button").attr("id")) {
        case "drop-martial": {
            newEmployee.material_status = $(e.target).text();
            break;
        }
        case "drop-degree": {
            newEmployee.degree = $(e.target).text();
            break;
        }
        case "drop-department": {
            newEmployee.department = $(e.target).text();
            break;
        }
        case "drop-title": {
            newEmployee.title = $(e.target).text();
            break;
        }
        case "drop-manager": {
            newEmployee.manager = $(e.target).text();
            break;
        }
        case "drop-time-manager": {
            newEmployee.time_manager = $(e.target).text();
            break;
        }
        case "drop-expense-manager": {
            newEmployee.expense_manager = $(e.target).text();
            break;
        }
        case "drop-unit-distance": {
            newEmployee.unit = $(e.target).text();
            break;
        }
        case "drop-gender": {
            newEmployee.gender = $(e.target).text();
            break;
        }
        default: {
            break;
        }
    }
})

function renderEmployees(response) {
    window.allEmps = response;
    $(".row-employee").remove();
    //if (response.length % 3 == 0) {
    //    $(".contain-grid-employee").append('<div class="row-employee"></div>');
    //    let 
    //}
    let numberOfRows = Math.ceil(response.length / 3);
    let floorNumberOfRows = Math.floor(response.length / 3);
    for (let i = 0; i < numberOfRows; ++i) {
        $(".contain-grid-employee").append('<div class="row-employee d-flex justify-content-between"></div>');
        if (i > floorNumberOfRows - 1) {
            for (let j = 0; j < response.length % 3; ++j) {
                $(".row-employee").last().append(`
                            <div class="box-employee" id="emp-${response[3 * i + j].id}" data-emp='${JSON.stringify(response[3 * i + j])}' data-toggle="modal" data-target="#modal-view-employee">
                                <div class="mix-ava-actions d-flex justity-content-center">
                                    <div class="ava-employee"><img src="/Store/Pics/default-ava.jpg" class="rounded-circle" width="100" height="100"/></div>
                                    <div class="toolbox-actions">
                                        <div class="tool-standard-work-time">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-month-fill" viewBox="0 0 16 16">
  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm.104 7.305L4.9 10.18H3.284l.8-2.375h.02zm9.074 2.297c0-.832-.414-1.36-1.062-1.36-.692 0-1.098.492-1.098 1.36v.253c0 .852.406 1.364 1.098 1.364.671 0 1.062-.516 1.062-1.364v-.253z"/>
  <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM2.56 12.332h-.71L3.748 7h.696l1.898 5.332h-.719l-.539-1.602H3.1l-.54 1.602zm7.29-4.105v4.105h-.668v-.539h-.027c-.145.324-.532.605-1.188.605-.847 0-1.453-.484-1.453-1.425V8.227h.676v2.554c0 .766.441 1.012.98 1.012.59 0 1.004-.371 1.004-1.023V8.227h.676zm1.273 4.41c.075.332.422.636.985.636.648 0 1.07-.378 1.07-1.023v-.605h-.02c-.163.355-.613.648-1.171.648-.957 0-1.64-.672-1.64-1.902v-.34c0-1.207.675-1.887 1.64-1.887.558 0 1.004.293 1.195.64h.02v-.577h.648v4.03c0 1.052-.816 1.579-1.746 1.579-1.043 0-1.574-.516-1.668-1.2h.687z"/>
</svg>
                                        </div>
                                        <div class="tool-contract">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-justify-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg>
                                        </div>
                                        <div class="tool-plan">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
</svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="contain-info-employee">
                                    <div class="line-info-employee employee-name">${response[3 * i + j].last_name} ${response[3 * i + j].first_name}</div>
                                    <div class="line-info-employee employee-jobtitle">${response[3 * i + j].title}</div>
                                    <div class="line-info-employee employee-dept">${response[3 * i + j].department}</div>
                                </div>
                            </div>`);
            }
        } // Nếu đang xét hàng lẻ
        else {
            for (let j = 0; j < 3; ++j) {
                $(".row-employee").last().append(`
                            <div class="box-employee" id="emp-${response[3 * i + j].id}" data-emp='${JSON.stringify(response[3 * i + j])}' data-target="#modal-view-employee">
                                <div class="mix-ava-actions d-flex justity-content-center">
                                    <div class="ava-employee"><img src="/Store/Pics/default-ava.jpg" class="rounded-circle" width="100" height="100"/></div>
                                    <div class="toolbox-actions">
                                        <div class="tool-standard-work-time">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-month-fill" viewBox="0 0 16 16">
  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm.104 7.305L4.9 10.18H3.284l.8-2.375h.02zm9.074 2.297c0-.832-.414-1.36-1.062-1.36-.692 0-1.098.492-1.098 1.36v.253c0 .852.406 1.364 1.098 1.364.671 0 1.062-.516 1.062-1.364v-.253z"/>
  <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM2.56 12.332h-.71L3.748 7h.696l1.898 5.332h-.719l-.539-1.602H3.1l-.54 1.602zm7.29-4.105v4.105h-.668v-.539h-.027c-.145.324-.532.605-1.188.605-.847 0-1.453-.484-1.453-1.425V8.227h.676v2.554c0 .766.441 1.012.98 1.012.59 0 1.004-.371 1.004-1.023V8.227h.676zm1.273 4.41c.075.332.422.636.985.636.648 0 1.07-.378 1.07-1.023v-.605h-.02c-.163.355-.613.648-1.171.648-.957 0-1.64-.672-1.64-1.902v-.34c0-1.207.675-1.887 1.64-1.887.558 0 1.004.293 1.195.64h.02v-.577h.648v4.03c0 1.052-.816 1.579-1.746 1.579-1.043 0-1.574-.516-1.668-1.2h.687z"/>
</svg>
                                        </div>
                                        <div class="tool-contract">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-justify-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg>
                                        </div>
                                        <div class="tool-plan">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
</svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="contain-info-employee">
                                    <div class="line-info-employee employee-name">${response[3 * i + j].last_name} ${response[3 * i + j].first_name}</div>
                                    <div class="line-info-employee employee-jobtitle">${response[3 * i + j].title}</div>
                                    <div class="line-info-employee employee-dept">${response[3 * i + j].department}</div>
                                </div>
                            </div>`);
            }
        } // Nếu đang xét hàng đủ
    }
}

$(document).on("click", ".tool-standard-work-time", (e) => {
    // $(".standard-work-time").text("");

    $("#table-show-standard-work-time-for-emp").remove();
    $(".table-view-standard-work-employee").append(`
        <table class="table" id="table-show-standard-work-time-for-emp">
                        <thead>
                            <tr>
                                <th scope="col">Tháng</th>
                                <th scope="col">Ngày công tiêu chuẩn</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Tháng 1</th>
                                <td><a href="#" class="show-standard-work-time"></a></td>
                            </tr>
                            <tr>
                                <th scope="row">Tháng 2</th>
                                <td><a href="#" class="show-standard-work-time"></a></td>
                            </tr>
                            <tr>
                                <th scope="row">Tháng 3</th>
                                <td><a href="#" class="show-standard-work-time"></a></td>
                            </tr>
                            <tr>
                                <th scope="row">Tháng 4</th>
                                <td><a href="#" class="show-standard-work-time"></a></td>
                            </tr>
                            <tr>
                                <th scope="row">Tháng 5</th>
                                <td><a href="#" class="show-standard-work-time"></a></td>
                            </tr>
                            <tr>
                                <th scope="row">Tháng 6</th>
                                <td><a href="#" class="show-standard-work-time"></a></td>
                            </tr>
                            <tr>
                                <th scope="row">Tháng 7</th>
                                <td><a href="#" class="show-standard-work-time"></a></td>
                            </tr>
                            <tr>
                                <th scope="row">Tháng 8</th>
                                <td><a href="#" class="show-standard-work-time"></a></td>
                            </tr>
                            <tr>
                                <th scope="row">Tháng 9</th>
                                <td><a href="#" class="show-standard-work-time"></a></td>
                            </tr>
                            <tr>
                                <th scope="row">Tháng 10</th>
                                <td><a href="#" class="show-standard-work-time"></a></td>
                            </tr>
                            <tr>
                                <th scope="row">Tháng 11</th>
                                <td><a href="#" class="show-standard-work-time"></a></td>
                            </tr>
                            <tr>
                                <th scope="row">Tháng 12</th>
                                <td><a href="#" class="show-standard-work-time"></a></td>
                            </tr>
                        </tbody>
                    </table>
    `);

    e.stopPropagation();
    $(".modal").modal("hide");
    $("#modal-view-standard-work-time").modal("toggle");

    let data = JSON.parse($(e.currentTarget).parents(".box-employee").attr("data-emp"));
    $(".text-abstract-employee-id").text(data.id);
    $(".text-abstract-employee-fullname").text(`${data.last_name} ${data.first_name}`);

    let standartWorkTimesOfEmp = [];
    $.ajax({
        url: 'Employee/RenderStandardWorkTime',
        contentType: 'application/x-www-form-urlencoded',
        data: { empId: data.id},
        dataType: 'json',
        type: 'get',
        success: function (response) {
            $.fn.editable.defaults.mode = 'inline';

            try {
                response.sort((a, b) => { return parseInt(a.month, 10) - parseInt(b.month, 10); });
            }
            catch {

            };

            /*let currentStandardWorks = standardWorkTimes.filter((x) => { return x.text.toLowerCase() == "26 ngày/tháng" })[0].value;*/
            $(".table-view-standard-work-employee .show-standard-work-time").each((idx, itm) => {
                try {
                    let currentStandardWorks = standardWorkTimes.filter((x) => { return x.text.toLowerCase() == `${response[idx].amount_time} ${response[idx].unit.toLowerCase()}/${response[idx].period.toLowerCase()}` })[0].value;
                    $(itm).editable({
                        type: 'select',
                        // pk: 1,
                        url: '',
                        title: 'Ngày công tiêu chuẩn',
                        value: currentStandardWorks,
                        source: standardWorkTimes
                    });
                }
                catch {
                    $(itm).editable({
                        type: 'select',
                        // pk: 1,
                        url: '',
                        title: 'Ngày công tiêu chuẩn',
                        value: 1,
                        source: [{
                            value: 1,
                            text: ""
                        }]
                    });
                }
            });
        }
    });
});

$(document).on("click", "#btn-save-modify-standard-work-employee", (e) => {
    let listStandardWorkTimes = [];
    for (let i = 0; i < 12; ++i) {
        listStandardWorkTimes.push({
            month: i + 1,
            standard_work_time: $(".show-standard-work-time").eq(i).text().trim()
        });
    }

    newEmployee.standard_work_time = listStandardWorkTimes;
    newEmployee.id = $(e.currentTarget).parents("#modal-view-standard-work-time").find(".text-abstract-employee-id").eq(0).text();

    $.ajax({
        url: 'Employee/UpdateStandardWorkTimeForEmployee',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: newEmployee,
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Cập nhật ngày công tiêu chuẩn cho nhân viên thành công!");
                $("#modal-view-standard-work-time").modal("toggle");
                // newEmployee.id = response.new_id;
                // window.allEmps = [newEmployee].concat(window.allEmps);
                // renderEmployees(window.allEmps);
                location.reload();
            }
        }
    });
})

$(document).on("click", ".tool-contract", (e) => {
    let proccessDate = ProccessDate();

    e.stopPropagation();
    $(".modal").modal("hide");
    $("#modal-view-modify-contract").modal("toggle");

    $("#table-contracts").find("tbody tr").remove();

    let data = JSON.parse($(e.currentTarget).parents(".box-employee").attr("data-emp"));
    $("#modal-view-modify-contract").attr("data-empid", data.id);

    $(".text-abstract-employee-id").text(data.id);
    $(".text-abstract-employee-fullname").text(`${data.last_name} ${data.first_name}`);

    $.ajax({
        url: 'Employee/RenderContracts',
        contentType: 'application/x-www-form-urlencoded',
        data: { empId: data.id },
        dataType: 'json',
        type: 'get',
        success: function (response) {
            $.fn.editable.defaults.mode = 'inline';

            $.each(response, (idx, itm) => {
                $("#table-contracts").find("tbody").append(`
                                <tr>
                                    <th scope="row">${itm.id}</th>
                                    <td><a href="#" class="contract-begin-date"></a></td>
                                    <td><a href="#" class="contract-end-date"></a></td>
                                    <td><a href="#" class="contract-basic-wage"></a></td>
                                    <td><a href="#" class="contract-unit"></a></td>
                                    <td><a href="#" class="contract-status"></a></td>
                                    <td><a href="#" class="contract-pay-method"></a></td>
                                    <td><a href="#" class="contract-pay-period"></a></td>
                                    <td><a href="#" class="contract-require-educated"></a></td>
                                    <td><a href="#" class="contract-restrict-products"></a></td>
                                    <td><a href="#" class="contract-completed-products"></a></td>
                                    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill btn-remove-product" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg></td>
                                </tr>
                `);

                $(".contract-begin-date").last().editable({
                    type: 'date',
                    // pk: 1,
                    url: '',
                    title: 'Ngày bắt đầu',
                    value: proccessDate.formatDate(itm.start_date)
                });

                $(".contract-end-date").last().editable({
                    type: 'date',
                    // pk: 1,
                    url: '',
                    title: 'Ngày kết thúc',
                    value: proccessDate.formatDate(itm.end_date)
                });

                $(".contract-basic-wage").last().editable({
                    type: 'text',
                    // pk: 1,
                    url: '',
                    title: 'Lương cơ bản',
                    value: itm.wage
                });

                $(".contract-unit").last().editable({
                    type: 'select',
                    // pk: 1,
                    url: '',
                    title: 'Đơn vị',
                    value: (itm.unit == 'Triệu đồng')? 1 : 2,
                    source: [
                         {value: 1, text: 'Triệu đồng'},
                         {value: 2, text: 'Nghìn đồng'}
                     ]
                });

                //// status = 0: Hết hạn
                //// status = 1: Đang có hiệu lực
                //// status = 2: Bị hủy
                //let currentStatus;
                //if (itm.status == "Đang có hiệu lực")
                //    currentStatus = 1;
                //else if (itm.status == "Hết hạn")
                //    currentStatus = 2;
                //else
                //    currentStatus = 3;
                let valueStatus;
                if (itm.status == 1) {
                    valueStatus = 1;
                }
                else if (itm.status == 0) {
                    valueStatus = 2;
                }
                else {
                    valueStatus = 3
                }
                $(".contract-status").last().editable({
                    type: 'select',
                    // pk: 1,
                    url: '',
                    title: 'Trạng thái',
                    value: valueStatus,
                    source: [
                        { value: 1, text: 'Đang có hiệu lực' },
                        { value: 2, text: 'Hết hạn' },
                        { value: 3, text: 'Bị hủy' }
                    ]
                });

                $(".contract-pay-method").last().editable({
                    type: 'select',
                    // pk: 1,
                    url: '',
                    title: 'Hình thức trả lương',
                    value: itm.payroll_type,
                    source: [
                        { value: 1, text: 'Theo thời gian' },
                        { value: 2, text: 'Theo sản phẩm' },
                        { value: 3, text: 'Theo khoán' }
                    ]
                });

                $(".contract-pay-period").last().editable({
                    type: 'select',
                    // pk: 1,
                    url: '',
                    title: 'Kì trả lương',
                    value: itm.period_type,
                    source: [
                        { value: 1, text: 'Sau nửa tháng' },
                        { value: 2, text: 'Sau 1 tháng' },
                        { value: 3, text: 'Sau 1 tuần' },
                        { value: 3, text: 'Sau 1 ngày' }
                    ]
                });

                $(".contract-require-educated").last().editable({
                    type: 'select',
                    // pk: 1,
                    url: '',
                    title: 'Có yêu cầu đào tạo?',
                    value: (itm.require_educate == true)? 1 : 2,
                    source: [
                        { value: 1, text: 'Có' },
                        { value: 2, text: 'Không' }
                    ]
                });

                $(".contract-restrict-products").last().editable({
                    type: 'text',
                    // pk: 1,
                    url: '',
                    title: 'Số sản phẩm khoán',
                    value: itm.restrict_product_number,
                });

                $(".contract-completed-products").last().editable({
                    type: 'text',
                    // pk: 1,
                    url: '',
                    title: 'Số sản phẩm khoán hoàn thành',
                    value: itm.number_product
                });
            });
        }
    });
});

$(document).on("click", ".tool-plan", (e) => {
    let proccessDate = ProccessDate();

    e.stopPropagation();
    $(".modal").modal("hide");
    $("#modal-assign-plan").modal("toggle");

    // $("#table-contracts").find("tbody tr").remove();

    let data = JSON.parse($(e.currentTarget).parents(".box-employee").attr("data-emp"));
    $("#modal-assign-plan").attr("data-empid", data.id);

    $(".text-abstract-employee-id").text(data.id);
    $(".text-abstract-employee-fullname").text(`${data.last_name} ${data.first_name}`);
    $(".box-list-plans").find(".form-check").remove();

    $.ajax({
        url: 'Plan/RenderPlansForEmployee',
        contentType: 'application/x-www-form-urlencoded',
        data: { empId: data.id },
        dataType: 'json',
        type: 'get',
        success: function (response) {
            $.each(response, (idx, itm) => {
                if (itm.employee_id != null && itm.employee_id !== "") {
                    $(".box-list-plans").append(`
                        <div class="form-check" id="form-check-${itm.id}">
                            <input class="form-check-input updated" type="checkbox" value="" id="plan-${itm.id}" checked>
                            <label class="form-check-label" for="plan-${itm.id}">
                                ${itm.plan_name}
                            </label>
                        </div>
                    `);
                }
                else {
                    $(".box-list-plans").append(`
                        <div class="form-check" id="form-check-${itm.id}">
                            <input class="form-check-input" type="checkbox" value="" id="plan-${itm.id}">
                            <label class="form-check-label" for="plan-${itm.id}">
                                ${itm.plan_name}
                            </label>
                        </div>
                    `);
                }
            })
        }
    });
});

$(document).on("click", ".box-list-plans input", (e) => {
    if ($(e.currentTarget).is(":checked") == true) {
        $(e.currentTarget).removeClass("added");
        $(e.currentTarget).addClass("scrapped");
    }
    else {
        $(e.currentTarget).addClass("added");
        $(e.currentTarget).removeClass("scrapped");
    }
})

$(document).on("click", "#btn-save-assign-plan", (e) => {
    let newSelectedPlan = [];
    let removedPlan = [];
    $(".box-list-plans").find("input").each((idx, itm) => {
        if ($(itm).is(":checked") == true) {
            if ($(itm).hasClass("updated") == false) {
                newSelectedPlan.push($(itm).attr("id").trim().match(/\d+/gi)[0]);
            }
        }
        else {
            if ($(itm).hasClass("updated") == true) {
                removedPlan.push($(itm).attr("id").trim().match(/\d+/gi)[0]);
            }
        }
    });

    $.ajax({
        url: 'Employee/UpdatePlanForEmployee',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { empId: $("#modal-assign-plan").attr("data-empid").trim(), added: newSelectedPlan, removed: removedPlan },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Cập nhật/Thêm mới kế hoạch cho nhân viên thành công!");
                $("#modal-assign-plan").modal("toggle");
                location.reload();
            }
        }
    });
})

$(document).on("click", "#btn-create-contract", (e) => {
    $.fn.editable.defaults.mode = 'inline';   

    $("#table-contracts").find("tbody").append(`
                    <tr>
                        <th scope="row">0</th>
                        <td><a href="#" class="contract-begin-date"></a></td>
                        <td><a href="#" class="contract-end-date"></a></td>
                        <td><a href="#" class="contract-basic-wage"></a></td>
                        <td><a href="#" class="contract-unit"></a></td>
                        <td><a href="#" class="contract-status"></a></td>
                        <td><a href="#" class="contract-pay-method"></a></td>
                        <td><a href="#" class="contract-pay-period"></a></td>
                        <td><a href="#" class="contract-require-educated"></a></td>
                        <td><a href="#" class="contract-restrict-products"></a></td>
                        <td><a href="#" class="contract-completed-products"></a></td>
                        <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill btn-remove-product" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg></td>
                    </tr>
    `);

    $(".contract-begin-date").last().editable({
        type: 'date',
        // pk: 1,
        url: '',
        title: 'Ngày bắt đầu',
        value: '1970-01-01'
    });

    $(".contract-end-date").last().editable({
        type: 'date',
        // pk: 1,
        url: '',
        title: 'Ngày kết thúc',
        value: '1970-01-01'
    });

    $(".contract-basic-wage").last().editable({
        type: 'text',
        // pk: 1,
        url: '',
        title: 'Lương cơ bản',
        value: '0'
    });

    $(".contract-unit").last().editable({
        type: 'select',
        // pk: 1,
        url: '',
        title: 'Đơn vị',
        value: 1,
        source: [
            { value: 1, text: 'Triệu đồng' },
            { value: 2, text: 'Nghìn đồng' }
        ]
    });

    //// status = 0: Hết hạn
    //// status = 1: Đang có hiệu lực
    //// status = 2: Bị hủy
    //let currentStatus;
    //if (itm.status == "Đang có hiệu lực")
    //    currentStatus = 1;
    //else if (itm.status == "Hết hạn")
    //    currentStatus = 2;
    //else
    //    currentStatus = 3;
    $(".contract-status").last().editable({
        type: 'select',
        // pk: 1,
        url: '',
        title: 'Trạng thái',
        value: 1,
        source: [
            { value: 1, text: 'Đang có hiệu lực' },
            { value: 2, text: 'Hết hạn' },
            { value: 3, text: 'Bị hủy' }
        ]
    });

    $(".contract-pay-method").last().editable({
        type: 'select',
        // pk: 1,
        url: '',
        title: 'Hình thức trả lương',
        value: 1,
        source: [
            { value: 1, text: 'Theo thời gian' },
            { value: 2, text: 'Theo sản phẩm' },
            { value: 3, text: 'Theo khoán' }
        ]
    });

    $(".contract-pay-period").last().editable({
        type: 'select',
        // pk: 1,
        url: '',
        title: 'Kì trả lương',
        value: 2,
        source: [
            { value: 1, text: 'Sau nửa tháng' },
            { value: 2, text: 'Sau 1 tháng' },
            { value: 3, text: 'Sau 1 tuần' },
            { value: 3, text: 'Sau 1 ngày' }
        ]
    });

    $(".contract-require-educated").last().editable({
        type: 'select',
        // pk: 1,
        url: '',
        title: 'Có yêu cầu đào tạo?',
        value: 1,
        source: [
            { value: 1, text: 'Có' },
            { value: 2, text: 'Không' }
        ]
    });

    $(".contract-restrict-products").last().editable({
        type: 'text',
        // pk: 1,
        url: '',
        title: 'Số sản phẩm khoán',
        value: 10,
    });

    $(".contract-completed-products").last().editable({
        type: 'text',
        // pk: 1,
        url: '',
        title: 'Số sản phẩm khoán hoàn thành',
        value: null,
    });
})

$(document).on("click", "#btn-save-modify-contract", (e) => {
    // let data = JSON.parse($(e.currentTarget).parents(".box-employee").attr("data-emp"));

    let contracts = [];
    $("#table-contracts").find("tbody tr").each((idx, itm) => {
        let status;
        if ($(itm).find(".contract-status").text().trim() == "Đang có hiệu lực")
            status = 1;
        else if ($(itm).find(".contract-status").text().trim() == "Hết hạn")
            status = 0;
        else
            status = 2;

        let isRequireEducate;
        if ($(itm).find(".contract-require-educated").text().trim() == "Có")
            isRequireEducate = true;
        else if ($(itm).find(".contract-require-educated").text().trim() == "Không")
            isRequireEducate = false;

        let payMethod;
        if ($(itm).find(".contract-pay-method").text().trim() == "Theo thời gian")
            payMethod = 1;
        else if ($(itm).find(".contract-pay-method").text().trim() == "Theo sản phẩm")
            payMethod = 2;
        else if ($(itm).find(".contract-pay-method").text().trim() == "Theo khoán")
            payMethod = 3;

        let payPeriod;
        if ($(itm).find(".contract-pay-period").text().trim() == "Sau nửa tháng")
            payPeriod = 1;
        else if ($(itm).find(".contract-pay-period").text().trim() == "Sau 1 tháng")
            payPeriod = 2;
        else if ($(itm).find(".contract-pay-period").text().trim() == "Sau 1 tuần")
            payPeriod = 3;
        else if ($(itm).find(".contract-pay-period").text().trim() == "Sau 1 ngày")
            payPeriod = 4;


        contracts.push({
            id: $(itm).find("th").text().trim(),
            employee_id: $(e.currentTarget).parents("#modal-view-modify-contract").attr("data-empid"),
            start_date: $(itm).find(".contract-begin-date").text().trim(),
            end_date: $(itm).find(".contract-end-date").text().trim(),
            wage: $(itm).find(".contract-basic-wage").text().trim(),
            unit: $(itm).find(".contract-unit").text().trim(),
            status: status,
            restrict_product_number: $(itm).find(".contract-restrict-products").text().trim(),
            require_educate: isRequireEducate,
            period_type: payPeriod,
            payroll_type: payMethod,
            number_product: Number($(itm).find(".contract-completed-products").text().trim())
        });
    });

    $.ajax({
        url: 'Employee/UpdateContract',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { contracts: contracts},
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Cập nhật/Thêm mới hợp đồng thành công!");
                $("#modal-view-modify-contract").modal("toggle");
                location.reload();
            }
        }
    });
})