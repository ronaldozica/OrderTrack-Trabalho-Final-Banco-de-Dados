-- Reset das tabelas
drop table pedido;
drop table funcionario;
drop table cargo;
drop table item;
drop table produto;
drop table categoria;

-- Criação das tabelas
CREATE TABLE cargo (
    id_cargo   NUMERIC(6) NOT NULL,
    nome_cargo VARCHAR(80) NOT NULL
);

ALTER TABLE cargo ADD CONSTRAINT cargo_pk PRIMARY KEY ( id_cargo );

CREATE TABLE categoria (
    id_categoria   NUMERIC(6) NOT NULL,
    nome_categoria VARCHAR(80) NOT NULL
);

ALTER TABLE categoria ADD CONSTRAINT categoria_pk PRIMARY KEY ( id_categoria );

CREATE TABLE funcionario (
	cracha		   NUMERIC(6)  NOT NULL UNIQUE,
    cpf            NUMERIC(11) NOT NULL,
    nome           VARCHAR(70) NOT NULL,
    datanascimento DATE,
    id_cargo        NUMERIC(6) NOT NULL,
    cpfgerente     NUMERIC(11),
    sexo           VARCHAR(1)
);

ALTER TABLE funcionario
    ADD CONSTRAINT sexo_func_ck CHECK ( sexo IN ( 'F', 'M' ) );

ALTER TABLE funcionario ADD CONSTRAINT funcionario_pk PRIMARY KEY ( cpf );

CREATE TABLE item (
    quantidade NUMERIC(6) DEFAULT 1,
    id_produto NUMERIC(6) NOT NULL,
    id_item    NUMERIC(6) NOT NULL
);

ALTER TABLE item ADD CONSTRAINT qntd_item_ck CHECK ( quantidade >= 0 );

ALTER TABLE item ADD CONSTRAINT item_pk PRIMARY KEY ( id_item );

CREATE TABLE pedido (
    valortotal           NUMERIC(10, 2),
    id_pedido            NUMERIC(6),
    funcionarioatendente NUMERIC(11) NOT NULL,
    descricao            VARCHAR(80),
    id_item              NUMERIC(6) NOT NULL
);

ALTER TABLE pedido ADD CONSTRAINT valor_pedido_ck CHECK ( valortotal >= 0 );

CREATE TABLE produto (
    id_produto   NUMERIC(6) NOT NULL,
    descricao    VARCHAR(80),
    valor        NUMERIC(10, 2) NOT NULL,
    id_categoria NUMERIC(6) NOT NULL
);

ALTER TABLE produto ADD CONSTRAINT valor_prod_ck CHECK ( valor >= 0 );

ALTER TABLE produto ADD CONSTRAINT produto_pk PRIMARY KEY ( id_produto );

ALTER TABLE funcionario
    ADD CONSTRAINT funcionario_cargo_fk FOREIGN KEY ( id_cargo )
        REFERENCES cargo ( id_cargo );

ALTER TABLE funcionario
    ADD CONSTRAINT gerente_funcionario_fk FOREIGN KEY ( cpfgerente )
        REFERENCES funcionario ( cpf );

ALTER TABLE item
    ADD CONSTRAINT item_produto_fk FOREIGN KEY ( id_produto )
        REFERENCES produto ( id_produto );

ALTER TABLE pedido
    ADD CONSTRAINT pedido_funcionario_fk FOREIGN KEY ( funcionarioatendente )
        REFERENCES funcionario ( cpf );

ALTER TABLE pedido
    ADD CONSTRAINT pedido_item_fk FOREIGN KEY ( id_item )
        REFERENCES item ( id_item )
            ON DELETE CASCADE;

ALTER TABLE produto
    ADD CONSTRAINT produto_categoria_fk FOREIGN KEY ( id_categoria )
        REFERENCES categoria ( id_categoria );
		
-- Povoamento
		
insert into cargo values (1,'Atendente');
insert into cargo values (2,'Gerente');
insert into cargo values (3,'CEO');
insert into cargo values (4,'Desenvolvedor');
insert into cargo values (5,'Cortador de batata');

insert into funcionario values (13, 1234567866,'Alexandre', null, 1, null, 'M');
insert into funcionario values (12, 1234567867,'Ronaldo', null, 1, null, 'M');
insert into funcionario values (257, 1234567257,'Rodrigo', null, 2, null, 'M');
insert into funcionario values (28, 1234567828,'Vitor', null, 1, null, 'M');
insert into funcionario values (7, 1234567412,'Henrique', null, 5, null, 'M');

insert into categoria values (1, 'Salgado');
insert into categoria values (2, 'Bebida');
insert into categoria values (3, 'Doce');
insert into categoria values (4, 'Refeição pronta');
insert into categoria values (5, 'Pipoca');
insert into categoria values (6, 'Café');

select * from produto p right join categoria c on p.id_categoria=c.id_categoria;
select * from categoria c left join produto p on c.id_categoria=p.id_categoria;

select * from produto;
select * from categoria;
select * from funcionario;
select * from cargo;
select * from item;

insert into produto values (10, 'Empada de alho poró', 3.50, 1);
insert into produto values (11, 'Enrolado de presunto', 3.50, 1);
insert into produto values (12, 'Enrolado de queijo', 3.00, 1);
insert into produto values (13, 'Coxinha', 4.00, 1);
insert into produto values (14, 'Pão de Queijo', 1.50, 1);
insert into produto values (15, 'Kuat', 4.00, 2);
insert into produto values (16, 'Guaraná Antartica', 3.50, 2);
insert into produto values (17, 'Guarapán', 2.50, 2);
insert into produto values (18, 'Guaraná Jesus', 1.00, 2);
insert into produto values (19, 'Guaravita', 2.50, 2);
insert into produto values (20, 'Dolly', 0.01, 2);
insert into produto values (21, 'Trident', 1.50, 3);
insert into produto values (22, 'Kitkat', 1.75, 3);
insert into produto values (23, 'Strogonoff de Frango', 12.5, 4);
insert into produto values (24, 'Strogonoff de Palmito', 11.5, 4);
insert into produto values (25, 'Pipoca Doce', 1.5, 5);
insert into produto values (26, 'Pipoca de Microndas - Sabor Bacon', 2.5, 5);

insert into item values (5, 1, 1);
insert into item values (5, 2, 2);

-- select (i.Quantidade*p.valor) from item i join produto p on i.produto_id=p.id where i.id=1;
insert into pedido values (100, 1, 1234567866, null,1);

select * from pedido;
select * from item;
select * from produto;
select * from FUNCIONARIO;
