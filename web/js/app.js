$(function() {

    loadMilestone();

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

    $('.scroll').on('click', function(event) {
        event.preventDefault();
        var target = "#" + $(this).data('target');
        var offs = $(target).offset().top-40;

        if($(this).hasClass('seperator-inv')) {
            offs += 30;
        }

        $('html, body').animate({
            scrollTop: offs
        }, 700);
    });

    function loadMilestone() {
        $.ajax({
            url: 'https://api.github.com/repos/tdt/core/milestones',
            method: 'GET',
            success: function (data) {
                renderMilestone(data[0]);
            },
            error: function (e) {

            },
            cache: true
        });
    }

    function renderMilestone(ms){
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var now = new Date();
        var dd = new Date(ms.due_on);
        var timeLeft = dd - now;
        timeLeft = Math.ceil(timeLeft / 1000 / 3600 / 24);
        var timestr;
        if(timeLeft != 1) {
            timestr = "(" + timeLeft + " days left!)"
        } else {
            timestr =  "(" + timeLeft + " day left!)"
        }
        $('#timeleft').html(timestr);

        var dateString = monthNames[dd.getMonth()] + " " + dd.getDate() + ", " + dd.getFullYear();
        $('#milestone-date').html(dateString);
        $('#milestone-date').parent().removeClass("hide");
        $('#milestone-desc').html(ms.description);
        $('#milestone-title').html(ms.title);
        $('#milestone-title').attr('href', ms.html_url);

        var progressPercent = ms.closed_issues / (ms.open_issues + ms.closed_issues) * 100;
        progressPercent = Math.floor(progressPercent);
        $('#milestone-progress').css('width', (progressPercent+1) +'%');
        $('#milestone-progress').html('Issues: ' + ms.open_issues + ' open, ' + ms.closed_issues + ' closed');
        $('#milestone-progress').parent().on('click', function() {
            window.open(ms.html_url);
        });
        $('.progress-percent').html(progressPercent + "%");
        $('#progres-cont').removeClass("hide");

    }

    $(".fancybox").fancybox({
        openEffect	: 'none',
        closeEffect	: 'none'
    });

});