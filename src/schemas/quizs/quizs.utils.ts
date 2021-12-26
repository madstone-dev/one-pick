export const processHashtags = (hashtagsString: string): any[] => {
  if (hashtagsString) {
    const hashtagsArr = hashtagsString.match(/#([^\u0000-\u007F]|\w)+/g) || [];
    return hashtagsArr.map((hashtag, index) => {
      if (index < 10) {
        return {
          where: { hashtag },
          create: { hashtag },
        };
      }
    });
  }
  return [];
};

export const choiceMin = 1;
export const choiceMax = 4;

export const validGenres = [
  "액션",
  "애니메이션",
  "드라마",
  "스릴러",
  "멜로/로맨스",
  "코미디",
  "범죄",
  "공포",
  "가족",
  "사극",
  "SF",
  "전쟁",
  "판타지",
  "다큐멘터리",
  "뮤지컬",
  "기타",
];

export const validateGenres = (genre: string) => {
  if (validGenres.indexOf(genre) >= 0) {
    return true;
  } else {
    return false;
  }
};
