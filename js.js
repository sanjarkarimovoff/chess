(function ($) {
  var modelArmy = {rook:2,knight:2,bishop:2,queen:1,king:1,pawn:8 };
  var modelGame = {status:0, winner: '', turn: 'white', player1: 'white', player2: 'black'};
  var game = '', blackArmy = '', whiteArmy = '';
  
  
  function newGame(){
    blackArmy = modelArmy;
    whiteArmy = modelArmy;
    game = modelGame;
    $(".chessboard td").attr("class", '');
    $("#l8 td,#l7 td").addClass(game.player2).attr("data-player", 2);
    $("#l1 td,#l2 td").addClass(game.player1).attr("data-player", 1);
    $("#l2 td, #l7 td").addClass("pawn").attr("data-peca", "pawn");
    $("#18, #88, #11, #81").addClass("rook").attr("data-peca","rook");
    $("#28, #78, #21, #71").addClass("knight").attr("data-peca","knight");
    $("#38, #68, #31, #61").addClass("bishop").attr("data-peca","bishop");
    $("#48, #41").addClass("queen").attr("data-peca","queen");
    $("#58, #51").addClass("king").attr("data-peca","king");
    showTurn();
  };
  function checkMove(id){
    var el = $("#"+id);
    if(el.hasClass(game.turn)){ 
      $('.'+game.turn).removeClass("selected");
      el.addClass("selected");
      $(".chessboard td").removeClass('available');
      var pMoves = moves[el.attr('data-peca')](id, el.data('player')); 
      $.each(pMoves, function(){
        $("#"+this).addClass('available');
      });
    }
    
  };
  function goTo(idFrom, idTo){
    var from = $("#"+idFrom);
    var to = $("#"+idTo);
    to.attr("data-peca", from.attr('data-peca')).attr('data-player', from.attr("data-player")).attr("class", from.attr("class"));
    
    from.attr("data-peca", "").attr("data-player","").attr("class","");
    $(".chessboard td").removeClass("available").removeClass("selected");
    game.turn = (game.turn === 'white')? 'black' : 'white';
    showTurn();
  }
  function showTurn(){
    if(game.turn === 'white'){
      $("#turn").removeClass('turnBlack').addClass('turnWhite');
    }else{
      $("#turn").removeClass('turnWhite').addClass('turnBlack');
    }
  }
  var moves = {
    bishop : function(coord, player){ 
      var column = Number(coord.charAt(0)); 
      var line = Number(coord.charAt(1));
      var coordinates = [];
      var turn = game.turn;

      coordinates = this.coordsD(column, line, 8, player);

      return coordinates;
    },
    king : function(coord, player){ 
      var column = Number(coord.charAt(0)); 
      var line = Number(coord.charAt(1));
      var coordinates = [];
      var turn = game.turn;

      var l = Number(line)+2;
      var coordinatesV = this.coordsV(column, line, 1, player);
      var coordinatesH = this.coordsH(column, line, 1, player);
      var coordinatesD = this.coordsD(column, line, 1, player);
      coordinates = coordinatesV.concat(coordinatesH);
      coordinates = coordinates.concat(coordinatesD);
      return coordinates;
    },
    knight : function(coord, player){ 
      var col = Number(coord.charAt(0)); 
      var line = Number(coord.charAt(1));
      var turn = game.turn;
      var c1 = col + 1, l1 = line + 2, c2 = col -1, c3 = col +2, l3 = line + 1, l4 = line-1, l5 = line-2, c4 = col-2;
      coordinatesT = [c1+''+l1, c2+''+l1, c3+''+l3, c3+''+l4, c1+''+l5, c2+''+l5,c4+''+l3, c4+''+l4];
      coordinates = [];
      $.each(coordinatesT, function(){
        var tEl = $("#"+this);
        if(player !== Number(tEl.attr('data-player'))){
          coordinates.push(this);
        }
      });
      return coordinates;
    },
    pawn : function(coord, player){
      var column = Number(coord.charAt(0)); 
      var line = Number(coord.charAt(1));
      var coordinates = [];
      var turn = game.turn;
      if(player === 1){
        if(line === 2){
          var l = Number(line)+2;
          coordinates = this.coordsVP(column, line, l, false);
        }else{
          var l = Number(line)+1;
          coordinates = this.coordsVP(column, line, l,false);
        }
        var prevCol = column - 1;
        var nextCol = Number(column) + 1; 
        var nextLine = line + 1;
        if($("#"+prevCol+nextLine).attr("data-peca") !== '' && Number($("#"+prevCol+nextLine).attr("data-player")) !== player){
            coordinates.push(prevCol +''+ nextLine);
           }
        if($("#"+nextCol+nextLine).attr("data-peca") !== '' && Number($("#"+nextCol+nextLine).attr("data-player")) !== player){
          coordinates.push(nextCol +''+ nextLine);
        }
      }else{ 
        if(Number(line) === 7){
          var l = Number(line)-2; 
          coordinates = this.coordsVP(column, line, l, false);
        }else{
          var l = Number(line)-1;
          coordinates = this.coordsVP(column, line, l, false);
        }
        var prevCol = column - 1;
        var nextCol = Number(column) + 1; 
        var nextLine = line - 1;
        if($("#"+prevCol+nextLine).attr("data-peca") !== '' && $("#"+prevCol+nextLine).attr("data-player") !== player){
          coordinates.push(prevCol +''+ nextLine);
        }
        if($("#"+nextCol+nextLine).attr("data-peca") !== '' && $("#"+nextCol+nextLine).attr("data-player") !== player){
          coordinates.push(nextCol +''+ nextLine);
        }
      } 
      return coordinates;
    },
    queen : function(coord, player){ 
      var column = Number(coord.charAt(0)); 
      var line = Number(coord.charAt(1));
      var coordinates = [];
      var turn = game.turn;

      var l = Number(line)+2;
      var coordinatesV = this.coordsV(column, line, 8, player);
      var coordinatesH = this.coordsH(column, line, 8, player);
      var coordinatesD = this.coordsD(column, line, 8, player);
      coordinates = coordinatesV.concat(coordinatesH);
      coordinates = coordinates.concat(coordinatesD);
      return coordinates;
    },
    rook : function(coord, player){ 
      var column = Number(coord.charAt(0)); 
      var line = Number(coord.charAt(1));
      var coordinates = [];
      var turn = game.turn;
     
          var l = Number(line)+2;
          var coordinatesV = this.coordsV(column, line, 8, player);
          var coordinatesH = this.coordsH(column, line, 8, player);
          coordinates = coordinatesV.concat(coordinatesH);
      return coordinates;
    },
    coordsVP : function(col,lineStart, lineEnd, eatVertical){
      var l1 = (lineStart < lineEnd)? lineStart +1 : lineEnd ;
      var l2 = (lineStart > lineEnd)? lineStart : lineEnd;
      var iniPlayer = $("#"+col+lineStart).attr("data-player"); 
      var coords = [];
      for(i = l1; i <= l2; i++){
        var idCoord = col + '' +i;
        var tEl = $("#"+idCoord);
        if(tEl.attr('data-peca') === ''){
          coords.push(idCoord);
        }else{ 
          if(iniPlayer !== tEl.attr('data-player') && eatVertical !== false){
             coords.push(idCoord);
          }
         break;
        }
         
      }
      return(coords);
    },
    coordsD : function(col, line, n, player){
      var min = (col - n > 1)? col - n : 1;
      var max = (col + n < 8)? col + n : 8;
      var coords = [];
      var l2 = line+1;
      for(i = col+1; i <= max; i++){
        var idCoord = i + '' + l2;
        var tEl = $("#"+idCoord);
        if(tEl.attr('data-peca') === ''){
          coords.push(idCoord);
        }else{ 
          if(player !== Number(tEl.attr('data-player'))){
            coords.push(idCoord);
          }
          break;
        }
        l2++;
      }
      l2 = line -1;
      for(i = col+1; i <= max; i++){
        var idCoord = i + '' + l2;
        var tEl = $("#"+idCoord);
        if(tEl.attr('data-peca') === ''){
          coords.push(idCoord);
        }else{ 
          if(player !== Number(tEl.attr('data-player'))){
            coords.push(idCoord);
          }
          break;
        }
        l2--;
      }
      l2 = line -1;
      for(i = col-1; i >= min; i--){
        var idCoord = i + '' + l2;
        var tEl = $("#"+idCoord);
        if(tEl.attr('data-peca') === ''){
          coords.push(idCoord);
        }else{ 
          if(player !== Number(tEl.attr('data-player'))){
            coords.push(idCoord);
          }
          break;
        }
        l2--;
      }
      l2 = line +1;
      for(i = col-1; i >= min; i--){
        var idCoord = i + '' + l2;
        var tEl = $("#"+idCoord);
        if(tEl.attr('data-peca') === ''){
          coords.push(idCoord);
        }else{ 
          if(player !== Number(tEl.attr('data-player'))){
            coords.push(idCoord);
          }
          break;
        }
        l2++;
      }
      return(coords);
    },
    coordsH : function(col, line, n, player){
      var min = (col - n > 1)? col - n : 1;
      var max = (col + n < 8)? col + n : 8;
      var coords = [];
      for(i = col+1; i <= max; i++){
        var idCoord = i + '' + line;
        var tEl = $("#"+idCoord);
        if(tEl.attr('data-peca') === ''){
          coords.push(idCoord);
        }else{ 
          if(player !== Number(tEl.attr('data-player'))){
            coords.push(idCoord);
          }
          break;
        }
      }
      for(i = col-1; i >= min; i--){
        var idCoord = i + '' + line;
        var tEl = $("#"+idCoord);
        if(tEl.attr('data-peca') === ''){
          coords.push(idCoord);
        }else{ 
          if(player !== Number(tEl.attr('data-player'))){
            coords.push(idCoord);
          }
          break;
        }
      } 
      return(coords);
    },
    coordsV : function(col, line, n, player){
        var min = (line - n > 1)? line - n : 1;
        var max = (line + n < 8)? line + n : 8;
        var coords = [];
        for(i = line+1; i <= max; i++){
          var idCoord = col+ '' + i;
          var tEl = $("#"+idCoord);
          if(tEl.attr('data-peca') === ''){
          coords.push(idCoord);
        }else{  
          if(player !== Number(tEl.attr('data-player'))){
            coords.push(idCoord);
          }
        break;
      }
    }
     for(i = line-1; i >= min; i--){
       var idCoord = col + '' + i;
       var tEl = $("#"+idCoord);
      if(tEl.attr('data-peca') === ''){
        coords.push(idCoord);
      }else{ 
        if(player !== Number(tEl.attr('data-player'))){
          coords.push(idCoord);
        }
        break;
      }
    } 
    return(coords);
    }
  }
  $("body").ready(function(){
    newGame();
    $(".chessboard td").on("click", function(){
      if(!$(this).hasClass("available")){
        checkMove($(this).attr("id"));
      }else{
        goTo($(".selected").attr('id'), $(this).attr('id'));
      }
    });
  });
}(jQuery))

