$( document ).ready(function() {

    $(".payBill").click(function(){
        var element = $(this);
        var id = element.data("id");
        //alert(id);
        var tr = $('#' + id + " td");
        var modalBody = $('#myModal').find('.modal-body');

        modalBody.empty();

        var htmlString = '<form>'
                        +   '<div class="form-group">'
                        +           '<label for="disabledSelect">Invoice Number</label>'
                        +           '<input class="form-control" id="disabledInput" type="text" disabled="" value="' + tr[0].innerHTML + '">'
                        +   '</div>'
                        +   '<div class="form-group">'
                        +           '<label for="disabledSelect">Invoice Date</label>'
                        +           '<input class="form-control" id="disabledInput" type="text" disabled="" value="' + tr[1].innerHTML + '">'
                        +   '</div>'
                        +   '<div class="form-group">'
                        +           '<label for="disabledSelect">Invoice Time</label>'
                        +           '<input class="form-control" id="disabledInput" type="text" disabled="" value="' + tr[2].innerHTML + '">'
                        +   '</div>'
                        +   '<div class="form-group">'
                        +           '<label for="disabledSelect">Invoice Amt</label>'
                        +           '<input class="form-control" id="disabledInput" type="text" disabled="" value="' + tr[3].innerHTML + '">'
                        +   '</div>'
                        +   '<div class="form-group">'
                        +           '<label for="sel1">Select list:</label>'
                        +           '<select class="form-control" id="sel1">'
                        +               '<option>6000661084</option>'
                        +               '<option>6000002097</option>'
                        +           '</select>'
                        +   '</div>'
                        +   '<button type="submit" class="btn btn-primary">Submit</button>'
                        + '</form>'

        modalBody.append(htmlString);
    });

});