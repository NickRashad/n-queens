// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },
      


    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },
    

/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //Input: array
      // Create a holder for our count
      var count = 0;
      // Iterate over our row
      for (var i = 0; i < rowIndex.length; i++){
        if (rowIndex[i] === 1) {
          // For each piece increment our count
          count++;
        }
        if (count > 1) {
          // If more than one return true
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {   
      // Input -> An object that holds n arrays with numerical keys
      // Create a container and call our Row Getter
      var allRows = this.rows();
      // Iterate over container of rows
      var booleanHolder = [];
      for (var rowIndex in allRows) {
        // Call row helper function for each row
        booleanHolder.push(this.hasRowConflictAt(allRows[rowIndex]));
      }
      // Output a boolean based on if any row is true
      return booleanHolder.some(o => o);
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var count = 0;
      // Iterate over our column
      for (var j = 0; j < colIndex.length; j++){
        if (colIndex[j] === 1) {
          // For each piece increment our count
          count++;
        }
        if (count > 1) {
          // If more than one return true
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //input: object with numerical keys relating to 4 arrays - each array is a row
      //all rows and establish columns for each row
      var allColumns = {};
      var allRows = this.rows();
      var nLength = 0;
      for (var key in allRows) {
        for (var ind = 0; ind < allRows[key].length; ind++) {
          if (!allColumns[ind]) {
            allColumns[ind] = [];
          }
          allColumns[ind].push(allRows[key][nLength]);
        }
      } 
      var booleanHolder = [];
      for (var columnIndex in allColumns) {
        booleanHolder.push(this.hasColConflictAt(allColumns[columnIndex]));
      }
      return booleanHolder.some(o => o);
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      var diag  = majorDiagonalColumnIndexAtFirstRow;
      // Iterate over our diagonal
      for (var k = 0; k < diag.length; k++){
        if (diag[k] === 1) {
          // For each piece increment our count
          count++;
        }
        if (count > 1) {
          // If more than one return true
          return true;
        }
      }
      return false;  
    },
    
    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // MajorDiagonalOn: Start from top right ~ move left on column and move
      // get rows
      var runMajorDiagonal = this.hasMajorDiagonalConflictAt.bind(this);
      var allRows = this.rows();
      // establish a object variable for all diagonals: VAR A = {}
      var tempDiagonals = [];
      // establish holding variable row allocation calculation (ie count): VAR B
      var columnDecrementor = allRows[0].length - 2;
      var rowStart = true;
      // establish variable to increment row: VAR C
      var rowIncrementor = 0;
      //iterate over all rows starting on first row, last index
      while (rowIncrementor < allRows.length) {  
        //Start at the top right most row and column
        //Create an array for each diagonal by
        //Getting the value of the current row then going down and left until we can't
        //WHEN first row is exhausted change strategies and then increment on rows until we can't
        //For each array created we execute a Diagonal Test
        tempDiagonals = magic(allRows,rowIncrementor,columnDecrementor);
        if (runMajorDiagonal(tempDiagonals)) {
          return true;
        }
        if(rowStart && columnDecrementor > 0){
          columnDecrementor -- ;
        } else {
          rowIncrementor ++;
        }
      }

      function magic (obj, row, column) {
        var result = [];
        var currRow = row;
        var currColumn = column;
        function innerMagic (specificLocation){
          result.push(specificLocation);
          if(currRow < obj[0].length -1){
            currRow ++;
            currColumn ++;
            var exists = obj[currRow][currColumn];
            if(exists !== undefined) {
              
              innerMagic(exists);
            }
          }
        }
        innerMagic(obj[currRow][currColumn]);
        return result;
      } 
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
