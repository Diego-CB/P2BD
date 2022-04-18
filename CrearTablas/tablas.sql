
-- users
CREATE TABLE users(
	username varchar PRIMARY KEY,
	email varchar,
	user_password varchar,
	plan INT,
	administrador bool,
	habilidatado bool
)

-- user_profiles
CREATE TABLE user_profiles (
	username varchar,
	id_profile SERIAL UNIQUE,
	profile varchar,
	estado bool,
	habilitado bool,
	FOREIGN KEY (username) REFERENCES users(username),
	PRIMARY KEY (username, id_profile)
);

-- contenido
CREATE TABLE contenido(
	id_content SERIAL PRIMARY KEY,
	title varchar,
	category bool,
	genre varchar,
	release_date date,
	link varchar
);

-- movie_data
CREATE TABLE movie_data(
	id_content int,
	started timestamp,
	finished timestamp,
	profile int,
	FOREIGN KEY (id_content) REFERENCES contenido(id_content),
	FOREIGN KEY (profile) REFERENCES user_profiles(id_profile)
);

-- Director
CREATE TABLE director(
	id_content int,
	director varchar,
	PRIMARY KEY (id_content, director),
	FOREIGN KEY (id_content) REFERENCES contenido (id_content)
);

-- actors
CREATE TABLE actors (
	id_actor SERIAL PRIMARY KEY,
	actor varchar UNIQUE
);

-- cast 
CREATE TABLE casting(
	id_content int,
	id_actor int,
	PRIMARY KEY (id_actor, id_content),
	FOREIGN KEY (id_content) REFERENCES contenido(id_content),
	FOREIGN KEY (id_actor) REFERENCES actors(id_actor)
);

-- awards
CREATE TABLE awards (
	id_content int PRIMARY KEY,
	premio varchar,
	UNIQUE (id_content, premio),
	FOREIGN KEY (id_content) REFERENCES contenido (id_content)
);

-- profile_favorites
CREATE TABLE progile_favorites (
	id_content int,
	profile int,
	PRIMARY KEY (id_content, profile),
	FOREIGN KEY (id_content) REFERENCES contenido (id_content),
	FOREIGN KEY (profile) REFERENCES user_profiles (id_profile)
);

-- announcer
CREATE TABLE announcer (
	announcer_id SERIAL PRIMARY KEY, 
	a_name varchar UNIQUE
);

-- ad
CREATE TABLE ad (
	ad_id SERIAL,
	announcer_id int,
	message varchar,
	PRIMARY KEY (ad_id, announcer_id),
	FOREIGN KEY (announcer_id) REFERENCES announcer (announcer_id) ON DELETE CASCADE 
);


-- bad login
CREATE TABLE bad_login (
	username varchar,
	user_password varchar
);