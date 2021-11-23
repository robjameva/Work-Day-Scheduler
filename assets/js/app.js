// Global object to store tasks before saved to local storage
var tasks = {}

// Get today's date
var today = moment().format("MMMM Do YYYY");
var now = moment().hour();

// Display today's date on the top of the screen
var setCurrentDay = function() {
    $("#currentDay").text(today)
}

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function() {
    var loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    for (const [key, value] of Object.entries(loadedTasks)) {
        tasks[key] = value;
    }

    // Locally scoped variable to select the right text
    var tasksKey = 9;
    $(".description").each(function(index) {
        var text = tasks[tasksKey]
        $(this).text(text)
        tasksKey++;
    });
}

// if nothing in localStorage, don't try to load anything
if (localStorage.getItem("tasks") !== null) {
    loadTasks();
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

// Updated background color every minute
var taskAudit = function() {
    setInterval(function() {
        $(".task-text-container").each(function(index) {
            setBackGroundColor($(this))
        });
    }, (1000 * 10));
}

// Checks each time slot and calls setBackgroundColor to set the color according to the time of day
$(".task-text-container").each(function(index) {
    setBackGroundColor($(this))
});


// Allow user to enter text on screen
$(".task-text-container").on("click", "p", function() {
    var text = $(this).text().trim();
    var textInput = $("<textarea>").addClass("form-control").val(text);
    textInput.trigger("focus");
    $(this).replaceWith(textInput);
})

// Replace user text back to a p element 
$(".task-text-container").on("blur", "textarea", function() {
    var text = $(this).val();
    var itemID = $(this).closest("div").attr("id");
    var textInput = $("<p>").addClass("description").text(text);
    tasks[itemID] = text;
    $(this).replaceWith(textInput);
})

// Event listener for the save btns
$(".saveBtn").on("click", function() {
    saveTasks();
})

setCurrentDay();
taskAudit();