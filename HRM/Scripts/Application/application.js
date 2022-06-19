let departments = [];
let titles = [];
let names = [];
let newEmployee = {};
let standardWorkTimes = [];
let conductEmployee = "";
let _department;
let _title;
let _recruiter;
// let standardWorkTimes = [];

$(document).ready(function () {
    let _tool = GetValueOfCode();
    newEmployee = {
        last_name: $("#textbox-lastname").val(),
        first_name: $("#textbox-firstname").val(),
        degree: "Cử nhân",
        college: $("#textbox-college").val(),
        department: $("#drop-department").next(".dropdown-menu").find(".dropdown-item").eq(0).text(),
        title: $("#drop-title").next(".dropdown-menu").find(".dropdown-item").eq(0).text(),
        phone: $("#textbox-phone").val(),
        email: $("#textbox-mail").val(),
        require_wage: $("#textbox-require-wage").val()
    };

    $.ajax({
        url: '/Employee/RenderListDepartments',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'get',
        success: function (response) {
            departments = response;
            $("#drop-department").next(".dropdown-menu").find(".dropdown-item").remove();
            $("#filter-drop-department").next(".dropdown-menu").find(".dropdown-item").remove();
            for (let i = 0; i < departments.length; ++i) {
                $("#drop-department").next(".dropdown-menu").append(`<div class="dropdown-item" id="dept-${departments[i].department_id}"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${departments[i].department_name}</div>`);
                $("#filter-drop-department").next(".dropdown-menu").append(`<div class="dropdown-item">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="filter-department-${departments[i].department_id}">
                        <label class="form-check-label" for="filter-department-${departments[i].department_id}">${departments[i].department_name}
                        </label>
                    </div>
                </div>`);
            }

            
            //for (let i = 0; i < departments.length; ++i) {
            //    $("#filter-drop-department").next(".dropdown-menu").append(`<div class="dropdown-item">
            //        <div class="form-check">
            //            <input class="form-check-input" type="checkbox" value="" id="filter-department-${departments[i].department_id}">
            //            <label class="form-check-label" for="filter-department-${departments[i].department_id}">${departments[i].department_name}
            //            </label>
            //        </div>
            //    </div>`);
            //}
        }
    });

    $.ajax({
        url: '/Employee/RenderListTitles',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'get',
        success: function (response) {
            titles = response;
            $("#drop-title").next(".dropdown-menu").find(".dropdown-item").remove();
            $("#filter-drop-title").next(".dropdown-menu").find(".dropdown-item").remove();
            for (let i = 0; i < titles.length; ++i) {
                $("#drop-title").next(".dropdown-menu").append(`<div class="dropdown-item" id="tit-${titles[i].title_id}"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${titles[i].title_name}</div>`);

                $("#filter-drop-title").next(".dropdown-menu").find(".dropdown-item").remove();
                $("#filter-drop-title").next(".dropdown-menu").append(`<div class="dropdown-item">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="filter-title-${titles[i].title_id}">
                        <label class="form-check-label" for="filter-title-${titles[i].title_id}">${titles[i].title_name}
                        </label>
                    </div>
                </div>`);
            }
        }
    });

    $.ajax({
        url: '/Employee/RenderListEmployees',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'get',
        success: function (response) {
            names = response;

            $(".drop-employee").next(".dropdown-menu").find(".dropdown-item").remove();
            for (let i = 0; i < names.length; ++i) {
                $(".drop-employee").next(".dropdown-menu").append(`<div class="dropdown-item" id="emp-${names[i].id}"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${names[i].id} - ${names[i].last_name} ${names[i].first_name}</div>`);
            }
        }
    });

    $.ajax({
        url: '/Application/GetApplications',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'get',
        success: function (response) {
            names = response;

            // window.allEmps = response;
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
                            <div class="box-app" id="emp-${response[3 * i + j].id}" data-app='${JSON.stringify(response[3 * i + j])}' data-target="#modal-view-employee">
                                <div class="mix-ava-actions d-flex justity-content-center">
                                    <div class="ava-employee"><img src="/Store/Pics/default-ava.jpg" class="rounded-circle" width="100" height="100"/></div>
                                    <div class="toolbox-actions">
                                        <div class="box-applicant-status" style="background-color:${_tool.getColorOfApplicationStatus(response[3 * i + j].status)};width:20px;height:20px"></div>
                                    </div>
                                </div>
                                <div class="contain-info-employee">
                                    <div class="line-info-employee" id="employee-name">${response[3 * i + j].last_name} ${response[3 * i + j].first_name}</div>
                                    <div class="box-info-applicant">
                                        <ul>
                                            <li class="info-title">Chức danh: ${response[3 * i + j].title}</li>
                                            <li class="info-department">Phòng ban: ${response[3 * i + j].department}</li>
                                            <li class="info-degree">Học vị: ${response[3 * i + j].degree}</li>
                                            <li class="info-college">Đào tạo: ${response[3 * i + j].college}</li>
                                            <li class="info-wage">Yêu cầu lương: ${response[3 * i + j].require_wage}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>`);
                    }
                } // Nếu đang xét hàng lẻ
                else {
                    for (let j = 0; j < 3; ++j) {
                        $(".row-employee").last().append(`
                            <div class="box-app" id="emp-${response[3 * i + j].id}" data-app='${JSON.stringify(response[3 * i + j])}' data-target="#modal-view-employee">
                                <div class="mix-ava-actions d-flex justity-content-center">
                                    <div class="ava-employee"><img src="/Store/Pics/default-ava.jpg" class="rounded-circle" width="100" height="100"/></div>
                                    <div class="toolbox-actions">
                                        <div class="box-applicant-status" style="background-color:${_tool.getColorOfApplicationStatus(response[3 * i + j].status)};width:20px;height:20px"></div>
                                    </div>
                                </div>
                                <div class="contain-info-employee">
                                    <div class="line-info-employee" id="employee-name">${response[3 * i + j].last_name} ${response[3 * i + j].first_name}</div>
                                    <div class="box-info-applicant">
                                        <ul>
                                            <li class="info-title">Chức danh: ${response[3 * i + j].title}</li>
                                            <li class="info-department">Phòng ban: ${response[3 * i + j].department}</li>
                                            <li class="info-degree">Học vị: ${response[3 * i + j].degree}</li>
                                            <li class="info-college">Đào tạo: ${response[3 * i + j].college}</li>
                                            <li class="info-wage">Yêu cầu lương: ${response[3 * i + j].require_wage}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>`);
                    }
                } // Nếu đang xét hàng đủ
            }
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

$(document).on("click", "#btn-send-application", () => {
    let isValidate = true;

    $.extend(newEmployee, {
        last_name: $("#textbox-lastname").val(),
        first_name: $("#textbox-firstname").val(),
        college: $("#textbox-college").val(),
        phone: $("#textbox-phone").val(),
        email: $("#textbox-mail").val(),
        require_wage: $("#textbox-require-wage").val()
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
    else if (!validateInput.validateStringLength(newEmployee.college, 200) || !validateInput.validateNotEmpty(newEmployee.college)) {
        $(".warn").hide();
        $("#warn-college").show();
        isValidate = false;
    }
    else if (!validateInput.validatePhone(newEmployee.phone) || !validateInput.validateNotEmpty(newEmployee.phone)) {
        $(".warn").hide();
        $("#warn-phone").show();
        isValidate = false;
    }
    else if (!validateInput.validateEmail(newEmployee.email, 200) || !validateInput.validateNotEmpty(newEmployee.email)) {
        $(".warn").hide();
        $("#warn-mail").show();
        isValidate = false;
    }

    if (isValidate == true) {
        $(".warn").hide();
        for ([key, value] of Object.entries(newEmployee)) {
            newEmployee[key] = newEmployee[key].trim();
        }
        $.ajax({
            url: '/Application/SaveApplicant',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: newEmployee,
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Gửi đơn ứng tuyển thành công!");
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
        case "drop-title": {
            newEmployee.title = $(e.target).text().trim();
            _title = $(e.target).attr("id").substring(4);
            break;
        }
        case "drop-department": {
            newEmployee.department = $(e.target).text().trim();
            _department = $(e.target).attr("id").substring(5);
            break;
        }
        case "drop-degree": {
            newEmployee.degree = $(e.target).text().trim();
            break;
        }
        case "drop-conduct-employee": {
            conductEmployee = $(e.target).text().trim();
            break;
        }
        case "drop-recruiter": {
            _recruiter = $(e.target).attr("id").substring(4).trim();
            break;
        }
        case "drop-manager": {
            newEmployee.manager = $(e.target).text().trim();
            break;
        }
        case "drop-time-manager": {
            newEmployee.time_manager = $(e.target).text().trim();
            break;
        }
        case "drop-expense-manager": {
            newEmployee.expense_manager = $(e.target).text().trim();
            break;
        }
        case "drop-martial": {
            newEmployee.material_status = $(e.target).text().trim();
            break;
        }
        case "drop-gender": {
            newEmployee.gender = $(e.target).text().trim();
            break;
        }
        default: {
            break;
        }
    }
})

$("#btn-turn-on-off-filters").click(() => {
    if ($(".filter").hasClass("hide")) {
        $(".filter").removeClass("hide");
    }
    else {
        $(".filter").addClass("hide");
    }
})

$(document).on("click", ".btn-start-filter", (e) => {
    let depts = [];
    let tits = [];
    let requireWage = {
        gte: 0,
        lte: 0
    }
    let college;
    let degrees = [];

    $("#filter-department .dropdown-item").each((idx, itm) => {
        if ($(itm).find("input").is(":checked") == true)
            depts.push($(itm).find("input").attr("id").trim().substring(18));
    });

    $("#filter-title .dropdown-item").each((idx, itm) => {
        if ($(itm).find("input").is(":checked") == true)
            tits.push($(itm).find("input").attr("id").trim().substring(13));
    });

    if ($("#filter-wage-gte").val() != null && $("#filter-wage-gte").val() !== "")
        requireWage.gte = Number($("#filter-wage-gte").val());
    if ($("#filter-wage-lte").val() != null && $("#filter-wage-lte").val() !== "")
        requireWage.lte = Number($("#filter-wage-lte").val());
    if (requireWage.gte == 0 && requireWage.lte == 0)
        requireWage = null;

    college = $("#textbox-filter-college").val();

    $("#filter-degree .dropdown-item").each((idx, itm) => {
        if ($(itm).find("input").is(":checked") == true)
            degrees.push($(itm).find("input").attr("id").trim().substring(14));
    });

    $.ajax({
        url: '/Application/Filter',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: {
            depts: depts,
            tits: tits,
            requireWage: requireWage,
            college: college,
            degrees: degrees
        },
        type: 'post',
        success: function (response) {
            if (response.length != 0) {
                // window.allEmps = response;
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
                            <div class="box-app" id="emp-${response[3 * i + j].id}" data-app='${JSON.stringify(response[3 * i + j])}' data-target="#modal-view-employee">
                                <div class="mix-ava-actions d-flex justity-content-center">
                                    <div class="ava-employee"><img src="/Store/Pics/default-ava.jpg" class="rounded-circle" width="100" height="100"/></div>
                                    <div class="toolbox-actions">
                                        <div class="form-check">
                                          <input class="form-check-input" type="checkbox" value="" id="check-accept-${response[3 * i + j].id}">
                                          <label class="form-check-label" for="check-accept-${response[3 * i + j].id}">
                                          </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="contain-info-employee">
                                    <div class="line-info-employee" id="employee-name">${response[3 * i + j].last_name} ${response[3 * i + j].first_name}</div>
                                    <div class="box-info-applicant">
                                        <ul>
                                            <li class="info-title">Chức danh: ${response[3 * i + j].title}</li>
                                            <li class="info-department">Phòng ban: ${response[3 * i + j].department}</li>
                                            <li class="info-degree">Học vị: ${response[3 * i + j].degree}</li>
                                            <li class="info-college">Đào tạo: ${response[3 * i + j].college}</li>
                                            <li class="info-wage">Yêu cầu lương: ${response[3 * i + j].require_wage}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>`);
                        }
                    } // Nếu đang xét hàng lẻ
                    else {
                        for (let j = 0; j < 3; ++j) {
                            $(".row-employee").last().append(`
                            <div class="box-app" id="emp-${response[3 * i + j].id}" data-app='${JSON.stringify(response[3 * i + j])}' data-target="#modal-view-employee">
                                <div class="mix-ava-actions d-flex justity-content-center">
                                    <div class="ava-employee"><img src="/Store/Pics/default-ava.jpg" class="rounded-circle" width="100" height="100"/></div>
                                    <div class="toolbox-actions">
                                        <div class="form-check">
                                          <input class="form-check-input" type="checkbox" value="" id="check-accept-${response[3 * i + j].id}">
                                          <label class="form-check-label" for="check-accept-${response[3 * i + j].id}">
                                          </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="contain-info-employee">
                                    <div class="line-info-employee" id="employee-name">${response[3 * i + j].last_name} ${response[3 * i + j].first_name}</div>
                                    <div class="box-info-applicant">
                                        <ul>
                                            <li class="info-title">Chức danh: ${response[3 * i + j].title}</li>
                                            <li class="info-department">Phòng ban: ${response[3 * i + j].department}</li>
                                            <li class="info-degree">Học vị: ${response[3 * i + j].degree}</li>
                                            <li class="info-college">Đào tạo: ${response[3 * i + j].college}</li>
                                            <li class="info-wage">Yêu cầu lương: ${response[3 * i + j].require_wage}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>`);
                        }
                    } // Nếu đang xét hàng đủ
                }
            }
        }
    });
})

