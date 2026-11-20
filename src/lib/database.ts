/**
 * database.ts
 * Minimal Supabase `Database` type for BREAKOFF.
 *
 * The app only talks to Supabase for auth; product/order reads go through the
 * demo store. Keeping a minimal, valid schema here lets `createClient<Database>`
 * stay fully typed without a generated file.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          total: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          total: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          total?: number;
          status?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
