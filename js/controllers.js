function stacksController($scope, $routeParams) {

  /*

    // ----------------Init QS SDK -----------------------------------------------
    var qs = false;
    QS.setup().then(function (initializedQs) {
      qs = initializedQs;
      qs.retrievePlayerInfo().then(function (player) {
        $scope.playerName = player.name;
        $scope.$apply();
      });
      qs.retrievePlayerData().then(function (data) {
        if (data.totalFaces) {
          $scope.totalFaces = data.totalFaces;
        }
        $scope.$apply();
      });
    })


  */


  // ---------------- Environment Values and Settings --------------------------
  
  var c = document.createElement("canvas");
  var ctx=c.getContext("2d");
  var CanvasWidth = 1200;
  var CanvasHeight = 750;
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var minFontSize = CanvasHeight/30;
  var maxFontSize = CanvasHeight/10;
  var fontWeight = 'bold';

  // Get current date
  var today = new Date();
  var currentDate = today.getMonth()+1+"/"+today.getDate()+"/"+today.getFullYear();

  // Set canvas dimensions
  c.width = CanvasWidth;
  c.height = CanvasHeight;

  // colors
  var colors = [
    '#5E412F',
    '#F9CC36',
    '#78C0A8',
    '#F07818',
    '#F0A830',
    '#C7E0D0',
  ]

  // Watermark
  var watermark = "SimplyDo.com";


  // --------------------- Helper Functions ----------------------------

  $scope.convertCanvasToImage = function() {
    return c.toDataURL("image/png");
  }

  $scope.addSlice = function() {
    var newSlice = {
      label:"",
      percentage:10
    }
    $scope.deck.slices.push(newSlice);
  }

  $scope.removeSlice = function(index) {
    $scope.deck.slices.splice(index,1);
  }

  $scope.urlEncode = function(sourceObject) {

    // takes an object and converts it into JSON into an ULR encoded string
    // see also urlDecode

    var cleanString = angular.toJson(sourceObject);
    return escape(encodeURIComponent(cleanString));
  }

  $scope.urlDecode = function(uri) {

    // takes an url encoded string and converts it to JSON to Object
    // see also urlEncode

    var cleanString = unescape(decodeURIComponent(uri));
    return angular.fromJson(cleanString);
  }

  $scope.totalPercentage = function() {

    var totalPercentage=0;

    for (var i in $scope.deck.slices) {
       totalPercentage = totalPercentage + parseInt($scope.deck.slices[i].percentage);
    }

    return totalPercentage;
  }

  $scope.totalSlices = function() {

    return $scope.deck.slices.length;
  }

  $scope.renderStack = function() {
    $scope.renderStackToCanvas($scope.deck.slices);
  }

  $scope.resetCanvas = function() {

    // set background colour
    ctx.fillStyle="#EEEEEE";

    // fill entire canvas
    ctx.fillRect(0,0,CanvasWidth,CanvasHeight);


    /*
    // add water mark
    ctx.fillStyle='rgba(255,255,255,0.4)';
    ctx.font = "bold "+ CanvasWidth/25 +"px sans-serif";  
    ctx.fillText(watermark, CanvasWidth/20, CanvasHeight-CanvasHeight/20);
    */

  }

  $scope.renderStackToCanvas = function(slices) {

    var barHeight;
    var usedStackHeight = 0;
    var color;
    var previousColor;
    var labelSize;

    $scope.resetCanvas();


    for (var i in slices) {

      //break if stack is too hight (e.g. bad data)
      if (usedStackHeight > CanvasHeight) {
        break;
      }

      // calculate height of slice in pixels
      barHeight = CanvasHeight/100*parseInt(slices[i].percentage);

      // set slice color and make sure adjucent colors are not the same!
      while (color == previousColor) {
        color = colors[Math.floor(Math.random()*colors.length)];
      }
      previousColor = color;
      ctx.fillStyle = color;

      // render slice to canvas
      ctx.fillRect(0,usedStackHeight,CanvasWidth,barHeight);

      // increment height already used up by slices 
      usedStackHeight = usedStackHeight + barHeight;

      // render label
      labelSize = barHeight/2;
      if (labelSize > maxFontSize) {
        labelSize = maxFontSize;
      } else if (labelSize < minFontSize) {
        labelSize = minFontSize;
      }
      ctx.fillStyle='rgba(255,255,255,0.9)';
      ctx.font = fontWeight + " " + labelSize +"px sans-serif";  
      ctx.fillText(slices[i].label, minFontSize*3, usedStackHeight-barHeight/2+labelSize/3);

      //Adding percentage read out
      ctx.fillStyle='rgba(255,255,255,0.6)';
      ctx.font = fontWeight + " " + minFontSize +"px sans-serif";  
      ctx.fillText(parseInt(slices[i].percentage)+"%", CanvasWidth/80, usedStackHeight-barHeight/2+labelSize/3);

    }

    /*
    // add water mark once all the slices have been rendered
    ctx.fillStyle='rgba(255,255,255,0.4)';
    ctx.font = "bold "+ CanvasWidth/25 +"px sans-serif";  
    ctx.fillText(watermark, CanvasWidth/20, CanvasHeight-CanvasHeight/20);
    */

  }

  // --------------------- Init ----------------------------

  // if no stack is present in the URL create a default one to use
  if ($routeParams.stack) {
    $scope.deck = $scope.urlDecode($routeParams.stack);
  } else {
      $scope.deck = {
        "title":currentDate,
        "slices": [
          {
            label:"Work",
            percentage:60
          },
          {
            label:"Sleep",
            percentage:30
          },
          {
            label:"Fun",
            percentage:10
          }
        ]
      }
  }

  $scope.renderStackToCanvas($scope.deck.slices);


}

stacksController.$inject = ['$scope', '$routeParams'];