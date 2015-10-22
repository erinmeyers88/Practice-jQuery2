$(document).ready(function () {

    var listo = [];

   /* if (window.localStorage['myToDoList']) {

        var myList = JSON.parse(window.localStorage["myToDoList"]);
        console.log(myList);
        
        myList.forEach(function (task) {
            if (listo.indexOf(task) === -1) {
                listo.push(task);
            }

            if (task.id === "new") {
                addTask(task.task);
            }
            else if (task.id === "inProgress") {
                $('#currentList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
            }
            else {
                $('#archivedList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
            }
        });
    }
    
    
    function persistToLocalStorage() {
        window.localStorage.setItem("myToDoList", JSON.stringify(listo));
    }
*/


    function advanceTask(task) {
        var modified = task.innerText.trim()
        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task === modified) {
                if (listo[i].id === 'new') {
                    listo[i].id = 'inProgress'; //adds to in Progress
                } else if (listo[i].id === 'inProgress') { 
                    listo[i].id = 'archived'; //adds to archived
                } else {
                    listo.splice(i, 1); //removes from list
                }
                break;
            }
        }
        task.remove();
    };

    $('#newTaskForm').hide();





    function Task(task) {
        this.task = task;
        this.id = 'new';
    }

    function addTask(task) {
        if (task) {
            task = new Task(task);
            if (listo.indexOf(task) === -1) {
                listo.push(task);
            }
            $('#newItemInput').val('');
            $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
        }

        $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
        //persistToLocalStorage();
    };


    //adds item to list
    $('#saveNewItem').on('click', function (e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
    });


    

    //Opens form
    $('#newListItem').on('click', function () {
        $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
    });
    //closes form
    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
    });


    //Adds to in progress
    $(document).on('click', '#item', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);
        //persistToLocalStorage();

    });


    //Adds to archived
    $(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
        //persistToLocalStorage();
    });

    //Removes from list
    $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
    });






});