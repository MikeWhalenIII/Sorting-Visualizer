var array;
var barHeight = 17; // Initial bar height
var numElements = 45; // Initial value
var sortingSpeed = 20; // Initial Sorting Speed

function updateSlider(slideAmount) {
    numElements = slideAmount;
    barHeight = (150 / slideAmount) * 4;
    sortingSpeed = Math.round((101 / slideAmount) * 5);
    resetArray();
}

/**
 * This function is used to slow down the sorting methods.
 * 
 * @param {*} ms How long the timeout should be.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * This function populates the array and renders the array bars.
 */
function resetArray() {
    array = Array(100).fill().map(() => Math.round(Math.random() * 99) + 1);
    array.length = numElements;
    var data = "";

    for (let index = 0; index < array.length; index++) {
        data += '<div class="progress bg-transparent" style="height: ' + barHeight + 'px; margin-bottom: 2px">' +
            '<div class="progress-bar" id="' + index + '" role="progressbar" style="width: ' + array[index] + '%; transition:none; " aria-valuenow="' + array[index] + '" aria-valuemin="0" aria-valuemax="110"></div></div>';
    }
    document.getElementById("arrayBars").innerHTML = data;
    console.log(array);
}

/**
 * This function is called when the user wants to sort the array.
 * 
 * @param {*} sortingMethod The sorting method to use to sort the array.
 */
async function sort(sortingMethod) {
    // Disable buttons during sort
    $(':button').prop('disabled', true);
    $('#arraySlider').prop('disabled', true);

    // Call sorting methods
    if (sortingMethod == 'bubble') {
        await bubbleSort();
    } else if (sortingMethod == 'merge') {
        await mergeSort();
    } else if (sortingMethod == 'quick') {
        await quickSort();
    }

    // Once the sorting has completed change bars from blue to green to signify completion.
    for (let index = 0; index < array.length; index++) {
        document.getElementById(index).className = "progress-bar";
    }
    await sleep(900);
    for (let index = 0; index < array.length; index++) {
        document.getElementById(index).className = "progress-bar bg-success";
    }

    // Enable buttons once sorting has been completed
    $(':button').prop('disabled', false);
    $('#arraySlider').prop('disabled', false);
}

/**
 * Bubble Sort
 */
async function bubbleSort() {
    var outer = "", inner = "";
    var nElems = array.length;

    for (outer = nElems - 1; outer > 1; outer--) {
        for (inner = 0; inner < outer; inner++) {

            // Change the color of the two bars being compared to orange.
            document.getElementById(inner).className = "progress-bar bg-warning";
            document.getElementById(inner + 1).className = "progress-bar bg-warning";
            await sleep(sortingSpeed);

            if (array[inner] > array[inner + 1]) {
                swap(inner, inner + 1, outer);
                // If two bars are being swapped change their color to red.
                document.getElementById(inner).className = "progress-bar bg-danger";
                document.getElementById(inner + 1).className = "progress-bar bg-danger";
                await sleep(sortingSpeed);
            }
            // Change the two bars back to blue.
            document.getElementById(inner).className = "progress-bar";
            document.getElementById(inner + 1).className = "progress-bar";

            // If the array bar is at its final position, change its color to green.
            if (inner == outer) {
                document.getElementById(inner).className = "progress-bar bg-success";
            } else if (inner + 1 == outer) {
                document.getElementById(inner + 1).className = "progress-bar bg-success";
            }
        }
    }
}

function swap(one, two, outer) {
    var temp = array[one];

    array[one] = array[two];
    $('#' + one).attr('aria-valuenow', array[one]).css('width', array[one] + '%');

    array[two] = temp;
    $('#' + two).attr('aria-valuenow', array[two]).css('width', array[two] + '%');
}

/**
 * Merge Sort
 */
async function mergeSort() {
    //TODO
}

/**
 * Quick Sort
 */
async function quickSort() {
    var nElems = array.length;
    await recQuickSort(0, nElems - 1);
}

async function recQuickSort(left, right) {
    if (right - left <= 0) {
        return;
    } else {
        var pivot = array[right];

        var pivotLocation = await partitionIt(left, right, pivot, right);
        await recQuickSort(left, pivotLocation - 1); // Sort left side
        await recQuickSort(pivotLocation + 1, right); // Sort right side
    }
}

async function partitionIt(left, right, pivot, pivotIndex) {
    var leftPtr = left - 1;
    var rightPtr = right;

    // Change the color of the pivot points to dark grey.
    document.getElementById(pivotIndex).className = "progress-bar bg-dark";

    while (true) {
        while (array[++leftPtr] < pivot) { // find bigger item
            document.getElementById(leftPtr).className = "progress-bar bg-warning";
            await sleep(sortingSpeed);
            document.getElementById(leftPtr).className = "progress-bar";
        }

        while (rightPtr > 0 && array[--rightPtr] > pivot) { // find smaller item
            document.getElementById(rightPtr).className = "progress-bar bg-warning";
            await sleep(sortingSpeed);
            document.getElementById(rightPtr).className = "progress-bar";
        }

        if (leftPtr >= rightPtr) { // if pointers cross, partition done
            break;
        } else {
            // If two bars are being swapped change their color to red.
            document.getElementById(leftPtr).className = "progress-bar bg-danger";
            document.getElementById(rightPtr).className = "progress-bar bg-danger";
            await sleep(sortingSpeed);
            swap(leftPtr, rightPtr); // swap elements
        }
        // Change the two bars back to blue.
        document.getElementById(leftPtr).className = "progress-bar";
        document.getElementById(rightPtr).className = "progress-bar";
    }
    swap(leftPtr, right); // restore pivot
    return leftPtr; // return pivot location
}