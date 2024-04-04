export const generateRandomString = (numberOfLetters = 8) =>
  Math.random()
    .toString(36)
    .slice(2, numberOfLetters + 2);

export const replaceTemplatePathToRealPath = (path, replacement) =>
  path.replace(/\/tree\/:treeId/, `/tree/${replacement}`);

export const firstLetterWord = (word) => word.charAt(0);

export const convertFullNameToFirstAndLastName = (fullName) => {
  const [firstName, lastName] = fullName.split(' ');
  return {
    firstName,
    lastName,
  };
};
