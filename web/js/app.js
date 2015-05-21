$(function() {
    $('a[href^=#]').on("click", function (e) {
        var t = $(this.hash);
        var t = t.length && t || $('[name=' + this.hash.slice(1) + ']');
        if (t.length) {
            var tOffset = t.offset().top;
            $('html,body').animate({scrollTop: tOffset - 20}, 'slow');
            e.preventDefault();
        }
    });

    $('#contact .button').on('click', function (e) {
        e.preventDefault();
        $('.message').addClass('hide');

        var form = $('#contact');
        var name = $('#name', form);
        var email = $('#email', form);
        var text = $('#text', form);

        if (name.val().length < 1) {
            name.focus();
        } else if (email.val().length < 5) {
            email.focus();
        } else {
            $.ajax({
                url: 'email.php',
                method: 'post',
                data: {
                    name: name.val(),
                    email: email.val(),
                    text: text.val()
                },
                success: function (e) {
                    name.val('');
                    text.val('');
                    email.val('');
                    $('.message').removeClass('hide').show();
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }

    });

    $( '.scroll' ).on('click', function(event) {
        console.log("clicked");
        event.preventDefault();
        var target = "#" + $(this).data('target');
        var offs = $(target).offset().top-40;


        $('html, body').animate({
            scrollTop: offs
        }, 700);
    });
});