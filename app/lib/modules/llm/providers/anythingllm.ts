import { BaseProvider } from '~/lib/modules/llm/base-provider';
import type { ModelInfo } from '~/lib/modules/llm/types';
import type { IProviderSetting } from '~/types/model';
import { createOpenAI } from '@ai-sdk/openai';
import type { LanguageModelV1 } from 'ai';
import { logger } from '~/utils/logger';

export default class AnythingLLMProvider extends BaseProvider {
  name = 'AnythingLLM';
  getApiKeyLink = 'http://localhost:3001/';
  labelForGetApiKey = 'Get AnythingLLM';
  icon = 'i-ph:brain';

  config = {
    baseUrlKey: 'ANYTHINGLLM_API_BASE_URL',
    baseUrl: 'http://localhost:3001/',
    apiTokenKey: 'ANYTHINGLLM_API_KEY',
  };

  staticModels: ModelInfo[] = [];

  async getDynamicModels(
    apiKeys?: Record<string, string>,
    settings?: IProviderSetting,
    serverEnv: Record<string, string> = {},
  ): Promise<ModelInfo[]> {
    let { baseUrl, apiKey } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings: settings,
      serverEnv,
      defaultBaseUrlKey: 'ANYTHINGLLM_API_BASE_URL',
      defaultApiTokenKey: 'ANYTHINGLLM_API_KEY',
    });

    if (!baseUrl) {
      throw new Error('No baseUrl found for AnythingLLM provider');
    }

    if (typeof window === 'undefined') {
      /*
       * Running in Server
       * Backend: Check if we're running in Docker
       */
      const isDocker = process?.env?.RUNNING_IN_DOCKER === 'true' || serverEnv?.RUNNING_IN_DOCKER === 'true';

      baseUrl = isDocker ? baseUrl.replace('localhost', 'host.docker.internal') : baseUrl;
      baseUrl = isDocker ? baseUrl.replace('127.0.0.1', 'host.docker.internal') : baseUrl;
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      const response = await fetch(`${baseUrl}/api/v1/models`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`);
      }

      const data = (await response.json()) as { models: Array<{ id: string; name?: string }> };

      if (!data.models || data.models.length === 0) {
        // Return a default model if no models are found
        return [
          {
            name: 'default',
            label: 'Default AnythingLLM Model',
            provider: this.name,
            maxTokenAllowed: 200000,
          },
        ];
      }

      return data.models.map((model) => ({
        name: model.id,
        label: model.name || model.id,
        provider: this.name,
        maxTokenAllowed: 200000,
      }));
    } catch (error) {
      logger.error('Error fetching AnythingLLM models:', error);

      // Return a default model on error
      return [
        {
          name: 'default',
          label: 'Default AnythingLLM Model',
          provider: this.name,
          maxTokenAllowed: 200000,
        },
      ];
    }
  }

  getModelInstance: (options: {
    model: string;
    serverEnv?: Env;
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }) => LanguageModelV1 = (options) => {
    const { apiKeys, providerSettings, serverEnv, model } = options;
    let { baseUrl, apiKey } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings: providerSettings?.[this.name],
      serverEnv: serverEnv as any,
      defaultBaseUrlKey: 'ANYTHINGLLM_API_BASE_URL',
      defaultApiTokenKey: 'ANYTHINGLLM_API_KEY',
    });

    if (!baseUrl) {
      throw new Error('No baseUrl found for AnythingLLM provider');
    }

    const isDocker = process?.env?.RUNNING_IN_DOCKER === 'true' || serverEnv?.RUNNING_IN_DOCKER === 'true';

    if (typeof window === 'undefined') {
      baseUrl = isDocker ? baseUrl.replace('localhost', 'host.docker.internal') : baseUrl;
      baseUrl = isDocker ? baseUrl.replace('127.0.0.1', 'host.docker.internal') : baseUrl;
    }

    logger.debug('AnythingLLM Base Url used: ', baseUrl);

    const anythingllm = createOpenAI({
      baseURL: `${baseUrl}/api/v1`,
      apiKey: apiKey || '',
    });

    return anythingllm(model);
  };
}
