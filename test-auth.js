const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
  // Test signing in with the user the user just created
  console.log("Testing auth connection...");
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'cenk.yakinlar@hotmail.com', // guess based on previous project
    password: 'Password123!', // generic test
  });
  
  if (error) {
    console.error("Auth Error Type:", error.name);
    console.error("Auth Error Message:", error.message);
  } else {
    console.log("Auth Success:", data.user?.id);
  }
}

testAuth();
