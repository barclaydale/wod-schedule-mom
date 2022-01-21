function expand() {
    $('.collapse').collapse('show');
}

function collapse() {
    $('.collapse').collapse('hide');
}

for (var a = 1; a <= 20; a++) {
    var titleId = "title" + a;
    var WODtitleId = "WODtitle" + a;

    document.getElementById(WODtitleId).innerHTML = document.getElementById(titleId).innerHTML;
}

var lift = ["RMDeadlift", "RMFrontSquat", "RMClean", "RMSnatch", "RMShoulderPress", "RMPushPress", "RMPushJerk", "RMThruster"];
var count = [1, 3, 5];

for (var i = 0; i < count.length; i++) {
    for (var j = 0; j < lift.length; j++) {
        document.getElementById(count[i] + lift[j]).innerHTML = "-";
    }
}

var key = "0f4274-8917ec-d964fe-82271a-8ccd3c";
var url = "https://cse204.work/todos";
var num = 0;
var easyTime = 0;

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.responseText);
        for (var i = 0; i < result.length; i++) {
            if (result[i].text.includes("!")) {
                checkPriorResults(result[i]);
                addScore(result[i]);
            }
            if (result[i].text.includes("%")) {
                num += 1;
                addResult(result[i], num);
            }
        }
    }
};
xhttp.open("GET", url, true);
xhttp.setRequestHeader("x-api-key",key);
xhttp.send();

function newResult(event) {
    event.preventDefault();

    var i = event.path[0].id;
    i = i.slice(1);
    console.log(i);

    var WODtitleId = "WODtitle" + i;
    var workoutId = "workout" + i;
    var wodscoreId = "wodscore" + i;
    var notesId = "notes" + i;
    
    var title = document.getElementById(WODtitleId).innerHTML;
    var workout = document.getElementById(workoutId).innerHTML;
    var wodscore = document.getElementById(wodscoreId).value;
    var notes = document.getElementById(notesId).value;

    console.log("notes: " + notes);

    var data = {
        text: title + "%" + workout + "%" + wodscore + "%" + notes,
    }

    num += 1;

    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            addResult(JSON.parse(this.responseText), num);
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };

    console.log(data);

    xhttp2.open("POST", url, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", key);
    xhttp2.send(JSON.stringify(data));
}

document.getElementById("s1").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s2").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s3").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s4").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s5").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s6").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s7").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s8").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s9").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s10").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s11").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s12").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s13").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s14").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s15").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s16").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s17").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s18").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s19").addEventListener("click", function(event) {
    newResult(event);
});

document.getElementById("s20").addEventListener("click", function(event) {
    newResult(event);
});

