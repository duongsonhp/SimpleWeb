let departments = [];
let employees = [];
// Load phòng ban
$.ajax({
    url: 'RenderTitles',
    contentType: 'application/x-www-form-urlencoded',
    dataType: 'json',
    type: 'get',
    success: function (response) {
        /*if (response.success == true) {*/
        $.fn.editable.defaults.mode = 'inline';
        departments = response;

        $.each(response, (idx, itm) => {
            $("#table-title").find("tbody").append(`
                    <tr data-titleid="${itm.title_id}" data-titlename="${itm.title_name}" class="updated">
                        <th scope="row">${itm.title_id}</th>
                        <td><a href="#" class="editable-title-name"></a></td>
                        <td><div class="action-save-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>
                        </div>
                        </td>
                        <td><div class="action-remove-title">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                            </div></td>
                    </tr>
                `);

            $(".editable-title-name").last().editable({
                type: 'text',
                value: itm.title_name
            });
        });
        /*}*/
    }
});

$(document).on("click", ".action-save-title", (e) => {
    let titleId = $(e.currentTarget).parents("tr").attr("data-titleid").trim();
    let updated = {};

    updated.title_id = $(e.currentTarget).parents("tr").attr("data-titleid");
    updated.title_name = $(e.currentTarget).parents("tr").find(".editable-title-name").text().trim();

    if ($(e.currentTarget).parents("tr").hasClass("updated") == true) {
        $.ajax({
            url: 'UpdateTitle',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: { updated: updated },
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Cập nhật chức danh thành công!");
                    location.reload();
                }
            }
        });
    }
    else {
        $.ajax({
            url: 'SaveTitle',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: { added: updated },
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Thêm mới chức danh thành công!");
                    location.reload();
                }
            }
        });
    }
})

$(document).on("click", ".action-remove-department", (e) => {
    e.stopPropagation();
    $(e.currentTarget).parents("tr").remove();
    let titleId = $(e.currentTarget).parents("tr").attr("data-titleid").trim();

    $.ajax({
        url: 'RemoveTitle',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { titleId: titleId },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Xóa chức danh thành công!");
                location.reload();
            }
        }
    });
})

$(document).on("click", "#btn-create-title", (e) => {
    $.fn.editable.defaults.mode = 'inline';
    $("#table-title").find("tbody").append(`
                    <tr data-titleid="" data-titlename="">
                        <th scope="row"></th>
                        <td><a href="#" class="editable-title-name"></a></td>
                        <td><div class="action-save-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>
                        </div>
                        </td>
                        <td><div class="action-remove-title">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                            </div></td>
                    </tr>
                `);

    $(".editable-title-name").last().editable({
        type: 'text',
        value: "Mặc định",
        url: '',
        title: 'Chức danh'
    });
})