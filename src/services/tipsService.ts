import { tipsData } from "@/data/tipsData";

import { Tip } from "@/types/tips";

export const tipsService = {
  async getAll(): Promise<Tip[]> {
    return tipsData;
  },

  async getById(id: string): Promise<Tip | undefined> {
    return tipsData.find((tip) => tip.id === id);
  },
};
