/**
 * Restaurant types for response from backend
 * @id restaurant id
 * @name restaurant name
 * @websiteUrl restaurant own website url for future updates
 */

export interface RestaurantResponse {
  id: number;
  name: string;
  websiteUrl: string;
}