$(document).on("click", ".box-app", (e) => {
    let _tool = GetValueOfCode();
    $("#modal-view-applicant").modal("toggle");

    let data = JSON.parse($(e.currentTarget).attr("data-app"));
    $("#modal-create-employee").attr("data-app", $(e.currentTarget).attr("data-app"));

    if (data.status == 0)
        $(".symbol-status-applicant").css("background-color", "white");
    else if (data.status == 1)
        $(".symbol-status-applicant").css("background-color", "#dd96eb");
    else if (data.status == 2)
        $(".symbol-status-applicant").css("background-color", "#dbf549");
    else if (data.status == 3)
        $(".symbol-status-applicant").css("background-color", "#2b99c4");
    else if (data.status == 4)
        $(".symbol-status-applicant").css("background-color", "#24f2ae");
    else if (data.status == 5)
        $(".symbol-status-applicant").css("background-color", "#ed4e09");

    $(".title-status-applicant").text(_tool.getApplicantStatus(data.status));
    $(".label-applicant-name").text(`${data.last_name} ${data.first_name}`);
    $(".label-department-2").text(data.department);
    $(".label-title-2").text(data.title);
    $(".label-email-2").text(data.email);
    $(".label-phone-2").text(data.phone);
    $(".label-degree-2").text(data.degree);
    $(".label-college-2").text(data.college);
    $(".label-require-wage-2").text(data.require_wage);
})

