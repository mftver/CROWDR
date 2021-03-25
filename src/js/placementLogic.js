export default function placeableMapper(draggedElement, tablecell){
    if (draggedElement.classList.contains('Tent3x3')) {
        placePartyTent(tablecell);
    }
    else if (draggedElement.classList.contains('Tent1x1')) {
        placeFoodTent(tablecell);
    }
}

function placePartyTent(tablecell) {
    tableCell.classList.remove('selectable-cell');
    tableCell.classList.add('selected-cell');
}

function placeFoodTent(tablecell) {
    
}