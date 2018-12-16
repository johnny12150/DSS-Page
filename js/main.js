(function ($) {
    "use strict";


    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function () {
        $(this).on('blur', function () {
            if (validate(this) == false) {
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    // 當submit按鈕被觸發
    $('.validate-form').on('submit', function () {
        //控制submit後換不換頁
        var check = false;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        // call ajax with request body
        console.log($(this).serialize());
        call_python_API($(this).serialize()).then((res) => {
            // grade 值
            console.log(res[0].split(')\n')[1]);
            let redirect_param_grade = res[0].split(')\n')[1];

        // redirect page
            window.location.replace("result.html?grade=" + redirect_param_grade);

        });

        // 若return的是false則不會換頁
        return check;
    });

    // ajax func
    function call_python_API(req_query) {
        // console.log(req_query.split('&'));
        let data_body = [4000, " 36 months", 'RENT', "Fully Paid", 'car', 'Verified', "5 years", 50000];
        return new Promise((resolve, reject) => {
            // fetch here
            var url = 'http://122.116.10.167:3030/api/POST/prediction';
            fetch(url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // req_query: req_query,
                    req_query: data_body,
                })
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function (text) {
                    console.log(text);
                    resolve(text);
                });
        })
    }


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
            $(this).parent().removeClass('true-validate');
        });
    });

    function validate(input) {
        // email欄位
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            // 如果空值
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    // 在input下方顯示警告的文字
    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
        $('.btn-hide-validate').each(function () {
            $(this).on('click', function () {
                hideValidate(this);
            });
        });
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }


})(jQuery);