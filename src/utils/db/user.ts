// lib/db/user.ts
import supabase from '@/utils/db/supabase';

export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function getUserCountryCode(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('country_code')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data?.country_code || null;
}

export async function updateUserCountryCode(userId: string, countryCode: string) {
  const { error } = await supabase
    .from('users')
    .update({ country_code: countryCode })
    .eq('id', userId);
  if (error) throw error;
}

export async function insertUser(user: {
  id: string;
  email: string;
  country_code?: string;
}) {
  const { error } = await supabase.from('users').insert([user]);
  if (error) throw error;
}

export async function findUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  if (error) throw error;
  return data;
}