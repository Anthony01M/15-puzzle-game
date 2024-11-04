document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    let tiles = [...Array(15).keys()].map(x => x + 1).concat(null);
    let emptyIndex = 15;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        if (!isSolvable(array)) {
            [array[0], array[1]] = [array[1], array[0]];
        }
        const nullIndex = array.indexOf(null);
        [array[nullIndex], array[0]] = [array[0], array[nullIndex]];
        emptyIndex = 0;
    }

    function isSolvable(array) {
        let inversions = 0;
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = i + 1; j < array.length; j++) {
                if (array[i] && array[j] && array[i] > array[j]) {
                    inversions++;
                }
            }
        }
        return inversions % 2 === 0;
    }

    function render() {
        puzzleContainer.innerHTML = '';
        tiles.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            if (tile === null) {
                tileElement.classList.add('empty');
            } else {
                tileElement.textContent = tile;
                tileElement.addEventListener('click', () => moveTile(index));
            }
            puzzleContainer.appendChild(tileElement);
        });
    }

    function moveTile(index) {
        console.log(`Attempting to move tile at index ${index}`);
        const row = Math.floor(index / 4);
        const col = index % 4;
        const emptyRow = Math.floor(emptyIndex / 4);
        const emptyCol = emptyIndex % 4;

        const isAdjacent = (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
            (col === emptyCol && Math.abs(row - emptyRow) === 1);

        console.log(`Tile at index ${index} is adjacent: ${isAdjacent}`);

        if (isAdjacent) {
            console.log(`Moving tile at index ${index} to empty tile at index ${emptyIndex}`);
            tiles[emptyIndex] = tiles[index];
            tiles[index] = null;
            emptyIndex = index;
            console.log('Updated tile state:', tiles);
            render();
        }
    }

    shuffle(tiles);
    console.log('Initial tile state:', tiles);
    render();

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});