function addResult(event, num) {

    if (event.text.includes("%")) {
        data = event.text.split("%");
        console.log(data[0]);
    }
    if (data[2] == '' || data[2] == "0") {
        return;
    }

    if (num % 3 == 1) {
        var row = document.createElement("div");
        row.setAttribute("id", Math.ceil(num / 3));
        row.classList.add("row");
    } else {
        var row = document.getElementById(Math.ceil(num / 3));
    }

    var col = document.createElement("div");
    col.classList.add("col");
    col.classList.add("spacing");
    row.appendChild(col);

    var card = document.createElement("div");
    card.classList.add("card");
    col.appendChild(card);

    var cardbody = document.createElement("div");
    cardbody.classList.add("card-body");
    card.appendChild(cardbody);

    var cardtitle = document.createElement("h5");
    cardtitle.classList.add("card-title");
    cardtitle.innerHTML = data[0];
    cardbody.appendChild(cardtitle);

    var cardsubtitle = document.createElement("h6");
    cardsubtitle.classList.add("card-subtitle");
    cardsubtitle.classList.add("mb-2");
    cardsubtitle.classList.add("text-muted");
    cardsubtitle.innerHTML = data[1];
    cardbody.appendChild(cardsubtitle);

    var cardtext = document.createElement("p");
    cardtext.classList.add("card-text");
    cardtext.innerHTML = data[2];
    cardbody.appendChild(cardtext);

    if (data[3] != '') {
        var cardnotes = document.createElement("h6");
        cardnotes.classList.add("card-subtitle");
        cardnotes.classList.add("mb-2");
        cardnotes.classList.add("text-muted");
        cardnotes.innerHTML = data[3];
        cardbody.appendChild(cardnotes);
    }

    document.getElementById("previous").appendChild(row);

    // Setting Rowing Paces

    if (data[0] == "Rowing 0.0") {
        maxWatts = parseInt(data[2]);
        modWatts = parseInt(data[2]) / 2;
        

        document.getElementById("maxwatts").innerHTML = maxWatts.toFixed(1);
        document.getElementById("modwatts").innerHTML = modWatts.toFixed(1);

        maxConstant = 2.80 / maxWatts;
        maxPace = (Math.cbrt(maxConstant) * 500).toFixed(0);
        maxMinutes = maxPace / 60;
        maxSeconds = maxPace % 60;
        maxPace = Math.floor(maxMinutes) + ":" + maxSeconds;

        document.getElementById("max500").innerHTML = maxPace;

        modConstant = 2.80 / modWatts;
        modPace = (Math.cbrt(modConstant) * 500).toFixed(0);
        modMinutes = modPace / 60;
        modSeconds = modPace % 60;
        modPace = Math.floor(modMinutes) + ":" + modSeconds;

        document.getElementById("mod500").innerHTML = modPace;

    }

    if (data[0] == "The Reckoning") {
        fastTime = 6 / parseInt(data[2]) * 500;

        fastPace = fastTime.toFixed(2).split(".");
        fastMinutes = fastPace[0];
        fastSeconds = (fastTime - fastMinutes) * 60;
        if (fastSeconds < 10) {
            fastSeconds = "0" + fastSeconds;
        }
        fastSec = fastSeconds.toFixed(0);
        fastPace = fastMinutes + ":" + fastSec;

        document.getElementById("fast500").innerHTML = fastPace;

        fastTotSeconds = parseInt(fastSec) + parseInt(fastPace[0] * 60);
        fastRate = fastTotSeconds / 500;
        fastWatts = 2.80 / Math.pow(fastRate, 3);

        document.getElementById("fastwatts").innerHTML = fastWatts.toFixed(1);

        easySeconds = (easyTime[0] * 60) + (easyTime[1] * 1);
        easySeconds -= (1600 * fastTotSeconds / 500);
        easySeconds = easySeconds / 800 * 500;
        easyMinutes = (easySeconds / 60).toFixed(0);
        easySeconds = (easySeconds - (easyMinutes * 60));
        easyPace = easyMinutes + ":" + easySeconds.toFixed(0);

        document.getElementById("easy500").innerHTML = easyPace;

        easyTotSeconds = parseInt(easySeconds) + parseInt(easyMinutes * 60);
        easyRate = easyTotSeconds / 500;
        easyWatts = 2.80 / Math.pow(easyRate, 3);

        document.getElementById("easywatts").innerHTML = easyWatts.toFixed(1);
    }

    if (data[0] == "Looking Glass") {
        easyTime = data[2].split(":");
    }

    if (data[0] == "The Sprint Reckoning") {
        sprintTime = 1 / parseInt(data[2]) * 500;

        sprintPace = sprintTime.toFixed(2).split(".");
        sprintMinutes = sprintPace[0];
        sprintSeconds = (sprintTime - sprintMinutes) * 60;
        if (sprintSeconds < 10) {
            sprintSeconds = "0" + sprintSeconds;
        }
        sprintSec = sprintSeconds.toFixed(0);
        sprintPace = sprintMinutes + ":" + sprintSec;

        document.getElementById("sprint500").innerHTML = sprintPace;

        sprinttTotSeconds = parseInt(sprintSec) + parseInt(sprintPace[0] * 60);
        sprintRate = sprintTotSeconds / 500;
        sprintWatts = 2.80 / Math.pow(sprintRate, 3);

        document.getElementById("sprintwatts").innerHTML = sprintWatts.toFixed(1);
    }
}

