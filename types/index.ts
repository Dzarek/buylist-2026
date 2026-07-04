export type ProductCategory = "spożywcze" | "chemia" | "inne";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  completed: boolean;
  createdAt: number;
}

// Nowy interfejs dla zalogowanego użytkownika
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface PopularProductItem {
  name: string;
  category: ProductCategory;
  iconUrl: string; // <-- zmiana z iconPath
}
