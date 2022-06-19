let products = [];
let employees = [];
// Load phòng ban
$.ajax({
    url: 'RenderProducts',
    contentType: 'application/x-www-form-urlencoded',
    dataType: 'json',
    type: 'get',
    success: function (response) {
        /*if (response.success == true) {*/
        $.fn.editable.defaults.mode = 'inline';
        products = response;

        $.each(response, (idx, itm) => {
            $("#table-product").find("tbody").append(`
                    <tr data-productid="${itm.id}" data-productname="${itm.name}" class="updated">
                        <th scope="row">${itm.id}</th>
                        <td><a href="#" class="editable-product-name"></a></td>
                        <td><a href="#" class="editable-product-price"></a></td>
                        <td><div class="action-save-product">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>
                        </div>
                        </td>
                        <td><div class="action-remove-product">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                            </div></td>
                    </tr>
                `);

            $(".editable-product-name").last().editable({
                type: 'text',
                value: itm.name
            });

            $(".editable-product-price").last().editable({
                type: 'text',
                value: itm.value
            });
        });
        /*}*/
    }
});

$(document).on("click", ".action-save-product", (e) => {
    let productId = $(e.currentTarget).parents("tr").attr("data-productid").trim();
    let updated = {};

    updated.id = $(e.currentTarget).parents("tr").attr("data-productid");
    updated.name = $(e.currentTarget).parents("tr").find(".editable-product-name").text().trim();
    updated.value = $(e.currentTarget).parents("tr").find(".editable-product-price").text().trim();

    if ($(e.currentTarget).parents("tr").hasClass("updated") == true) {
        $.ajax({
            url: 'UpdateProduct',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: { updated: updated },
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Cập nhật sản phẩm thành công!");
                    location.reload();
                }
            }
        });
    }
    else {
        $.ajax({
            url: 'SaveProduct',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: { added: updated },
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Thêm mới sản phẩm thành công!");
                    location.reload();
                }
            }
        });
    }
})

$(document).on("click", ".action-remove-product", (e) => {
    e.stopPropagation();
    $(e.currentTarget).parents("tr").remove();
    let productId = $(e.currentTarget).parents("tr").attr("data-productid").trim();

    $.ajax({
        url: 'RemoveProduct',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { productId: productId },
        type: 'post',
        success: function (response) {
            if (response.success) {
                alert("Xóa sản phẩm thành công!");
                location.reload();
            }
        }
    });
})

$(document).on("click", "#btn-create-product", (e) => {
    $.fn.editable.defaults.mode = 'inline';
    $("#table-product").find("tbody").append(`
                    <tr data-productid="" data-productname="">
                        <th scope="row"></th>
                        <td><a href="#" class="editable-product-name"></a></td>
                        <td><a href="#" class="editable-product-price"></a></td>
                        <td><div class="action-save-product">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>
                        </div>
                        </td>
                        <td><div class="action-remove-product">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                            </div></td>
                    </tr>
                `);

    $(".editable-product-name").last().editable({
        type: 'text',
        value: "Mặc định",
        url: '',
        title: 'Tên sản phẩm'
    });

    $(".editable-product-price").last().editable({
        type: 'text',
        value: "1000000",
        url: '',
        title: 'Đơn giá'
    });
})