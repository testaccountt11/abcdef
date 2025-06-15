export interface Competition {
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  url: string;
  phase: string;
  type: string;
  status: string;
  platform?: string;
  difficulty?: string;
  participants_count?: number;
}

export interface CompetitionResponse {
  status: string;
  results: Competition[];
} 