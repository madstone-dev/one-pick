export const processHashtags = (hashtagsString: string): any[] => {
  if (hashtagsString) {
    const hashtagsArr = hashtagsString.match(/#([^\u0000-\u007F]|\w)+/g) || [];
    return hashtagsArr.map((hashtag, index) => {
      if (index < 10) {
        return {
          where: { hashtag: hashtag.slice(1) },
          create: { hashtag: hashtag.slice(1) },
        };
      }
    });
  }
  return [];
};

export const choiceMax = 2;
