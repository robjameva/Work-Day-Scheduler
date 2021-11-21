// Get today's date
var today = moment().format("MMMM Do YYYY");
var now = moment().hour();


// Display today's date on the top of the screen
var setCurrentDay = function() {
    $("#currentDay").text(today)
}

var setBackGroundColor = function(taskEl) {
    var time = parseInt($(taskEl).attr("id"));

    $(taskEl).removeClass("past");
    $(taskEl).removeClass("present");
    $(taskEl).removeClass("future");

    if (time > now) {
        $(taskEl).addClass("future");
    }
    else if (time == now) {
        $(taskEl).addClass("present");
    }
    else {
        $(taskEl).addClass("past");
    }
}

// Check time to dynamically chnage background color
var taskAudit = function() {
    setInterval(function() {
        $(".task-text-container").each(function(index) {
            setBackGroundColor($(this))
        });
    }, (1000 * 60));
}

var checkEachRow = function() {
    $(".task-text-container").each(function(index) {
        setBackGroundColor($(this))
    });
}

$(".task-text-container").on("click", "p", function() {
    var text = $(this).text().trim();
    var textInput = $("<textarea>").addClass("form-control").val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
})

setCurrentDay();
checkEachRow();
taskAudit();