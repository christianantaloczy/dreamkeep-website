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

    var handleFormSuccess = function() {
        var height = $form.height();

        $form.css('height', height).html('<span class="success">Check your phone!</span>');

        setTimeout(function() {
            $('.contact-form.download').hide();
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
                $.ajax({
                    type: "POST",
                    url: "form/process-request.php",
                    data: {
                        phoneNumber: phoneNumber
                    },
                    success: function(response) {
                        if (response === "success") {
                            handleFormSuccess();
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
