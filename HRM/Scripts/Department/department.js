let departments = [];
let employees = [];

// Load nhân viên
$.ajax({
    url: '/Employee/RenderListEmployees',
    contentType: 'application/x-www-form-urlencoded',
    dataType: 'json',
    type: 'get',
    success: function (response) {
        /*if (response.success == true) {*/

        employees = response;
        /*}*/
    }
})

// Load phòng ban
$.ajax({
    url: 'RenderDepartments',
    contentType: 'application/x-www-form-urlencoded',
    dataType: 'json',
    type: 'get',
    success: function (response) {
        /*if (response.success == true) {*/

        departments = response;

        $.each(response, (idx, itm) => {
            $("#table-department").find("tbody").append(`
                    <tr data-deptid="${itm.department_id}" data-deptname="${itm.department_name}" data-managerid="${itm.manager_id}" data-parentid="${itm.parent_id}">
                        <th scope="row">${itm.department_id}</th>
                        <td>${itm.department_name}</td>
                        <td><div class="action-remove-department">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                            </div></td>
                    </tr>
                `);
        });
        /*}*/
    }
});

// Xem phòng ban
$("#table-department").on("click", "tr", (e) => {
    // $.fn.editable.defaults.mode = 'inline';

    $(".modal").modal("hide");
    $("#modal-update-department").modal("toggle");

    $("#label-department-id").text(`ID phòng ban: ${$(e.currentTarget).attr("data-deptid")}`)
    $("#textbox-department-name").val($(e.currentTarget).attr("data-deptname"));
    // $("#textbox-department-name").prop("disabled", true);
    $("#modal-update-department").attr("data-deptid", $("#label-department-id").text().trim().split(" ").slice(-1).pop());
    // $("#table-activities").find("tbody tr").remove();

    $("#drop-manager").next(".dropdown-menu").find(".dropdown-item").remove();
    for (let i = 0; i < employees.length; ++i) {
        $("#drop-manager").next(".dropdown-menu").append(`<div class="dropdown-item"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${employees[i].id} - ${employees[i].last_name} ${employees[i].first_name}</div>`);
    }

    $("#drop-manager").next(".dropdown-menu").find(".pre-selected").hide();
    let employeeItem = $("#drop-manager").next(".dropdown-menu").find(".dropdown-item");
    $(employeeItem).each((idx, itm) => {
        if ($(itm).text().trim().split(' - ')[0] == $(e.currentTarget).attr("data-managerid").trim()) {
            $(itm).find(".pre-selected").show();
        }
    });

    $("#drop-parent-department").next(".dropdown-menu").find(".dropdown-item").remove();
    for (let i = 0; i < departments.length; ++i) {
        $("#drop-parent-department").next(".dropdown-menu").append(`<div class="dropdown-item"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${departments[i].department_name}</div>`);
    }

    $("#drop-parent-department").next(".dropdown-menu").find(".pre-selected").hide();
    let departmentItem = $("#drop-parent-department").next(".dropdown-menu").find(".dropdown-item");
    $(departmentItem).each((idx, itm) => {
        let currentDept = departments.filter(d => d.department_name.trim() == $(itm).text().trim())[0];
        if (currentDept.department_id.trim() == $(e.currentTarget).attr("data-parentid").trim()) {
            $(itm).find(".pre-selected").show();
        }
    });
})

$(document).on("click", "#btn-save-modify-department", (e) => {
    let deptId = $(e.currentTarget).parents("#modal-update-department").attr("data-deptid").trim();
    let updated = {};

    updated.manager_id = "";
    $("#drop-manager").next(".dropdown-menu").find(".pre-selected").each((idx, itm) => {
        if ($(itm).css("display") != "none")
            updated.manager_id = $(itm).parents(".dropdown-item").text().trim().split(" - ")[0];
    });

    updated.parent_id = "";
    $("#drop-parent-department").next(".dropdown-menu").find(".pre-selected").each((idx, itm) => {
        if ($(itm).css("display") != "none") {
            let parentId = departments.filter(d => d.department_name.trim() == $(itm).parents(".dropdown-item").text().trim())[0];
            updated.parent_id = parentId;
        }
    });

    $.extend(updated, {
        department_id: deptId,
        department_name: $("#textbox-department-name").val().trim()
    })
    //updated = {
    //    department_id: deptId,
    //    department_name: $("#textbox-department-name").val().trim()
    //}

    $.ajax({
        url: 'UpdateDepartment',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { updated: updated },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Cập nhật phòng ban thành công!");
            }
        }
    });
})

