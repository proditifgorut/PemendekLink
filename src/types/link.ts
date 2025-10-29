export interface Link {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  lastClicked?: string;
}

export interface ClickEvent {
  timestamp: string;
  shortCode: string;
}
