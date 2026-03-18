import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
  console.log('Checking levels...');
  const { data: levels, error: levelsError } = await supabase.from('levels').select('*');
  if (levelsError) {
    console.error('Error:', levelsError);
  } else {
    console.log(`Found ${levels?.length || 0} levels`);
  }

  console.log('Checking branches...');
  const { data: branches, error: branchesError } = await supabase.from('branches').select('*');
  if (branchesError) {
    console.error('Error:', branchesError);
  } else {
    console.log(`Found ${branches?.length || 0} branches`);
  }
}

checkData();
