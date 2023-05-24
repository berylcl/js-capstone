export const truncateDescription = (description, wordCount) => {
  const words = description.split(' ');
  if (words.length <= wordCount) {
    return description;
  }
  const truncatedWords = words.slice(0, wordCount);
  return truncatedWords.join(' ') + '...';
};
