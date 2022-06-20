// Xử lí sự kiện bấm xem thêm
let divDetail = document.getElementsByClassName("div-detail");
let divDetailCount = divDetail.length;
for (let i = 0; i < divDetailCount; ++i) {
    divDetail[i].addEventListener("click", (e) => {
        if (e.currentTarget.parentElement.parentElement.getElementsByClassName("detail-paragraph")[0].style.display === 'none') {
            e.currentTarget.parentElement.parentElement.getElementsByClassName("detail-paragraph")[0].style.display = 'block';
        }
        else {
            e.currentTarget.parentElement.parentElement.getElementsByClassName("detail-paragraph")[0].style.display = 'none';
        }
    });
}

// Xử lí sự kiện bấm chỉnh sửa
let divUpdate = document.getElementsByClassName("div-update");
let divUpdateCount = divUpdate.length;
for (let i = 0; i < divUpdateCount; ++i) {
    divUpdate[i].addEventListener("click", (e) => {
        let divFormUpdate = e.currentTarget.closest(".div-itemnews").nextSibling.nextElementSibling;
        divFormUpdate.classList.toggle('hide-form');
        divFormUpdate.classList.toggle('hide');

        if (divFormUpdate.classList.contains("hide") == false) {
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                //document.getElementById("txtHint").innerHTML =
                //    this.responseText;
                // console.log("a");
                let article = JSON.parse(this.responseText);
                divFormUpdate.querySelector("[name=title]").value = article.title;
                divFormUpdate.querySelector("[name=brief]").value = article.brief;
                divFormUpdate.querySelector("[name=content]").value = article.content;
            }
            xhttp.open("GET", "/Information/GetArticle?id=" + divFormUpdate.getAttribute("data-id"));
            xhttp.send();
        }
        else {
            divFormUpdate.querySelector("[name=title]").value = article.title;
            divFormUpdate.querySelector("[name=brief]").value = article.brief;
            divFormUpdate.querySelector("[name=content]").value = article.content;
        }
    });
}

// Xử lí sự kiện bấm xóa
let divRemove = document.getElementsByClassName("div-remove");
let divRemoveCount = divRemove.length;
for (let i = 0; i < divRemoveCount; ++i) {
    divRemove[i].addEventListener("click", (e) => {
        let id = Number(e.currentTarget.getAttribute("data-id"));
        let title = e.currentTarget.getAttribute("data-title");
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            // document.getElementById("demo").innerHTML = this.responseText;
            alert(`Xóa thành công tin '${title}'`);
            location.reload();
        }
        xhttp.open("POST", "/Information/RemoveArticle");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("id=" + id);
    });
}

// Xử lí sự kiện bấm Thêm tin mới
let divCreate = document.getElementById("div-create");
divCreate.addEventListener("click", (e) => {
    let divFormCreate = document.getElementById("div-form-update");
    divFormCreate.classList.toggle('hide-form');
    divFormCreate.classList.toggle('hide');

    if (divFormCreate.classList.contains("hide") == false) {
        divFormCreate.querySelector("[name=title]").value = '';
        divFormCreate.querySelector("[name=brief]").value = '';
        divFormCreate.querySelector("[name=content]").value = '';
    }
});