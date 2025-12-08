import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://otukwtmobepnuzqefhxo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dWt3dG1vYmVwbnV6cWVmaHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2OTkxMzksImV4cCI6MjA3NzI3NTEzOX0.vhvsHyKxHXQSkCpI9QqTtzGO-SipQ0C42xjRbESP3Mk'

export const supabase = createClient(supabaseUrl,supabaseKey)