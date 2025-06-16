import { Windpark } from '../types';

// src/services/api.ts
const BASE_URL = 'http://localhost:8080/api';

export const apiService = {
  // Generische Fetch-Funktion
  async fetchData(endpoint: string) {
    try {
      console.debug('fetchData aufgerufen mit Endpoint:', endpoint); // Zusätzliche Ausgabe im Log
      const response = await fetch(`${BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data); // Ausgabe im System-Log
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // Beispiel für spezifische API-Calls
  async getWindparks() {
    return this.fetchData('/windparks');
  },
  
  async getUser(id: number) {
    return this.fetchData(`/users/${id}`);
  }
};