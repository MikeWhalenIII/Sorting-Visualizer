var array;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetArray() {
    array = Array(44).fill().map(() => Math.round(Math.random() * 100));
    var data = "";

    for (let index = 0; index < array.length; index++) {
        data += '<div class="progress bg-transparent" style="margin-bottom: 2px">' +
            '<div class="progress-bar" id="' + index + '" role="progressbar" style="width: ' + array[index] + '%; transition:none; " aria-valuenow="' + array[index] + '" aria-valuemin="0" aria-valuemax="40">' + array[index] + '</div></div>';
    }
    document.getElementById("arrayBars").innerHTML = data;
}

async function bubbleSort() {
    var outer = "", inner = "";
    var nElems = array.length;

    // Disable buttons during sort
    $("#buttons").children().prop('disabled', true);

    for (outer = nElems - 1; outer > 1; outer--) {
        for (inner = 0; inner < outer; inner++) {
            // Change the color of the two bars being compared to yellow
            document.getElementById(inner).className = "progress-bar bg-warning";
            document.getElementById(inner + 1).className = "progress-bar bg-warning";
            await sleep(10);
            
            if (array[inner] > array[inner + 1]) {
                swap(inner, inner + 1, outer);
                document.getElementById(inner).className = "progress-bar bg-danger";
                document.getElementById(inner + 1).className = "progress-bar bg-danger";
                await sleep(10);
            }
            // Change the two bars back to blue
            document.getElementById(inner).className = "progress-bar";
            document.getElementById(inner + 1).className = "progress-bar";

            if (inner == outer) {
                document.getElementById(inner).className = "progress-bar bg-success";
            } else if (inner + 1 == outer) {
                document.getElementById(inner + 1).className = "progress-bar bg-success";
            }
        }
    }
    // Enable buttons once sorting has been completed
    $("#buttons").children().prop('disabled', false);
}

function swap(one, two, outer) {
    var temp = array[one];

    array[one] = array[two];
    $('#' + one).attr('aria-valuenow', array[one]).css('width', array[one] + '%').text(array[one]);
    
    array[two] = temp;
    $('#' + two).attr('aria-valuenow', array[two]).css('width', array[two] + '%').text(array[two]);
}