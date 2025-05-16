import { createClient } from '@supabase/supabase-js';
import { env } from 'process';

const supabaseUrl = env.SUPABASE_URL || 'https://agdulojbkcfmbuqtfwb.supabase.co';
const supabaseKey = env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBhYmFzZS1hZG1pbiIsImlhdCI6MTY4NjQ2NzY0MCwiZXhwIjoxOTgyMDI3NjQwfQ.7gk8v0xqZbKXy2j4m5n7f3g5f3g5f3g5f3g5f3g5f3g';

export const supabase = createClient(supabaseUrl, supabaseKey);

