$(".item-bar").on("click", (e) => {
    $(".item-bar").removeClass("active");
    $(e.currentTarget).addClass("active");
})