function stacksController($scope) {
  
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
  var CanvasWidth = 400;
  var CanvasHeight = 400;
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

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
    "date":"2012",
    "slices": [
      {
        label:"Procrastination",
        percentage:70
      },
      {
        label:"Learning",
        percentage:20
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

  $scope.resetCanvas = function() {

    // set background colour
    ctx.fillStyle=colors[Math.floor(Math.random()*colors.length)];

    // fill entire canvas
    ctx.fillRect(0,0,CanvasWidth,CanvasHeight);

    // add water mark
    ctx.fillStyle='rgba(255,255,255,0.4)';
    ctx.font = "bold "+ CanvasWidth/25 +"px sans-serif";  
    ctx.fillText(watermark, CanvasWidth/20, CanvasHeight-CanvasHeight/20);

  }

  $scope.renderStackToCanvas = function(slices) {

    var barHeight;
    var totalStackHeight = 0;
    var color;
    var previousColor;

    for (var i in slices) {

      // calculate height of bar in pixels
      barHeight = CanvasHeight/100*slices[i].percentage;

      // set slice color
      while (color == previousColor) {
        color = colors[Math.floor(Math.random()*colors.length)];
      }
      previousColor = color;
      ctx.fillStyle=color;

      // render bar
      ctx.fillRect(0,totalStackHeight,CanvasWidth,totalStackHeight+barHeight);

      // increase drawig starting position
      totalStackHeight = totalStackHeight + barHeight;

    }
    

  }

  // --------------------- Init ----------------------------

  $scope.resetCanvas();
  $scope.renderStackToCanvas($scope.deck.slices);




}