import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export interface UserPayload {
  id: number;
  name: string;
  username: string;
}

export async function getServerAuth(): Promise<UserPayload | null> {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        return decoded;
    } catch {
        return null;
    }
}
