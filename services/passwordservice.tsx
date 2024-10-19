// src/api/PasswordService.js

import axiosConfig from '@/axios-config';
import CryptoJS from 'react-native-crypto-js';

const apiUrl = `/passwords`;

const PasswordService = {
  fetchPasswords: async (search = '') => {
    try {
      const { data } = await axiosConfig.get(`${apiUrl}?search=${search}`);
      const decryptedPasswords = data.passwords.map((res: { password: string | CryptoJS.lib.CipherParams; key: string | CryptoJS.lib.WordArray; }) => {
        try {
          const decryptedPassword = CryptoJS.AES.decrypt(res.password, res.key).toString(CryptoJS.enc.Utf8);
          return { ...res, password: decryptedPassword };
        } catch (err) {
          console.error('Error decrypting password:', err);
          throw new Error('Failed to decrypt password');
        }
      });
      return decryptedPasswords;
    } catch (error) {
      console.error('Error fetching passwords:', error);
      throw error;
    }
  },

  addPassword: async (password: any) => {
    try {
      const response = await axiosConfig.post(`${apiUrl}/password`, password);
      const decryptedPassword = CryptoJS.AES.decrypt(response.data.password, response.data.key).toString(CryptoJS.enc.Utf8);
      return { ...response.data, password: decryptedPassword };
    } catch (error) {
      console.error('Error adding password:', error);
      throw error;
    }
  },

  deletePassword: async (id: any) => {
    try {
      await axiosConfig.delete(`${apiUrl}/password/${id}`);
    } catch (error) {
      console.error('Error deleting password:', error);
      throw error;
    }
  },

  addToFavorites: async (passwordId: any) => {
    try {
      const response = await axiosConfig.post(`${apiUrl}/password/${passwordId}/favorite`, {});
      return response.data;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  },

  updatePassword: async (_id: any, newPasswordObject: any) => {
    try {
      const response = await axiosConfig.put(`${apiUrl}/password/${_id}`, newPasswordObject);
      const decryptedPassword = CryptoJS.AES.decrypt(response.data.password, response.data.key).toString(CryptoJS.enc.Utf8);
      return { ...response.data, password: decryptedPassword };
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  },

  sharePassword: async (passwordId: any) => {
    try {
      const response = await axiosConfig.post(`${apiUrl}/share/${passwordId}`, {});
      return response.data; // Assuming it returns { shareLink: string }
    } catch (error) {
      console.error('Error generating share link:', error);
      throw error;
    }
  },

  searchTags: async (name: any) => {
    try {
      const response = await axiosConfig.get(`/tags/search/${name}`);
      return response.data;
    } catch (error) {
      console.error('Error searching tags:', error);
      throw error;
    }
  },

  addTag: async (payload: any) => {
    try {
      const response = await axiosConfig.post(`/tags/tag`, payload);
      return response.data;
    } catch (error) {
      console.error('Error adding tag:', error);
      throw error;
    }
  },

  exportPasswordsAsCsv: async (ids: any) => {
    try {
      const response = await axiosConfig.get(`${apiUrl}/export?ids=${ids}`, { responseType: 'blob' });
      return response.data;
    } catch (error) {
      console.error('Error exporting passwords:', error);
      throw error;
    }
  },

  addTagToPassword: async (passwordId: any, tagName: any) => {
    try {
      const body = { passwordId, tagName };
      const response = await axiosConfig.post(`${apiUrl}/add-tag`, body);
      return response.data;
    } catch (error) {
      console.error('Error adding tag to password:', error);
      throw error;
    }
  },

  postComment: async (passwordId: any, content: any) => {
    try {
      const response = await axiosConfig.post(`${apiUrl}/${passwordId}/comments`, { content });
      return response.data;
    } catch (error) {
      console.error('Error posting comment:', error);
      throw error;
    }
  },
};

export default PasswordService;
