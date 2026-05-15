const { createClient } = require('@supabase/supabase-js');

const url = 'https://rcckigasrkxshcictjoo.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjY2tpZ2Fzcmt4c2hjaWN0am9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODM2NjE4NywiZXhwIjoyMDkzOTQyMTg3fQ.leAiMC-OELGrBKDoxwj-6fuGLMkL2394wlkG8VqHmu4';

const supabase = createClient(url, serviceKey);

async function dumpSchema() {
  try {
    console.log('=== SUPABASE SCHEMA DUMP ===\n');
    
    // Get all tables
    const { data: tables, error: tableError } = await supabase
      .rpc('get_schema_info');
    
    if (tableError && tableError.code !== 'PGRST103') {
      console.error('Tables error:', tableError);
    }
    
    // Try direct SQL approach
    const { data, error } = await supabase
      .from('_realtime')
      .select('*')
      .limit(0);
    
    if (error) {
      console.log('Note: Cannot query schema via standard RPC.');
      console.log('Best approach: Use Supabase Dashboard SQL Editor\n');
      
      console.log('Run these queries in Supabase > SQL Editor:');
      console.log(\
-- Tables and columns
SELECT table_schema, table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema IN ('public', 'auth', 'storage')
ORDER BY table_schema, table_name, ordinal_position;

-- Foreign keys
SELECT tc.table_name, kcu.column_name, ccu.table_name as foreign_table
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;

-- RLS Policies
SELECT tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Triggers
SELECT trigger_name, event_object_table, action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;
      \);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

dumpSchema();
