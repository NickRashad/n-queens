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
  var currBoard = new Board({n: n}); // undefined; //fixme
  var rowIndex = 0;
  var colIndex = 0;

  // Middle Game
  while (rowIndex < n && colIndex < n) {
  // Start on first row
    currBoard.togglePiece(rowIndex, colIndex);
    // Toggle piece on 1st row then skip row and column
    rowIndex++;
    // Then increment both row and column index
    colIndex++;
  }
  //Endgame
  solution = currBoard.rows(); // Returns visual representation of matrix
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// Return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // Beginning Game
  var solutionCount = 0;
  var brd = new Board({n: n});

  // Middle Game
  var middleGame = function (brd, rowIndex) {
    var upper = 0;
    for (var colIndex = 0; colIndex < n; colIndex++) {
      var stat = true;
      brd.togglePiece(rowIndex, colIndex);
      if (brd.hasAnyColConflicts() || brd.hasAnyRowConflicts()) { // Check for conflicts
        brd.togglePiece(rowIndex, colIndex);
        stat = false;
      } else if (rowIndex === (n - 1)) { // If on last row and success then valid solution
        stat = false;
        brd.togglePiece(rowIndex, colIndex);
        return 1;
      }
      if (stat) {
        upper += middleGame(new Board(brd.rows()), rowIndex + 1);
        brd.togglePiece(rowIndex, colIndex);
      }
    }
    return upper;
  };
  solutionCount = middleGame(brd, 0);

  // Endgame
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// Return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = 0; //fixme
  var brd = new Board({n: n});
  debugger;
  // Middle Game
  var middleGame = function (brd, rowIndex) {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      debugger;
      var stat = true;
      brd.togglePiece(rowIndex, colIndex);
      if (brd.hasAnyMajorDiagonalConflicts() || brd.hasAnyMinorDiagonalConflicts() || brd.hasAnyColConflicts() || brd.hasAnyRowConflicts()) { // Check for conflicts
        brd.togglePiece(rowIndex, colIndex);
        stat = false;
      } else if (rowIndex === (n - 1)) { // If on last row and success then valid solution
        stat = false;
        return brd.rows();
        brd.togglePiece(rowIndex, colIndex);
      }
      if (stat) {
        middleGame(brd, rowIndex + 1);
        brd.togglePiece(rowIndex, colIndex);
      }
    }
  };
  solution = middleGame(brd, 0) || {n: n};

  debugger;
  //Endgame
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// Return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
