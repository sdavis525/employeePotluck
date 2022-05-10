SELECT department.id, role.department_id
FROM department
INNER JOIN role ON department.id=role.department_id

SELECT role.id, employee.role_id
FROM role
INNER JOIN employee ON role.id=employee.role_id


SELECT employee.id, employee.manager_id
FROM employee
INNER JOIN employee ON employee.id=employee.manager_id