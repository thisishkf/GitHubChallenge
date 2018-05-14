$(document).ready(function () {
    $.fn.datepicker.defaults.format = "yyyy-mm-dd";

    $("#currency-ask").on('click', function () {
        const api = "/currency/ajax/historical/#FROM#/#TO#/#YYYMMDD#";
        const from = $("#currency-from").val();
        const to = $("#currency-to").val();
        const date = $("#currency-date").val();

        $.ajax({
            url: api.replace('#FROM#', from).replace("#TO#", to).replace("#YYYMMDD#", date),
            method: 'GET',
            dataType: 'json',
            beforeSend() {
                $('#currency-ask').prop("disabled", true);
                $('#loadingDiv').show();
            },
            success(res) {
                if (res.r == true) {
                    showResult(date, res.data);
                }else{
                    alert(res.msg);
                }
            },
            error(e) {
                console.log(e);
            },
            complete() {
                $('#currency-ask').prop("disabled", false);
                $('#loadingDiv').hide();
            }
        });
    });
});

const showResult = function (date, data) {
    let div = $('#currency_result');
    div.removeClass('hidden')
        .html("");
    let table = $('<table/>');
    table.addClass('table')
        .append(`<caption>Hisotrial Exchange Rate on ${date} </caption>`)
        .append(`<tr>
    <th>From</th>
    <th>To</th>
    <th>Historical Rate</th>
    <th>Last Update</th>
    </tr>`);
    data.forEach(row => {
        table.append(`<tr>
        <td>${row.from}</td>
        <td>${row.to}</td>
        <td>${row.rate}</td>
        <td>${new Date(row.ts * 1000)}</td>
        </tr>`);
    });

    table.appendTo(div);
}