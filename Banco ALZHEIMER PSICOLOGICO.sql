DROP DATABASE IF EXISTS WEB_PROJECT_DW;
CREATE DATABASE IF NOT EXISTS WEB_PROJECT_DW;

CREATE TABLE user_table
(
	COD_USER INT not null AUTO_INCREMENT,
	MAIL_USER VARCHAR(50) not null,
	PASSWORD_USER VARCHAR(50) not null,
	PRIMARY KEY(COD_USER)
);

INSERT INTO user_table(MAIL_USER, PASSWORD_USER)
	VALUES('hiagoindalecio@gmail.com', '123');

CREATE TABLE user_notes
(
	COD_NOTE INT not null AUTO_INCREMENT,
	COD_USER INT not null,
	SUMMARY_NOTE VARCHAR(50) not null,
	DESCRI_NOTE VARCHAR(3000),
	PRIMARY KEY(COD_NOTE),
	constraint fk_user
	FOREIGN KEY (COD_USER)
	REFERENCES user_table(COD_USER)
);

INSERT INTO user_notes(COD_USER, SUMMARY_NOTE, DESCRI_NOTE)
	VALUES(1, 'Cores favoritas', 'Marry - Roxo\nAmy - Azul');

CREATE TABLE user_checkpoint
(
	COD_CHECK INT not null AUTO_INCREMENT,
	COD_USER INT not null,
	SUMMARY_CHECK VARCHAR(50) not null,
	DESCRI_CHECK VARCHAR(3000),
	PRIMARY KEY(COD_CHECK),
	constraint fk_mem_user
	FOREIGN KEY (COD_USER)
	REFERENCES user_table(COD_USER)
);

INSERT INTO user_checkpoint(COD_USER, SUMMARY_CHECK, DESCRI_CHECK)
	VALUES(1, 'Terminar projeto', 'Finalizar projeto em React até o fim de dezembro.');

CREATE TABLE checkpoint_tasks
(
	COD_TASK INT not null AUTO_INCREMENT,
	COD_CHECK INT not null,
	SUMMARY_TASK VARCHAR(25) not null,
	DESCRI_TASK VARCHAR(3000),
	STATUS_TASK TINYINT(1),
	PRIMARY KEY(COD_TASK),
	constraint fk_task_check
	FOREIGN KEY (COD_CHECK)
	REFERENCES user_checkpoint(COD_CHECK)
);

INSERT INTO checkpoint_tasks(COD_CHECK, SUMMARY_TASK, DESCRI_TASK, STATUS_TASK)
	VALUES(1, 'Desenvolver a API.', 'Desenvolver a API em junção com o banco de dados.', 0);

CREATE TABLE memory_user
(
	COD_MEMORY INT not null AUTO_INCREMENT,
	COD_USER INT not null,
	SUMMARY_MEMORY VARCHAR(15) not null,
	DESCRI_MEMORY VARCHAR(3000),
	PRIMARY KEY(COD_MEMORY),
	constraint fk_mem_user
	FOREIGN KEY (COD_USER)
	REFERENCES user_table(COD_USER)
);

INSERT INTO memory_user(COD_USER, SUMMARY_MEMORY, DESCRI_MEMORY)
	VALUES(1, 'Minha mãe.', 'Minha mãe se chama Carmen Lúcia Lima e sempre foi muito dedicada em me fazer feliz.');