$(document).on("click", ".box-applicant-status", (e) => {
    let proccessDate = ProccessDate();

    e.stopPropagation();

    $(".modal").modal("hide");
    $("#modal-change-status").modal("toggle");
    $("#modal-change-status").attr("data-appid", $(e.currentTarget).parents(".box-app").attr("id").split("-")[1]);

    let data = JSON.parse($(e.currentTarget).parents(".box-app").attr("data-app"));
    $("#modal-change-status").attr("data-currentStatus", Number(data.status));

    $(".checkbox-status").prop("checked", false);
    $(`.checkbox-status[id='checkbox-status-${$("#modal-change-status").attr("data-currentStatus")}']`).prop("checked", true);

    $("#calendar-conduct-date").val(proccessDate.formatDate(data.interview_date));
    $("#drop-conduct-employee").next(".dropdown-menu").find(".pre-selected").hide();
    let conductorItem = $("#drop-conduct-employee").next(".dropdown-menu").find(".dropdown-item");
    $(conductorItem).each((idx, itm) => {
        if ($(itm).text().trim().split(' ')[0] == `${data.interviewer_id}`) {
            $(itm).find(".pre-selected").show();
        }
    });
    //$.ajax({
    //    url: '/Application/Filter',
    //    contentType: 'application/x-www-form-urlencoded',
    //    dataType: 'json',
    //    data: {
    //        depts: depts,
    //        tits: tits,
    //        requireWage: requireWage,
    //        college: college,
    //        degrees: degrees
    //    },
    //    type: 'post',
    //    success: function (response) {
    //        if (response.length != 0) {

    //        }
    //    }
    //});
})

