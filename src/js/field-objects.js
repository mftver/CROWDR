import Enum from './common/enum';

class FieldObjects extends Enum {
  constructor() {
    super(
      'Tent3x3',
      'Tent1x1',
      'Drinks',
      'HighTree',
      'WideTree',
      'ShadowTree',
      'Toilets',
    );
  }
}

export default new FieldObjects();
