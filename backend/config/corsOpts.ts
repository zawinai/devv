export const corOPtions = {
  origin: (origin: string | undefined, callback: any) => {
    if (
      (typeof origin == "string" &&
        process.env.WHITE_LIST &&
        process.env.WHITE_LIST.indexOf(origin) !== -1) ||
      !origin
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS bro"));
    }
  },
  optionSuccessStatus: 200,
};
