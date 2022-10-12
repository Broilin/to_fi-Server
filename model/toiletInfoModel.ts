import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "model", "toiletData.json");

interface ReviewData {
  id: number;
  name: string;
  main: string;
}

interface ToiletData {
  id: number;
  name: string;
  address: string;
  review: Array<ReviewData>;
}

export default class toiletInfo {
  public static async getInfoById(id: number) {
    try {
      //  Read datas
      const fileData = fs.readFileSync(dataPath, "utf-8");
      const datas = JSON.parse(fileData);
      //  find data by ID
      const returnData = datas[id];

      if (!returnData) throw "No such data!";
      return returnData;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
