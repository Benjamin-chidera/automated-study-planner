export interface SessionPayload {
  userId: string;
//   email: string;
//   fullname: string;
  expiresAt: string | Date;
  // add any other custom claims
}