// object literal holding data for option elements
var Select_List_Data = {
    
    'choices': { // name of associated select box
        
        // names match option values in controlling select box
        power: {
            text: ['1RM Deadlift', '3RM Deadlift', '5RM Deadlift', '1RM Front Squat', '3RM Front Squat', '5RM Front Squat', '1RM Thruster', '3RM Thruster', '5RM Thruster', '1RM Shoulder Press', '3RM Shoulder Press', '5RM Shoulder Press', '1RM Push Press', '3RM Push Press', '5RM Push Press']
        },
        olympic: {
            text: ['1RM Clean', '3RM Clean', '5RM Clean', '1RM Snatch', '3RM Snatch', '5RM Snatch', '1RM Push Jerk', '3RM Push Jerk', '5RM Push Jerk', '1RM Clean and Jerk', '3RM Clean and Jerk']
        },
        sprint: {
            text: ['Row 100m', 'Row 250m', 'Row 500m', 'Row 1000m']
        },
        endurance: {
            text: ['Row 2000m', 'Row 5000m']
        },
        bodyweight: {
            text: ['50 Burpees FT', '50 Abmat Sit Ups FT', '100 Abmat Sit Ups FT', 'Open 21.1 Scaled', 'AMReps 5min: Single Unders', 'AMReps 2min: Double Unders', 'Open 12.1', 'AMRAP 15: Row 250m, 25 Push Ups', '4 RFT: 50m Walking Lunge, 50 Abmat Sit Ups']
        },
        light: {
            text: ['Grace', 'Diane', 'Elizabeth', 'Karen', 'Fight Gone Bad', 'Jack', 'The Chief', '12-9-6-3: Power Snatch, Burpee', 'Open 21.2 Scaled']
        },
        heavy: {
            text: ['Isabel', 'DT', 'Open 13.1', 'Open 14.3', 'Regional 11.3', '2008 Games: Deadlift and Burpees', '4 RFT: Row 300m, 20-15-10-5 Push Press', '5 RFT: Row 500m, 7 Thrusters', 'FT: 20 Front Squats, 30 Box Jumps, 40 KBS, 50 Wall Balls', '5 RFT: 7 Cleans, 14 KBS']
        }
    }    
};

// removes all option elements in select box 
// removeGrp (optional) boolean to remove optgroups
function removeAllOptions(sel, removeGrp) {
    var len, groups, par;
    if (removeGrp) {
        groups = sel.getElementsByTagName('optgroup');
        len = groups.length;
        for (var i=len; i; i--) {
            sel.removeChild(groups[i-1]);
        }
    }
    
    len = sel.options.length;
    for (var i=len; i; i--) {
        par = sel.options[i-1].parentNode;
        par.removeChild(sel.options[i-1]);
    }
}

function appendDataToSelect(sel, obj) {
    var f = document.createDocumentFragment();
    var labels = [], group, opts;
    
    function addOptions(obj) {
        var f = document.createDocumentFragment();
        var o;
        
        for (var i=0, len=obj.text.length; i<len; i++) {
            o = document.createElement('option');
            o.appendChild( document.createTextNode(obj.text[i]) );
            
            if ( obj.value ) {
                o.value = obj.value[i];
            }
            
            f.appendChild(o);
        }
        return f;
    }
    
    if ( obj.text ) {
        opts = addOptions(obj);
        f.appendChild(opts);
    } else {
        for ( var prop in obj ) {
            if ( obj.hasOwnProperty(prop) ) {
                labels.push(prop);
            }
        }
        
        for (var i=0, len=labels.length; i<len; i++) {
            group = document.createElement('optgroup');
            group.label = labels[i];
            f.appendChild(group);
            opts = addOptions(obj[ labels[i] ] );
            group.appendChild(opts);
        }
    }
    sel.appendChild(f);
}

// anonymous function assigned to onchange event of controlling select box
document.forms['demoForm'].elements['category'].onchange = function(e) {
    // name of associated select box
    var relName = 'choices';
    
    // reference to associated select box 
    var relList = this.form.elements[ relName ];
    
    // get data from object literal based on selection in controlling select box (this.value)
    var obj = Select_List_Data[ relName ][ this.value ];
    
    // remove current option elements
    removeAllOptions(relList, true);
    
    // call function to add optgroup/option elements
    // pass reference to associated select box and data for new options
    appendDataToSelect(relList, obj);
};

