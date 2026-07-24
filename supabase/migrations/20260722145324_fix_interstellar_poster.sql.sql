-- Fix Interstellar poster URL (old one returns 404)
UPDATE movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg'
WHERE id = 'm3';
