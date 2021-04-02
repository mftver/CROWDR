function getGrid(id) {
  return localStorage.getItem(`field:${id}`);
}

function placeAllGrids() {
  const grid = [];

  for (let index = 0; index < 6; index + 1) {
    const temp = getGrid(index);
    if (temp !== null) {
      grid.push(grid);
    } else {
      break;
    }
  }
}
