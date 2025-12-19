/**
 * Utility functions for main-product-details section
 */

/**
 * Extract image URLs from Shopify product media nodes
 * Filters for MediaImage type and returns clean URL array
 */
export function extractProductImages(product: any): string[] {
  const media = product?.media?.nodes || [];
  return media
    .filter((m: any) => m.__typename === 'MediaImage')
    .map((m: any) => m.image?.url || '')
    .filter((url: string) => url);
}
