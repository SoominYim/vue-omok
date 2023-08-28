<template>
    <div class="board">
        <div class="board-image">
            <img src="@/assets/board.jpg" alt="오목 보드판" />
            <div class="grid">
                <!-- 격자를 그리는 로직 -->
                <div v-for="rowIndex in 19" :key="rowIndex" class="grid-row"></div>
                <div v-for="colIndex in 19" :key="colIndex" class="grid-col"></div>
            </div>
        </div>
        <div v-for="(row, rowIndex) in internalBoard" :key="rowIndex" class="row">
            <div v-for="(cell, colIndex) in row" :key="colIndex" class="cell" @click="placeStone(rowIndex, colIndex)">
                {{ cell }}
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: ['board'],
    setup(props) {
        const internalBoard = ref(JSON.parse(JSON.stringify(props.board)));
        const currentPlayer = ref(getInitialPlayer(props.board));

        function getInitialPlayer(board) {
            return board.flat().filter(cell => cell !== null).length % 2 === 0 ? 'black' : 'white';
        }

        function placeStone(row, col) {
            if (internalBoard.value[row][col] === null) {
                internalBoard.value[row][col] = currentPlayer.value;
                if (checkWin(row, col)) {
                    alert(`${currentPlayer.value === 'black' ? '흑' : '백'} 돌이 승리했습니다!`);
                    resetBoard();
                } else {
                    currentPlayer.value = currentPlayer.value === 'black' ? 'white' : 'black';
                }
            }
        }

        function checkWin() {
            // checkWin 로직을 구현하세요.
        }

        function resetBoard() {
            // resetBoard 로직을 구현하세요.
        }

        return {
            internalBoard,
            placeStone,
        };
    },
};
</script>

<style scoped>
.board {
    display: grid;
    grid-template-columns: repeat(19, 40px);
    /* 19x19 그리드 생성 */
    gap: 1px;
    /* 셀 사이의 간격 설정 */
    border: 1px solid #ccc;
    /* 보드 전체 테두리 설정 */
    background-color: #fafafa;
    /* 배경색 설정 */
    padding: 5px;
    /* 내부 여백 설정 */
}

.row {
    display: flex;
}

.cell {
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    /* 셀 테두리 설정 */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    user-select: none;
    /* 텍스트 드래그 방지 */
}

.cell:nth-child(odd) {
    background-color: #f5f5f5;
    /* 홀수 번째 셀 배경색 설정 */
}

.cell:hover {
    background-color: #e0e0e0;
    /* 마우스 호버 시 배경색 변경 */
}

.board {
    position: relative;
    /* 격자를 그리기 위한 스타일 */
}

.board-image {
    display: inline-block;
    position: relative;
}

.grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(19, 1fr);
    grid-template-rows: repeat(19, 1fr);
}

.grid-row,
.grid-col {
    border: 1px solid #aaa;
    box-sizing: border-box;
}
</style>