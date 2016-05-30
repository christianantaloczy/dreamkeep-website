// preloader
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
});

var is_iPhone = ((navigator.userAgent.indexOf('iPhone') != -1) 
              || (navigator.userAgent.indexOf('iPod')   != -1) 
              || (navigator.userAgent.indexOf('iPad')  != -1));


if (!is_iPhone) {
    $('#download-link-form').show();
} else {
    $('#link-to-app-store').show();
    $('.download').css('padding-top', 0);
}

$(function() {
    new WOW().init();
    // $('.templatemo-nav').singlePageNav({
    // 	offset: 70
    // });

    /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
    // $('.navbar-collapse a').click(function(){
    //     $(".navbar-collapse").collapse('hide');
    // });

    /* Collect PHone Numbers
    -----------------------------------------------*/
    var $form = $('#download-link-form');

    var handleFormSuccess = function(phoneNumber) {
        ga('send', 'event', {
            eventCategory: 'Download Link - Form Submission',
            eventAction: 'Successful Submission!',
            eventLabel: phoneNumber.toString()
        });

        var height = $form.height();

        $form.css('height', height).html('<span class="success">Check your phone!</span>');

        setTimeout(function() {
            $('.contact-form.download').hide();
            $('.col-xs-6').removeClass('col-xs-6').addClass('col-xs-6');
        }, 4000);
    }

    $form.on('submit', function(evt) {
        evt.preventDefault();
        var $field = $form.find('.phone').removeClass('error');

        var phoneRegex  = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
        var phoneNumber = $field.val();

        if (phoneNumber.match(phoneRegex) === null) {
            $field.addClass('error');
            $field.val("");
        } else {
                ga('send', 'event', {
                    eventCategory: 'Download Link - Form Submission',
                    eventAction: 'Attempted Submission',
                    eventLabel: phoneNumber.toString()
                });

                $.ajax({
                    type: "POST",
                    url: "form/process-request.php",
                    data: {
                        phoneNumber: phoneNumber
                    },
                    success: function(response) {
                        console.log(response);
                        if (response === "success") {
                            handleFormSuccess(phoneNumber);
                        } else {
                            $field.addClass('error');
                            $field.val("");
                        }
                    },
                    error: function(error) {
                        $field.addClass('error');
                        $field.val("");
                    }
                });
        }
    });
})
