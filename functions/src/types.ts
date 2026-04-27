export type Role = 'admin' | 'manager' | 'operator' | 'driver' | 'viewer';
export type ShipmentStatus = 'on_time' | 'at_risk' | 'delayed' | 'rerouted' | 'delivered' | 'issue';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  risk_score: number;
  weather_exposure_score: number;
  current_location: Coordinates;
  route_waypoints: Coordinates[];
  delay_delta_hours: number;
  updated_at: string;
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
  reasoning: string;
  recommended_action: string;
  auto_actioned: boolean;
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
