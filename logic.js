$(document).ready(function() {
    // Display the current day at the top of the calendar
    $("#currentDay").text(dayjs().format('MMMM D, YYYY'));

    // Check the time and update the color of the time blocks
    function updateTimeBlocks() {
        var currentHour = dayjs().hour();

        $(".time-block").each(function() {
            var blockHour = parseInt($(this).attr("data-hour"));

            // Reset classes for each block before applying new ones
            $(this).removeClass("past present future");

            if (blockHour < currentHour) {
                $(this).addClass("past");
            } else if (blockHour === currentHour) {
                $(this).addClass("present");
            } else {
                $(this).addClass("future");
            }
        });
    }

    // Load saved events from local storage
    function loadEvents() {
        $(".time-block").each(function() {
            var hour = $(this).attr("data-hour");
            var event = localStorage.getItem(hour);

            if (event) {
                $(this).find("textarea").val(event);
            }
        });
    }

    // Save event to local storage
    $(".saveBtn").on("click", function() {
        var hour = $(this).parent().attr("data-hour");
        var event = $(this).siblings(".description").find("textarea").val();

        localStorage.setItem(hour, event);
    });

    // Call functions
    updateTimeBlocks();
    loadEvents();

    // Update time blocks every minute
    setInterval(updateTimeBlocks, 60000);
});
