import api from './api';

/**
 * Service for Topics-related API calls
 */
class TopicsService {
  /**
   * Get all topics
   * @returns {Promise} Array of topics
   */
  async getAllTopics() {
    try {
      const response = await api.get('/topics');
      return response.data;
    } catch (error) {
      console.error('Error fetching topics:', error);
      throw error;
    }
  }

  /**
   * Get topic of the day by ID
   * @param {number} topicId - The topic ID
   * @returns {Promise} Topic details
   */
  async getTopicOfTheDayById(topicId) {
    try {
      const response = await api.get(`/topics-of-the-day/${topicId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching topic of the day ${topicId}:`, error);
      throw error;
    }
  }

  /**
   * Save user's topic progress
   * @param {Object} progressData - Progress data {user_id, topic_id, progress, etc.}
   * @returns {Promise} Response from server
   */
  async saveTopicProgress(progressData) {
    try {
      const response = await api.post('/topic-progress', progressData);
      return response.data;
    } catch (error) {
      console.error('Error saving topic progress:', error);
      throw error;
    }
  }

  /**
   * Get user's topic progress
   * @param {number} userId - The user ID
   * @returns {Promise} User's topic progress
   */
  async getUserProgress(userId) {
    try {
      const response = await api.get(`/topic-progress/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user progress for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Create a new topic
   * Requires authentication and verified user status
   * @param {Object} topicData - Topic data {name, alternative_name, description, status, ayahs[], hadiths[]}
   * @returns {Promise} Response from server
   */
  async createTopic(topicData) {
    try {
      console.log('📝 Creating topic with data:', topicData);
      const response = await api.post('/topics', topicData);
      console.log('✅ Topic created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating topic:', error);
      console.error('Topic data that failed:', topicData);

      // Handle 405 Method Not Allowed error (production backend issue)
      if (error.response?.status === 405) {
        throw new Error(
          '⚠️ Topic creation is currently unavailable on production backend.\n\n' +
          'The backend server does not support the POST /api/topics route yet. ' +
          'Please contact the backend administrator to enable this feature.\n\n' +
          'Technical Details: 405 Method Not Allowed - POST method is not supported for this route.'
        );
      }

      throw error;
    }
  }
}

export default new TopicsService();
