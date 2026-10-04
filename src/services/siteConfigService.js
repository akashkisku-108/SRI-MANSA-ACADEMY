import { siteConfig } from '../data/siteConfig';

/**
 * Site Configuration Service
 * Provides access to academy credentials, contact details, social links, and key stats.
 */
export const siteConfigService = {
  async getConfig() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return { ...siteConfig };
  }
};
