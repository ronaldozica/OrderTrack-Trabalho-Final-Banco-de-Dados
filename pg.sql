-- Reset das tabelas
drop table pedido;
drop table funcionario;
drop table cargo;
drop table item;
drop table produto;
drop table categoria;


-- Criação das tabelas
CREATE TABLE cargo (
    id        NUMERIC(6) NOT NULL,
    descricao VARCHAR(80) NOT NULL
);

ALTER TABLE cargo ADD CONSTRAINT cargo_pk PRIMARY KEY ( id );

CREATE TABLE categoria (
    id        NUMERIC(6) NOT NULL,
    descricao VARCHAR(80) NOT NULL
);

ALTER TABLE categoria ADD CONSTRAINT categoria_pk PRIMARY KEY ( id );

CREATE TABLE funcionario (
	cracha		   NUMERIC(6)  NOT NULL UNIQUE,
    cpf            NUMERIC(11) NOT NULL,
    nome           VARCHAR(70) NOT NULL,
    datanascimento DATE,
    cargoid        NUMERIC(6) NOT NULL,
    cpfgerente     NUMERIC(11),
    sexo           VARCHAR(1)
);

ALTER TABLE funcionario
    ADD CONSTRAINT sexo_func_ck CHECK ( sexo IN ( 'F', 'M' ) );

ALTER TABLE funcionario ADD CONSTRAINT funcionario_pk PRIMARY KEY ( cpf );

CREATE TABLE item (
    quantidade NUMERIC(6) DEFAULT 1,
    produto_id NUMERIC(6) NOT NULL,
    id         NUMERIC(6) NOT NULL
);

ALTER TABLE item ADD CONSTRAINT qntd_item_ck CHECK ( quantidade >= 0 );

ALTER TABLE item ADD CONSTRAINT item_pk PRIMARY KEY ( id );

CREATE TABLE pedido (
    valortotal           NUMERIC(10, 2),
    id                   NUMERIC(6),
    funcionarioatendente NUMERIC(11) NOT NULL,
    descricao            VARCHAR(80),
    item_id              NUMERIC(6) NOT NULL
);

ALTER TABLE pedido ADD CONSTRAINT valor_pedido_ck CHECK ( valortotal >= 0 );

CREATE TABLE produto (
    id          NUMERIC(6) NOT NULL,
    descricao   VARCHAR(80),
    valor       NUMERIC(10, 2) NOT NULL,
    categoriaid NUMERIC(6) NOT NULL
);

ALTER TABLE produto ADD CONSTRAINT valor_prod_ck CHECK ( valor >= 0 );

ALTER TABLE produto ADD CONSTRAINT produto_pk PRIMARY KEY ( id );

ALTER TABLE funcionario
    ADD CONSTRAINT funcionario_cargo_fk FOREIGN KEY ( cargoid )
        REFERENCES cargo ( id );

ALTER TABLE funcionario
    ADD CONSTRAINT gerente_funcionario_fk FOREIGN KEY ( cpfgerente )
        REFERENCES funcionario ( cpf );

ALTER TABLE item
    ADD CONSTRAINT item_produto_fk FOREIGN KEY ( produto_id )
        REFERENCES produto ( id );

ALTER TABLE pedido
    ADD CONSTRAINT pedido_funcionario_fk FOREIGN KEY ( funcionarioatendente )
        REFERENCES funcionario ( cpf );

ALTER TABLE pedido
    ADD CONSTRAINT pedido_item_fk FOREIGN KEY ( item_id )
        REFERENCES item ( id )
            ON DELETE CASCADE;

ALTER TABLE produto
    ADD CONSTRAINT produto_categoria_fk FOREIGN KEY ( categoriaid )
        REFERENCES categoria ( id );
		
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

insert into produto values (1, 'Enrolado de presunto', 2.50, 1);
insert into produto values (2, 'Enrolado de queijo', 3.50, 1);
insert into produto values (3, 'Pão de Queijo', 1.50, 1);
insert into produto values (4, 'Kuat', 4.00, 2);
insert into produto values (5, 'Guaraná Antartica', 3.50, 2);
insert into produto values (6, 'Guarápan', 2.50, 2);
insert into produto values (7, 'Guaraná Jesus', 1.00, 2);
insert into produto values (8, 'Guaravita', 2.50, 2);
insert into produto values (9, 'Dolly', 0.01, 2);
insert into produto values (10, 'Kitkat', 1.75, 3);
insert into produto values (11, 'Strogonoff de Frango', 12.5, 4);
insert into produto values (12, 'Strogonoff de Palmito', 11.5, 4);
insert into produto values (13, 'Pipoca Doce', 1.5, 5);
insert into produto values (14, 'Pipoca de Microndas - Sabor Bacon', 11.5, 5);

insert into item values (5, 1, 1);
insert into item values (5, 2, 2);

-- select (i.Quantidade*p.valor) from item i join produto p on i.produto_id=p.id where i.id=1;
insert into pedido values (100, 1, 1234567866, null,1);

select * from pedido;
select * from item;
select * from produto;
select * from FUNCIONARIO;
