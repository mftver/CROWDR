/* eslint-disable lines-between-class-members */
class FieldObjects {
  Tent3x3 = 'Tent3x3';
  Tent1x1 = 'Tent1x1';
  Drinks = 'Drinks';
  HighTree = 'HighTree';
  WideTree = 'WideTree';
  ShadowTree = 'ShadowTree';
  Toilets = 'Toilets';

  constructor() {
    Object.freeze(this);
  }
}

export default new FieldObjects();
