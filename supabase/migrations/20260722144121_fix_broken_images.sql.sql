/*
# Fix broken movie images and cast profile URLs

1. Changes
- Fix poster_url and backdrop_url for Animal (m17) and Pushpa (m18) with real TMDB paths
- For all cast_members: set profile_url from the actors table where actor_id matches
- For cast_members without a valid actor_id: set profile_url to null (UI shows initials)
- Also fix cast_members that use "actorId" field name instead of "actor_id"

2. Notes
- Only UPDATEs existing rows, no schema changes
- Uses a PL/pgSQL DO block to iterate and update jsonb arrays
*/

-- Fix movie poster and backdrop URLs for Animal (m17)
UPDATE movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/hr9rjR3J0xBBKmlJ4n3gHId9ccx.jpg',
  backdrop_url = 'https://image.tmdb.org/t/p/original/lprsAHkwMxk2iC6VZxNmV0H7g1t.jpg'
WHERE id = 'm17';

-- Fix movie poster and backdrop URLs for Pushpa (m18)
UPDATE movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/yHaVMyFjv7q2schbFbWOzfWn23G.jpg',
  backdrop_url = 'https://image.tmdb.org/t/p/original/jQIcn51nsvMrpB9NFwEOb9QHhFt.jpg'
WHERE id = 'm18';

-- Fix all cast_members: normalize field names and set profile_url from actors table
DO $$
DECLARE
  movie_record RECORD;
  new_cast JSONB;
  member JSONB;
  actor_record RECORD;
  i INT;
BEGIN
  FOR movie_record IN SELECT id, cast_members FROM movies LOOP
    new_cast = '[]'::jsonb;
    FOR i IN 0..jsonb_array_length(movie_record.cast_members) - 1 LOOP
      member = movie_record.cast_members->i;
      
      -- Normalize actorId to actor_id
      IF member ? 'actorId' AND NOT member ? 'actor_id' THEN
        member = jsonb_set(member, '{actor_id}', member->'actorId', true);
        member = member - 'actorId';
      END IF;
      
      -- If has actor_id, try to get real profile_url from actors table
      IF member ? 'actor_id' AND (member->>'actor_id') != '' THEN
        SELECT * INTO actor_record FROM actors WHERE id = (member->>'actor_id') LIMIT 1;
        IF FOUND AND actor_record.profile_url IS NOT NULL THEN
          member = jsonb_set(member, '{profile_url}', to_jsonb(actor_record.profile_url), true);
          -- Also ensure name is set from actors table if missing
          IF NOT member ? 'name' OR (member->>'name') = '' THEN
            member = jsonb_set(member, '{name}', to_jsonb(actor_record.name), true);
          END IF;
        END IF;
      ELSE
        -- No valid actor_id - clear fake profile_url
        member = member - 'profile_url';
        -- Also clear actor_id if empty string
        IF member ? 'actor_id' AND (member->>'actor_id') = '' THEN
          member = member - 'actor_id';
        END IF;
      END IF;
      
      -- Remove old 'id' field if present (was cast record id, not actor id)
      IF member ? 'id' THEN
        member = member - 'id';
      END IF;
      
      new_cast = new_cast || jsonb_build_array(member);
    END LOOP;
    
    UPDATE movies SET cast_members = new_cast WHERE id = movie_record.id;
  END LOOP;
END $$;
