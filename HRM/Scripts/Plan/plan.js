$.ajax({
    url: 'RenderPlans',
    contentType: 'application/x-www-form-urlencoded',
    dataType: 'json',
    type: 'get',
    success: function (response) {
        /*if (response.success == true) {*/
            $.each(response, (idx, itm) => {
                $("#table-plan").find("tbody").append(`
                    <tr data-planid="${itm.id}" data-planname="${itm.plan_name}">
                        <th scope="row">${itm.id}</th>
                        <td>${itm.plan_name}</td>
                        <td><div class="action-remove-plan">
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

// Xem kế hoạch
$("#table-plan").on("click", "tr", (e) => {
    $.fn.editable.defaults.mode = 'inline';

    $(".modal").modal("hide");
    $("#modal-update-plan").modal("toggle");

    $("#label-plan-id").text(`ID kế hoạch: ${$(e.currentTarget).attr("data-planid")}`)
    $("#textbox-planname").val($(e.currentTarget).attr("data-planname"));
    $("#textbox-planname").prop("disabled", true);
    $("#modal-update-plan").attr("data-planid", $("#label-plan-id").text().match(/\d+/gi)[0].trim());
    $("#table-activities").find("tbody tr").remove();

    $.ajax({
        url: 'GetActivities',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { planId: $(e.currentTarget).attr("data-planid")},
        type: 'get',
        success: function (response) {
            let proccessDate = ProccessDate();
            // if (response.success == true) {
                $.each(response, (idx, itm) => {
                    $("#table-activities").find("tbody").append(`
                        <tr class="updated">
                            <td><a href="#" class="activity-name">${itm.job_name}</a></td>
                            <td><a href="#" class="activity-role"></a></td>
                            <td><a href="#" class="activity-deadline"></a></td>
                            <td><div class="action-remove-activity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                            </div></td>
                        </tr>
                    `);

                    //$("#table-activities").find("tbody tr").last().find(".activity-name").editable({
                    //    type: 'text',
                    //    value: itm.job_name,
                    //    title: 'Tên hoạt động'
                    //});

                    $("#table-activities").find("tbody tr").last().find(".activity-role").editable({
                        type: 'select',
                        value: itm.conduct_role_id,
                        title: 'Gán cho',
                        source: [
                            { value: 1, text: 'Bản thân' },
                            { value: 2, text: 'Quản lí' },
                            { value: 3, text: 'Quản lí thời gian' },
                            { value: 4, text: 'Quản lí chi phí' },
                            { value: 5, text: 'Khác' }
                        ]
                    })

                    $("#table-activities").find("tbody tr").last().find(".activity-deadline").editable({
                        type: 'date',
                        value: proccessDate.formatDate(itm.deadline),
                        title: 'Hạn chót'
                    })
                })
            // }
        }
    });
})

$(document).on("click", ".btn-add-activities", (e) => {
    $("#table-activities").find("tbody").append(`
        <tr class="added">
            <td><a href="#" class="activity-name"></a></td>
            <td><a href="#" class="activity-role"></a></td>
            <td><a href="#" class="activity-deadline"></a></td>
            <td><div class="action-remove-activity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                            </div></td>
        </tr>
    `);

    $("#table-activities").find("tbody tr").last().find(".activity-name").editable({
        type: 'text',
        value: 'Mặc định',
        title: 'Tên hoạt động'
    });

    $("#table-activities").find("tbody tr").last().find(".activity-role").editable({
        type: 'select',
        value: 1,
        title: 'Gán cho',
        source: [
            { value: 1, text: 'Bản thân' },
            { value: 2, text: 'Quản lí' },
            { value: 3, text: 'Quản lí thời gian' },
            { value: 4, text: 'Quản lí chi phí' },
            { value: 5, text: 'Khác' }
        ]
    })

    $("#table-activities").find("tbody tr").last().find(".activity-deadline").editable({
        type: 'date',
        value: '1970-01-01',
        title: 'Hạn chót'
    })
})

$(document).on("click", "#btn-save-modify-plan", (e) => {
    let planId = $(e.currentTarget).parents("#modal-update-plan").attr("data-planid").trim();
    let updated = [];
    let added = [];

    $("#table-activities").find("tbody tr.updated").each((idx, itm) => {
        let role;
        let roleText = $(itm).find(".activity-role").text();
        if (roleText == "Bản thân")
            role = 1;
        else if (roleText == "Quản lí")
            role = 2;
        else if (roleText == "Quản lí thời gian")
            role = 3;
        else if (roleText == "Quản lí chi phí")
            role = 4;
        else 
            role = 5

        updated.push({
            plan_id: planId,
            job_name: $(itm).find(".activity-name").text(),
            conduct_role_id: role,
            deadline: $(itm).find(".activity-deadline").text()
        });
    });

    $("#table-activities").find("tbody tr.added").each((idx, itm) => {
        let role;
        let roleText = $(itm).find(".activity-role").text();
        if (roleText == "Bản thân")
            role = 1;
        else if (roleText == "Quản lí")
            role = 2;
        else if (roleText == "Quản lí thời gian")
            role = 3;
        else if (roleText == "Quản lí chi phí")
            role = 4;
        else role = 5

        added.push({
            plan_id: planId,
            job_name: $(itm).find(".activity-name").text(),
            conduct_role_id: role,
            deadline: $(itm).find(".activity-deadline").text()
        });
    });

    $.ajax({
        url: 'UpdateActivitiesForPlan',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { updated: updated, created: added },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Cập nhật/Tạo mới hoạt động thành công!");
            }
        }
    });
})

$(document).on("click", ".action-remove-activity", (e) => {
    let removedName = $(e.currentTarget).parents("td").siblings("td").find(".activity-name").text().trim();
    let planId = $(e.currentTarget).parents("#modal-update-plan").attr("data-planid").trim();

    $.ajax({
        url: 'RemoveActivityForPlan',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { planId: planId, jobName: removedName },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Xóa hoạt động thành công!");
            }
        }
    });
})

$(document).on("click", "#btn-create-plan", (e) => {
    $(".modal").modal("hide");
    $("#modal-create-plan").modal("toggle");
})

$(document).on("click", ".btn-new-plan-add-activities", (e) => {
    $.fn.editable.defaults.mode = 'inline'; 

    $("#table-new-plan-activities").find("tbody").append(`
        <tr>
            <td><a href="#" class="activity-name"></a></td>
            <td><a href="#" class="activity-role"></a></td>
            <td><a href="#" class="activity-deadline"></a></td>
            <td><div class="action-remove-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg>
            </div></td>
        </tr>
    `);

    $("#table-new-plan-activities").find("tbody tr").last().find(".activity-name").editable({
        type: 'text',
        value: 'Mặc định',
        title: 'Tên hoạt động',
        url: ''
    });

    $("#table-new-plan-activities").find("tbody tr").last().find(".activity-role").editable({
        type: 'select',
        value: 1,
        title: 'Gán cho',
        source: [
            { value: 1, text: 'Bản thân' },
            { value: 2, text: 'Quản lí' },
            { value: 3, text: 'Quản lí thời gian' },
            { value: 4, text: 'Quản lí chi phí' },
            { value: 5, text: 'Khác' }
        ],
        url: ''
    })

    $("#table-new-plan-activities").find("tbody tr").last().find(".activity-deadline").editable({
        type: 'date',
        value: '1970-01-01',
        url: '',
        title: 'Hạn chót',
    })
})

$(document).on("click", ".action-remove-row", (e) => {
    $(e.currentTarget).parents("tr").remove();
})

$(document).on("click", ".action-remove-plan", (e) => {
    e.stopPropagation();
    $(e.currentTarget).parents("tr").remove();
    let planId = $(e.currentTarget).parents("tr").attr("data-planid").trim();

    $.ajax({
        url: 'RemovePlan',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { planId: planId },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Xóa kế hoạch thành công!");
                location.reload();
            }
        }
    });
})

$(document).on("click", "#btn-save-create-plan", (e) => {
    // let planId = $(e.currentTarget).parents("#modal-update-plan").attr("data-planid").trim();
    let updated = [];
    let added = [];
    let newPlan;


    newPlan = {
        plan_name: $(e.currentTarget).parents("#modal-create-plan").find("#textbox-create-planname").val().trim()
    }

    $("#table-new-plan-activities").find("tbody tr").each((idx, itm) => {
        let role;
        let roleText = $(itm).find(".activity-role").text();
        if (roleText == "Bản thân")
            role = 1;
        else if (roleText == "Quản lí")
            role = 2;
        else if (roleText == "Quản lí thời gian")
            role = 3;
        else if (roleText == "Quản lí chi phí")
            role = 4;
        else
            role = 5

        added.push({
            job_name: $(itm).find(".activity-name").text(),
            conduct_role_id: role,
            deadline: $(itm).find(".activity-deadline").text()
        });
    });

    $.ajax({
        url: 'CreatePlan',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { plan: newPlan, activities: added },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Cập nhật/Tạo mới hoạt động thành công!");
            }
        }
    });
})