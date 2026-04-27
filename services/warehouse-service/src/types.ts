export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Warehouse {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  coords: Coordinates;
  total_capacity: number;
  current_usage: number;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  staff_count: number;
  receiving_queue_count: number;
  shipping_queue_count: number;
  created_at: string;
  updated_at?: string;
}
