export interface CImageData {
  id: number;
  user_id: number | null;
  link: string;
  fileName: string;
  created_at: string | null;
  user_name: string | null;
}

export interface SelectTerm {
  startDate: string;
  endDate: string;
}
