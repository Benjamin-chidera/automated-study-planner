export interface SessionPayload {
  userId: string;
  userName: string;
  userEmail: string;
  expiresAt: string | Date;
}
