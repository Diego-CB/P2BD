CREATE OR REPLACE FUNCTION SinFecha(n integer)
RETURNS TABLE (usuario varchar ,movie varchar ,fecha timestamp) 
AS $$ 
DECLARE x record;
DECLARE y record;
BEGIN 
	RETURN QUERY	
		   SELECT  u.username, c.title, md.finished FROM contenido c JOIN movie_data md 
			ON md.id_content = c.id_content JOIN user_profiles up 
			ON md.profile = up.id_profile JOIN users u
			ON u.username  = up.username
			ORDER BY RANDOM()
			LIMIT n;
END;
$$
LANGUAGE 'plpgsql';

SELECT * FROM SinFecha(200)




CREATE OR REPLACE FUNCTION confecha(n integer, d varchar)
RETURNS VOID AS $$ 
DECLARE id_usuario numeric;
DECLARE movie numeric; 
DECLARE tiempo timestamp;
DECLARE x NUMERIC;
BEGIN 
	x= 0;
	LOOP 
		SELECT  up.id_profile INTO id_usuario FROM user_profiles up  JOIN users u
			ON u.username  = up.username
			WHERE administrador = false
			ORDER BY RANDOM() LIMIT 1;
	
		SELECT c.id_content INTO movie FROM contenido c  
		ORDER BY RANDOM() 
		LIMIT n;
	
		SELECT CAST(d AS TIMESTAMP) INTO tiempo;
		
		x=x+1;
		
		INSERT INTO movie_data VALUES (movie,tiempo,tiempo,id_usuario,true);
	
	IF (x=n) THEN 
		EXIT;
	END IF;
	END LOOP;
END;
$$
LANGUAGE 'plpgsql';

SELECT * FROM confecha(1,'01-13-2020');

SELECT * FROM movie_data md WHERE started ='01-13-2020' LIMIT 1

DROP FUNCTION confecha(n integer, d varchar);
