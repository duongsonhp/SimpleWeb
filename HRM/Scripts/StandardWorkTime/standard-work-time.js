$.fn.editable.defaults.mode = 'inline'; 

$.ajax({
    url: 'RenderListStandardWorkTime',
    contentType: 'application/x-www-form-urlencoded',
    dataType: 'json',
    type: 'get',
    success: function (response) {
        $("#table-standard-work-time").find("tbody tr").remove();
        // names = response;
        $.each(response, (idx, itm) => {
            $("#table-standard-work-time").find("tbody").append(`
                <tr>
                    <th scope="row">${itm.id}</th>
                    <td><a href="#" id="amount-time-${itm.id}">${itm.amount_time}</a></td>
                    <td><a href="#" id="unit-${itm.id}">${itm.unit}</a></td>
                    <td><a href="#" id="period-${itm.id}">${itm.period}</a></td>
                    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill btn-save-standard-work-time" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg></td>
                    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill btn-remove-standard-work-time" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg></td>
                </tr>
            `);

            $(`#amount-time-${itm.id}`).editable({
                type: 'text',
                // pk: 1,
                url: '',
                title: 'Thời lượng',
                value: `${itm.amount_time}`
            });

            let valueUnit = 1;
            switch (itm.unit) {
                case "Giờ": {
                    valueUnit = 1;
                    break;
                }
                case "Ngày": {
                    valueUnit = 2;
                    break;
                }
                default: {
                    break;
                }
            };
            $(`#unit-${itm.id}`).editable({
                type: 'select',
                // pk: 1,
                url: '',
                title: 'Đơn vị',
                value: valueUnit,
                source: [
                    { value: 1, text: 'Giờ' },
                    { value: 2, text: 'Ngày' },
                ]
            });

            let valuePeriod = 2;
            switch (itm.period) {
                case "Ngày": {
                    valuePeriod = 1;
                    break;
                }
                case "Tháng": {
                    valuePeriod = 2;
                    break;
                }
                case "Tuần": {
                    valuePeriod = 3;
                    break;
                }
                default: {
                    break;
                }
            };
            $(`#period-${itm.id}`).editable({
                type: 'select',
                // pk: 1,
                value: valuePeriod,
                url: '',
                title: 'Khoảng thời gian',
                source: [
                    { value: 1, text: 'Ngày' },
                    { value: 2, text: 'Tháng' },
                    { value: 3, text: 'Tuần' }
                ]
            });
        });

    }
});

$("#btn-create-standard-work-time").on("click", (e) => {
    let newId;
    if ($("#table-standard-work-time").find("tbody tr").last().find("th").length > 0)
        newId = parseInt($("#table-standard-work-time").find("tbody tr").last().find("th").text(), 10) + 1;
    else
        newId = 1;
    $("#table-standard-work-time").find("tbody").append(`
        <tr>
            <th scope="row">${newId}</th>
            <td><a href="#" id="amount-time-${newId}">40</a></td>
            <td><a href="#" id="unit-${newId}">Giờ</a></td>
            <td><a href="#" id="period-${newId}">Tuần</a></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill btn-save-standard-work-time" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill btn-remove-standard-work-time" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg></td>
        </tr>
    `);

    $(`#amount-time-${newId}`).editable({
        type: 'text',
        // pk: 1,
        url: '',
        title: 'Thời lượng',
        value: '40'
    });

    $(`#unit-${newId}`).editable({
        type: 'select',
        // pk: 1,
        url: '',
        title: 'Đơn vị',
        value: 1,
        source: [
            { value: 1, text: 'Giờ' },
            { value: 2, text: 'Ngày' },
        ]
    });

    $(`#period-${newId}`).editable({
        type: 'select',
        // pk: 1,
        value: 3,
        url: '',
        title: 'Khoảng thời gian',
        source: [
            { value: 1, text: 'Ngày' },
            { value: 2, text: 'Tháng' },
            { value: 3, text: 'Tuần' }
        ]
    });
})

$(document).on("click", ".btn-save-standard-work-time", (e) => {
    let id = $(e.currentTarget).parents("tr").find("th").first().text();
    let data = {
        id: id,
        amount_time: $(e.currentTarget).parents("tr").find(`#amount-time-${id}`).text(),
        unit: $(e.currentTarget).parents("tr").find(`#unit-${id}`).text(),
        period: $(e.currentTarget).parents("tr").find(`#period-${id}`).text(),
    };

    $.ajax({
        url: 'UpdateStandardWorkTime',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'post',
        data: data,
        success: function (response) {
            // renderEmployees(response);
            if (response.success == true) {
                alert("Cập nhật/Thêm mới giờ công tiêu chuẩn thành công!");
            }
        }
    });
})

$(document).on("click", ".btn-remove-standard-work-time", (e) => {
    let id = $(e.currentTarget).parents("tr").find("th").first().text();

    $.ajax({
        url: 'RemoveStandardWorkTime',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'post',
        data: {id: id},
        success: function (response) {
            // renderEmployees(response);
            if (response.success == true) {
                alert("Xóa giờ công tiêu chuẩn thành công");
                location.reload();
            }
        }
    });
})