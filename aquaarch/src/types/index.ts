// src/types/index.ts
export interface Product {
  id: string;
  name: string;
  tier: "EcoSupport" | "EcoDomes" | "EcoStrides";
  priceInr: number;
  material: string;
  description: string;
  modelUrl?: string;
}
