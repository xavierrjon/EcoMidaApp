import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY =
  "@ecomida_favorite_tips";

export const favoritesService = {
  async getFavorites(): Promise<string[]> {
    const data =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    return data
      ? JSON.parse(data)
      : [];
  },

  async isFavorite(
    id: string
  ): Promise<boolean> {
    const favorites =
      await this.getFavorites();

    return favorites.includes(id);
  },

  async toggleFavorite(
    id: string
  ): Promise<string[]> {
    const favorites =
      await this.getFavorites();

    const exists =
      favorites.includes(id);

    const updated = exists
      ? favorites.filter(
          item => item !== id
        )
      : [...favorites, id];

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    return updated;
  },
};