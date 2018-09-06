/*

 Template Name: Eventor - Conference & Event HTML Template
 Author: Themewinter
 Author URI: https://themeforest.net/user/themewinter
 Description: Eventor - Conference & Event HTML Template
 Version: 1.0

 1. Mobile Menu
 2. Main Slideshow
 3. Gallery popup
 4. Counter
 5. Contact form
 6. Back to top

 */


jQuery(function ($) {
    "use strict";

    $.ajaxSetup({
        headers:
            {
                'X-CSRF-Token': $('meta[name="_token"]').attr('content')
            }
    });
    // $(window).load(function () {
    //     $('.preloader').fadeOut(1000); // set duration in brackets
    // });
    /* ----------------------------------------------------------- */
    /*  Mobile Menu
     /* ----------------------------------------------------------- */

    $(".nav.navbar-nav li a").on("click", function () {
        $(this).find("i").toggleClass("fa-angle-down fa-angle-up");
    });
    $(".dropdown-menu li a").on("click", function () {
        $(this).parents('.dropdown.active').find("a i").toggleClass("fa-angle-up fa-angle-down");
    });

    $("#app-navbar a").on("click", function () {
        $("#app-navbar").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });
    $('#important_day').click(function () {
        if (window.location.pathname === '/' || window.location.hash === '#ts-news') {
            if ($(window).width() < 991) {
                $('.navbar-toggle').click();
            }
        }
    });

    /* ----------------------------------------------------------- */
    /*  Event counter
     /* -----------------------------------------------------------*/

    if ($('.countdown').length > 0) {
        $(".countdown").jCounter({
            date: '24 May 2018 08:30:00',
            serverDateSource: '/datetime',
            fallback: function () {
            }
        });
    }

    /* ----------------------------------------------------------- */
    /*  Event Map
     /* -----------------------------------------------------------*/

    if ($('#map').length > 0) {

        var eventmap = {lat: 25.013156, lng: 121.540203};

        $('#map')
            .gmap3({
                zoom: 15,
                center: eventmap,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            })

            .marker({
                position: eventmap
            })

            .infowindow({
                position: eventmap,
                content: "國立臺灣科技大學 國際大樓(IB)"
            })

            .then(function (infowindow) {
                var map = this.get(0);
                var marker = this.get(1);
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });
            });
    }


    /* ----------------------------------------------------------- */
    /*  Main slideshow
     /* ----------------------------------------------------------- */

    $('#main-slide').carousel({
        pause: true,
        interval: 100000,
    });


    /* ----------------------------------------------------------- */
    /*  Gallery popup
     /* ----------------------------------------------------------- */

    $(document).ready(function () {

        $(".gallery-popup").colorbox({rel: 'gallery-popup', transition: "fade", innerHeight: "700"});

        $(".popup").colorbox({iframe: true, innerWidth: 650, innerHeight: 450});
        $('#back-to-top').fadeOut();
        // if ($('body').height() < $(window).height()) {
        //     $('section').css('min-height', '81vh');
        // }
    });


    /* ----------------------------------------------------------- */
    /*  Counter
     /* ----------------------------------------------------------- */

    $('.counterUp').counterUp({
        delay: 10,
        time: 1000
    });


    /* ----------------------------------------------------------- */
    /*  Contact form
     /* ----------------------------------------------------------- */

    $('#contact-form').submit(function () {

        var $form = $(this),
            $error = $form.find('.error-container'),
            action = $form.attr('action');

        $error.slideUp(750, function () {
            $error.hide();

            var $name = $form.find('.form-control-name'),
                $email = $form.find('.form-control-email'),
                $subject = $form.find('.form-control-subject'),
                $message = $form.find('.form-control-message');

            $.post(action, {
                    name: $name.val(),
                    email: $email.val(),
                    subject: $subject.val(),
                    message: $message.val()
                },
                function (data) {
                    $error.html(data);
                    $error.slideDown('slow');

                    if (data.match('success') != null) {
                        $name.val('');
                        $email.val('');
                        $subject.val('');
                        $message.val('');
                    }
                }
            );

        });

        return false;

    });


    /* ----------------------------------------------------------- */
    /*  Back to top
     /* ----------------------------------------------------------- */

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('#back-to-top').on('click', function () {
        $('#back-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // $('#back-to-top').tooltip('hide');


    /* ----------------------------------------------------------- */
    /* Other
     /* ----------------------------------------------------------- */

    $('#become-our-sponsor').on('click', function () {
        $('body,html').animate({
            scrollTop: $('#sponsor-program').offset().top - 40
        }, 800);
        return false;
    });

    $('#login_link').on('click', function (event) {
        event.preventDefault();
        $('#otp-form').hide();
        $('#login-form').show();
    });
    $('#otp_link').on('click', function () {
        event.preventDefault();
        $('#login-form').hide();
        $('#otp-form').show();
        $('.alert').hide();
    });

    //取得OTP密碼
    $('#getPassword').on('click', function (event) {
        event.preventDefault();
        var email = $('#otpemail').val();
        var token = $('input[name="_token"]').val();
        if (email.length < 6) {
            swal('請輸入您的Email');
            event.preventDefault();
            return false;
        }
        $.ajax({
            type: "POST",
            url: 'password/reset',
            data: {
                email: email,
                _token: token
            },
            success: function (data) {
                // $.unblockUI();
                data = JSON.parse(data);
                if (!data.error) {
                    swal({
                        title: 'OTP已發送至您的Email',
                        text: "",
                        type: 'success'
                    }).then(function () {
                        $('#otpemail').attr('disabled', false);
                        $('#otp-form').hide();
                        $('#login-form').show();
                        $('input[name="email"]').val(email);
                    });
                }
                else {
                    swal(data.result,
                        "",
                        'error');
                }
            }
        })
        ;
        event.preventDefault();
        return false;
    })
    ;

    /* ----------------------------------------------------------- */

    /* check upload file type
     /* ----------------------------------------------------------- */

    //重新上傳論文檔案
    $('#re-upload-paper').on('click', function (e) {
        e.preventDefault();
        $(this).parent().remove();
        $('input[name="paper_file"]').parent().show();
        $('#exist_file').val("false");
    });
    $('.re_upload_paper').on('click', function (e) {
        e.preventDefault();
        var input = $(this).parent().parent().find('.input');
        $(this).parent().remove();
        input.show();
        console.log("input[name='re_" + input.find('input').attr("name") + "']");
        $("input[name=re_" + input.find('input').attr("name") + "]").val('true');
    });

    //檢查進行論文上傳前基本資料都已填寫完畢
    $('#checkProfile').click(function (e) {
        e.preventDefault();
        var host = $(this);
        var name = $('#name').val();
        var phone = $('#phone').val();
        var vegetarians = $('input[name=vegetarians]:checked').size();
        var position = $('input[name=position]:checked').size();
        // var checkEIN = $('input[name=checkEIN]').val();
        // var company = $('#company').val();
        // var EIN = $('#EIN').val();
        //
        if (!$('#profile').parent().hasClass('active')) {
            host.parents('ul').find('li').removeClass('active');
            $('.tab-pane').removeClass('active in');
        }
        if (name === "" || phone === "" || vegetarians === 0 || position === 0) {
            swal({
                title: '請先填寫基本資料完畢',
                text: '',
                type: 'warning'
            }).then(function () {
                host.blur();
                $('.tab-pane').removeClass('active in');
                host.parent().removeClass('active');

                $('#profile').parent().addClass('active');
                $('#tab1success').addClass("active in");
            });
        }
        // else {
        //     console.log(checkEIN);
        //     if (checkEIN === 'false') {
        $('#profile').parent().removeClass('active');
        host.parent().addClass('active');
        $('#tab1success').removeClass("active in");
        $('#tab2success').addClass("active");
        $('#tab2success').addClass("in");
        return false;
    });

    $('input[name="checkEIN"]').change(function () {
        if ($(this).is(":checked")) {
            $('input[name="company"]').attr('disabled', false);
            $('input[name="EIN"]').attr('disabled', false);
            $(this).val('true');
        } else {
            $('input[name="company"]').attr('disabled', true);
            $('input[name="EIN"]').attr('disabled', true);
            $(this).val('false');
        }
    });
    $(function () {
        var divs = $('#about_fee > div');
        divs.eq($('input[name=position]').index($('input[name=position]:checked'))).show();
        $('input[name=position]').change(function () {
            divs.hide();
            divs.eq($('input[name=position]').index(this)).show();
        });
    });

    $('#register-form').on('click', 'button', function (e) {
        e.preventDefault();
        var form = $('#register-form');
        //     swal({
        //         title: '通知',
        //         text: '欲參加"資安產業技術研討會"者，無須註冊報名',
        //         type: 'warning',
        //         showCancelButton: true,
        //         confirmButtonColor: '#3085d6',
        //         cancelButtonColor: '#d33',
        //         confirmButtonText: '確定註冊',
        //         cancelButtonText: '取消',
        //         reverseButtons: true
        //     }).then((result) => {
        //         if(result.value)
        //     form.submit();
        // });
        swal({
            title: '通知',
            text: '欲參加"資安產業技術研討會"者，無須註冊報名',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定註冊',
            cancelButtonText: '取消',
            reverseButtons: true
        }).then(function (result) {
            if (result.value)
                form.submit();
        })
    });


    // $('#final_paper_form').on('click', 'button', function (e) {
    //     e.preventDefault();
    //     var form = $('#final_paper_form');
    //     swal({
    //         title: 'Are you sure?',
    //         text: "上傳後將無法進行修改!",
    //         type: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: '確定上傳',
    //         cancelButtonText: '取消',
    //         reverseButtons: true
    //     }).then((result) => {
    //         if(result.value)
    //             form.submit();
    //     });
    // });

    $('#receipt_form').on('click', 'button', function (e) {
        e.preventDefault();
        var form = $('#receipt_form');
        swal({
            title: 'Are you sure?',
            text: "上傳後將無法進行修改!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定上傳',
            cancelButtonText: '取消',
            reverseButtons: true
        }).then(function (result) {
            if (result.value)
                form.submit();
        });
    });

    $('#paper_review_table').footable();

    $('#paper_review_table').on('click', '.pass-btn', function () {
        var btn = $(this);
        swal({
            title: '動作確認!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定變更',
            cancelButtonText: '取消',
            reverseButtons: true
        }).then(function (result) {
            if (result.value) {
                var value = changeStatusAjax(1, btn.parent().parent().find('.user_id').html(), btn.parent().parent().find('.paper_id').html(), '/backend/papers');
                if (value)
                    btn.parent().parent().find('.status').html("通過");
            }
        });
    });
    $('#paper_review_table').on('click', '.fail-btn', function () {
        var btn = $(this);
        swal({
            title: '動作確認!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定變更',
            cancelButtonText: '取消',
            reverseButtons: true
        }).then(function (result) {
            if (result.value) {
                var value = changeStatusAjax(0, btn.parent().parent().find('.user_id').html(), btn.parent().parent().find('.paper_id').html(), '/backend/papers');
                if (value)
                    btn.parent().parent().find('.status').html("不通過");
            }
        });
    });
    $('#receipt_review_table').footable();
    $('#receipt_review_table').on('click', '.paid-btn', function () {
        var btn = $(this);
        swal({
            title: '動作確認!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定變更',
            cancelButtonText: '取消',
            reverseButtons: true
        }).then(function (result) {
            if (result.value) {
                var value = changeStatusAjax(1, btn.parent().parent().find('.user_id').html(), btn.parent().parent().find('.receipt_id').html(), '/backend/receipts');
                if (value)
                    btn.parent().parent().find('.status').html("已繳費");
            }
        });
    });
    $('#receipt_review_table').on('click', '.unpaid-btn', function () {
        var btn = $(this);
        swal({
            title: '動作確認!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定變更',
            cancelButtonText: '取消',
            reverseButtons: true
        }).then(function (result) {
            if (result.value) {
                console.log(btn.parent().parent().find('.user_id').html());
                var value = changeStatusAjax(0, btn.parent().parent().find('.user_id').html(), btn.parent().parent().find('.receipt_id').html(), '/backend/receipts');
                if (value)
                    btn.parent().parent().find('.status').html("未繳費");
            }
        });
    });

    $('#user_list_table').footable();

    function changeStatusAjax(value, user_id, id, url) {
        var flag = true;
        $.ajax({
            url: url,
            type: 'POST',
            data: {status: value, user_id: user_id, id: id},
            success: function () {
                flag = true;
            },
            fail: function () {
                flag = false;
            }
        });
        return flag;
    }

    $('#user_unfinished_application').on('click', function () {
        var url = $(this).data('url');
        swal({
            title: '動作確認!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定',
            cancelButtonText: '取消',
            reverseButtons: true
        }).then(function (result) {
            if (result.value) {
                adminCallAjax(url);
            }
        });
    });
    $('#user_finish_application').on('click', function () {
        var url = $(this).data('url');
        swal({
            title: '動作確認!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定',
            cancelButtonText: '取消',
            reverseButtons: true
        }).then(function (result) {
            if (result.value) {
                adminCallAjax(url);
            }
        });
    });
    $('#paper_review_result').on('click', function () {
        var url = $(this).data('url');
        swal({
            title: '動作確認!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定',
            cancelButtonText: '取消',
            reverseButtons: true
        }).then(function (result) {
            if (result.value) {
                adminCallAjax(url);
            }
        });
    });

    $('#paper_alert').on('click', function () {
        var url = $(this).data('url');
        swal({
            title: '動作確認!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定',
            cancelButtonText: '取消',
            reverseButtons: true
        }).then(function (result) {
            if (result.value) {
                adminCallAjax(url);
            }
        });
    });
    function adminCallAjax(url) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                if (!data.error)
                    swal({title: '發送成功', type: 'warning'});
                else
                    swal({title: '無未報名完成會員', type: 'warning'});
            },
            fail: function () {
                swal({title: '發送失敗', type: 'danger'});
            }
        });
    }

    $('input[name="paper_option"]').on('click', function (e) {
        e.preventDefault();
        var input = $(this);
        if ($(this).val() === "true") {
            swal({
                title: '確認獲獎資格',
                html: "<p style='text-align: center; margin-bottom: 5px '><b>[提醒]</b></p><p style='font-size: 14px; padding: 0 35px'><b>最佳論文獎與最佳學生論文獎指擇一參加，一旦參加最佳學生論文獎即放棄最佳論文獎之參選資格。</b></p>" +
                "<p style='text-align: center; margin-bottom: 5px '><b>[資格提醒]</b></p><p style='font-size: 14px;padding: 0 35px'><b>獲獎資格須為資安學會學生會員、正會員及永久會員 (或於獲獎後加入學會會員)且為國內公私立大專院校在學學生及論文的第一作者。</b></p>",
                input: 'checkbox',
                inputPlaceholder:
                    '我確認已經閱讀論文獎項設置<a href="/files/download/award">辦法</a>',
                inputClass: 'sweet-alert-checkbox',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: "同意",
                cancelButtonText: "不同意",
                inputValidator: function (result) {
                    return !result && '請勾選此選項'
                }
            }).then(function (result) {
                if (result.value !== 1)
                    input.prop('checked', false);
                else {
                    input.prop('checked', true);
                }
            });
        }
        if ($(this).val() === "false") {
            swal({
                title: '動作確認',
                text: '不參加最佳學生論文獎評選?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: "確認",
                cancelButtonText: "取消"
            }).then(function (result) {
                console.log(result);
                if (result.value)
                    input.prop('checked', true);
                // else {
                //     input.prop('checked', false);
                // }
            });
        }
    });
});
