
$(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBbliNwxVqz6uo3p9HGAyKohKJ9sF3Kf8M",
    authDomain: "train-project-11821.firebaseapp.com",
    databaseURL: "https://train-project-11821.firebaseio.com",
    projectId: "train-project-11821",
    storageBucket: "train-project-11821.appspot.com",
    messagingSenderId: "992544219276"
  };
  
      
    firebase.initializeApp(config);

    var trainData = firebase.database();

    $('#newTrain').click(function () {
        var trainName = $('#trainName').val().trim();
        var destination = $('#destination').val().trim();
        var startTime = moment($('#startTime').val().trim(), 'HH:mm').subtract(10, 'years').format('X');
        var frequency = $('#frequency').val();



        var newTrain = {
            name: trainName,
            destination: destination,
            startTime: startTime,
            frequency: frequency
        }

        trainData.ref().push(newTrain);

        $('#trainName').val("");
        $('#destination').val("");
        $('#startTime').val("");
        $('#frequency').val("");
    })
    
    trainData.ref().on('child_added', function (snapshot) {
        var trainName = snapshot.val().name;
        var destination = snapshot.val().destination;
        var frequency = snapshot.val().frequency;
        var startTime = snapshot.val().startTime;
       // var remove = snapshot.val().remove();
        var key = snapshot.val().key;
       
        var remainder = moment().diff(moment.unix(startTime), "minutes") % frequency;
        var minutes = frequency - remainder;
        var arrival = moment().add(minutes, 'm').format('hh:mm A');

        console.log('Start Time: ', startTime);
        console.log('Remainder: ', remainder);
        console.log('Minutes: ', minutes);
        console.log('Arrival: ', arrival);
       

       $('#schedule').append(`<tr><td class="Rtrain">${trainName}</td><td class="Rtrain">${destination}</td><td class="Rtrain">${frequency}</td><td class="Rtrain" >${arrival}</td><td class="Rtrain">${minutes}</td><td class="removebt"> <button class="btn btn-primary delBtn" id="remove" data-key=${key} >Remove</button></td>`)
       
    },function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    })

    $('#add').click(function () {
        if ($('#newTrainSchedule').attr('data-status') === 'hide') {
            $('#newTrainSchedule').attr('data-status', 'show').css({ 'visibility': 'visible', 'height': '480px' });
            $('#symbol').removeClass('fa fa-plus').addClass('fa fa-close');
        } else {
            $('#newTrainSchedule').attr('data-status', 'hide').css({ 'visibility': 'hidden', 'height': '0px' });
            $('#symbol').removeClass('fa fa-close').addClass('fa fa-plus');
        }
    });
    function currentTime() {
        var sec = 1;
       var time =moment().format('MMMM Do YYYY, h:mm:ss a');
        var searchTime = moment().format('HH:mm');
        $('#currentTime').html(time);

        t = setTimeout(function () {
            currentTime();
        }, sec * 1000);
    }
   

    currentTime();
    $('#Update').click(function(){
        console.log("whats up");
        location.reload();
    });
    $(document).on("click",'#remove', function(){
        console.log("fired");
         $(this).parent().parent().remove();
         var path = "https://console.firebase.google.com/u/0/project/train-project-11821/database/train-project-11821/data/";
         var db = firebase.database();
         var key = $(this).attr("data-key") ;    
         var ref = db.ref(); 
         var survey=db.ref(path+key);                    
         survey.child(key).remove(); 
         console.log(key);
});
});
