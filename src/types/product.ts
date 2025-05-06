
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  price: z.number(),
  category: z.string(),
  color: z.string(),
  size: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  specialOffer: z.boolean().optional().default(false),
  discountPercentage: z.number().optional(),
  offerEndsAt: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const FilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  sortBy: z.enum(["price-asc", "price-desc", "name-asc", "name-desc"]).optional(),
});

export type Filter = z.infer<typeof FilterSchema>;
