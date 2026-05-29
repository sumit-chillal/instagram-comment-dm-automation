import axios from "axios";
import type { Reel, ReelConfig, Stats, TestDMResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

export const api = {
  baseUrl: API_URL,

  // -- existing contracts (preserved verbatim) --
  async getReels(): Promise<{ reels: Reel[]; total: number }> {
    const { data } = await client.get("/api/reels");
    return data;
  },
  async getStats(): Promise<Stats> {
    const { data } = await client.get("/api/stats");
    return data;
  },
  async updateReel(id: string, config: ReelConfig): Promise<void> {
    await client.put(`/api/reels/${id}`, config);
  },
  async testSendDM(comment_id: string, message: string): Promise<TestDMResponse> {
    const { data } = await client.post("/api/test/send-dm", { comment_id, message });
    return data;
  },
  async testReplyComment(comment_id: string, message: string): Promise<TestDMResponse> {
    const { data } = await client.post("/api/test/reply-comment", { comment_id, message });
    return data;
  },

  // -- health probe (uses an existing /api endpoint to respect ingress) --
  async health(): Promise<boolean> {
    try {
      // /api/stats is the cheapest verified /api/* endpoint
      const res = await client.get("/api/stats", { timeout: 5000 });
      return res.status === 200;
    } catch {
      return false;
    }
  },
};
