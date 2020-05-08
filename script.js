var array;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetArray() {
    array = Array(30).fill().map(() => Math.round(Math.random() * 100));
    var data = "";

    for (let index = 0; index < array.length; index++) {
        data += '<div class="progress bg-transparent" style="margin-bottom:1%">' +
            '<div class="progress-bar" id="' + index + '" role="progressbar" style="width: ' + array[index] + '% " aria-valuenow="' + array[index] + '" aria-valuemin="0" aria-valuemax="40">' + array[index] + '</div></div>';
    }
    document.getElementById("arrayBars").innerHTML = data;
}

async function bubbleSort() {
    var outer = "", inner = "";
    var nElems = array.length;

    for (outer = nElems - 1; outer > 1; outer--) {
        for (inner = 0; inner < outer; inner++) {
            if (array[inner] > array[inner + 1])
                document.getElementById(inner).className = "progress-bar bg-warning";
                document.getElementById(inner + 1).className = "progress-bar bg-warning";
                //await sleep(500);
                swap(inner, inner + 1);
            }
    }
}

function swap(one, two) {
    var temp = array[one];
    array[one] = array[two];
    //document.getElementById(one).style = 'width: ' + array[two] + '%"';
    $('#' + one).attr('aria-valuenow', array[two]).css('width', array[two]+'%').text(array[two]);
    
    array[two] = temp;
    $('#' + two).attr('aria-valuenow', array[temp]).css('width', array[temp]+'%').text(array[temp]);
}