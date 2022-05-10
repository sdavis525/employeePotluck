INSERT INTO department (id, name)
VALUES 
(1,"sales"),
(2, "Engineering"),
(3, "Finance"),
(4, "legal");

INSERT INTO role (id, title, salary, department_id)
VALUES 
(2,"Salesperson", 60000, 1),
(4,"Lead Engineer", 250000,2),
(3, "Software Engineer",120000,2),
(5,"Account Manager", 150000, 3),
(7, "Accountant",100000,3),
(8, "Legal Team Lead", 275000,4),
(9, "Lawyer", 180000,4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
 VALUES
(444, "Sara", "Laims", 2, null),
(555, "Lauren", "Williams", 4, null),
(777, "Dj", "Greatness", 3, 7),
(888, "Mav", "Jordan", 5, null),
(999, "jess", "Royce",7, 9),
(222, "Soraya", "Hadid",8, null),
(333, "Ryan" , "Leche", 9, 4);



