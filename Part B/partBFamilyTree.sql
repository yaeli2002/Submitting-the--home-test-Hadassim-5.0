/*********Exercise A********/
CREATE DATABASE IF NOT EXISTS dbPerson;
USE dbPerson;


CREATE TABLE IF NOT EXISTS Person(
Person_Id VARCHAR(9),
Personal_Name VARCHAR(100),
Family_Name VARCHAR(100),
Gender VARCHAR(4) ,
Father_Id VARCHAR(9) NULL,
Mother_Id VARCHAR(9) NULL,
Spouse_Id VARCHAR(9) NULL,
PRIMARY KEY(Person_Id),
FOREIGN KEY(Father_Id) REFERENCES Person(Person_Id),
FOREIGN KEY(Mother_Id) REFERENCES Person(Person_Id),
FOREIGN KEY(Spouse_Id) REFERENCES Person(Person_Id)
);

CREATE TABLE IF NOT EXISTS FamilyTree(
Person_Id VARCHAR(9),
Relative_Id VARCHAR(9),
Connection_Type ENUM('אבא', 'אמא', 'אח', 'אחות', 'בן', 'בת', 'בן זוג', 'בת זוג'),
PRIMARY KEY(Person_Id, Relative_Id),
FOREIGN KEY (Person_Id) REFERENCES Person(Person_Id),
FOREIGN KEY (Relative_Id) REFERENCES Person(Person_Id)
);


INSERT IGNORE INTO Person
VALUES ('023855268', 'פנינה', 'צוובנר', 'נקבה',NULL,NULL,NULL),
       ('234567891','ישעיהו','שינברגר','זכר',NULL,NULL, NULL),
	   ('456789123','אהובה','שינברגר','נקבה',NULL,'023855268','234567891' ),
       ('123456789','יעלי','שינברגר', 'נקבה','234567891','456789123' , NULL),
       ('212419658','משה','שינברגר', 'זכר','234567891','456789123' , NULL),
       ('302546984','רונן','ברגר', 'זכר',NULL,NULL, NULL),
       ('212417658','נעמי','כהן', 'נקבה',NULL,NULL ,'302546984');

/*Entering an ancestral relationship between a person and their relative into the FamilyTree table.*/
INSERT IGNORE INTO FamilyTree(Person_Id , Relative_Id , Connection_Type)
	SELECT p.Person_Id , 
		p.Father_Id , 
        'אבא'
	FROM Person AS p 
	WHERE p.Father_Id IS NOT NULL
	/*Checking if such a relationship does not already exist in the Family Tree table*/
	AND NOT EXISTS(
		SELECT 1 
		FROM FamilyTree AS f 
		WHERE f.Person_Id=p.Person_Id AND f.Relative_Id=p.Father_Id
	);

/*Entering a maternal relationship between a person and their relative into the family tree table.*/        
INSERT IGNORE INTO FamilyTree(Person_Id , Relative_Id , Connection_Type)
	SELECT p.Person_Id , 
		p.Mother_Id , 
        'אמא'
	FROM Person AS p 
	WHERE p.Mother_Id IS NOT NULL
	/*Checking if such a relationship does not already exist in the Family Tree table*/
	AND NOT EXISTS(
		SELECT 1 
		FROM FamilyTree AS m 
		WHERE m.Person_Id=p.Person_Id AND m.Relative_Id=p.Mother_Id
	);

/*siblings*/        
INSERT IGNORE INTO FamilyTree(Person_Id , Relative_Id , Connection_Type)
	SELECT p1.Person_Id , 
		p2.Person_Id , 
		CASE WHEN p2.Gender='ז' THEN 'אח' ELSE 'אחות' END
	FROM Person AS p1
	JOIN Person AS p2
	ON ((p1.Father_Id =p2.Father_Id AND p1.Father_Id IS NOT NULL) OR ( p1.Mother_ID=p2.Mother_ID AND p1.Mother_ID IS NOT NULL)) AND p1.Person_Id != p2.Person_Id ;

/*children*/
INSERT IGNORE INTO FamilyTree(Person_Id , Relative_Id , Connection_Type)
	SELECT 
		p1.Person_Id , 
		p2.Person_Id , 
		CASE WHEN p2.Gender='זכר' THEN 'בן' ELSE 'בת' END
	FROM Person AS p1
	JOIN Person AS p2
	ON( (p1.Person_Id =p2.Father_Id OR p1.Person_ID=p2.Mother_ID) AND (p1.Person_Id != p2.Person_Id));
 
 /*למנוע הערה שגיאה עבור זוגות אשר מתחלף התפקיד שלהם פעם אחת בתור הבן זוג ופעם שניה בתור האדם.*/
 /*spouse*/       
 INSERT IGNORE INTO FamilyTree(Person_Id , Relative_Id , Connection_Type)
	SELECT 
		p1.Person_Id , 
        p2.Person_Id , 
        CASE WHEN p2.Gender='זכר' THEN 'בן זוג' ELSE 'בת זוג' END
	FROM Person AS p1
	JOIN Person AS p2
	ON (p1.Spouse_Id = p2.Person_Id  AND p1.Spouse_Id IS NOT NULL);

 
	

/*********Exercise B********/
 
 INSERT IGNORE INTO FamilyTree(Person_Id , Relative_Id , Connection_Type)
	SELECT 
		P.Person_Id , 
        f.Person_Id , 
        CASE WHEN p.Gender='זכר' THEN 'בן זוג' ELSE 'בת זוג' END
	FROM Person AS p
	JOIN FamilyTree AS f  
	ON (f.Relative_Id=p.Person_Id AND p.Spouse_Id IS NULL);
    
 /*Update the spouse in the Person table    
 UPDATE Person AS p1
 JOIN Person AS p2
 ON p1.Person_Id=p2.Spouse_Id AND p1.Spouse_Id IS NULL
 SET p1.Spouse_Id=p2.Person_Id;*/
 
/*SELECT *
FROM FamilyTree*/
     
