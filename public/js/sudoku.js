function SudokuTable() {
  this.table = null;
  this.initTable = null;
  this.input = 0;
};

SudokuTable.prototype.init = function() {
  var xhr = new XMLHttpRequest();
  var res = null;
  xhr.open('GET', './question', false);
  xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
  xhr.send(null);

  if(xhr.status == 200) {
    res = JSON.parse(xhr.responseText);
    this.table = res[0];
    this.initTable = res[1];
  } else {
    alert('init Error');
  }

  this.drawTable();
}

SudokuTable.prototype.drawTable = function() {
  var table = document.getElementById('sudoku');
  for(var i = 0; i < table.rows.length; i++) {
    for(var j = 0; j < table.rows[i].cells.length; j++) {
      if(this.table[i][j] != 0) {
        table.rows[i].cells[j].innerHTML = "<div class='readOnlyText'>" + this.table[i][j] + "</div>";
      } else {
        table.rows[i].cells[j].innerHTML = "<div class='normalText'></div>";
      }
    }
  }
}

SudokuTable.prototype.setNumber = function(item) {
  var table = document.getElementById('sudoku');

  L:for(var i = 0; i < table.rows.length; i++) {
    for(var j = 0; j < table.rows[i].cells.length; j++) {
      if(table.rows[i].cells[j] != item) {
        continue;
      }

      if(!this.initTable[i][j]) {
        if(this.input == 0) {
          item.firstChild.innerText = '';
        } else {
          item.firstChild.innerText = this.input;
        }
        this.table[i][j] = this.input;
      }
      break L;
    }
  }
}

SudokuTable.prototype.setInputNumber = function(item, number) {
  this.input = number;
  var table = document.getElementById('inputTable');

  for(var i = 0; i < table.rows[0].cells.length; i++) {
    table.rows[0].cells[i].style.backgroundColor = "white";
  }

  item.style.backgroundColor = "red";
}

SudokuTable.prototype.reset = function() {
  for(var i = 0; i < this.table.length; i++) {
    for(var j = 0; j < this.table[i].length; j++) {
      if(!this.initTable[i][j]) {
        this.table[i][j] = 0;
      }
    }
  }

  this.drawTable();
}

SudokuTable.prototype.solve = function() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      if(xhr.status == 200) {
        alert(xhr.responseText);
      } else {
        alert('Error')
      }
    }
  }

  var req = JSON.stringify(this.table);
  xhr.open('POST', './solve');
  xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
  xhr.send(req)
}

var obj = new SudokuTable();
