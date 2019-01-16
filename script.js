
$(document).ready(function () {
    $('#num-products').on('change',function () {
        console.log("I work");
        var num_row = $(this).val();
        console.log(num_row);
        $.ajax({
            type:'post',
            url:'ajax_router.php',
            data:{
                num_rows: num_row,
                ajax_action: 'get_products'
            },
            success: function (data) {

                data = JSON.parse(data);
                console.log(data);
                products = JSON.parse(data.products);
                console.log(products);
                $('.products').html("");

                products.forEach(function (single_prod,index) {
                    console.log(index+"/"+num_row);
                    var line_number = Math.trunc(index/num_row);

                    if(index%num_row===0){
                        var select_button = '<div class="select_row"><button class="line_button" name="line'+line_number+'">Select Line</button></div>';
                        $('.products').append(select_button);
                    }

                    console.log(line_number);
                    $('.products').append("<div id='"+single_prod[0]+"' class=\"single-product line"+line_number+"\">\n" +
                        "                    <div class=\"prod-title\">"+single_prod[1]+"</div>\n" +
                        "                    <div class=\"prod-image\">\n" +
                        "                        <img src=\""+single_prod[2]+"\" alt=\"prod_image\"/>\n" +
                        "                    </div>\n" +
                        "                </div>");
                });
                var prod_width = Math.trunc(100/num_row -5);
                console.log(prod_width);
                $('.products .single-product').css({'width':prod_width+'%'});

                if(data["success"]){
                    console.log("I had success");

                } else {
                    alert('Unknown error.');
                }
            },
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                alert('Error - ' + errorMessage);
            }
        });
    });



});

$(document).on('click','.single-product',function () {
    $(this).toggleClass('selected');
});

$(document).on('click','#delete-selected',function () {
    //console.log($('.selected').length);
    var products_to_delete = $('.selected').toArray();
    console.log(products_to_delete);
    var ids=[];
    products_to_delete.forEach(function (product) {
        ids.push(product.id);
    });
    var num_row = $("#num-products").val();
    console.log(ids);

    $.ajax({
        type:'post',
        url:'ajax_router.php',
        data:{
            params: ids,
            ajax_action: 'delete_products'
        },
        success: function (data) {

            data = JSON.parse(data);
            console.log(data);
            products = JSON.parse(data.products);
            console.log(products);
            $('.products').html("");

            products.forEach(function (single_prod,index) {
                console.log(index+"/"+num_row);
                var line_number = Math.trunc(index/num_row);

                if(index%num_row===0){
                    var select_button = '<div class="select_row"><button class="line_button" name="line'+line_number+'">Select Line</button></div>';
                    $('.products').append(select_button);
                }

                console.log(line_number);
                $('.products').append("<div id='"+single_prod[0]+"' class=\"single-product line"+line_number+"\">\n" +
                    "                    <div class=\"prod-title\">"+single_prod[1]+"</div>\n" +
                    "                    <div class=\"prod-image\">\n" +
                    "                        <img src=\""+single_prod[2]+"\" alt=\"prod_image\"/>\n" +
                    "                    </div>\n" +
                    "                </div>");
            });
            var prod_width = Math.abs(100/num_row -5);
            console.log(prod_width);
            $('.products .single-product').css({'width':prod_width+'%'});

            if(data["success"]){
                console.log("I had success");

            } else {
                alert('Unknown error.');
            }
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            alert('Error - ' + errorMessage);
        }
    });


});

$(document).on('click','.line_button',function () {
    console.log($(this).attr('name'));
    var num_row = $("#num-products").val();

    if($('.selected.'+$(this).attr('name')).length===num_row || $('.selected.'+$(this).attr('name')).length===0){
        console.log("yes");
        $('.'+$(this).attr('name')).each(function () {
            $(this).toggleClass("selected");
        });
    } else{
        $('.'+$(this).attr('name')).each(function () {
            $(this).removeClass("selected");
        });
    }

});