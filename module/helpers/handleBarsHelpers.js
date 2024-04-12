import * as c from "../constants.js";

export const registerHelpers = async () => {
  /**
   * Get string from language file based on partial path (group), key and postfix
   */
  Handlebars.registerHelper("getTextFromKey", (group, key, postfix) => {
    if (key) {
      postfix = typeof postfix === c.STRING ? postfix : c.EMPTYSTRING;
      const languageKey = group + "." + key + postfix;
      const languageValue = game.i18n.localize(languageKey);
      return new Handlebars.SafeString(languageValue);
    } else {
      return c.EMPTYSTRING;
    }
  });

  /**
   * Determine which modifier to show based on attribute and class
   */
  Handlebars.registerHelper("showModifier", (key, charClass) => {
    if (key === c.STR && charClass === c.THESTRONG) return true;
    if (key === c.CON && charClass === c.THESTRONG) return true;
    if (key === c.WIS && charClass === c.THEWISE) return true;
    if (key === c.DEX || key === c.INT) return true;
    return false;
  });

  /**
   * Can ability be activate
   */
  Handlebars.registerHelper("canActivate", (abilityType) => {
    return [c.ATTUNEMENT, c.MIRACLE].includes(abilityType);
  });

  /**
   * Get burden to display
   */
  Handlebars.registerHelper("getBurdenCategory", (equipped, stored) => {
    const equippedLimit = game.settings.get(
      "whitehack4e",
      "itemsEquippedLimit"
    );
    const storedLimit = game.settings.get("whitehack4e", "itemsStoredLimit");
    const totalCarried = equipped + stored;
    const totalLimit = equippedLimit + storedLimit;
    if (
      equipped <= equippedLimit &&
      stored <= storedLimit &&
      totalCarried <= totalLimit
    ) {
      return game.i18n.localize("wh3e.burdenCategory.normal");
    } else if (
      equipped <= equippedLimit + 1 &&
      stored <= storedLimit + 1 &&
      totalCarried <= totalLimit + 1
    ) {
      return game.i18n.localize("wh3e.burdenCategory.heavy");
    } else if (
      equipped <= equippedLimit + 3 &&
      stored <= storedLimit + 3 &&
      totalCarried <= totalLimit + 3
    ) {
      return game.i18n.localize("wh3e.burdenCategory.severe");
    } else if (
      equipped <= equippedLimit + 5 &&
      stored <= storedLimit + 5 &&
      totalCarried <= totalLimit + 5
    ) {
      return game.i18n.localize("wh3e.burdenCategory.massive");
    } else {
      return game.i18n.localize("wh3e.burdenCategory.tooMuch");
    }
  });

  Handlebars.registerHelper("stripHtml", (html) => {
    if (html) {
      return html.replace(/(<([^>]+)>)/gi, c.EMPTYSTRING);
    }
    return;
  });

  Handlebars.registerHelper("upper", (aString) => {
    return aString.toUpperCase();
  });

  Handlebars.registerHelper("lower", (aString) => {
    return aString.toLowerCase();
  });

  Handlebars.registerHelper("decimals", (aNumber) => {
    return aNumber.toFixed(2);
  });

  Handlebars.registerHelper("encumbered", (encumbrance, encType) => {
    if (
      (encType === c.EQUIPPED &&
        encumbrance > game.settings.get("whitehack4e", "itemsEquippedLimit")) ||
      (encType === c.STORED &&
        encumbrance > game.settings.get("whitehack4e", "itemsStoredLimit"))
    ) {
      return true;
    }
    return false;
  });

  Handlebars.registerHelper("hasEncumbrance", (gear) => {
    return gear !== c.NOENCUMBRANCE;
  });
};
