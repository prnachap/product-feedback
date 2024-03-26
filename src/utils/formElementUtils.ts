/**
Returns the form title based on the provided 'title' string.
If the 'title' is provided, it returns "Editing '{title}'" otherwise it returns "Create New Feedback".
@param {string} title - The title string to be used to generate the form title.
@returns {string} The generated form title.
*/

import { isEqual } from "lodash";

export const getFormTitle = (title: string = "") => {
  return title ? `Editing ‘${title}’` : "Create New Feedback";
};

/**
Returns the button title based on the provided 'title' string.
If the 'title' is provided, it returns "Save Changes" otherwise it returns "Add Feedback".
@param {string} title - The title string to be used to generate the button title. (optional)
@returns {string} The generated button title.
*/
export const getButtonTitle = (title: string = "") => {
  return title ? `Save Changes` : "Add Feedback";
};

/**
Calculates the remaining word count based on the maximum allowed word count and the current text.
@param {string} text - The text to calculate the remaining word count for.
@param {number} maxWords - The maximum number of words allowed. Defaults to 225.
@returns {number} The remaining word count.
*/

export function getRemainingWordCount(
  text: string,
  maxWords: number = 225
): number {
  const remainingWords = maxWords - text?.length;
  return remainingWords > 0 ? remainingWords : 0;
}

export function getErrorText(error: string) {
  if (isEqual(error, "OAuthAccountNotLinked")) {
    return "this account is already linked with another social account, please use the other social account to login";
  }
  return error;
}
