function expand() {
    $('.collapse').collapse('show');
}

function collapse() {
    $('.collapse').collapse('hide');
}

function resize1() {
    var input = $('#search1').val() + "%";
    console.log(input);
    document.getElementById("try1").style.width = input;
}

function resize2() {
    var input = $('#search2').val() + "%";
    console.log(input);
    document.getElementById("try2").style.width = input;
}

function resize3() {
    var input = $('#search3').val() + "%";
    console.log(input);
    document.getElementById("try3").style.width = input;
}

function resize4() {
    var input = $('#search4').val() + "%";
    console.log(input);
    document.getElementById("try4").style.width = input;
}

// object literal holding data for option elements
var Select_List_Data = {
    
    'choices': { // name of associated select box
        
        // names match option values in controlling select box
        power: {
            text: ['1RM Deadlift', '3RM Deadlift', '5RM Deadlift', '10RM Deadlift', '1RM Front Squat', '3RM Front Squat', '5RM Front Squat', '10RM Front Squat', '1RM Shoulder Press', '3RM Shoulder Press', '5RM Shoulder Press', '10RM Shoulder Press']
        },
        olympic: {
            text: ['1RM Clean', '3RM Clean', '5RM Clean', '10RM Clean', '1RM Snatch', '3RM Snatch', '5RM Snatch', '10RM Snatch', '1RM Push Jerk', '3RM Push Jerk', '5RM Push Jerk', '10RM Push Jerk', '1RM Clean and Jerk', '3RM Clean and Jerk']
        },
        sprint: {
            text: ['Row 100m', 'Row 250m', 'Row 500m', 'Row 1000m']
        },
        endurance: {
            text: ['Row 2000m', 'Row 5000m']
        },
        bodyweight: {
            text: ['50 Burpees FT', '50 Abmat Sit Ups FT', '100 Abmat Sit Ups FT', 'Open 21.1 Scaled', 'AMReps 5min: Single Unders', 'AMReps 2min: Double Unders', 'CrossFit Open 12.1', 'AMRAP 15: Row 250m, 25 Push Ups', '4 RFT: 50m Walking Lunge, 50 Abmat Sit Ups']
        },
        light: {
            text: ['Grace', 'Diane', 'Elizabeth', 'Karen', 'Fight Gone Bad', 'Jack', 'The Chief', '12-9-6-3: Power Snatch, Burpee', 'Open 21.2 Scaled']
        },
        heavy: {
            text: ['Isabel', 'DT', 'Open 13.1', 'Open 14.3', 'Regional 11.3', '2008 Games: Deadlift and Burpees', '4 RFT: Row 300m, 10-15-10-5 Push Press', '5 RFT: Row 500m, 7 Thrusters', 'Chipper: 20 Front Squats, 30 Box Jumps, 40 Kettlebell Swings, 50 Wall Balls', '5 RFT: 7 Cleans, 14 Ketllebell Swings']
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
            sel.removeChild( groups[i-1] );
        }
    }
    
    len = sel.options.length;
    for (var i=len; i; i--) {
        par = sel.options[i-1].parentNode;
        par.removeChild( sel.options[i-1] );
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
            o.appendChild( document.createTextNode( obj.text[i] ) );
            
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