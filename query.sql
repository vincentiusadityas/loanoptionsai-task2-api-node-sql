SELECT b.name as 'Broker Name', c.total_customer as 'Total Customer'
FROM `broker` b
LEFT JOIN (
    SELECT broker_id, count(name) as total_customer
    FROM `customer`
    GROUP BY broker_id
) c ON b.id = c.broker_id
ORDER BY c.total_customer DESC, b.name ASC;