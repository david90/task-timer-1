
/* Get all necessary elements as jQuery objects*/
var newTaskButton = $("#newtaskbutton");
var header = $("#tasktimer-header");
var taskInput = $("#taskinput");
var taskList = $("#tasklist");
var timingTaskTemplate = $("#timing-template");
var input = $("#input");

var firstTask = true;




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
    var taskName = "     " + input.val();
    /*get what user typed*/
    if (taskName.length !== 0) {                         /*only create task if they typed something*/
        /*Make task by cloning a task template*/
        var newTask = timingTaskTemplate.clone().removeAttr("id");
        var myTask = newTask.children(":first-child");
        /*get nested div from cloned task*/
        myTask.children(":first-child").text(taskName);
        newTask.css("display", "unset");



        newTask.prependTo(taskList);
        /*add it to beginning of task list*/
    }
}






















/*Add event listener to start task button */
newTaskButton.click(addTaskToTaskList);