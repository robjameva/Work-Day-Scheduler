// Get today's date
var today = moment().format("MMMM Do YYYY");
var now = moment().hour();


// Display today's date on the top of the screen
$("#currentDay").text(today)

var checkTime = function(taskEl) {
    var timeEl = taskEl.find("div")[1];
    var timeNum = parseInt($(timeEl).attr("id"));

    if (timeNum > now) {
        $(timeEl).removeClass("bg-danger");
        $(timeEl).removeClass("bg-secondary");
        $(timeEl).addClass("bg-success");
    }
    else if (timeNum == now) {
        $(timeEl).removeClass("bg-success");
        $(timeEl).removeClass("bg-secondary");
        $(timeEl).addClass("bg-danger");
    }
    else {
        $(timeEl).removeClass("bg-success");
        $(timeEl).removeClass("bg-danger");
        $(timeEl).addClass("bg-secondary");
    }
}

// Check time to dynamically chnage background color
setInterval(function() {
    $(".row").each(function(index) {
        checkTime($(this))
    });
}, (1000 * 60));

$(".row").each(function(index) {
    checkTime($(this))
});


