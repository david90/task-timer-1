
/* Get all necessary elements as jQuery objects*/
var newTaskButton = $("#newtaskbutton");
var header = $("#tasktimer-header");
var taskInput = $("#taskinput");
var taskList = $("#tasklist");
var timingTaskTemplate = $("#timing-template");
var input = $("#input");

var firstTask = true;
var runningTasks = {};
var pausedTasks = {};
var idCount = 0;

/*Adds task to task list while handling the creation of the first task*/
function addTaskToTaskList() {
    var taskName = input.val();
    if (firstTask && taskName.length !== 0) {
        header.css("height", "15%");
        taskInput.css("top", "20%");
        header.children().css("top", "30%");
    }
    createTask();
}

function createTask() {
    var taskName = "     " + input.val();                /*get what user typed*/
    if (taskName.length !== 0) {                         /*only create task if they typed something*/
        /*Make task by cloning a task template*/
        var newTask = timingTaskTemplate.clone().removeAttr("id");
        var myTask = newTask.children(":first-child");   /*get nested div from cloned task*/
        myTask.children(":first-child").text(taskName);
        newTask.css("display", "unset");

        runningTasks[idCount] = 0;                       /*set time to 0 in task to time map*/
        var id = idCount;
        myTask.attr("id",  id);
        idCount += 1;

        newTask.prependTo(taskList);                     /*add it to beginning of task list*/

        /*Creates click event handler for the pause and play button*/
        myTask.children(":nth-child(3)").click(function() {

            var self = myTask.children(":nth-child(3)");

            /*if task is running when clicked, pause the time*/
            if (id in runningTasks) {
                var myHTML = "<img src=\"img/start.png\" alt=\"Start\" style=\"height:70%;\">";
                self.html(myHTML);
                pausedTasks[id] = runningTasks[id];
                delete runningTasks[id];
            /*if task is pause when clicked, start the time up*/
            } else if (id in pausedTasks){
                var myHTML = "<img src=\"img/pause.png\" alt=\"Pause\" style=\"height:70%;\">";
                self.html(myHTML);
                runningTasks[id] = pausedTasks[id];
                delete pausedTasks[id];
            }
        });
        /*Creates click event handler for the Finish button*/
        myTask.children(":nth-child(2)").click(function() {
            if (id in runningTasks || id in pausedTasks) {
                delete pausedTasks[id];
                delete runningTasks[id];
                myTask.css("background-color", "lightgray");
                myTask.css("box-shadow", "3px 3px gray");

                /*Move time to where finish button was*/
                var myHTML = myTask.children(":nth-child(4)").html();
                myTask.children(":nth-child(2)").html(myHTML);
                myTask.children(":nth-child(2)").attr("disabled", "true");

                myTask.children(":nth-child(4)").html("Completed");
                myTask.children(":nth-child(4)").css({"top": "0%","width":"100%", "left":"0%"});

                myTask.children(":nth-child(3)").html("");
                myTask.children(":nth-child(3)").attr("disabled", "true");
            }
        });
    }
}

/*Add event listener to start task button */
newTaskButton.click(addTaskToTaskList);

/*You can also start task with enter key*/
input.on("keydown", function(e) {
    if (e.which === 13) {
        addTaskToTaskList()
    }
});

/*Increments by 1 all the tasks that are in runningTasks*/
function incrementTime(){
    var keys = Object.keys(runningTasks);
    for (var i = 0; i < keys.length; i++) {
        runningTasks[keys[i]] += 1;                  /*Increment time in the task to time map*/

        /*mod the time so that it will show up in ## hr ## min ## sec format*/
        var time = runningTasks[keys[i]];
        var secs = time % 60;
        var mins = Math.floor((time % 3600) / 60);
        var hrs = Math.floor(time / 3600);
        var myString = secs + " sec";
        if (mins !== 0 && hrs === 0 || hrs !== 0) {
            myString = mins + " min " + myString;
        }
        if (hrs !== 0) {
            myString = hrs + " hr " + myString
        }
        $("#"+keys[i]).children(":nth-child(4)").text( myString);
    }
}

setInterval(incrementTime, 1000);



