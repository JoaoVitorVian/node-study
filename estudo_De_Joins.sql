-- Criação das tabelas
CREATE TABLE clientes (
    cliente_id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    data_cadastro DATE DEFAULT CURRENT_DATE
);

CREATE TABLE pedidos (
    pedido_id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    data_pedido DATE DEFAULT CURRENT_DATE,
    valor_total NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);

-- Inserção de dados de exemplo
INSERT INTO clientes (nome, email) VALUES
('João Silva', 'joao@email.com'),
('Maria Souza', 'maria@email.com'),
('Carlos Oliveira', 'carlos@email.com');

INSERT INTO pedidos (cliente_id, data_pedido, valor_total) VALUES
(1, '2024-01-15', 150.50),
(1, '2024-02-20', 230.00),
(2, '2024-03-10', 89.99),
(3, '2024-03-25', 450.75),
(3, '2024-04-01', 120.00);

INSERT INTO pedidos (cliente_id, data_pedido, valor_total)
VALUES (999, CURRENT_DATE, 100.00);  -- ID 999 não existe na tabela clientes

--innerJoin básico
SELECT c.nome, p.data_pedido, p.valor_total
FROM clientes c
INNER JOIN pedidos p ON c.cliente_id = p.cliente_id;


-- LEFT JOIN com agregação:
SELECT c.nome, COUNT(p.pedido_id) AS total_pedidos
FROM clientes c
LEFT JOIN pedidos p ON c.cliente_id = p.cliente_id
GROUP BY c.nome;

-- JOIN com subquery

SELECT c.nome, p.ultimo_pedido
FROM clientes c
INNER JOIN (
    SELECT cliente_id, MAX(data_pedido) AS ultimo_pedido
    FROM pedidos
    GROUP BY cliente_id
) p ON c.cliente_id = p.cliente_id;

--Otimização com EXPLAIN ANALYZE:
EXPLAIN ANALYZE
SELECT c.nome, SUM(p.valor_total) AS total_gasto
FROM clientes c
INNER JOIN pedidos p ON c.cliente_id = p.cliente_id
GROUP BY c.nome
HAVING SUM(p.valor_total) > 300;


--exemplo de uma procedure simples de criação:
CREATE OR REPLACE PROCEDURE registrar_pedido(
    cliente_id INT,
    data_pedido DATE,
    valor_total NUMERIC(10,2)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO pedidos (cliente_id, data_pedido, valor_total)
    VALUES (cliente_id, data_pedido, valor_total);
    
    RAISE NOTICE 'Pedido registrado com sucesso!';
EXCEPTION
    WHEN others THEN
        RAISE EXCEPTION 'Erro ao registrar pedido: %', SQLERRM;
END;
$$;

--exemplo de como chamar uma procedure:
CALL registrar_pedido(1, CURRENT_DATE, 99.99);


SELECT *
FROM clientes
LEFT JOIN pedidos
ON clientes.cliente_id = pedidos.cliente_id;

--criacao de procedure para retornar users
 CREATE OR REPLACE FUNCTION public.get_all_users()
            RETURNS TABLE (
                id INTEGER,
                name VARCHAR,
                email VARCHAR
            ) 
            LANGUAGE plpgsql
            AS $$
            BEGIN
                RETURN QUERY
                SELECT 
                    u.id,
                    u.name,
                    u.email
                FROM public.user u;
            END;
            $$;

