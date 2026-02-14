import axios, { AxiosInstance, AxiosError } from 'axios';

/**
 * Configuration for the iLevel API client
 */
export interface ILevelConfig {
  /** Base URL for the iLevel API (e.g., https://clients.ilevelsolutions.com or https://sandapi.ilevelsolutions.com) */
  baseUrl: string;
  /** API username */
  username: string;
  /** API password or key */
  password: string;
  /** Optional: Use sandbox environment */
  isSandbox?: boolean;
  /** Optional: API version (default: v1) */
  apiVersion?: string;
}

/**
 * iLevel API Client
 *
 * TODO: Update authentication mechanism based on actual iLevel API docs
 * Current implementation uses Basic Auth - verify this is correct
 */
export class ILevelClient {
  private client: AxiosInstance;
  private config: ILevelConfig;

  constructor(config: ILevelConfig) {
    this.config = {
      apiVersion: 'v1',
      ...config,
    };

    // TODO: Verify the correct base URL structure and authentication method
    this.client = axios.create({
      baseURL: `${this.config.baseUrl}/api/${this.config.apiVersion}`,
      auth: {
        username: this.config.username,
        password: this.config.password,
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 30000,
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.error(`[iLevel API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          console.error(`[iLevel API Error] ${error.response.status}: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          console.error('[iLevel API Error] No response received');
        } else {
          console.error(`[iLevel API Error] ${error.message}`);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Test connection to the API
   */
  async testConnection(): Promise<boolean> {
    try {
      // TODO: Replace with actual health check endpoint from API docs
      // Example: await this.client.get('/health');
      await this.client.get('/users');
      return true;
    } catch (error) {
      return false;
    }
  }

  // ==================== Users API ====================

  /**
   * Get users
   * TODO: Add proper query parameters based on API docs
   */
  async getUsers(params?: {
    page?: number;
    pageSize?: number;
    filters?: Record<string, any>;
  }): Promise<any> {
    const response = await this.client.get('/users', { params });
    return response.data;
  }

  /**
   * Get a specific user by ID
   */
  async getUser(userId: string): Promise<any> {
    const response = await this.client.get(`/users/${userId}`);
    return response.data;
  }

  // ==================== Clients API ====================

  /**
   * Get clients
   */
  async getClients(params?: {
    page?: number;
    pageSize?: number;
    filters?: Record<string, any>;
  }): Promise<any> {
    const response = await this.client.get('/clients', { params });
    return response.data;
  }

  /**
   * Get a specific client by ID
   */
  async getClient(clientId: string): Promise<any> {
    const response = await this.client.get(`/clients/${clientId}`);
    return response.data;
  }

  // ==================== Portfolio/Assets API ====================

  /**
   * Get portfolio data
   * TODO: Update endpoint based on actual API docs
   */
  async getPortfolios(params?: {
    page?: number;
    pageSize?: number;
    filters?: Record<string, any>;
  }): Promise<any> {
    const response = await this.client.get('/webapp', { params });
    return response.data;
  }

  /**
   * Get assets
   * TODO: Verify correct endpoint from API docs
   */
  async getAssets(params?: Record<string, any>): Promise<any> {
    // The endpoint might be different - update based on docs
    const response = await this.client.get('/assets', { params });
    return response.data;
  }

  /**
   * Get funds
   */
  async getFunds(params?: Record<string, any>): Promise<any> {
    const response = await this.client.get('/funds', { params });
    return response.data;
  }

  /**
   * Get investments
   */
  async getInvestments(params?: Record<string, any>): Promise<any> {
    const response = await this.client.get('/investments', { params });
    return response.data;
  }

  // ==================== Documents API ====================

  /**
   * Get documents
   */
  async getDocuments(params?: {
    page?: number;
    pageSize?: number;
    filters?: Record<string, any>;
  }): Promise<any> {
    const response = await this.client.get('/documents-api', { params });
    return response.data;
  }

  /**
   * Get a specific document by ID
   */
  async getDocument(documentId: string): Promise<any> {
    const response = await this.client.get(`/documents-api/${documentId}`);
    return response.data;
  }

  // ==================== Valuation API ====================

  /**
   * Get valuations
   */
  async getValuations(params?: Record<string, any>): Promise<any> {
    const response = await this.client.get('/valuation-api', { params });
    return response.data;
  }

  /**
   * Create or update a valuation
   * TODO: Verify the correct endpoint and payload structure
   */
  async createValuation(data: Record<string, any>): Promise<any> {
    const response = await this.client.post('/valuation-api', data);
    return response.data;
  }

  // ==================== Data Retrieval API ====================

  /**
   * Query data retrieval endpoint
   * TODO: Update based on actual API docs
   */
  async queryData(query: Record<string, any>): Promise<any> {
    const response = await this.client.post('/data-retrieval', query);
    return response.data;
  }

  // ==================== Webhooks API ====================

  /**
   * Get webhooks
   */
  async getWebhooks(): Promise<any> {
    const response = await this.client.get('/webhooks');
    return response.data;
  }

  /**
   * Create a webhook
   */
  async createWebhook(data: {
    url: string;
    events: string[];
    description?: string;
  }): Promise<any> {
    const response = await this.client.post('/webhooks', data);
    return response.data;
  }

  /**
   * Delete a webhook
   */
  async deleteWebhook(webhookId: string): Promise<any> {
    const response = await this.client.delete(`/webhooks/${webhookId}`);
    return response.data;
  }

  // ==================== Calculations API ====================

  /**
   * Get calculations
   */
  async getCalculations(params?: Record<string, any>): Promise<any> {
    const response = await this.client.get('/calcs-api', { params });
    return response.data;
  }

  // ==================== Generic Request Method ====================

  /**
   * Make a generic request to any endpoint
   * Useful for endpoints not yet implemented
   */
  async request(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, data?: any): Promise<any> {
    const response = await this.client.request({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  }
}
