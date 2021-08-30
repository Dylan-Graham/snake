import { Component, OnInit } from "@angular/core";

const keycode = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

class LinkedListItem {
  row: number;
  column: number;
  next: LinkedListItem;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
    this.next = null;
  }
}

class LinkedList {
  public head: LinkedListItem;
  constructor(item: LinkedListItem) {
    this.head = item;
  }
}

enum direction {
  right,
  left,
  up,
  down,
}

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
  host: {
    "(document:keydown)": "handleKeyboardEvents($event)",
  },
})
export class BoardComponent implements OnInit {
  board: number[][];
  score: number;
  gameComplete: boolean;
  snakeDirection: direction;
  snake: LinkedList;

  ngOnInit(): void {
    this.newGame();

    setInterval(() => {
      if (!this.gameComplete) {
        this.makeMove();
      }
    }, 1000);
  }

  newGame() {
    this.gameComplete = false;
    this.score = 0;
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 4, 5, 6, 0],
      [0, 0, 0, 0, 3, 0, 7, 0],
      [0, 0, 0, 1, 2, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 9, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.snakeDirection = direction.left;

    const snakeHead = new LinkedListItem(5, 3);
    snakeHead.next = new LinkedListItem(5, 4);
    snakeHead.next.next = new LinkedListItem(4, 4);
    snakeHead.next.next.next = new LinkedListItem(3, 4);
    snakeHead.next.next.next.next = new LinkedListItem(3, 5);
    snakeHead.next.next.next.next.next = new LinkedListItem(3, 6);
    snakeHead.next.next.next.next.next.next = new LinkedListItem(4, 6);
    snakeHead.next.next.next.next.next.next.next = new LinkedListItem(5, 6);
    snakeHead.next.next.next.next.next.next.next.next = new LinkedListItem(
      6,
      6
    );

    this.snake = new LinkedList(snakeHead);
  }

  clearBoard() {
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  makeMove() {
    let row = this.snake.head.row;
    let col = this.snake.head.column;

    switch (this.snakeDirection) {
      case direction.up:
        row--;
        break;
      case direction.down:
        row++;
        break;
      case direction.right:
        col++;
        break;
      case direction.left:
        col--;
        break;
    }

    this.checkSnakeValidity(row, col);

    // add new head
    const newHead: LinkedListItem = new LinkedListItem(row, col);
    let temp = this.snake.head;
    newHead.next = temp;
    this.snake.head = newHead;

    // remove tail
    while (temp.next != null) {
      if (temp.next.next == null) {
        temp.next = null;
        break;
      }
      temp = temp.next;
    }
    
    // add snake to board
    this.clearBoard();
    let index = 1;
    let currentLinkedListItem = this.snake.head;
    while (currentLinkedListItem != null) {
      const row = currentLinkedListItem.row;
      const column = currentLinkedListItem.column;
      this.board[row][column] = index++;
      currentLinkedListItem = currentLinkedListItem.next;
    }
  }

  checkSnakeValidity(row: number, col: number) {
    if (this.board[row][col] > 0) {
      this.gameComplete = true;
    }
  }

  handleKeyboardEvents(e: KeyboardEvent) {
    if (e.keyCode === keycode.left && this.snakeDirection !== direction.right) {
      this.snakeDirection = direction.left;
    } else if (
      e.keyCode === keycode.up &&
      this.snakeDirection !== direction.down
    ) {
      this.snakeDirection = direction.up;
    } else if (
      e.keyCode === keycode.right &&
      this.snakeDirection !== direction.left
    ) {
      this.snakeDirection = direction.right;
    } else if (
      e.keyCode === keycode.down &&
      this.snakeDirection !== direction.up
    ) {
      this.snakeDirection = direction.down;
    }
  }
}
