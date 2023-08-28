<template>
  <div id="app">
    <h1>렌주룰 오목 게임</h1>
    <router-view />
    <GameBoard :board="board" @place-stone="placeStone" />
  </div>
</template>

<script>
import Vue from 'vue'; // Vue 객체를 불러옴
import GameBoard from './components/GameBoard.vue';

export default {
  components: {
    GameBoard,
  },
  data() {
    return {
      board: Array(19).fill(null).map(() => Array(19).fill(null)),
    };
  },
  methods: {
    placeStone(row, col) {
      if (this.board[row][col] === null) {
        Vue.set(this.board[row], col, this.currentPlayer);
        if (this.checkWin(row, col)) {
          alert(`${this.currentPlayer === 'black' ? '흑' : '백'} 돌이 승리했습니다!`);
          this.resetBoard();
        } else {
          this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
        }
      }
    },
    checkWin(row, col) {
      const directions = [
        [1, 0], [0, 1], [1, 1], [1, -1]  // 가로, 세로, 대각선 방향
      ];

      for (const [dx, dy] of directions) {
        let count = 1;
        for (let i = 1; i <= 4; i++) {
          const newRow = row + dx * i;
          const newCol = col + dy * i;
          if (newRow >= 0 && newRow < 19 && newCol >= 0 && newCol < 19 &&
            this.board[newRow][newCol] === this.currentPlayer) {
            count++;
          } else {
            break;
          }
        }
        for (let i = 1; i <= 4; i++) {
          const newRow = row - dx * i;
          const newCol = col - dy * i;
          if (newRow >= 0 && newRow < 19 && newCol >= 0 && newCol < 19 &&
            this.board[newRow][newCol] === this.currentPlayer) {
            count++;
          } else {
            break;
          }
        }
        if (count >= 5) {
          return true;
        }
      }
      return false;
    },
    resetBoard() {
      this.board = Array(19).fill(null).map(() => Array(19).fill(null));
    },
  },
  computed: {
    currentPlayer() {
      return this.board.flat().filter(cell => cell !== null).length % 2 === 0 ? 'black' : 'white';
    },
  },
};
</script>