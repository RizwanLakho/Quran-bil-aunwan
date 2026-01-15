import api from './api';

/**
 * Service for Authentication-related API calls
 */
class AuthService {
  /**
   * Register a new user
   * @param {Object} userData - User registration data {name, email, password, password_confirmation}
   * @returns {Promise} Response with user and token
   */
  async register(userData) {
    try {
      const response = await api.post('/register', userData);

      const token = response.data.access_token || response.data.token;
      if (token) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  /**
   * Login user
   * @param {Object} credentials - User credentials {email, password}
   * @returns {Promise} Response with user and token
   */
  async login(credentials) {
    try {
      const response = await api.post('/login', credentials);

      const token = response.data.access_token || response.data.token;
      if (token) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  /**
   * Logout user
   * @returns {Promise} Response from server
   */
  async logout() {
    try {
      const response = await api.post('/logout');

      // Clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');

      return response.data;
    } catch (error) {
      // Even if API call fails, clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');

      console.error('Error during logout:', error);
      throw error;
    }
  }

  /**
   * Get current user from local storage
   * @returns {Object|null} Current user or null
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Get auth token from local storage
   * @returns {string|null} Auth token or null
   */
  getToken() {
    return localStorage.getItem('auth_token');
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if authenticated, false otherwise
   */
  isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Set guest mode (no authentication)
   * @returns {Object} Guest user object
   */
  setGuestMode() {
    const guestUser = {
      id: 'guest',
      name: 'Guest',
      email: 'guest@local',
      user_type: 'guest',
      isGuest: true,
    };
    localStorage.setItem('user', JSON.stringify(guestUser));
    localStorage.setItem('is_guest', 'true');
    return guestUser;
  }

  /**
   * Check if current user is guest
   * @returns {boolean} True if guest, false otherwise
   */
  isGuest() {
    return localStorage.getItem('is_guest') === 'true';
  }

  /**
   * Check if current user is admin
   * @returns {boolean} True if admin, false otherwise
   */
  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.user_type === 'admin';
  }

  /**
   * Clear guest mode
   */
  clearGuestMode() {
    localStorage.removeItem('is_guest');
    localStorage.removeItem('user');
  }
}

export default new AuthService();
