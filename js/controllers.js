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
  var CanvasWidth = 800;
  var CanvasHeight = 800;
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var minFontSize = CanvasHeight/25;
  var maxFontSize = CanvasHeight/10;
  var fontWeight = 'bold';
  // Set canvas dimensions
  c.width = CanvasWidth;
  c.height = CanvasHeight;

  // colors
  var colors = [
    '#490A3D',
    '#BD1550',
    '#E97F02',
    '#F8CA00',
    '#8A9B0F',
    '#547980',
    '#9E8C89',
    '#BD657B',
    '#027ABB',
    '#7F1416'
  ]

  // Watermark
  var watermark = "SimplyDo.com";


  // ---- first stack, test

  $scope.deck = {
    "date":"March 12, 2012",
    "slices": [
      {
        label:"Procrastination",
        percentage:55
      },
      {
        label:"Up, up and away",
        percentage:25
      },
      {
        label:"Work",
        percentage:10
      }
    ]
  }


  // --------------------- Helper Functions ----------------------------

  $scope.convertCanvasToImage = function() {
    return c.toDataURL("image/png");
  }

  $scope.addSlice = function() {
    var newSlice = {
      label:"New",
      percentage:10
    }
    $scope.deck.slices.push(newSlice);
  }

  $scope.removeSlice = function(index) {
    $scope.deck.slices.splice(index,1);
  }

  $scope.urlEncode = function(sourceObject) {

    // takes an object and converts it into JSON into an ULR ancode string
    // see also urlDecode

    var string = angular.toJson(sourceObject);
    return escape(string);
  }

  $scope.urlDecode = function(string) {

    // takes an url encode string and converts it to JSON to Object
    // see also urlEncode

    var cleanString = unescape(string);
    return angular.fromJson(cleanString);
  }

  $scope.renderNewStack = function() {
    $scope.renderStackToCanvas($scope.deck.slices);
  }

  $scope.resetCanvas = function() {

    // set background colour
    ctx.fillStyle=colors[Math.floor(Math.random()*colors.length)];

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
      barHeight = CanvasHeight/100*slices[i].percentage;

      // set slice color and make sure adjucent colors are not the same!
      while (color == previousColor) {
        color = colors[Math.floor(Math.random()*colors.length)];
      }
      previousColor = color;
      ctx.fillStyle = color;

      // render slice to canvas
      ctx.fillRect(0,usedStackHeight,CanvasWidth,usedStackHeight+barHeight);

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
      ctx.fillText(slices[i].percentage + "% " + slices[i].label, CanvasWidth/35, usedStackHeight-barHeight/2+labelSize/3);

    }

    /*
    // add water mark once all the slices have been rendered
    ctx.fillStyle='rgba(255,255,255,0.4)';
    ctx.font = "bold "+ CanvasWidth/25 +"px sans-serif";  
    ctx.fillText(watermark, CanvasWidth/20, CanvasHeight-CanvasHeight/20);
    */

  }

  // --------------------- Init ----------------------------

  if ($routeParams.stack) {
    $scope.deck.slices = $scope.urlDecode($routeParams.stack);
  }

  $scope.renderStackToCanvas($scope.deck.slices);


}

stacksController.$inject = ['$scope', '$routeParams'];