$(document).on("click", "#btn-save-change-status", (e) => {
    let status = Number($(".checkbox-status:checked").val());
    let conductDate = $("#calendar-conduct-date").val();

    $.ajax({
        url: '/Application/SaveStatus',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: {
            status: status,
            date: conductDate,
            emp: conductEmployee,
            applicantId: $(e.currentTarget).parents("#modal-change-status").attr("data-appid")
        },
        type: 'post',
        success: function (response) {
            if (response.success != false) {
                alert("Cập nhật trạng thái thành công!");
                location.reload();
            }
        }
    });
})

$(document).on("click", "#table-title-recruit tr", (e) => {
    $("#table-title-recruit tr").removeClass("selected-row");
    $(e.currentTarget).addClass("selected-row");

    $("#drop-department").next(".dropdown-menu").find(".pre-selected").hide();
    let departmentItem = $("#drop-department").next(".dropdown-menu").find(".dropdown-item");
    $(departmentItem).each((idx, itm) => {
        if ($(itm).text().trim() == $(e.currentTarget).find("td").eq(0).text().trim()) {
            $(itm).find(".pre-selected").show();
        }
        else {
            $(itm).find(".pre-selected").hide();
        }
        $(itm).addClass("disabled");
    });

    $("#drop-title").next(".dropdown-menu").find(".pre-selected").hide();
    let titleItem = $("#drop-title").next(".dropdown-menu").find(".dropdown-item");
    $(titleItem).each((idx, itm) => {
        if ($(itm).text().trim() == $(e.currentTarget).find("th").eq(0).text().trim()) {
            $(itm).find(".pre-selected").show();
        }
        else {
            $(itm).find(".pre-selected").hide();
        }
        $(itm).addClass("disabled");
    });

    $("#drop-recruiter").next(".dropdown-menu").find(".pre-selected").hide();
    let empItem = $("#drop-recruiter").next(".dropdown-menu").find(".dropdown-item");
    $(empItem).each((idx, itm) => {
        if ($(itm).text().trim() == $(e.currentTarget).find("td").eq(1).text().trim()) {
            $(itm).find(".pre-selected").show();
        }
        else {
            $(itm).find(".pre-selected").hide();
        }
    });

    $("#textbox-slot").val($(e.currentTarget).find("td").eq(2).text().trim());
})

