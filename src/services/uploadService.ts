import * as FileSystem from 'expo-file-system/legacy';
import Constants from 'expo-constants';

const CLOUD_NAME = Constants.expoConfig?.extra?.cloudinaryCloudName;
const UPLOAD_PRESET = Constants.expoConfig?.extra?.cloudinaryUploadPreset;

export async function uploadImageToCloudinary(uri: string): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    console.error('❌ Cloudinary: chaves não configuradas no .env');
    throw new Error('Configuração do Cloudinary não encontrada');
  }

  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append('file', `data:image/jpeg;base64,${base64}`);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Erro ao enviar imagem');
    }
    return data.secure_url;
  } catch (error: any) {
    console.error('Erro no upload:', error);
    throw new Error(error.message || 'Não foi possível enviar a imagem.');
  }
}