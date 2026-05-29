export interface ReelConfig {
  trigger_keyword: string;
  dm_message: string;
  comment_reply: string;
  active: boolean;
}

export interface Reel {
  id: string;
  thumbnail_url: string;
  permalink: string;
  caption: string;
  config: ReelConfig;
}

export interface Stats {
  total_reels: number;
  configured: number;
  using_default: number;
}

export interface HealthStatus {
  backend: "online" | "offline" | "checking";
  instagram: "connected" | "disconnected" | "checking";
  webhook: "configured" | "unknown";
  automation: "active" | "idle" | "checking";
}

export interface TestDMResponse {
  status: string;
  result: unknown;
}
