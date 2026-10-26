export type TopupStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'FAILED'
  | 'EXPIRED'
  | 'CANCELED';

export interface TopupLimits {
  min: number;
  max: number;
}

export interface CreateTopupRequest {
  amount: number;
}

export interface CreateTopupResponse {
  orderId: string;
  snapToken: string;
  snapRedirectUrl?: string;
  adminFee: number;
  total: number;
  expiresAt: string;
}

export interface TopupStatusResponse {
  orderId: string;
  status: TopupStatus;
  amount: number;
  adminFee: number;
  total: number;
  paidAt?: string | null;
  failureReason?: string | null;
  canCancel: boolean;
}
