function generate_year_range(start, end) {
  var years = "";
  for (var year = start; year <= end; year++) {
      years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
}

var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");


var createYear = generate_year_range(1970, 2050);
/** or
* createYear = generate_year_range( 1970, currentYear );
*/

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');

var months = ["Th. 1", "Th. 2", "Th. 3", "Th. 4", "Th. 5", "Th. 6", "Th. 7", "Th. 8", "Th. 9", "Th. 10", "Th. 11", "Th. 12"];
var days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

var dayHeader = "<tr>";
for (day in days) {
  dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + "</th>";
}
dayHeader += "</tr>";

document.getElementById("thead-month").innerHTML = dayHeader;


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);



function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let urlTool = ProccessUrl();
    $.ajax({
        url: '/Employee/RenderExtraWorkTime',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        data: { empId: urlTool.getLastPartition(window.location.href), month: Number(month + 1), year: Number(year)},
        type: 'get',
        success: function (response) {
            let days = $.map(response, (r) => {
                return Number(r.work_date.split('/')[1]);
            });

            var firstDay = (new Date(year, month)).getDay();

            tbl = document.getElementById("calendar-body");


            tbl.innerHTML = "";


            monthAndYear.innerHTML = months[month] + " " + year;
            selectYear.value = year;
            selectMonth.value = month;

            // creating all cells
            var date = 1;
            for (var i = 0; i < 6; i++) {
                var row = document.createElement("tr");

                for (var j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDay) {
                        cell = document.createElement("td");
                        cellText = document.createTextNode("");
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    } else if (date > daysInMonth(month, year)) {
                        break;
                    } else {
                        cell = document.createElement("td");
                        cell.setAttribute("data-date", date);
                        cell.setAttribute("data-month", month + 1);
                        cell.setAttribute("data-year", year);
                        cell.setAttribute("data-month_name", months[month]);
                        cell.className = "date-picker";
                        cell.innerHTML = "<span>" + date + "</span>";

                        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                            cell.className = "date-picker selected";
                        }

                        if (days.indexOf(date) != -1) {
                            $(cell).css("background-color", "#d44828");
                            $(cell).attr("data-operation", "update");
                            let fullDay = `${month + 1}/${date}/${year}`;
                            let infoOfDay = response.filter(r => r.work_date == fullDay)[0];
                            
                            $(cell).attr("data-from", infoOfDay.from);
                            $(cell).attr("data-to", infoOfDay.to);
                        }

                        row.appendChild(cell);
                        date++;
                    }


                }

                tbl.appendChild(row);
            }

            var menu = [{
                name: 'Xóa',
                img: '/Store/Pics/icon-delete.png',
                title: 'Xóa giờ làm thêm',
                fun: function (e) {
                    let urlTool = ProccessUrl();
                    let employeeId = urlTool.getLastPartition(window.location.href);
                    let selectDate = `${$(e.trigger[0]).attr("data-year")}-${$(e.trigger[0]).attr("data-month")}-${$(e.trigger[0]).attr("data-date")}`;

                    $.ajax({
                        url: '/Employee/RemoveExtraWorkTime',
                        contentType: 'application/x-www-form-urlencoded',
                        dataType: 'json',
                        data: { empId: employeeId, date: selectDate },
                        type: 'post',
                        success: function (response) {
                            if (response.success) {
                                alert("Xóa giờ làm thêm thành công");
                                // $("#modal-register-extra-time").modal("toggle");
                                location.reload();
                            }
                        }
                    });
                }
            }];
            $(".date-picker").each((idx, itm) => {
                $(itm).contextMenu(menu, {
                    triggerOn: "click",
                    mouseClick: "right"
                });
            })
        }
    });

    //var firstDay = (new Date(year, month)).getDay();

    //tbl = document.getElementById("calendar-body");


    //tbl.innerHTML = "";


    //monthAndYear.innerHTML = months[month] + " " + year;
    //selectYear.value = year;
    //selectMonth.value = month;

    //// creating all cells
    //var date = 1;
    //for (var i = 0; i < 6; i++) {
    //    var row = document.createElement("tr");

    //    for (var j = 0; j < 7; j++) {
    //        if (i === 0 && j < firstDay) {
    //            cell = document.createElement("td");
    //            cellText = document.createTextNode("");
    //            cell.appendChild(cellText);
    //            row.appendChild(cell);
    //        } else if (date > daysInMonth(month, year)) {
    //            break;
    //        } else {
    //            cell = document.createElement("td");
    //            cell.setAttribute("data-date", date);
    //            cell.setAttribute("data-month", month + 1);
    //            cell.setAttribute("data-year", year);
    //            cell.setAttribute("data-month_name", months[month]);
    //            cell.className = "date-picker";
    //            cell.innerHTML = "<span>" + date + "</span>";

    //            if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
    //                cell.className = "date-picker selected";
    //            }
    //            row.appendChild(cell);
    //            date++;
    //        }


    //    }

    //    tbl.appendChild(row);
    //}
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

////////////////////////////////////////
/*6-1-2021: Phần tự viết thêm (SonDHe)*/
////////////////////////////////////////
$(document).on("click", ".date-picker", (e) => {
    $(".date-picker").css("border", "1px solid #e2e2e2");
    // $(".date-picker").css("color", "initial");
    $(e.currentTarget).css("border", "2px solid #4592d6");
    // $(e.currentTarget).css("color", "white");
})

$(document).on("dblclick", ".date-picker", (e) => {
    let currentDate = `${$(e.currentTarget).attr("data-year")}-${$(e.currentTarget).attr("data-month")}-${$(e.currentTarget).attr("data-date")}`;
    $(".modal").modal("hide");
    $("#modal-register-extra-time").attr("data-currentdate", currentDate);
    $("#modal-register-extra-time").modal("toggle");

    if ($(e.currentTarget).attr("data-from") != null && $(e.currentTarget).attr("data-from") !== "")
        $("#textbox-from-extra").val($(e.currentTarget).attr("data-from"));
    else
        $("#textbox-from-extra").val('');
    if ($(e.currentTarget).attr("data-to") != null && $(e.currentTarget).attr("data-to") !== "")
        $("#textbox-to-extra").val($(e.currentTarget).attr("data-to"));
    else
        $("#textbox-to-extra").val('');

    $("#modal-register-extra-time").attr("data-operation", $(e.currentTarget).attr("data-operation"));
})

$(document).on("click", "#btn-save-extra-time", (e) => {
    let urlTool = ProccessUrl();
    let extraTime = {
        employee_id: urlTool.getLastPartition(window.location.href),
        work_date: $("#modal-register-extra-time").attr("data-currentdate"),
        from: $("#textbox-from-extra").val(),
        to: $("#textbox-to-extra").val()
    };

    if ($("#modal-register-extra-time").attr("data-operation") != "update") {
        $.ajax({
            url: '/Employee/SaveExtraWorkTime',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: { extraTime: extraTime },
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Đăng kí tăng ca thành công");
                    $("#modal-register-extra-time").modal("toggle");
                    location.reload();
                }
            }
        });
    }
    else {
        $.ajax({
            url: '/Employee/UpdateExtraWorkTime',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            data: { extraTime: extraTime },
            type: 'post',
            success: function (response) {
                if (response.success) {
                    alert("Cập nhật tăng ca thành công");
                    $("#modal-register-extra-time").modal("toggle");
                    location.reload();
                }
            }
        });
    }
})

$(document).ready(() => {
    
});