// populate associated select box as page loads
(function() { // immediate function to avoid globals
    
    var form = document.forms['demoForm'];
    
    // reference to controlling select box
    var sel = form.elements['category'];
    sel.selectedIndex = 0;
    
    // name of associated select box
    var relName = 'choices';
    // reference to associated select box
    var rel = form.elements[ relName ];
    
    // get data for associated select box passing its name
    // and value of selected in controlling select box
    var data = Select_List_Data[ relName ][ sel.value ];
    
    // add options to associated select box
    appendDataToSelect(rel, data);
    
}());

var numerator1 = 0;
var numerator2 = 0;
var numerator3 = 0;
var numerator4 = 0;
var numerator5 = 0;
var numerator6 = 0;
var numerator7 = 0;
var ratio1 = 0;
var ratio2 = 0;
var ratio3 = 0;
var ratio4 = 0;
var ratio5 = 0;
var ratio6 = 0;
var ratio7 = 0;

var power = new Array();
var olympic = new Array();
var sprint = new Array();
var endurance = new Array();
var bodyweight = new Array();
var light = new Array ();
var heavy = new Array ();

var results = new Array();
var pair = new Array();

function addScore(event) {
    results.push(event);

    numerator1 = 0;
    numerator2 = 0;
    numerator3 = 0;
    numerator4 = 0;
    numerator5 = 0;
    numerator6 = 0;
    numerator7 = 0;
    ratio1 = 0;
    ratio2 = 0;
    ratio3 = 0;
    ratio4 = 0;
    ratio5 = 0;
    ratio6 = 0;
    ratio7 = 0;

    if (event.text.includes("!")) {
        data = event.text.split("!");
    }
    if (data[2] == '' || data[2] == "0") {
        return;
    }

    // Sort and get individual percentages

    if (data[0] == "power") {
        if (data[1] == "1RM Deadlift") {
            percentage = (parseInt(data[2]) / 215 * 100);
            document.getElementById("1RMDeadlift").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "3RM Deadlift") {
            percentage = (parseInt(data[2]) / 195 * 100);
            document.getElementById("3RMDeadlift").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "5RM Deadlift") {
            percentage = (parseInt(data[2]) / 180 * 100);
            document.getElementById("5RMDeadlift").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "1RM Front Squat") {
            percentage = (parseInt(data[2]) / 145 * 100);
            document.getElementById("1RMFrontSquat").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "3RM Front Squat") {
            percentage = (parseInt(data[2]) / 130 * 100);
            document.getElementById("3RMFrontSquat").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "5RM Front Squat") {
            percentage = (parseInt(data[2]) / 115 * 100);
            document.getElementById("5RMFrontSquat").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "1RM Thruster") {
            percentage = (parseInt(data[2]) / 110 * 100);
            document.getElementById("1RMThruster").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "3RM Thruster") {
            percentage = (parseInt(data[2]) / 99 * 100);
            document.getElementById("3RMThruster").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "5RM Thruster") {
            percentage = (parseInt(data[2]) / 88 * 100);
            document.getElementById("5RMThruster").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "1RM Shoulder Press") {
            percentage = (parseInt(data[2]) / 80 * 100);
            document.getElementById("1RMShoulderPress").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "3RM Shoulder Press") {
            percentage = (parseInt(data[2]) / 75 * 100);
            document.getElementById("3RMShoulderPress").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "5RM Shoulder Press") {
            percentage = (parseInt(data[2]) / 70 * 100);
            document.getElementById("5RMShoulderPress").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "1RM Push Press") {
            percentage = (parseInt(data[2]) / 110 * 100);
            document.getElementById("1RMPushPress").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "3RM Push Press") {
            percentage = (parseInt(data[2]) / 100 * 100);
            document.getElementById("3RMPushPress").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "5RM Push Press") {
            percentage = (parseInt(data[2]) / 95 * 100);
            document.getElementById("5RMPushPress").innerHTML = parseInt(data[2]);
        }

        if (percentage < 0) {
            percentage = 0;
        }
        if (percentage > 100) {
            percentage = 100;
        }
        pair = [data[1], percentage];
        power.push(pair);
    }
    if (data[0] == "olympic") {
        if (data[1] == "1RM Clean") {
            percentage = (parseInt(data[2]) / 120 * 100);
            document.getElementById("1RMClean").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "3RM Clean") {
            percentage = (parseInt(data[2]) / 110 * 100);
            document.getElementById("3RMClean").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "5RM Clean") {
            percentage = (parseInt(data[2]) / 95 * 100);
            document.getElementById("5RMClean").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "1RM Snatch") {
            percentage = (parseInt(data[2]) / 85 * 100);
            document.getElementById("1RMSnatch").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "3RM Snatch") {
            percentage = (parseInt(data[2]) / 77 * 100);
            document.getElementById("3RMSnatch").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "5RM Snatch") {
            percentage = (parseInt(data[2]) / 66 * 100);
            document.getElementById("5RMSnatch").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "1RM Push Jerk") {
            percentage = (parseInt(data[2]) / 115 * 100);
            document.getElementById("1RMPushJerk").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "3RM Push Jerk") {
            percentage = (parseInt(data[2]) / 100 * 100);
            document.getElementById("3RMPushJerk").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "5RM Push Jerk") {
            percentage = (parseInt(data[2]) / 95 * 100);
            document.getElementById("5RMPushJerk").innerHTML = parseInt(data[2]);
        }
        if (data[1] == "1RM Clean and Jerk") {
            percentage = (parseInt(data[2]) / 115 * 100);
        }
        if (data[1] == "3RM Clean and Jerk") {
            percentage = (parseInt(data[2]) / 105 * 100);
        }

        if (percentage < 0) {
            percentage = 0;
        }
        if (percentage > 100) {
            percentage = 100;
        }
        pair = [data[1], percentage];
        olympic.push(pair);
    }
    if (data[0] == "sprint") {
        if (data[1] == "Row 100m") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 19) / 7 * 100));
        }
        if (data[1] == "Row 250m") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 50) / 16 * 100));
        }
        if (data[1] == "Row 500m") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 104) / 44 * 100));
        }
        if (data[1] == "Row 1000m") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 230) / 78 * 100));
        }

        if (percentage < 0) {
            percentage = 0;
        }
        if (percentage > 100) {
            percentage = 100;
        }
        pair = [data[1], percentage];
        sprint.push(pair);
    }
    if (data[0] == "endurance") {
        if (data[1] == "Row 2000m") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 503) / 114 * 100));
        }
        if (data[1] == "Row 5000m") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 1320) / 288 * 100));
        }

        if (percentage < 0) {
            percentage = 0;
        }
        if (percentage > 100) {
            percentage = 100;
        }
        pair = [data[1], percentage];
        endurance.push(pair);
    }
    if (data[0] == "bodyweight") {
        if (data[1] == "50 Burpees FT") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 163) / 180 * 100));
        }
        if (data[1] == "50 Abmat Sit Ups FT") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 72) / 56 * 100));
        }
        if (data[1] == "100 Abmat Sit Ups FT") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 152) / 122 * 100));
        }
        if (data[1] == "Open 21.1 Scaled") {
            percentage = ((parseInt(data[2]) - 171) / 434 * 100);
        }
        if (data[1] == "AMReps 5min: Single Unders") {
            percentage = ((parseInt(data[2]) - 265) / 480 * 100);
        }
        if (data[1] == "AMReps 2min: Double Unders") {
            percentage = ((parseInt(data[2]) - 6)/ 147 * 100);
        }
        if (data[1] == "CrossFit Open 12.1") {
            percentage = ((parseInt(data[2]) - 46) / 98 * 100);
        }
        if (data[1] == "AMRAP 15: Row 250m, 25 Push Ups") {
            rounds = data[2].split("+");
            reps = (rounds[0] * 26) + (rounds[1] * 1);
            percentage = ((reps - 91) / 65 * 100);
        }
        if (data[1] == "4 RFT: 50m Walking Lunge, 50 Abmat Sit Ups") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 730) / 403 * 100));
        }

        if (percentage < 0) {
            percentage = 0;
        }
        if (percentage > 100) {
            percentage = 100;
        }
        pair = [data[1], percentage];
        bodyweight.push(pair);
    }
    if (data[0] == "light") {
        if (data[1] == "Grace") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 130) / 216 * 100));
        }
        if (data[1] == "Diane") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 204) / 504 * 100));
        }
        if (data[1] == "Elizabeth") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 324) / 504 * 100));
        }
        if (data[1] == "Karen") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 345) / 380 * 100));
        }
        if (data[1] == "Fight Gone Bad") {
            percentage = ((parseInt(data[2]) - 152) / 188 * 100);
        }
        if (data[1] == "Jack") {
            rounds = data[2].split("+");
            reps = (rounds[0] * 30) + (rounds[1] * 1);
            percentage = ((reps - 150) / 240 * 100);
        }
        if (data[1] == "The Chief") {
            rounds = data[2].split("+");
            reps = (rounds[0] * 18) + (rounds[1] * 1);
            percentage = ((reps - 216) / 288 * 100);
        }
        if (data[1] == "12-9-6-3: Power Snatch, Burpee") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 182) / 220 * 100));
        }
        if (data[1] == "Open 21.2 Scaled") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 801) / 579 * 100));
        }

        if (percentage < 0) {
            percentage = 0;
        }
        if (percentage > 100) {
            percentage = 100;
        }
        pair = [data[1], percentage];
        light.push(pair);
    }
    if (data[0] == "heavy") {
        if (data[1] == "Isabel") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 129) / 224 * 100));
        }
        if (data[1] == "DT") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 355) / 610 * 100));
        }
        if (data[1] == "Open 13.1") {
            percentage = ((parseInt(data[2]) - 70) / 34 * 100);
        }
        if (data[1] == "Open 14.3") {
            percentage = ((parseInt(data[2]) - 59) / 80 * 100);
        }
        if (data[1] == "Regionals 11.3") {
            percentage = ((parseInt(data[2]) - 258) / 382 * 100);
        }
        if (data[1] == "2008 Games: Deadlift and Burpees") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 222) / 236 * 100));
        }
        if (data[1] == "4 RFT: Row 300m, 20-15-10-5 Push Press") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 515) / 364 * 100));
        }
        if (data[1] == "5 RFT: Row 500m, 7 Thrusters") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 835) / 424 * 100));
        }
        if (data[1] == "FT: 20 Front Squats, 30 Box Jumps, 40 KBS, 50 Wall Balls") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 401) / 376 * 100));
        }
        if (data[1] == "5 RFT: 7 Cleans, 14 KBS") {
            time = data[2].split(":");
            seconds = (time[0] * 60) + (time[1] * 1);
            percentage = (100 - ((seconds - 432) / 448 * 100));
        }

        if (percentage < 0) {
            percentage = 0;
        }
        if (percentage > 100) {
            percentage = 100;
        }
        pair = [data[1], percentage];
        heavy.push(pair);
    }
    console.log(pair);

    // Calculate category percentage

    for (var i = 0; i < power.length; i++) {
        numerator1 += power[i][1];
    }
    for (var i = 0; i < olympic.length; i++) {
        numerator2 += olympic[i][1];
    }
    for (var i = 0; i < sprint.length; i++) {
        numerator3 += sprint[i][1];
    }
    for (var i = 0; i < endurance.length; i++) {
        numerator4 += endurance[i][1];
    }
    for (var i = 0; i < bodyweight.length; i++) {
        numerator5 += bodyweight[i][1];
    }
    for (var i = 0; i < light.length; i++) {
        numerator6 += light[i][1];
    }
    for (var i = 0; i < heavy.length; i++) {
        numerator7 += heavy[i][1];
    }

    ratio1 = numerator1 / power.length;
    ratio2 = numerator2 / olympic.length;
    ratio3 = numerator3 / sprint.length;
    ratio4 = numerator4 / endurance.length;
    ratio5 = numerator5 / bodyweight.length;
    ratio6 = numerator6 / light.length;
    ratio7 = numerator7 / heavy.length;

    // Display percentages

    var fitness = 0;
    var denominator = 0;

    if (isNaN(ratio1)) {
        document.getElementById("powerlifts").style.width = "0%";
    } else {
        fitness += ratio1;
        denominator += 1;
        document.getElementById("powerlifts").style.width = ratio1.toFixed(0) + "%";
        document.getElementById("a").innerHTML = "Power Lifts: " + ratio1.toFixed(0);
    }
    if (isNaN(ratio2)) {
        document.getElementById("olympiclifts").style.width = "0%";
    } else {
        fitness += ratio2;
        denominator += 1;
        document.getElementById("olympiclifts").style.width = ratio2.toFixed(0) + "%";
        document.getElementById("b").innerHTML = "Olympic Lifts: " + ratio2.toFixed(0);
    }
    if (isNaN(ratio3)) {
        document.getElementById("sprint").style.width = "0%";
    } else {
        fitness += ratio3;
        denominator += 1;
        document.getElementById("sprint").style.width = ratio3.toFixed(0) + "%";
        document.getElementById("c").innerHTML = "Sprint: " +ratio3.toFixed(0);
    }
    if (isNaN(ratio4)) {
        document.getElementById("endurance").style.width = "0%";
    } else {
        fitness += ratio4;
        denominator += 1;
        document.getElementById("endurance").style.width = ratio4.toFixed(0) + "%";
        document.getElementById("d").innerHTML = "Endurance: " +ratio4.toFixed(0);
    }
    if (isNaN(ratio5)) {
        document.getElementById("bodyweight").style.width = "0%";
    } else {
        fitness += ratio5;
        denominator += 1;
        document.getElementById("bodyweight").style.width = ratio5.toFixed(0) + "%";
        document.getElementById("e").innerHTML = "Bodyweight: " + ratio5.toFixed(0);
    }
    if (isNaN(ratio6)) {
        document.getElementById("light").style.width = "0%";
    } else {
        fitness += ratio6;
        denominator += 1;
        document.getElementById("light").style.width = ratio6.toFixed(0) + "%";
        document.getElementById("f").innerHTML = "Light: " + ratio6.toFixed(0);
    }
    if (isNaN(ratio7)) {
        document.getElementById("heavy").style.width = "0%";
    } else {
        fitness += ratio7;
        denominator += 1;
        document.getElementById("heavy").style.width = ratio7.toFixed(0) + "%";
        document.getElementById("g").innerHTML = "Heavy: " + ratio7.toFixed(0);
    }
    fitness /= denominator;
    document.getElementById("fitnesslevel").innerHTML = fitness.toFixed(0);
}

