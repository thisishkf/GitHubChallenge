$(document).ready(function () {

    $('#currency-ask').on('click', function (event) {
        event.preventDefault();
        console.log("!!");
        const api = '/currency/ajax/current/#FROM#/#TO#';
        const from = $('#currency-from').val();
        const to = $('#currency-to').val();
        $.ajax({
            url: api.replace('#FROM#', from).replace("#TO#", to),
            method: 'GET',
            dataType: 'json',
            beforeSend() {
                console.log("send");
                console.log(`${from} -> ${to}`);
            },
            success(res) {
                if (res.r == true) {
                    console.log(res);
                    showResult(res.data);
                }
            },
            error(e) {
                console.log(e);
            },
            complete() {
                console.log('end');
            }
        });
    });
});

const showResult = function (data) {
    let div = $('#currency_result');
    div.removeClass('hidden')
        .html("");
    let table = $('<table/>');
    table.addClass('table')
        .append(`<tr>
    <th>From</th>
    <th>To</th>
    <th>Rate</th>
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