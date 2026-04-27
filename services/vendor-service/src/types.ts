export interface Vendor {
  id: string;
  name: string;
  type: 'supplier' | 'carrier' | '3pl';
  city: string;
  contact_email: string;
  contact_phone: string;
  on_time_pct: number;
  quality_score: number;
  cost_index: number;
  rating: number;
  is_active: boolean;
  created_at: string;
}
