class FormValidation {
  // eslint-disable-next-line class-methods-use-this
  isFormCorrect(formObject) {
    const warnings = [];

    let space = 15 * 15;

    if (formObject.name !== undefined) {
      warnings.push(this.validateName(formObject.name));
    }
    if (formObject.MaxNumberofVisitors !== undefined) {
      warnings.push(this.validateVisitors(formObject.MaxNumberofVisitors));
    }
    if (formObject.NumberOfPartyTents !== undefined) {
      warnings.push(this.validatePartyTents(formObject.NumberOfPartyTents, space));
      space -= ((3 * 3) * formObject.NumberOfPartyTents);
    }
    if (formObject.NumberOfFoodStands !== undefined) {
      warnings.push(this.validateFoodStands(
        formObject.NumberOfFoodStands,
        space,
        formObject.NumberOfPartyTents > 0,
      ));
      space -= ((1 * 1) * formObject.NumberOfPartyTents);
    }
    if (formObject.NumberOfDrinkStands !== undefined) {
      warnings.push(this.validateDrinkStands(
        formObject.NumberOfDrinkStands,
        space,
        formObject.NumberOfPartyTents > 0,
      ));
      space -= ((1 * 2) * formObject.NumberOfPartyTents);
    }
    if (formObject.NumberOfHighTrees !== undefined) {
      warnings.push(this.validateHighTrees(formObject.NumberOfHighTrees, space));
      space -= ((1 * 1) * formObject.NumberOfPartyTents);
    }
    if (formObject.NumberOfShadowTrees !== undefined) {
      warnings.push(this.validateShadowTrees(formObject.NumberOfShadowTrees, space));
      space -= ((3 * 3) * formObject.NumberOfPartyTents);
    }
    if (formObject.NumberOfWideTrees !== undefined) {
      warnings.push(this.validateWideTrees(formObject.NumberOfWideTrees, space));
    }
    if (formObject.NumberOfToiletBuildings !== undefined) {
      warnings.push(this.validateToiletBuildings(formObject.NumberOfToiletBuildings, space));
    }
    if (formObject.NumberOfBins !== undefined) {
      warnings.push(this.validateBins(formObject.NumberOfBins));
    }

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
  validatePartyTents(NumberOfPartyTents, space) {
    if (NumberOfPartyTents < 0) {
      return 'Het aantal tenten kan niet negatief zijn';
    }
    if (((3 * 3) * NumberOfPartyTents) > space) {
      return 'Het aantal tenten past niet';
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateFoodStands(NumberOfFoodStands, space, isTentPlaced) {
    if (NumberOfFoodStands < 0) {
      return 'Het aantal eetkraampjes kan niet negatief zijn';
    }

    if (isTentPlaced && NumberOfFoodStands > 3) {
      return 'Het aantal eetkraampjes mag niet meer dan 3 zijn';
    }

    if (NumberOfFoodStands > 6) {
      return 'Het aantal eetkraampjes mag niet meer dan 6 zijn';
    }

    if (((1 * 1) * NumberOfFoodStands) > space) {
      return 'Het aantal eetkraampjes past niet';
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateDrinkStands(NumberOfDrinkStands, space, isTentPlaced) {
    if (NumberOfDrinkStands < 0) {
      return 'Het aantal drankkraampjes kan niet negatief zijn';
    }

    if (isTentPlaced && NumberOfDrinkStands > 2) {
      return 'Het aantal drankkraampjes mag niet meer dan 2 zijn';
    }

    if (NumberOfDrinkStands > 4) {
      return 'Het aantal drankkraampjes mag niet meer dan 4 zijn';
    }

    if (((1 * 2) * NumberOfDrinkStands) > space) {
      return 'Het aantal drankkraampjes past niet';
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateHighTrees(NumberOfHighTrees, space) {
    if (NumberOfHighTrees < 0) {
      return 'Het aantal hogenbomen kan niet negatief zijn';
    }

    if (((1 * 1) * NumberOfHighTrees) > space) {
      return 'Het aantal hogenbomen past niet';
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateShadowTrees(NumberOfShadowTrees, space) {
    if (NumberOfShadowTrees < 0) {
      return 'Het aantal schaduwbomen kan niet negatief zijn';
    }

    if (((3 * 3) * NumberOfShadowTrees) > space) {
      return 'Het aantal schaduwbomen past niet';
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateWideTrees(NumberOfWideTrees, space) {
    if (NumberOfWideTrees < 0) {
      return 'Het aantal brede bomen kan niet negatief zijn';
    }

    if (((2 * 1) * NumberOfWideTrees) > space) {
      return 'Het aantal brede bomen past niet';
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  validateToiletBuildings(NumberOfToiletBuildings, space) {
    if (NumberOfToiletBuildings < 0) {
      return 'Het aantal toiletten kan niet negatief zijn';
    }

    if (NumberOfToiletBuildings > 5) {
      return 'Het aantal toiletten mag niet meer dan 5 zijn';
    }

    if (((1 * 3) * NumberOfToiletBuildings) > space) {
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
