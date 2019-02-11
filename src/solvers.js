/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // Beginning Game
  var solution = undefined;
  var currBoard = new Board({n: n});
  var rowIndex = 0;
  var colIndex = 0;

  // Middle Game
  while (rowIndex < n && colIndex < n) {
    // Toggle piece on current row and column Then increment both row and column index
    currBoard.togglePiece(rowIndex, colIndex);
    rowIndex++;
    colIndex++;
  }

  // End Game
  solution = currBoard.rows(); // Returns visual representation of matrix
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// Return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // Beginning Game
  var solutionCount = 0;
  var brd = new Board({n: n});
  var successfulPlacement = true;
  var addPiece = function (rowIndex, colIndex) {
    brd.togglePiece(rowIndex, colIndex);
    successfulPlacement = true;
  };
  var removePiece = function (rowIndex, colIndex) {
    brd.togglePiece(rowIndex, colIndex);
    successfulPlacement = false;
  };

  // Middle Game
  var middleGame = function (brd, rowIndex) {
    var rookCount = 0;
    for (var colIndex = 0; colIndex < n; colIndex++) {
      addPiece(rowIndex, colIndex);
      if (brd.hasAnyColConflicts() || brd.hasAnyRowConflicts()) { // Check for conflicts
        removePiece(rowIndex, colIndex);
      } else if (rowIndex === (n - 1)) { // If on last row and success then valid solution
        removePiece(rowIndex, colIndex);
        return 1;
      } else if (successfulPlacement) {
        rookCount += middleGame(brd, rowIndex + 1);
        brd.togglePiece(rowIndex, colIndex);
      }
    }
    return rookCount;
  };
  solutionCount = middleGame(brd, 0);

  // End Game
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// Return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = 0;
  var brd = new Board({n: n});
  var seekSolution = true;
  var successfulPlacement = true;
  var queenCount = 0;
  var addPiece = function (rowIndex, colIndex) {
    brd.togglePiece(rowIndex, colIndex);
    queenCount ++;
    successfulPlacement = true;
  };
  var removePiece = function (rowIndex, colIndex) {
    brd.togglePiece(rowIndex, colIndex);
    queenCount --;
    successfulPlacement = false;
  };

  // Middle Game
  var middleGame = function (brd, rowIndex) {
    for (var colIndex = 0; colIndex < n && seekSolution; colIndex++) {
      addPiece(rowIndex, colIndex);
      if (brd.hasAnyMajorDiagonalConflicts() || brd.hasAnyMinorDiagonalConflicts() || brd.hasAnyColConflicts() || brd.hasAnyRowConflicts()) { // Check for conflicts
        removePiece(rowIndex, colIndex);
      } else if (queenCount === n && seekSolution) { // If on last row and success then valid solution
        seekSolution = false;
        solution = brd.rows();
        // return null; //~ Will do research on whether returning a value of null helps the call stack to collapse quicker
      }
      if (successfulPlacement && seekSolution) {
        middleGame(brd, rowIndex + 1);
        if (seekSolution) {
          removePiece(rowIndex, colIndex);
        }
      }
    }
  };
  middleGame(brd, 0);
  solution = solution || {n: n};

  //End Game
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// Return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount;
  var brd = new Board({n: n});
  var queenCount = 0;
  var successfulPlacement = true;
  var addPiece = function (rowIndex, colIndex) {
    brd.togglePiece(rowIndex, colIndex);
    queenCount ++;
    successfulPlacement = true;
  };
  var removePiece = function (rowIndex, colIndex) {
    brd.togglePiece(rowIndex, colIndex);
    queenCount --;
    successfulPlacement = false;
  };

  // Middle Game
  var middleGame = function (brd, rowIndex) {
    var successCount = 0;
    for (var colIndex = 0; colIndex < n; colIndex++) {
      addPiece(rowIndex, colIndex);
      if (brd.hasAnyMajorDiagonalConflicts() || brd.hasAnyMinorDiagonalConflicts() || brd.hasAnyColConflicts() || brd.hasAnyRowConflicts()) { // Check for conflicts
        removePiece(rowIndex, colIndex);
      } else if (queenCount === n) { // If on last row and success then valid solution
        removePiece(rowIndex, colIndex);
        return 1;
      } else if (successfulPlacement) {
        successCount += middleGame(brd, rowIndex + 1);
        removePiece(rowIndex, colIndex);
      }
    }
    return successCount;
  };
  solutionCount = middleGame(brd, 0);
  solutionCount = solutionCount === 0 && n === 0 ? 1 : solutionCount;

  // End Game
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
