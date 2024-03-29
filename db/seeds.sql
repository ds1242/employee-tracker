-- insert data into department
INSERT INTO department (name)
VALUES 
    ('Human Resources'),
    ('Accounting'),
    ('Marketing'),
    ('Information Technology');


-- insert into role
INSERT INTO roles (title, salary, department_id)
VALUES
    ('Recruiter', 45000.00, 1),
    ('Training', 50000.00, 1),
    ('HR Manager', 65000.00, 1),
    ('Accountant 1', 50000.00, 2),
    ('Accountant 2', 60000.00, 2),
    ('AP Specialist 1', 45000.00, 2),
    ('AP Specialist 2', 50000.00, 2),
    ('Accounting Manager', 75000.00, 2),
    ('Marketing 1', 45000.00, 3), 
    ('Marketing 2', 50000.00, 3),
    ('Marketing Manager', 65000.00, 3),
    ('Developer 1', 50000.00, 4),
    ('Developer 2', 70000.00, 4), 
    ('IT Manager', 80000.00, 4),
    ('CEO', 100000.00, 1);

-- insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Dan', 'CEO', 15, NULL),
    ('Thomas', 'Anderson', 3, 1),
    ('Sterling', 'Archer', 14, 1),
    ('Cheryl', 'Tunt', 11, 1),
    ('Pam', 'Poovey', 8, 1),  
    ('Jane', 'Doe', 1, 2),
    ('Mary', 'Jane', 1, 2),
    ('Lana', 'Kane', 2, 2),
    ('Cryil', 'Figgis', 2, 2), 
    ('Malory', 'Archer', 4, 5),
    ('Ray', 'Gillette', 5, 5),
    ('Dr.', 'Krieger', 6, 5),
    ('Woodhouse', 'Housecleaner', 7, 5),    
    ('Rip', 'Ripley', 9, 4),
    ('Barry', 'Dillon', 10, 4),    
    ('Kenny', 'Loggins', 12, 3),
    ('Ron', 'Cadillace', 13, 3);
    


