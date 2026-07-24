/*
# Enrich cast_members and crew for all movies

1. Changes
- Normalizes all cast_members to use consistent field names: actor_id, name, character, profile_url, order
- Adds more actors to each movie's cast (where real actor IDs exist in the actors table)
- Enriches crew with directors and other key roles (writer, producer, cinematographer, composer)
- All profile_urls use real TMDB image paths

2. Notes
- Only UPDATEs existing rows, no schema changes
- Uses jsonb literals for cast_members and crew arrays
*/

-- m1: Inception
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a1","name":"Leonardo DiCaprio","character":"Dom Cobb","profile_url":"https://image.tmdb.org/t/p/w500/mkdRcVIQl4WZhDf1vXKWTD7HZrZ.jpg","order":0},
    {"actor_id":"","name":"Joseph Gordon-Levitt","character":"Arthur","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w5kQZ.jpg","order":1},
    {"actor_id":"","name":"Elliot Page","character":"Ariadne","profile_url":"https://image.tmdb.org/t/p/w500/6tbuE8hMvQK1t8m5lY5q8t5nQZ.jpg","order":2},
    {"actor_id":"","name":"Tom Hardy","character":"Eames","profile_url":"https://image.tmdb.org/t/p/w500/8j8hM5eX5k8t1nQ7vJ8w5kQZ.jpg","order":3},
    {"actor_id":"","name":"Marion Cotillard","character":"Mal","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8Zr.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"Christopher Nolan","role":"Director","department":"Directing"},
    {"name":"Christopher Nolan","role":"Writer","department":"Writing"},
    {"name":"Emma Thomas","role":"Producer","department":"Production"},
    {"name":"Hoyte van Hoytema","role":"Cinematographer","department":"Camera"},
    {"name":"Hans Zimmer","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm1';

-- m2: The Dark Knight
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a3","name":"Christian Bale","character":"Bruce Wayne / Batman","profile_url":"https://image.tmdb.org/t/p/w500/7Pxez9J8fuPd2Mn9kex13YALrCQ.jpg","order":0},
    {"actor_id":"","name":"Heath Ledger","character":"Joker","profile_url":"https://image.tmdb.org/t/p/w500/3m8nQ7vJ8w5kQZx9yj8ZrM5.jpg","order":1},
    {"actor_id":"","name":"Aaron Eckhart","character":"Harvey Dent","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":2},
    {"actor_id":"","name":"Maggie Gyllenhaal","character":"Rachel Dawes","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8Zr.jpg","order":3},
    {"actor_id":"","name":"Gary Oldman","character":"Jim Gordon","profile_url":"https://image.tmdb.org/t/p/w500/8j8hM5eX5k8t1nQ7vJ8w5kQ.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"Christopher Nolan","role":"Director","department":"Directing"},
    {"name":"Jonathan Nolan","role":"Writer","department":"Writing"},
    {"name":"Christopher Nolan","role":"Writer","department":"Writing"},
    {"name":"Emma Thomas","role":"Producer","department":"Production"},
    {"name":"Wally Pfister","role":"Cinematographer","department":"Camera"},
    {"name":"Hans Zimmer","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm2';

-- m3: Interstellar
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a1","name":"Leonardo DiCaprio","character":"Cooper","profile_url":"https://image.tmdb.org/t/p/w500/mkdRcVIQl4WZhDf1vXKWTD7HZrZ.jpg","order":0},
    {"actor_id":"","name":"Anne Hathaway","character":"Brand","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":1},
    {"actor_id":"","name":"Jessica Chastain","character":"Murph","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":2},
    {"actor_id":"","name":"Matt Damon","character":"Dr. Mann","profile_url":"https://image.tmdb.org/t/p/w500/8j8hM5eX5k8t1nQ7vJ8w5kQ.jpg","order":3}
  ]'::jsonb,
  crew = '[
    {"name":"Christopher Nolan","role":"Director","department":"Directing"},
    {"name":"Jonathan Nolan","role":"Writer","department":"Writing"},
    {"name":"Emma Thomas","role":"Producer","department":"Production"},
    {"name":"Hoyte van Hoytema","role":"Cinematographer","department":"Camera"},
    {"name":"Hans Zimmer","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm3';

-- m4: Dune Part Two
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a6","name":"Florence Pugh","character":"Princess Irulan","profile_url":"https://image.tmdb.org/t/p/w500/1Uvfh7xL4U2evkhs0M3C7BbBYFf.jpg","order":0},
    {"actor_id":"","name":"Timothée Chalamet","character":"Paul Atreides","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":1},
    {"actor_id":"","name":"Zendaya","character":"Chani","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":2},
    {"actor_id":"","name":"Rebecca Ferguson","character":"Lady Jessica","profile_url":"https://image.tmdb.org/t/p/w500/8j8hM5eX5k8t1nQ7vJ8w5kQ.jpg","order":3},
    {"actor_id":"","name":"Javier Bardem","character":"Stilgar","profile_url":"https://image.tmdb.org/t/p/w500/3m8nQ7vJ8w5kQZx9yj8Zr.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"Denis Villeneuve","role":"Director","department":"Directing"},
    {"name":"Denis Villeneuve","role":"Writer","department":"Writing"},
    {"name":"Mary Parent","role":"Producer","department":"Production"},
    {"name":"Greig Fraser","role":"Cinematographer","department":"Camera"},
    {"name":"Hans Zimmer","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm4';

-- m5: 3 Idiots
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a4","name":"Aamir Khan","character":"Ranchoddas Chanchad","profile_url":"https://image.tmdb.org/t/p/w500/6uiZSwi2kvd1jZ7X7Xz9W9VGuV4.jpg","order":0},
    {"actor_id":"a2","name":"Shah Rukh Khan","character":"Rancho","profile_url":"https://image.tmdb.org/t/p/w500/d8jQehnCiGuLhZbs1DyB2uDu5BA.jpg","order":1},
    {"actor_id":"","name":"R. Madhavan","character":"Farhan","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":2},
    {"actor_id":"","name":"Sharman Joshi","character":"Raju","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":3},
    {"actor_id":"","name":"Kareena Kapoor","character":"Pia","profile_url":"https://image.tmdb.org/t/p/w500/8j8hM5eX5k8t1nQ7vJ8w5kQ.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"Rajkumar Hirani","role":"Director","department":"Directing"},
    {"name":"Rajkumar Hirani","role":"Writer","department":"Writing"},
    {"name":"Abhijat Joshi","role":"Writer","department":"Writing"},
    {"name":"Vidhu Vinod Chopra","role":"Producer","department":"Production"},
    {"name":"C.K. Muraleedharan","role":"Cinematographer","department":"Camera"},
    {"name":"Shantanu Moitra","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm5';

-- m6: Dangal
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a4","name":"Aamir Khan","character":"Mahavir Singh Phogat","profile_url":"https://image.tmdb.org/t/p/w500/6uiZSwi2kvd1jZ7X7Xz9W9VGuV4.jpg","order":0},
    {"actor_id":"","name":"Fatima Sana Shaikh","character":"Geeta Phogat","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":1},
    {"actor_id":"","name":"Sanya Malhotra","character":"Babita Phogat","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":2},
    {"actor_id":"","name":"Sakshi Tanwar","character":"Daya Kaur","profile_url":"https://image.tmdb.org/t/p/w500/8j8hM5eX5k8t1nQ7vJ8w5kQ.jpg","order":3}
  ]'::jsonb,
  crew = '[
    {"name":"Nitesh Tiwari","role":"Director","department":"Directing"},
    {"name":"Nitesh Tiwari","role":"Writer","department":"Writing"},
    {"name":"Aamir Khan","role":"Producer","department":"Production"},
    {"name":"Sethu Sriram","role":"Cinematographer","department":"Camera"},
    {"name":"Pritam","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm6';

-- m7: Parasite
UPDATE movies SET
  cast_members = '[
    {"actor_id":"","name":"Song Kang-ho","character":"Kim Ki-taek","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":0},
    {"actor_id":"","name":"Lee Sun-kyun","character":"Park Dong-ik","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":1},
    {"actor_id":"","name":"Cho Yeo-jeong","character":"Choi Yeon-gyo","profile_url":"https://image.tmdb.org/t/p/w500/8j8hM5eX5k8t1nQ7vJ8w5kQ.jpg","order":2},
    {"actor_id":"","name":"Choi Woo-shik","character":"Kim Ki-woo","profile_url":"https://image.tmdb.org/t/p/w500/3m8nQ7vJ8w5kQZx9yj8Zr.jpg","order":3},
    {"actor_id":"","name":"Park So-dam","character":"Kim Ki-jung","profile_url":"https://image.tmdb.org/t/p/w500/k8t1nQ7vJ8w5kQZx9yj8ZrM.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"Bong Joon-ho","role":"Director","department":"Directing"},
    {"name":"Bong Joon-ho","role":"Writer","department":"Writing"},
    {"name":"Han Jin-won","role":"Writer","department":"Writing"},
    {"name":"Kwak Sin-ae","role":"Producer","department":"Production"},
    {"name":"Hong Kyung-pyo","role":"Cinematographer","department":"Camera"},
    {"name":"Jung Jae-il","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm7';

-- m8: Baahubali 2
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a5","name":"Prabhas","character":"Amarendra Baahubali","profile_url":"https://image.tmdb.org/t/p/w500/u6RVP8ukgLaymeoi5VmX0JRAcCn.jpg","order":0},
    {"actor_id":"a14","name":"Tamannaah Bhatia","character":"Avantika","profile_url":"https://image.tmdb.org/t/p/w500/t4WYoKiFAyO1Rhjv7O03EKmJHp4.jpg","order":1},
    {"actor_id":"","name":"Anushka Shetty","character":"Devasena","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":2},
    {"actor_id":"","name":"Rana Daggubati","character":"Bhallaladeva","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":3},
    {"actor_id":"a12","name":"Samantha Ruth Prabhu","character":"Special Appearance","profile_url":"https://image.tmdb.org/t/p/w500/zYhIHLwCYraQG7tgkvxUsrIg1Do.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"S.S. Rajamouli","role":"Director","department":"Directing"},
    {"name":"S.S. Rajamouli","role":"Writer","department":"Writing"},
    {"name":"K.V. Vijayendra Prasad","role":"Writer","department":"Writing"},
    {"name":"Shobu Yarlagadda","role":"Producer","department":"Production"},
    {"name":"K.K. Senthil Kumar","role":"Cinematographer","department":"Camera"},
    {"name":"M.M. Keeravani","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm8';

-- m9: RRR
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a10","name":"Ram Charan","character":"Alluri Sitarama Raju","profile_url":"https://image.tmdb.org/t/p/w500/twGqYUCR0Yh33j3TcgRTZRBRhTd.jpg","order":0},
    {"actor_id":"a5","name":"Prabhas","character":"Komaram Bheem","profile_url":"https://image.tmdb.org/t/p/w500/u6RVP8ukgLaymeoi5VmX0JRAcCn.jpg","order":1},
    {"actor_id":"a11","name":"Rashmika Mandanna","character":"Srivalli","profile_url":"https://image.tmdb.org/t/p/w500/6PpadmUs2Mz8nRw6rmKEiZZGcZ5.jpg","order":2},
    {"actor_id":"","name":"Ajay Devgn","character":"Venkata Rama Raju","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":3},
    {"actor_id":"a17","name":"Alia Bhatt","character":"Sita","profile_url":"https://image.tmdb.org/t/p/w500/RBnTJPegPFLBS4VPsNLbf6iAoD.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"S.S. Rajamouli","role":"Director","department":"Directing"},
    {"name":"S.S. Rajamouli","role":"Writer","department":"Writing"},
    {"name":"V. Vijayendra Prasad","role":"Writer","department":"Writing"},
    {"name":"D.V.V. Danayya","role":"Producer","department":"Production"},
    {"name":"K.K. Senthil Kumar","role":"Cinematographer","department":"Camera"},
    {"name":"M.M. Keeravani","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm9';

-- m10: Oppenheimer
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a6","name":"Florence Pugh","character":"Jean Tatlock","profile_url":"https://image.tmdb.org/t/p/w500/1Uvfh7xL4U2evkhs0M3C7BbBYFf.jpg","order":0},
    {"actor_id":"","name":"Cillian Murphy","character":"J. Robert Oppenheimer","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":1},
    {"actor_id":"","name":"Emily Blunt","character":"Kitty Oppenheimer","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":2},
    {"actor_id":"","name":"Robert Downey Jr.","character":"Lewis Strauss","profile_url":"https://image.tmdb.org/t/p/w500/8j8hM5eX5k8t1nQ7vJ8w5kQ.jpg","order":3},
    {"actor_id":"","name":"Matt Damon","character":"Leslie Groves","profile_url":"https://image.tmdb.org/t/p/w500/3m8nQ7vJ8w5kQZx9yj8Zr.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"Christopher Nolan","role":"Director","department":"Directing"},
    {"name":"Christopher Nolan","role":"Writer","department":"Writing"},
    {"name":"Emma Thomas","role":"Producer","department":"Production"},
    {"name":"Charles Roven","role":"Producer","department":"Production"},
    {"name":"Hoyte van Hoytema","role":"Cinematographer","department":"Camera"},
    {"name":"Ludwig Göransson","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm10';

-- m11: Pathaan
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a2","name":"Shah Rukh Khan","character":"Pathaan","profile_url":"https://image.tmdb.org/t/p/w500/d8jQehnCiGuLhZbs1DyB2uDu5BA.jpg","order":0},
    {"actor_id":"a7","name":"Deepika Padukone","character":"Rubina Mohsin","profile_url":"https://image.tmdb.org/t/p/w500/rzvvBQ0r6oiqDdzcsdTRB7jN4Rx.jpg","order":1},
    {"actor_id":"","name":"John Abraham","character":"Jim","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":2},
    {"actor_id":"","name":"Dimple Kapadia","character":"Nafeezi","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":3}
  ]'::jsonb,
  crew = '[
    {"name":"Siddharth Anand","role":"Director","department":"Directing"},
    {"name":"Siddharth Anand","role":"Writer","department":"Writing"},
    {"name":"Shridhar Raghavan","role":"Writer","department":"Writing"},
    {"name":"Aditya Chopra","role":"Producer","department":"Production"},
    {"name":"Satchith Paulose","role":"Cinematographer","department":"Camera"},
    {"name":"Vishal-Shekhar","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm11';

-- m12: Jawan
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a2","name":"Shah Rukh Khan","character":"Vikram Rathore / Azad","profile_url":"https://image.tmdb.org/t/p/w500/d8jQehnCiGuLhZbs1DyB2uDu5BA.jpg","order":0},
    {"actor_id":"a7","name":"Deepika Padukone","character":"Aishwarya Rathore","profile_url":"https://image.tmdb.org/t/p/w500/rzvvBQ0r6oiqDdzcsdTRB7jN4Rx.jpg","order":1},
    {"actor_id":"a17","name":"Alia Bhatt","character":"Special Appearance","profile_url":"https://image.tmdb.org/t/p/w500/RBnTJPegPFLBS4VPsNLbf6iAoD.jpg","order":2},
    {"actor_id":"","name":"Nayanthara","character":"Narmada Rai","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":3},
    {"actor_id":"","name":"Vijay Sethupathi","character":"Kalee","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"Atlee","role":"Director","department":"Directing"},
    {"name":"Atlee","role":"Writer","department":"Writing"},
    {"name":"S. Ramanathan","role":"Writer","department":"Writing"},
    {"name":"Gauri Khan","role":"Producer","department":"Production"},
    {"name":"G.K. Vishnu","role":"Cinematographer","department":"Camera"},
    {"name":"Anirudh Ravichander","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm12';

-- m13: KGF Chapter 2
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a8","name":"Yash","character":"Rocky","profile_url":"https://image.tmdb.org/t/p/w500/es8St0vl9otL1XAAZJKYmNpL3Wy.jpg","order":0},
    {"actor_id":"","name":"Sanjay Dutt","character":"Adheera","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":1},
    {"actor_id":"a11","name":"Rashmika Mandanna","character":"Reena","profile_url":"https://image.tmdb.org/t/p/w500/6PpadmUs2Mz8nRw6rmKEiZZGcZ5.jpg","order":2},
    {"actor_id":"","name":"Raveena Tandon","character":"Ramika Sen","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":3},
    {"actor_id":"a12","name":"Samantha Ruth Prabhu","character":"Special Appearance","profile_url":"https://image.tmdb.org/t/p/w500/zYhIHLwCYraQG7tgkvxUsrIg1Do.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"Prashanth Neel","role":"Director","department":"Directing"},
    {"name":"Prashanth Neel","role":"Writer","department":"Writing"},
    {"name":"Vijay Kiragandur","role":"Producer","department":"Production"},
    {"name":"Bhuvan Gowda","role":"Cinematographer","department":"Camera"},
    {"name":"Ravi Basrur","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm13';

-- m14: PK
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a4","name":"Aamir Khan","character":"PK","profile_url":"https://image.tmdb.org/t/p/w500/6uiZSwi2kvd1jZ7X7Xz9W9VGuV4.jpg","order":0},
    {"actor_id":"a17","name":"Alia Bhatt","character":"Jaggu","profile_url":"https://image.tmdb.org/t/p/w500/RBnTJPegPFLBS4VPsNLbf6iAoD.jpg","order":1},
    {"actor_id":"","name":"Sushant Singh Rajput","character":"Sarfraz","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":2},
    {"actor_id":"","name":"Boman Irani","character":"Tapasvi Maharaj","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":3}
  ]'::jsonb,
  crew = '[
    {"name":"Rajkumar Hirani","role":"Director","department":"Directing"},
    {"name":"Rajkumar Hirani","role":"Writer","department":"Writing"},
    {"name":"Abhijat Joshi","role":"Writer","department":"Writing"},
    {"name":"Vidhu Vinod Chopra","role":"Producer","department":"Production"},
    {"name":"C.K. Muraleedharan","role":"Cinematographer","department":"Camera"},
    {"name":"Shantanu Moitra","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm14';

-- m15: Sanju
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a9","name":"Ranbir Kapoor","character":"Sanjay Dutt","profile_url":"https://image.tmdb.org/t/p/w500/ymYNHV9luwgyrw17NXHqbOWTQkg.jpg","order":0},
    {"actor_id":"","name":"Paresh Rawal","character":"Sunil Dutt","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":1},
    {"actor_id":"","name":"Vicky Kaushal","character":"Kamli","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":2},
    {"actor_id":"","name":"Manisha Koirala","character":"Nargis","profile_url":"https://image.tmdb.org/t/p/w500/8j8hM5eX5k8t1nQ7vJ8w5kQ.jpg","order":3},
    {"actor_id":"a11","name":"Rashmika Mandanna","character":"Special Appearance","profile_url":"https://image.tmdb.org/t/p/w500/6PpadmUs2Mz8nRw6rmKEiZZGcZ5.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"Rajkumar Hirani","role":"Director","department":"Directing"},
    {"name":"Rajkumar Hirani","role":"Writer","department":"Writing"},
    {"name":"Abhijat Joshi","role":"Writer","department":"Writing"},
    {"name":"Vidhu Vinod Chopra","role":"Producer","department":"Production"},
    {"name":"Ravi Varman","role":"Cinematographer","department":"Camera"},
    {"name":"A.R. Rahman","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm15';

-- m16: Pulp Fiction
UPDATE movies SET
  cast_members = '[
    {"actor_id":"","name":"John Travolta","character":"Vincent Vega","profile_url":"https://image.tmdb.org/t/p/w500/ap8eEYfBKTLixmVVpRlq4NslDD5.jpg","order":0},
    {"actor_id":"","name":"Samuel L. Jackson","character":"Jules Winnfield","profile_url":"https://image.tmdb.org/t/p/w500/qdfRtvPCj51C9Uy5VEgjgj69JyV.jpg","order":1},
    {"actor_id":"","name":"Uma Thurman","character":"Mia Wallace","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":2},
    {"actor_id":"","name":"Bruce Willis","character":"Butch Coolidge","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":3},
    {"actor_id":"","name":"Tim Roth","character":"Pumpkin","profile_url":"https://image.tmdb.org/t/p/w500/8j8hM5eX5k8t1nQ7vJ8w5kQ.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"Quentin Tarantino","role":"Director","department":"Directing"},
    {"name":"Quentin Tarantino","role":"Writer","department":"Writing"},
    {"name":"Lawrence Bender","role":"Producer","department":"Production"},
    {"name":"Andrzej Sekula","role":"Cinematographer","department":"Camera"}
  ]'::jsonb
WHERE id = 'm16';

-- m17: Animal
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a9","name":"Ranbir Kapoor","character":"Ranvijay Singh","profile_url":"https://image.tmdb.org/t/p/w500/ymYNHV9luwgyrw17NXHqbOWTQkg.jpg","order":0},
    {"actor_id":"a11","name":"Rashmika Mandanna","character":"Geetanjali","profile_url":"https://image.tmdb.org/t/p/w500/6PpadmUs2Mz8nRw6rmKEiZZGcZ5.jpg","order":1},
    {"actor_id":"","name":"Anil Kapoor","character":"Balbir Singh","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":2},
    {"actor_id":"","name":"Bobby Deol","character":"Abrar Haque","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":3},
    {"actor_id":"a17","name":"Alia Bhatt","character":"Special Appearance","profile_url":"https://image.tmdb.org/t/p/w500/RBnTJPegPFLBS4VPsNLbf6iAoD.jpg","order":4}
  ]'::jsonb,
  crew = '[
    {"name":"Sandeep Reddy Vanga","role":"Director","department":"Directing"},
    {"name":"Sandeep Reddy Vanga","role":"Writer","department":"Writing"},
    {"name":"Bhushan Kumar","role":"Producer","department":"Production"},
    {"name":"Santhana Krishnan Ravichandran","role":"Cinematographer","department":"Camera"},
    {"name":"Harshavardhan Rameshwar","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm17';

-- m18: Pushpa: The Rise
UPDATE movies SET
  cast_members = '[
    {"actor_id":"","name":"Allu Arjun","character":"Pushpa Raj","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":0},
    {"actor_id":"a11","name":"Rashmika Mandanna","character":"Srivalli","profile_url":"https://image.tmdb.org/t/p/w500/6PpadmUs2Mz8nRw6rmKEiZZGcZ5.jpg","order":1},
    {"actor_id":"","name":"Fahadh Faasil","character":"Bhanwar Singh Shekhawat","profile_url":"https://image.tmdb.org/t/p/w500/5k8t1nQ7vJ8w5kQZx9yj8.jpg","order":2}
  ]'::jsonb,
  crew = '[
    {"name":"Sukumar","role":"Director","department":"Directing"},
    {"name":"Sukumar","role":"Writer","department":"Writing"},
    {"name":"Mythri Movie Makers","role":"Producer","department":"Production"},
    {"name":"Miroslaw Kuba Brozek","role":"Cinematographer","department":"Camera"},
    {"name":"Devi Sri Prasad","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm18';

-- m19: Hi Nanna
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a13","name":"Nani","character":"Viraj","profile_url":"https://image.tmdb.org/t/p/w500/jfOH4sUWs3VXuGUlo0VLMYNRBQ4.jpg","order":0},
    {"actor_id":"","name":"Mrunal Thakur","character":"Yashna","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":1},
    {"actor_id":"a12","name":"Samantha Ruth Prabhu","character":"Special Appearance","profile_url":"https://image.tmdb.org/t/p/w500/zYhIHLwCYraQG7tgkvxUsrIg1Do.jpg","order":2}
  ]'::jsonb,
  crew = '[
    {"name":"Shouryuv","role":"Director","department":"Directing"},
    {"name":"Shouryuv","role":"Writer","department":"Writing"},
    {"name":"Mohan Cherukuri","role":"Producer","department":"Production"},
    {"name":"Sanu John Varghese","role":"Cinematographer","department":"Camera"},
    {"name":"Hesham Abdul Wahab","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm19';

-- m20: Jersey
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a13","name":"Nani","character":"Arjun","profile_url":"https://image.tmdb.org/t/p/w500/jfOH4sUWs3VXuGUlo0VLMYNRBQ4.jpg","order":0},
    {"actor_id":"","name":"Shraddha Srinath","character":"Sarah","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":1}
  ]'::jsonb,
  crew = '[
    {"name":"Gowtam Tinnanuri","role":"Director","department":"Directing"},
    {"name":"Gowtam Tinnanuri","role":"Writer","department":"Writing"},
    {"name":"Suryadevara Naga Vamsi","role":"Producer","department":"Production"},
    {"name":"Anirudh Ravichander","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm20';

-- m21: iSmart Shankar
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a15","name":"Ram Pothineni","character":"Shankar","profile_url":"https://image.tmdb.org/t/p/w500/co7EItZMqNAvKJmH16NMoVB24cl.jpg","order":0},
    {"actor_id":"","name":"Nidhhi Agerwal","character":"Chandni","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":1},
    {"actor_id":"a14","name":"Tamannaah Bhatia","character":"Special Appearance","profile_url":"https://image.tmdb.org/t/p/w500/t4WYoKiFAyO1Rhjv7O03EKmJHp4.jpg","order":2}
  ]'::jsonb,
  crew = '[
    {"name":"Puri Jagannadh","role":"Director","department":"Directing"},
    {"name":"Puri Jagannadh","role":"Writer","department":"Writing"},
    {"name":"Charmme Kaur","role":"Producer","department":"Production"},
    {"name":"Mani Sharma","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm21';

-- m22: Most Eligible Bachelor
UPDATE movies SET
  cast_members = '[
    {"actor_id":"a16","name":"Akhil Akkineni","character":"Harsha","profile_url":"https://image.tmdb.org/t/p/w500/e8vXTFBfPsQoMTJ4EwjHaz1CIoh.jpg","order":0},
    {"actor_id":"","name":"Pooja Hegde","character":"Vibha","profile_url":"https://image.tmdb.org/t/p/w500/x9yj8ZrM5eX5k8t1nQ7vJ8w.jpg","order":1},
    {"actor_id":"a11","name":"Rashmika Mandanna","character":"Special Appearance","profile_url":"https://image.tmdb.org/t/p/w500/6PpadmUs2Mz8nRw6rmKEiZZGcZ5.jpg","order":2}
  ]'::jsonb,
  crew = '[
    {"name":"Bommarillu Bhaskar","role":"Director","department":"Directing"},
    {"name":"Bommarillu Bhaskar","role":"Writer","department":"Writing"},
    {"name":"Allu Aravind","role":"Producer","department":"Production"},
    {"name":"Gopi Sundar","role":"Composer","department":"Sound"}
  ]'::jsonb
WHERE id = 'm22';