document.getElementById("proficiency").addEventListener("submit", function(event) {
    event.preventDefault();
    var data = {
        text: category.value + "!" + choices.value + "!" + score.value,
    }

    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            checkPriorResults(JSON.parse(this.responseText));
            addScore(JSON.parse(this.responseText));
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };

    console.log(data);

    xhttp2.open("POST", url, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", key);
    xhttp2.send(JSON.stringify(data));
});

function checkPriorResults(event) {
    if (event.text.includes("!")) {
        data = event.text.split("!");
    }
    for (var i = 0; i < results.length; i++) {
        if (results[i].text.includes("!")) {
            resultText = results[i].text.split("!");
        }
        if (data[1] == resultText[1]) {
            deleteResult(results[i]);
            results.splice(i, 1);
        }
    }
    for (var i = 0; i < power.length; i++) {
        if (power[i][0] == data[1]){
            power.splice(i, 1);
        }
    }
    for (var i = 0; i < olympic.length; i++) {
        if (olympic[i][0] == data[1]){
            olympic.splice(i, 1);
        }
    }
}

function deleteResult(event) {
    console.log("delete " + event.text);

    var result = event.id;

    var deletexhttp = new XMLHttpRequest();
    deletexhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };
    deletexhttp.open("DELETE", url + "/" + result, true);
    deletexhttp.setRequestHeader("Content-type", "application/json");
    deletexhttp.setRequestHeader("x-api-key", key);
    deletexhttp.send();
}