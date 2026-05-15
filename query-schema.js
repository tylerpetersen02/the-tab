const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key);

async function getSchema() {
  console.log('=== Querying Supabase Schema ===\n');

  // Tables
  console.log('--- TABLES ---');
  const { data: tables, error: tablesError } = await supabase
    .from('information_schema.tables')
    .select('table_schema, table_name')
    .in('table_schema', ['public', 'auth', 'storage']);
  
  if (tablesError) {
    console.log('Querying via RPC instead...');
  } else if (tables) {
    const grouped = {};
    tables.forEach(t => {
      if (!grouped[t.table_schema]) grouped[t.table_schema] = [];
      grouped[t.table_schema].push(t.table_name);
    });
    Object.entries(grouped).forEach(([schema, names]) => {
      console.log(\\n\:\);
      names.forEach(name => console.log(\  - \\));
    });
  }

  // Try raw SQL query instead
  console.log('\n--- ATTEMPTING RAW SQL QUERY ---');
  const { data: rawTables, error: rawError } = await supabase.rpc('get_schema_info');
  
  if (rawError) {
    console.log('Note: Schema queries require proper Supabase setup.');
    console.log('Recommended: Use Supabase CLI to dump schema instead.\n');
    console.log('Command:');
    console.log('  supabase db dump --schema public --schema-only > supabase/schema_public.sql');
  }
}

getSchema().catch(console.error);
