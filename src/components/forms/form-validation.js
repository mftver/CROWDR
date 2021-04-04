class FormValidation {
  leftoverSpace;

  isFormCorrect(formObject) {
    const warnings = [];

    let space = 15 * 15;

    if (formObject.name !== undefined) {
      warnings.push(this.validateName(formObject.name));
    }
    if (formObject.MaxNumberofVisitors !== undefined) {
      warnings.push(this.validateVisitors(formObject.MaxNumberofVisitors));
    }
    if (formObject.Tent3x3 !== undefined) {
      warnings.push(this.validatePartyTents(formObject.Tent3x3, space));
      space -= ((3 * 3) * formObject.Tent3x3);
    }
    if (formObject.Tent1x1 !== undefined) {
      warnings.push(this.validateFoodStands(
        formObject.Tent1x1,
        space,
        formObject.Tent3x3 > 0,
      ));
      space -= ((1 * 1) * formObject.Tent3x3);
    }
    if (formObject.Drinks !== undefined) {
      warnings.push(this.validateDrinkStands(
        formObject.Drinks,
        space,
        formObject.Tent3x3 > 0,
      ));
      space -= ((1 * 2) * formObject.Tent3x3);
    }
    if (formObject.HighTree !== undefined) {
      warnings.push(this.validateHighTrees(formObject.HighTree, space));
      space -= ((1 * 1) * formObject.Tent3x3);
    }
    if (formObject.ShadowTree !== undefined) {
      warnings.push(this.validateShadowTrees(formObject.ShadowTree, space));
      space -= ((3 * 3) * formObject.Tent3x3);
    }
    if (formObject.WideTree !== undefined) {
      warnings.push(this.validateWideTrees(formObject.WideTree, space));
      space -= ((2 * 1) * formObject.Tent3x3);
    }
    if (formObject.Toilets !== undefined) {
      warnings.push(this.validateToiletBuildings(formObject.Toilets, space));
      space -= ((3 * 1) * formObject.Tent3x3);
    }
    if (formObject.NumberOfBins !== undefined) {
      warnings.push(this.validateBins(formObject.NumberOfBins, space));
    }

    this.leftoverSpace = space;

    return this.removeNulls(warnings);
  }

  // eslint-disable-next-line class-methods-use-this
  validateName(name) {
    if (name.lenght < 1) {
      return 'De naam kan niet oningevuld zijn.';
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateVisitors(amountOfVisitors) {
    if (amountOfVisitors < 1) {
      return 'Het aantal bezoekers moet hoger dan 0 zijn';
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validatePartyTents(Tent3x3, space) {
    if (Tent3x3 < 0) {
      return 'Het aantal tenten kan niet negatief zijn';
    }
    if (((3 * 3) * Tent3x3) > space) {
      return 'Het aantal tenten past niet';
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateFoodStands(Tent1x1, space, isTentPlaced) {
    if (Tent1x1 < 0) {
      return 'Het aantal eetkraampjes kan niet negatief zijn';
    }

    if (isTentPlaced && Tent1x1 > 3) {
      return 'Het aantal eetkraampjes mag niet meer dan 3 zijn';
    }

    if (Tent1x1 > 6) {
      return 'Het aantal eetkraampjes mag niet meer dan 6 zijn';
    }

    if (((1 * 1) * Tent1x1) > space) {
      return 'Het aantal eetkraampjes past niet';
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateDrinkStands(Drinks, space, isTentPlaced) {
    if (Drinks < 0) {
      return 'Het aantal drankkraampjes kan niet negatief zijn';
    }

    if (isTentPlaced && Drinks > 2) {
      return 'Het aantal drankkraampjes mag niet meer dan 2 zijn';
    }

    if (Drinks > 4) {
      return 'Het aantal drankkraampjes mag niet meer dan 4 zijn';
    }

    if (((1 * 2) * Drinks) > space) {
      return 'Het aantal drankkraampjes past niet';
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateHighTrees(HighTree, space) {
    if (HighTree < 0) {
      return 'Het aantal hogenbomen kan niet negatief zijn';
    }

    if (((1 * 1) * HighTree) > space) {
      return 'Het aantal hogenbomen past niet';
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateShadowTrees(ShadowTree, space) {
    if (ShadowTree < 0) {
      return 'Het aantal schaduwbomen kan niet negatief zijn';
    }

    if (((3 * 3) * ShadowTree) > space) {
      return 'Het aantal schaduwbomen past niet';
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateWideTrees(WideTree, space) {
    if (WideTree < 0) {
      return 'Het aantal brede bomen kan niet negatief zijn';
    }

    if (((2 * 1) * WideTree) > space) {
      return 'Het aantal brede bomen past niet';
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateToiletBuildings(Toilets, space) {
    if (Toilets < 0) {
      return 'Het aantal toiletten kan niet negatief zijn';
    }

    if (Toilets > 5) {
      return 'Het aantal toiletten mag niet meer dan 5 zijn';
    }

    if (((1 * 3) * Toilets) > space) {
      return 'Het aantal toiletten past niet';
    }

    return null;
  }

  validateBins(NumberOfBins, space) {
    if (NumberOfBins < 0) {
      return 'Het aantal prullenbakken kan niet negatief zijn';
    }

    if (NumberOfBins > this.maximumAmountOfBins(space)) {
      return 'Het aantal prullenbakken mag niet meer dan 5% van de overige ruimte zijn';
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  maximumAmountOfBins(space) {
    return ((space / 100) * 5);
  }

  // returns an array that doesnt contain any nulls
  // eslint-disable-next-line class-methods-use-this
  removeNulls(warnings) {
    const realWarnings = [];

    warnings.forEach((element) => {
      if (element !== null) {
        realWarnings.push(element);
      }
    });

    return realWarnings;
  }
}

export default new FormValidation();
