import { Windpark } from '../types';

// src/services/api.ts
const BASE_URL = 'http://localhost:8000/api/v1';

// Hilfsfunktion für das Logging
const logApiRequest = (method: string, endpoint: string, options?: RequestInit) => {
  console.group(`🌐 API Request: ${method} ${endpoint}`);
  console.log('URL:', `${BASE_URL}${endpoint}`);
  if (options) {
    console.log('Options:', options);
  }
  console.groupEnd();
};

const logApiResponse = (endpoint: string, data: any) => {
  console.group(`✅ API Response: ${endpoint}`);
  console.log('Data:', data);
  console.groupEnd();
};

const logApiError = (endpoint: string, error: any) => {
  console.group(`❌ API Error: ${endpoint}`);
  console.error('Error:', error);
  console.groupEnd();
};

export const apiService = {
  // Generische Fetch-Funktion
  async fetchData(endpoint: string, options?: RequestInit) {
    try {
      // Request Logging
      logApiRequest('GET', endpoint, options);
      
      const response = await fetch(`${BASE_URL}${endpoint}`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Response Logging
      logApiResponse(endpoint, data);
      
      return data;
    } catch (error) {
      // Error Logging
      logApiError(endpoint, error);
      throw error;
    }
  },
  
  // Beispiel für spezifische API-Calls
  async getProjects() {
    return this.fetchData('/projects');
  }
};