$(document).on("click", "#btn-create-department", (e) => {
    $(".modal").modal("hide");
    $("#modal-create-department").modal("toggle");

    $("#drop-create-manager").next(".dropdown-menu").find(".dropdown-item").remove();
    for (let i = 0; i < employees.length; ++i) {
        $("#drop-create-manager").next(".dropdown-menu").append(`<div class="dropdown-item"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${employees[i].id} - ${employees[i].last_name} ${employees[i].first_name}</div>`);
    }

    //$("#drop-manager").next(".dropdown-menu").find(".pre-selected").hide();
    //let employeeItem = $("#drop-manager").next(".dropdown-menu").find(".dropdown-item");
    //$(employeeItem).each((idx, itm) => {
    //    if ($(itm).text().trim().split(' - ')[0] == $(e.currentTarget).attr("data-managerid").trim()) {
    //        $(itm).find(".pre-selected").show();
    //    }
    //});

    $("#drop-create-parent-department").next(".dropdown-menu").find(".dropdown-item").remove();
    for (let i = 0; i < departments.length; ++i) {
        $("#drop-create-parent-department").next(".dropdown-menu").append(`<div class="dropdown-item"><span class="pre-selected"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg></span>${departments[i].department_name}</div>`);
    }

    //$("#drop-parent-department").next(".dropdown-menu").find(".pre-selected").hide();
    //let departmentItem = $("#drop-parent-department").next(".dropdown-menu").find(".dropdown-item");
    //$(departmentItem).each((idx, itm) => {
    //    let currentDeptId = departments.filter(d => d.department_name.trim() == $(itm).text().trim())[0];
    //    if (currentDeptId == $(e.currentTarget).attr("data-parentid").trim()) {
    //        $(itm).find(".pre-selected").show();
    //    }
    //});
})

$(document).on("click", ".action-remove-department", (e) => {
    e.stopPropagation();
    $(e.currentTarget).parents("tr").remove();
    let deptId = $(e.currentTarget).parents("tr").attr("data-deptid").trim();

    $.ajax({
        url: 'RemoveDepartment',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { deptId: deptId },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Xóa phòng ban thành công!");
                location.reload();
            }
        }
    });
})

$(document).on("click", "#btn-save-create-department", (e) => {
    let added = {};
    let newPlan;

    added.manager_id = "";
    $("#drop-create-manager").next(".dropdown-menu").find(".pre-selected").each((idx, itm) => {
        if ($(itm).css("display") != "none")
            added.manager_id = $(itm).parents(".dropdown-item").text().trim().split(" - ")[0];
    });

    added.parent_id = "";
    $("#drop-create-parent-department").next(".dropdown-menu").find(".pre-selected").each((idx, itm) => {
        if ($(itm).css("display") != "none") {
            let parent = departments.filter(d => d.department_name.trim() == $(itm).parents(".dropdown-item").text().trim())[0];
            added.parent_id = parent.department_id;
        }
    });

    $.extend(added, {
        department_name: $("#textbox-create-deparment-name").val().trim()
    });
    //added = {
    //    department_name: $("#textbox-create-deparment-name").val().trim()
    //}

    $.ajax({
        url: 'SaveDepartment',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { added: added },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Tạo mới phòng ban thành công!");
                location.reload();
            }
        }
    });
})

$(".dropdown-menu").on("click", ".dropdown-item", (e) => {
    $(e.target).siblings().find(".pre-selected").hide();
    $(e.target).find(".pre-selected").show();
})