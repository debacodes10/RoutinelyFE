import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';  // Required for React Native
import { AppState } from 'react-native';
import {ENV_SUPABASE_URL, ENV_SUPABASE_ANON_KEY} from "@env"

const SUPABASE_URL = ENV_SUPABASE_URL 
const SUPABASE_ANON_KEY = ENV_SUPABASE_ANON_KEY 

// Create Supabase client with AsyncStorage for persistence
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,  // Important for React Native
  },
});


AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})
