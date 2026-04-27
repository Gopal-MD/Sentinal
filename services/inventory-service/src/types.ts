export interface InventoryItem {
  sku_id: string;
  name: string;
  category: string;
  warehouse_id: string;
  current_qty: number;
  min_qty: number;
  max_qty: number;
  reorder_qty: number;
  unit: string;
  cost_per_unit: number;
  expiry_date?: string;
  last_movement_date: string;
  status: 'in_stock' | 'low' | 'critical' | 'overstock';
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: string;
  risk_score: number;
  current_location: Coordinates;
  route_waypoints: Coordinates[];
  current_eta: string;
}
