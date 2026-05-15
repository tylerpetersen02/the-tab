-- Phase 1: Create profiles table and triggers

-- 1. Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text not null,
  username text unique,
  initials text,
  avatar_url text,
  bio text,
  home_city text,
  is_private boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add index on username for quick lookups
create index if not exists profiles_username_idx on public.profiles(username);

-- 2. Create updated_at trigger function
create or replace function public.set_updated_at()
returns trigger as 
begin
  new.updated_at = now();
  return new;
end;
 language plpgsql;

-- Apply trigger to profiles
drop trigger if exists profiles_set_updated_at on public.profiles;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- 3. Create profile creation trigger (auto-create profile on new user signup)
create or replace function public.handle_new_user()
returns trigger as 
begin
  insert into public.profiles (
    id,
    email,
    display_name,
    username,
    initials
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', 'New User'),
    new.raw_user_meta_data->>'username',
    upper(left(coalesce(new.raw_user_meta_data->>'display_name', 'NU'), 2))
  )
  on conflict (id) do nothing;

  return new;
end;
 language plpgsql security definer;

-- Apply trigger to auth.users
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- 4. Enable RLS on profiles (basic, will expand in Phase 8)
alter table public.profiles enable row level security;

-- Temporary: Allow all access while developing (remove in Phase 8)
create policy "profiles_all_access" on public.profiles
  for all using (true) with check (true);
