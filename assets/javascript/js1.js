$(function () {

    // Initialize Firebase


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAhOktRIXp31V_zeEE1i7ax3mJa3WcTHB4",
        authDomain: "play-5e4ce.firebaseapp.com",
        databaseURL: "https://play-5e4ce.firebaseio.com",
        projectId: "play-5e4ce",
        storageBucket: "play-5e4ce.appspot.com",
        messagingSenderId: "595969935385"
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

        var remainder = moment().diff(moment.unix(startTime), "minutes") % frequency;
        var minutes = frequency - remainder;
        var arrival = moment().add(minutes, 'm').format('hh:mm A');

        console.log('Start Time: ', startTime);
        console.log('Remainder: ', remainder);
        console.log('Minutes: ', minutes);
        console.log('Arrival: ', arrival);
       

        $('#schedule').append(`<tr><td class="Rtrain">${trainName}</td><td class="Rtrain">${destination}</td><td class="Rtrain">${frequency}</td><td class="Rtrain" >${arrival}</td><td class="Rtrain">${minutes}</td><td class="removebt"> <button class="btn btn-primary" id="remove">Remove</button></td>`)
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
        time = moment().format('HH:mm:ss');
        searchTime = moment().format('HH:mm');
        $('#currentTime').html(time);

        t = setTimeout(function () {
            currentTime();
        }, sec * 1000);
    }
    currentTime();
    $('#Update').click(function(){
        location.reload();
    });
    $('#remove').click(function(row){
        row.closest('tr').remove();

    })

});