//$(".contain-application").children().not("#table-title-recruit, .dropdown-item").click((e) => {
//    $("#table-title-recruit tr").removeClass("seleted-row");
//    $(".dropdown-item").prop("disabled", false);
//    $(".pre-selected").hide();
//    $("#textbox-slot").val();
//})

$(document).on("click", "#table-title-recruit .selected-row", (e) => {
    $("#table-title-recruit tr").removeClass("selected-row");
    $(".dropdown-item").removeClass("disabled");
    $(".pre-selected").hide();
    $("#textbox-slot").val();
})

$(document).on("click", "#btn-save-title", (e) => {
    let isValidate = true;

    let slot = Number($("#textbox-slot").val());

    if ($("#table-title-recruit").find("tr.selected-row").length == 0) {
        $.ajax({
            url: '/Application/SaveTitleRecruit',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: {
                _department: _department,
                _title: _title,
                _recruiter: _recruiter,
                slot: slot
            },
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Tạo mới chức danh tuyển dụng thành công!");
                    location.reload();
                }
            }
        });
    }
    else {
        $.ajax({
            url: '/Application/UpdateTitleRecruit',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: {
                _department: $("#table-title-recruit .selected-row").eq(0).find("td").eq(0).attr("id").substring(8),
                _title: $("#table-title-recruit .selected-row").eq(0).find("th").eq(0).attr("id").substring(7),
                _recruiter: _recruiter,
                slot: slot
            },
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Cập nhật chức danh tuyển dụng thành công!");
                    location.reload();
                }
            }
        });
    }
})

