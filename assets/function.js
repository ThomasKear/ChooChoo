 var globalDebug = true;

 var config = {
     apiKey: "AIzaSyDQneId1ftvr6qngDjp3ul6ruz_JayVV8E",
     authDomain: "choo-choo-9f47d.firebaseapp.com",
     databaseURL: "https://choo-choo-9f47d.firebaseio.com",
     projectId: "choo-choo-9f47d",
     storageBucket: "choo-choo-9f47d.appspot.com",
 };

 firebase.initializeApp(config);

 var database = firebase.database();

 // Buttons for adding Trains
 $("#add-train-btn").on("click", function(event) {
     event.preventDefault();

     // Grabs user input
     var trnName = $("#train-name-input").val().trim();
     var destInput = $("#destination-input").val().trim();
     var trnStart = $("#first-train-input").val().trim();
     var tFrequency = $("#frequency-input").val().trim();

     // Creates a holding place for the new input entered
     var newTrn = {
         name: trnName,
         destination: destInput,
         start: trnStart,
         frequency: tFrequency
     };

     // Uploads train data to the database
     database.ref().push(newTrn);

     // Logs everything to the console
     console.log (newTrn.name);
     console.log (newTrn.destination);
     console.log (newTrn.start);
     console.log (newTrn.frequency);

     // Alert
     alert("New train information added");

     // clears all of the text-boxes
     $("#train-name-input").val("");
     $("#destination-input").val("");
     $("#first-train-input").val("");
     $("#frequency-input").val("");

     // Prevents moving to another page

     return false;
 });

 // Creates the Firebase event for adding trains to the datsbase and publishing it to the HTML
 database.ref().on("child_added", function(childSnapshot, prevChildKey) {

     console.log (childSnapshot.val());

     // Stores the informationin the var
     var trnName = childSnapshot.val().name;
     var destInput = childSnapshot.val().destination;
     var trnStart = childSnapshot.val().start;
     var tFrequency = childSnapshot.val().frequency;

     // Train Info
     console.log (trnName);
     console.log (destInput);
     console.log (trnStart);
     console.log (tFrequency);

     // Prettify the train time start

     var trnStartPretty = moment.unix(trnStart).format("HH:mm");

     // Pushing back the start time 1 year to ensure it comes before current time
     var trnStartConverted = moment(trnStartPretty, "HH:mm").subtract(1, "years");
     console.log (trnStartPretty);

     // current time
     var currentTime = moment();
     console.log ("Current time: " + moment(currentTime).format("hh:mm"));

     // Difference between the times
     var diffTime = moment().diff(moment(trnStartConverted), "minutes");
     console.log ("Difference in time: " + moment(diffTime).add(1, "years"));

     // Remainder
     var tRemainder = diffTime % tFrequency;
     console.log ("Number of minutes remaining " + tRemainder);

     // minutes till next train
     var tMinutesTillTrain = tFrequency - tRemainder;
     console.log ("Minutes till next train: " + tMinutesTillTrain);

     // Next train arrival time
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log ("Arrival time: " + moment(nextTrain).format("HH:mm"));

     // Time of the next train
     var trainTime = moment(nextTrain).format("HH:mm");

     //Add each train's data onto the table
     $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + destInput + "</td><td>" + tFrequency + "</td><td>" + trainTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");

 });

 
