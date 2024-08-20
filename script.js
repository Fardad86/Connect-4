document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const resetBtn = document.getElementById('reset-btn');
    const message = document.getElementById('message');
    const rows = 6;
    const cols = 7;
    let currentPlayer = 'red'; // 'red' or 'yellow'
    let boardState = Array.from({ length: rows }, () => Array(cols).fill(null));

    function createBoard() {
        board.innerHTML = '';
        boardState = Array.from({ length: rows }, () => Array(cols).fill(null));
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.addEventListener('click', () => handleCellClick(r, c));
                board.appendChild(cell);
            }
        }
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    function handleCellClick(row, col) {
        for (let r = rows - 1; r >= 0; r--) {
            if (boardState[r][col] === null) {
                boardState[r][col] = currentPlayer;
                updateBoard();
                if (checkWin(r, col)) {
                    message.textContent = `Player ${currentPlayer} wins!`;
                    board.removeEventListener('click', handleCellClick);
                } else if (boardState.flat().every(cell => cell !== null)) {
                    message.textContent = "It's a draw!";
                } else {
                    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                    message.textContent = `Player ${currentPlayer}'s turn`;
                }
                return;
            }
        }
    }

    function updateBoard() {
        const cells = board.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            cell.className = 'cell';
            if (boardState[row][col] !== null) {
                cell.classList.add(boardState[row][col]);
            }
        });
    }

    function checkWin(row, col) {
        return checkDirection(row, col, 1, 0) || // Horizontal
               checkDirection(row, col, 0, 1) || // Vertical
               checkDirection(row, col, 1, 1) || // Diagonal down-right
               checkDirection(row, col, 1, -1);  // Diagonal down-left
    }

    function checkDirection(row, col, rowDir, colDir) {
        let count = 0;
        for (let i = -3; i <= 3; i++) {
            const r = row + i * rowDir;
            const c = col + i * colDir;
            if (r >= 0 && r < rows && c >= 0 && c < cols && boardState[r][c] === currentPlayer) {
                count++;
                if (count === 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
    }

    resetBtn.addEventListener('click', () => {
        createBoard();
        currentPlayer = 'red';
    });

    createBoard();
});
