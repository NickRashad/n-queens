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

  // Middle Game [0]
  while(rowIndex < n && colIndex < n) {
  // Start on first row
  currBoard.togglePiece(rowIndex, colIndex);
  // Toggle piece on 1st row then skip row and column
  rowIndex++
  // Then increment both row and column index
  colIndex++
  }
  //Endgame
  solution = currBoard.rows(); // Returns visual representation of matrix
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var brd = new Board({n: n});
  debugger;
  // Function that toggles current piece  
  // Toggle piece then check Row/Column 
  // If Pass then skip to next 
  //Else Fail unToggle then move to the right
  // Recursion over everything   
  var middleGame = function (brd, rowIndex = 0) {
    // Start at current column where we aim to recurse over every possibility for this column
    // Input a newly created board of n rows that gives us access to:
    // hasRowConflict, hasColConflictAt, hasAnyRowConflicts, hasAnyColConflicts
    // togglePiece 
    for (var colIndex = 0;  colIndex < n; colIndex++) {
      // Toggle Piece at current rowIndex & columnIndex
      brd.togglePiece(rowIndex,colIndex);
      // Check Column helper functions
      // If no conflict -> 
      if(brd.hasAnyColConflicts() === false) {
        //Check if on last row 
        if (rowIndex === (n - 1)) { //Don't recurse if on last row just increment solution count) 
        solutionCount++;
        } else { //recurse over matrix after adding to rowIndex 
          middleGame(brd, rowIndex + 1);
        }
      } else { // Else if conflict -> untoggle piece and allow for loop to increment
        brd.togglePiece(rowIndex,colIndex);
      }

    }
  };
  middleGame(brd);
  debugger;

  // Endgame
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
