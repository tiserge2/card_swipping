    var start = 0;
    var end   = 2;
    var colorArrayPosition = [];
    var colorArray = ['pink', 'green', 'blue', 'yellow', 'red', 'black'];
    //constructing the cardControllerArray
    for(var i = 0; i < colorArray.length; i++ ) {
        colorArrayPosition.push(i);
    }
    var colorStarting = 0;


    function checkSimilarity(array1, array2, number, disposition) { 
        if(disposition === "avant") {
            for(var i = 0; i < number; i++) {
                if(array1[i] !== array2[i]) {
                    return false;
                }
            }
            return true
        }
        
        if(disposition === "arriere") {
            var array2Length = array2.length - 1;
            var j = array2Length;
            for(var i = (number - 1); i >= 0; i--) {
                if(array1[i] !== array2[j]) {
                    return false
                }
                j--;
            }
            return true;
        }
    }

    function showing(arrayToShow, originalArray, direction) {
        var arrayLength = arrayToShow.length;
        
        console.log("original array: ", originalArray);
        console.log("array to show ", arrayToShow);

        if(arrayLength === 3) {
            console.log("Length of array is: ", arrayLength);
            // let's check if we have the first three
            if(checkSimilarity(arrayToShow, originalArray, arrayLength, "avant")) {
                console.log('First 3');
                var color = 0;
                for(var i = 3; i <= 5; i++) {
                    $("#box" + i).css("background-color", colorArray[color]);
                    color++;
                }
            }
            
            // let's check if we have the last three
            if(checkSimilarity(arrayToShow, originalArray, arrayLength, "arriere")) { 
                console.log('Last 3');
                var color = originalArray.length - 1;
                for(var i = 3; i >= 1; i--) {
                    $("#box" + i).css("background-color", colorArray[color]);
                    color--;
                }
            }
        }
        
        if(arrayLength === 4) {
            console.log("Length of array is: ", arrayLength);
            // let's check if we have the first three
            if(checkSimilarity(arrayToShow, originalArray, arrayLength, "avant")) {
                console.log('First 4');
                var color = 0;
                for(var i = 2; i <= 5; i++) {
                    $("#box" + i).css("background-color", colorArray[color]);
                    color++;
                }
            }
            
            // let's check if we have the last three
            if(checkSimilarity(arrayToShow, originalArray, arrayLength, "arriere")) { 
                console.log('Last 4');
                var color = originalArray.length - 1;
                for(var i = 4; i >= 1; i--) {
                    $("#box" + i).css("background-color", colorArray[color]);
                    color--;
                }
            }
        }
        
        if(arrayLength === 5) {
            console.log("Length of array is: ", arrayLength);
            var color = arrayToShow[0];
            for(var i = 1; i <= 5; i++) {
                $("#box" + i).css("background-color", colorArray[color]);
                color++;
            }
        }
    }

    var lastStarting = 0;
    var lastColors = 4;

    var cardController1 = [7, 8, 9];
    var cardController = [0, 1, 2];

    $('#backward').click(function() {
        var lc = cardController.length;

        if(lc === 3 && checkSimilarity(cardController, colorArrayPosition, 3, 'avant')) {
            console.log("Backward 1");
            cardController.push(cardController[lc - 1] + 1);
        }

        if(lc === 4 && checkSimilarity(cardController, colorArrayPosition, 4, 'avant')) {
            console.log("Backward 2");
            cardController.push(cardController[lc - 1] + 1);
        }

        if(lc === 5 && (cardController[lc - 1] === colorArrayPosition[colorArrayPosition.length - 1])) {
            console.log("Backward 3");
            // console.log("card apres retrait: 2", cardController);
            cardController.shift();
            $("#box5").css("background-color", "");
        }

        if(lc === 5 && (cardController[0] === colorArrayPosition[0])) {
            console.log("Backward 4");
            console.log("last element of colorArrayPosition: ", colorArrayPosition[colorArrayPosition.length - 1]);
            var element = cardController[lc - 1] + 1;
            cardController.shift();
            cardController.push(element);
            // console.log("card apres retrait: 1", cardController);
            // console.log("Element to add: ", cardController[lc - 1] + 1);
        } 

        if(lc === 4 && checkSimilarity(cardController, colorArrayPosition, 4, 'arriere')) {
            console.log("Backward 5");
            cardController.shift();
            $("#box4").css("background-color", "");
        }

        console.log("card avant showing function: ", cardController);
        showing(cardController, colorArrayPosition, 'apres');
    });

    $('#forward').click(function() {
        var lc = cardController.length;

        if(lc === 4 && checkSimilarity(cardController, colorArrayPosition, 4, 'avant')) {
            console.log("Forward 5");
            cardController.pop();
            $("#box2").css("background-color", "");
        }

        if(lc === 3 && checkSimilarity(cardController, colorArrayPosition, 3, 'arriere')) {
            console.log("Forward 1");
            cardController.unshift(cardController[0] - 1);
        }

        if(lc === 4 && checkSimilarity(cardController, colorArrayPosition, 4, 'arriere')) {
            console.log("Forward 2");
            cardController.unshift(cardController[0] - 1);
        }

        if(lc === 5 && (cardController[0] === colorArrayPosition[0])) {
            console.log("Forward 4");
            cardController.pop();
            $("#box1").css("background-color", "");
        }

        if(lc === 5 && (cardController[0] !== colorArrayPosition[0])) {
            console.log("Forward 3");
            cardController.unshift(cardController[0] - 1);
            cardController.pop();
        }

        showing(cardController, colorArrayPosition, 'avant');
    });

    (function() {
        showing(cardController, colorArrayPosition, 'apres');
    }());