$(document).on("click", ".btn-remove-title-recruit", (e) => {
    let departmentId = $(e.currentTarget).parents("tr").find("td").eq(0).attr("id").substring(8);
    let titleId = $(e.currentTarget).parents("tr").find("th").eq(0).attr("id").substring(7);

    $.ajax({
        url: '/Application/RemoveTitleRecruit',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: {
            deptId: departmentId,
            titleId: titleId
        },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Xóa chức danh tuyển dụng thành công!");
                location.reload();
            }
        }
    });
})

// Hiển thị modal tạo nhân viên cho ứng viên tương ứng
$(document).on("click", "#btn-create-corresponding-emp", (e) => {
    $(".modal").modal("hide");
    $("#modal-create-employee").modal("toggle");

    let data = JSON.parse($("#modal-create-employee").attr("data-app"));
    // Load các trường mặc định
    $("#textbox-lastname").val(data.last_name);
    $("#textbox-firstname").val(data.first_name);
    $("#textbox-degree").val(data.degree);
    $("#textbox-college").val(data.college);
    $("#textbox-department").val(data.department);
    $("#textbox-title").val(data.title);
    $("#textbox-phone").val(data.phone);
    $("#textbox-mail").val(data.email);
    // Load các giá trị dropdown
    // Bắt sự kiện chọn item trong dropdown
    $.fn.editable.defaults.mode = 'inline';
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
})

$(document).on("click", "#btn-save-employee", (e) => {
    // Lưu các giá trị thiết lập vào biến tạm
    $.extend(newEmployee, {
        last_name: $("#textbox-lastname").val().trim(),
        first_name: $("#textbox-firstname").val().trim(),
        number_of_children: $("#textbox-children").val().trim(),
        major: $("#textbox-major").val().trim(),
        college: $("#textbox-college").val().trim(),
        bank_account: $("#textbox-bank").val().trim(),
        distance_from_home: $("#textbox-distance").val().trim(),
        unit: "m",
        birthday: $("#calendar-birth").val().trim(),
        born_place: $("#textbox-birthwhere").val().trim(),
        phone: $("#textbox-phone").val().trim(),
        emergency_phone: $("#textbox-phone-emergency").val().trim(),
        emergency_contact_man: $("#textbox-contact-emergency").val().trim(),
        address: $("#textbox-address").val().trim(),
        email: $("#textbox-mail").val().trim(),
        identity_citizen_id: $("#textbox-identity-card").val().trim(),
        degree: $("#textbox-degree").val().trim(),
        department: $("#textbox-department").val(),
        title: $("#textbox-title").val()
    })

    let listStandardWorkTimes = [];
    for (let i = 0; i < 12; ++i) {
        listStandardWorkTimes.push({
            month: i + 1,
            standard_work_time: $(".standard-work-time").eq(i).text().trim()
        });
    }

    newEmployee.standard_work_time = listStandardWorkTimes;

    // Đẩy dữ liệu cho server xử lí
    $.ajax({
        url: '/Employee/SaveEmployee',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: {
            newEmployee: newEmployee
        },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Thêm nhân viên mới thành công!");
                location.reload();
            }
        }
    });
})