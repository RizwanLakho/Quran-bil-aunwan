import api from './api';

/**
 * Service for Quran-related API calls
 */
class QuranService {
  /**
   * Get all surahs
   * @param {number} perPage - Number of surahs per page (default: 114 to get all)
   * @returns {Promise} Array of surahs
   */
  async getAllSurahs(perPage = 114) {
    try {
      const response = await api.get(`/surahs?per_page=${perPage}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching surahs:', error);
      throw error;
    }
  }

  /**
   * Get a specific surah by ID with its ayahs
   * @param {number} surahId - The surah ID
   * @returns {Promise} Surah details with ayahs
   */
  async getSurahById(surahId) {
    try {
      const response = await api.get(`/surahs/${surahId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching surah ${surahId}:`, error);
      throw error;
    }
  }

  /**
   * Get all juz (parts)
   * @returns {Promise} Array of juz
   */
  async getAllJuzs() {
    try {
      const response = await api.get('/juzs');
      return response.data;
    } catch (error) {
      console.error('Error fetching juzs:', error);
      throw error;
    }
  }

  /**
   * Get all ayahs (with optional pagination)
   * @param {Object} params - Query parameters (page, limit, etc.)
   * @returns {Promise} Array of ayahs
   */
  async getAllAyahs(params = {}) {
    try {
      const response = await api.get('/ayahs', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching ayahs:', error);
      throw error;
    }
  }

  /**
   * Get ayahs by juz number
   * @param {number} juzNumber - The juz number (1-30)
   * @param {number} perPage - Number of ayahs per page (default: 300)
   * @returns {Promise} Array of ayahs in the specified juz
   */
  async getAyahsByJuz(juzNumber, perPage = 300) {
    try {
      const response = await api.get(`/ayahs?filter[juz]=${juzNumber}&per_page=${perPage}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ayahs for juz ${juzNumber}:`, error);
      throw error;
    }
  }

  /**
   * Get a specific ayah by ID
   * @param {number} ayahId - The ayah ID
   * @returns {Promise} Ayah details
   */
  async getAyahById(ayahId) {
    try {
      const response = await api.get(`/ayahs/${ayahId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ayah ${ayahId}:`, error);
      throw error;
    }
  }
}

export default new QuranService();
