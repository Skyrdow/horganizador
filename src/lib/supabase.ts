import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Usamos import.meta.env directamente, que es la forma de Vite de acceder a las variables VITE_PUBLIC_
const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

// Exportamos el cliente solo si las variables están presentes.
export const supabase: SupabaseClient | null =
	SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
