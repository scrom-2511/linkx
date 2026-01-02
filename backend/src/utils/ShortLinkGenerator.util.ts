import { CountModel } from "../model/Count.model";

export const ShortLinkGenerator = async (): Promise<string> => {
  try {
    const arr =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
        ""
      );
    let counter = await CountModel.findOne();

    if (!counter) {
      counter = await CountModel.create({ i: 0, j: 0, k: 0, l: 0, m: 0 });
    }

    let { i, j, k, l, m } = counter;
    const shortLink = arr[i] + arr[j] + arr[k] + arr[l] + arr[m];

    m++;
    if (m >= arr.length) {
      m = 0;
      l++;
      if (l >= arr.length) {
        l = 0;
        k++;
        if (k >= arr.length) {
          k = 0;
          j++;
          if (j >= arr.length) {
            j = 0;
            i++;
          }
        }
      }
    }

    await CountModel.updateOne({ _id: counter._id }, { i, j, k, l, m });
    return shortLink;
  } catch (error) {
    console.error("Error in shortLinkGenerator:", error);
    return "Error in shortLinkGenerator";
  }
};
