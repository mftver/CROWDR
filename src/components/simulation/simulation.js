import grid from '../grid/grid';

function placeAllGrids() {
  const grid = [];

  for (let index = 0; index < 6; index + 1) {
    const field = localStorage.getItem(`field:${index}`);
    if (field !== null) {
      this.createItem();
    }
  }
}
