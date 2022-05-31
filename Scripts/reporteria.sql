
-- Query 1

-- Definición de index
CREATE INDEX content_movie
	ON movie_data (id_content);

-- diseno de query

SELECT id_content, EXTRACT(HOUR FROM started)::int as hora
  FROM movie_data m2
;

SELECT c.title, count(movie_hours.hora) AS vistas
	FROM (
		SELECT 
			id_content, 
			EXTRACT(HOUR FROM started)::int as hora,
			EXTRACT(MONTH FROM started)::int as mes
		FROM movie_data m2
	) AS movie_hours
	NATURAL JOIN contenido c
WHERE movie_hours.hora = 10
AND movie_hours.mes = 4
GROUP BY (id_content, c.title)
ORDER BY vistas DESC LIMIT 5
;

-- Funcion simple
CREATE OR REPLACE FUNCTION content_top5(
	a_month int,
	a_hour int
) RETURNS TABLE (
        title VARCHAR,
        vistas int
) 
AS $$
BEGIN 
	RETURN QUERY SELECT c.title, count(movie_hours.hora)::int AS vistas
		FROM (
			SELECT 
				id_content, 
				EXTRACT(HOUR FROM started)::int as hora,
				EXTRACT(MONTH FROM started)::int as mes
			FROM movie_data m2
		) AS movie_hours
		NATURAL JOIN contenido c
		WHERE movie_hours.hora = a_hour
		AND movie_hours.mes = a_month
		GROUP BY (id_content, c.title)
		ORDER BY vistas DESC LIMIT 5
	;
END; 
$$ LANGUAGE 'plpgsql';

-- Funcion master

CREATE OR REPLACE FUNCTION all_content_top5(
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	refcursor,
	a_month int
) RETURNS SETOF refcursor AS 
$BODY$
BEGIN
	OPEN $1 FOR SELECT * FROM content_top5(a_month, 9);
	RETURN NEXT $1;

	OPEN $2 FOR SELECT * FROM content_top5(a_month, 10);
	RETURN NEXT $2;

	OPEN $3 FOR SELECT * FROM content_top5(a_month, 11);
	RETURN NEXT $3;

	OPEN $4 FOR SELECT * FROM content_top5(a_month, 12);
	RETURN NEXT $4;

	OPEN $5 FOR SELECT * FROM content_top5(a_month, 13);
	RETURN NEXT $5;

	OPEN $6 FOR SELECT * FROM content_top5(a_month, 15);
	RETURN NEXT $6;

	OPEN $7 FOR SELECT * FROM content_top5(a_month, 15);
	RETURN NEXT $7;

	OPEN $8 FOR SELECT * FROM content_top5(a_month, 16);
	RETURN NEXT $8;

	OPEN $9 FOR SELECT * FROM content_top5(a_month, 17);
	RETURN NEXT $9;

	OPEN $10 FOR SELECT * FROM content_top5(a_month, 18);
	RETURN NEXT $10;

	OPEN $11 FOR SELECT * FROM content_top5(a_month, 19);
	RETURN NEXT $11;

	OPEN $12 FOR SELECT * FROM content_top5(a_month, 20);
	RETURN NEXT $12;

	OPEN $13 FOR SELECT * FROM content_top5(a_month, 21);
	RETURN NEXT $13;

	OPEN $14 FOR SELECT * FROM content_top5(a_month, 22);
	RETURN NEXT $14;

	OPEN $15 FOR SELECT * FROM content_top5(a_month, 23);
	RETURN NEXT $15;

	OPEN $16 FOR SELECT * FROM content_top5(a_month, 24);
	RETURN NEXT $16;

	OPEN $17 FOR SELECT * FROM content_top5(a_month, 1);
	RETURN NEXT $17;
END;
$BODY$
LANGUAGE plpgsql;

-- Transaccion para utilizar procedimineto
BEGIN;
SELECT * FROM all_content_top5('a', 'b', 'c', 'd', 'e', 4);
FETCH ALL FROM a;
FETCH ALL FROM b;
FETCH ALL FROM c;
FETCH ALL FROM d;
FETCH ALL FROM e;
COMMIT;


-- QUery 2
CREATE TABLE user_search (
	term varchar(30) NOT NULL
);
     
    
CREATE INDEX search_index
	ON user_search (term);

CREATE VIEW top10_terms AS
SELECT term, count(*) FROM user_search us 
GROUP BY term
ORDER BY count(*) DESC LIMIT 10
;
     
SELECT * from top10_terms;

-- Query 3

CREATE VIEW top5admins AS
SELECT username, count(*) AS cambios
	FROM (
		SELECT * 
		FROM record r
		WHERE r.table_name = 'users'
	) AS user_changes
	NATURAL JOIN users u
	WHERE administrador = TRUE
GROUP BY username
ORDER BY cambios DESC LIMIT 5
;

SELECT * FROM top5admins;

-- Query 4
SELECT * FROM movie_data;

SELECT * FROM movie_data 
WHERE profile = 143;
ORDER BY profile desc;

ALTER TABLE movie_data ADD COLUMN watched bool;

UPDATE movie_data
	SET watched = false
	WHERE id_content = 3
	AND profile = (
      SELECT id_profile 
      FROM user_profiles 
      WHERE username = 'nuevo' 
      AND profile = 'nuevo1' 
      LIMIT 1
    )
	;


CREATE OR REPLACE FUNCTION Top20Movies(
	a_startDate date,
	a_endDate date
) RETURNS TABLE (
        title VARCHAR,
        vistas bigint
) 
AS $$
BEGIN 
	RETURN QUERY SELECT c.title, no_visto
	FROM (
		SELECT m.id_content,count(*) AS no_visto
		FROM movie_data m
		WHERE watched = FALSE
		AND current_timestamp(6) - m.started >= make_interval(0, 0, 0, 20, 0, 0, 0)
		AND m.started >= a_startDate
		AND m.started <= a_endDate
		GROUP BY m.id_content
	) AS contents_20
	NATURAL JOIN contenido c
	ORDER BY no_visto DESC LIMIT 20
	;
END; 
$$ LANGUAGE 'plpgsql';



SELECT * FROM top20movies('01-01-2022', '12-31-2022');


     
     
     
     
     
     
