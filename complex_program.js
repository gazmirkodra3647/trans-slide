/* 
Filename: complex_program.js

This code demonstrates a complex program that generates a maze using a randomized Prim's algorithm.
The maze is visualized using ASCII characters and can be adjusted to generate mazes of different sizes and complexities.
*/

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.walls = [true, true, true, true]; // [top, right, bottom, left]
    this.visited = false;
  }
}

class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(new Cell(i, j));
      }
      this.grid.push(row);
    }
  }

  generate() {
    let current = this.grid[0][0];
    current.visited = true;
    const stack = [];

    while (true) {
      const unvisitedNeighbors = this.getUnvisitedNeighbors(current);
      if (unvisitedNeighbors.length > 0) {
        const neighbor = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        this.removeWall(current, neighbor);
        neighbor.visited = true;
        stack.push(current);
        current = neighbor;
      } else if (stack.length > 0) {
        current = stack.pop();
      } else {
        break;
      }
    }
  }

  getUnvisitedNeighbors(cell) {
    const neighbors = [];

    const { row, col } = cell;
    if (row > 0 && !this.grid[row - 1][col].visited) {
      neighbors.push(this.grid[row - 1][col]);
    }
    if (row < this.rows - 1 && !this.grid[row + 1][col].visited) {
      neighbors.push(this.grid[row + 1][col]);
    }
    if (col > 0 && !this.grid[row][col - 1].visited) {
      neighbors.push(this.grid[row][col - 1]);
    }
    if (col < this.cols - 1 && !this.grid[row][col + 1].visited) {
      neighbors.push(this.grid[row][col + 1]);
    }

    return neighbors;
  }

  removeWall(curr, neighbor) {
    const dx = neighbor.col - curr.col;
    const dy = neighbor.row - curr.row;

    if (dx === 1) {
      curr.walls[1] = false;
      neighbor.walls[3] = false;
    } else if (dx === -1) {
      curr.walls[3] = false;
      neighbor.walls[1] = false;
    } else if (dy === 1) {
      curr.walls[2] = false;
      neighbor.walls[0] = false;
    } else if (dy === -1) {
      curr.walls[0] = false;
      neighbor.walls[2] = false;
    }
  }

  display() {
    let output = "";
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j++) {
        const cell = this.grid[i][j];
        const top = cell.walls[0] ? "###" : "   ";
        const right = cell.walls[1] ? "#" : " ";
        const bottom = cell.walls[2] ? "###" : "   ";
        const left = cell.walls[3] ? "#" : " ";
        row.push(top);
        row.push(right);
        row.push(bottom);
        row.push(left);
      }
      output += row.join("") + "\n";
    }
    console.log(output);
  }
}

function generateMaze(rows, cols) {
  const maze = new Maze(rows, cols);
  maze.generate();
  maze.display();
}

generateMaze(10, 20);