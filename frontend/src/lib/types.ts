/**
 * SENTINEL ENHANCED - Unified Type Definitions
 */

export type Role = 'admin' | 'manager' | 'operator' | 'driver' | 'viewer';
export type ShipmentStatus = 'on_time' | 'at_risk' | 'delayed' | 'rerouted' | 'delivered' | 'issue';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type CargoType = 'general' | 'perishable' | 'hazardous' | 'pharma';
export type Severity = 'clear' | 'moderate' | 'severe' | 'extreme';
export type AlertType = 'flood' | 'cyclone' | 'fog' | 'storm' | 'wildfire' | 'heatwave' | 'traffic' | 'port_congestion' | 'road_closure';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  organization_id: string;
  fcmToken?: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: 'email' | 'push' | 'silent';
    sidebarExpanded: boolean;
  };
  created_at: string;
  last_login: string;
  is_active: boolean;
}

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  origin_coords: Coordinates;
  dest_coords: Coordinates;
  carrier: string;
  cargo_type: CargoType;
  weight_kg: number;
  value_inr: number;
  current_location: Coordinates;
  route_waypoints: Coordinates[];
  status: ShipmentStatus;
  risk_score: number;                    // 0.0 to 1.0
  weather_exposure_score: number;        // 0.0 to 1.0
  original_eta: string;                  // ISO timestamp
  current_eta: string;
  delay_delta_hours: number;
  created_by: string;                    // User ID
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

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
}

export interface Vendor {
  id: string;
  name: string;
  type: 'supplier' | 'carrier' | '3pl';
  city: string;
  contact_email: string;
  contact_phone: string;
  on_time_pct: number;
  quality_score: number;
  cost_index: number;                    // Lower is better
  rating: number;                        // 1-5
  is_active: boolean;
  created_at: string;
}

export interface WeatherCondition {
  location: Coordinates;
  timestamp: string;
  temperature_celsius: number;
  precipitation_mm_per_hour: number;
  wind_speed_kmh: number;
  visibility_km: number;
  weather_code: string;
  severity: Severity;
  active_alerts: WeatherAlert[];
}

export interface WeatherAlert {
  alert_id: string;
  type: AlertType;
  severity: 'watch' | 'warning' | 'emergency';
  affected_region_polygon?: Coordinates[];
  valid_from: string;
  valid_until: string;
  description: string;
}

export interface RiskAssessment {
  assessment_id: string;
  shipment_id: string;
  timestamp: string;
  risk_score: number;
  weather_risk_score: number;
  traffic_risk_score: number;
  combined_risk_score: number;
  predicted_delay_hours: number;
  confidence: number;
  risk_level: RiskLevel;
  reasoning: string;                     // Gemini plain English
  recommended_action: 'proceed' | 'monitor' | 'reroute' | 'hold';
  auto_actioned: boolean;
}

export interface RerouteDecision {
  decision_id: string;
  shipment_id: string;
  timestamp: string;
  original_route: Coordinates[];
  new_route: Coordinates[];
  reason: string;
  gemini_justification: string;
  time_delta_hours: number;
  cost_delta_inr: number;
  confidence_score: number;
  approved_by: 'auto' | Role;
}

export interface KPISnapshot {
  total_active_shipments: number;
  at_risk_count: number;
  critical_count: number;
  auto_rerouted_today: number;
  avg_delay_hours: number;
  weather_alerts_active: number;
  cost_saved_inr: number;
  inventory_value_inr: number;
  timestamp: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  entity_type: 'shipment' | 'inventory' | 'warehouse' | 'vendor' | 'user' | 'settings';
  entity_id: string;
  old_value?: any;
  new_value?: any;
  timestamp: string;
  ip_address: string;
}

export interface WorkflowRule {
  id: string;
  name: string;
  trigger_condition: string;             // e.g. "risk_score > 0.8"
  action_type: 'notify' | 'reroute' | 'hold' | 'escalate';
  action_params: any;
  is_active: boolean;
  created_by: string;
}
