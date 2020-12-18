DROP DATABASE IF EXISTS WEB_PROJECT_DW;
CREATE DATABASE IF NOT EXISTS WEB_PROJECT_DW;
USE WEB_PROJECT_DW;

CREATE TABLE user_table
(
	COD_USER INT NOT NULL AUTO_INCREMENT,
	MAIL_USER VARCHAR(50) NOT NULL,
	NAME_USER VARCHAR(60) NOT NULL,
	PASSWORD_USER VARCHAR(200) NOT NULL,
	POINTS_USER INT NOT NULL,
	PRIMARY KEY(COD_USER)
);

INSERT INTO user_table(NAME_USER, MAIL_USER, PASSWORD_USER, POINTS_USER)
	VALUES('Hiago Indalécio', 'hiagoindalecio@gmail.com', '123', 0);

CREATE TABLE user_notes
(
	COD_NOTE INT NOT NULL AUTO_INCREMENT,
	COD_USER INT NOT NULL,
	SUMMARY_NOTE VARCHAR(50) NOT NULL,
	DESCRI_NOTE VARCHAR(3000),
	PRIMARY KEY(COD_NOTE),
	CONSTRAINT fk_user
	FOREIGN KEY (COD_USER)
	REFERENCES user_table(COD_USER)
);

INSERT INTO user_notes(COD_USER, SUMMARY_NOTE, DESCRI_NOTE)
	VALUES(1, 'Cores favoritas', 'Marry - Roxo\nAmy - Azul');

CREATE TABLE user_checkpoint
(
	COD_CHECK INT NOT NULL AUTO_INCREMENT,
	COD_USER INT NOT NULL,
	SUMMARY_CHECK VARCHAR(50) NOT NULL,
	DESCRI_CHECK VARCHAR(3000),
	DATA_CHECK DATE,
	PRIMARY KEY(COD_CHECK),
	CONSTRAINT fk_mem_user
	FOREIGN KEY (COD_USER)
	REFERENCES user_table(COD_USER)
);

INSERT INTO user_checkpoint(COD_USER, SUMMARY_CHECK, DESCRI_CHECK, DATA_CHECK)
	VALUES(1, 'Terminar projeto', 'Finalizar projeto em React até o fim de dezembro.', '2021-02-20');

CREATE TABLE checkpoint_tasks
(
	COD_TASK INT NOT NULL AUTO_INCREMENT,
	COD_CHECK INT NOT NULL,
	SUMMARY_TASK VARCHAR(25) NOT NULL,
	DESCRI_TASK VARCHAR(3000),
	STATUS_TASK TINYINT(1),
	PRIMARY KEY(COD_TASK),
	CONSTRAINT fk_task_check
	FOREIGN KEY (COD_CHECK)
	REFERENCES user_checkpoint(COD_CHECK)
);

INSERT INTO checkpoint_tasks(COD_CHECK, SUMMARY_TASK, DESCRI_TASK, STATUS_TASK)
	VALUES(1, 'Desenvolver a API.', 'Desenvolver a API em junção com o banco de dados.', 1);

CREATE TABLE memory_user
(
	COD_MEMORY INT NOT NULL AUTO_INCREMENT,
	COD_USER INT NOT NULL,
	SUMMARY_MEMORY VARCHAR(15) NOT NULL,
	DESCRI_MEMORY VARCHAR(3000),
	PRIMARY KEY(COD_MEMORY),
	CONSTRAINT fk_mem_user
	FOREIGN KEY (COD_USER)
	REFERENCES user_table(COD_USER)
);

INSERT INTO memory_user(COD_USER, SUMMARY_MEMORY, DESCRI_MEMORY)
	VALUES(1, 'Minha mãe.', 'Minha mãe se chama Carmen Lúcia Lima e sempre foi muito dedicada em me fazer feliz.');