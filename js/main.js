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
            // grade 值 (local API)
            // console.log(res[0].split(')\n')[1]);
            // let redirect_param_grade = res[0].split(')\n')[1];

            // gcp & azure (API)
            let redirect_param_grade = res.Results.output1[0]["Scored Labels"];

            // redirect page
            window.location.replace("result.html?grade=" + redirect_param_grade);

        });

        // 若return的是false則不會換頁
        return check;
    });

    // ajax func
    function call_python_API(req_query) {
        // 存各query等於的值 (array)
        let query_params = req_query.split('&');
        // 存從query中解析出來的params
        let params = [];
        for (let i = 0; i < query_params.length; i++)
            params.push(query_params[i].split('=')[1])

        // 預測所需的參數
        let emp_length = unescape(params[0]);
        let home_ownership = params[1];
        let term = ' ' + unescape(params[2]);
        let purpose = params[3];
        let loan_amount = parseInt(params[4]);
        let annual_income = parseInt(params[5]);
        let loan_status = 'Fully Paid';
        let verification = 'Verified';

        // let data_body = [4000, " 36 months", 'RENT', "Fully Paid", 'car', 'Verified', "5 years", 50000];
        let data_body = [];
        data_body.push(loan_amount, term, home_ownership, loan_status, purpose, verification, emp_length, annual_income);

        console.log(data_body);

        return new Promise((resolve, reject) => {
            // local API server
            // var url = 'http://122.116.10.167:3030/api/POST/prediction';
            // fetch(url, {
            //     method: "POST",
            //     headers: {
            //         'Accept': 'application/json, text/plain, */*',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         req_query: data_body,
            //     })
            // })
            //     .then(function (res) {
            //         return res.json();
            //     })
            //     .then(function (text) {
            //         console.log(text);
            //         resolve(text);
            //     });

            // gcp API endpoint
            let url = 'https://us-central1-test-buddhism-api.cloudfunctions.net/grade-predict';
            fetch(url, {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
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