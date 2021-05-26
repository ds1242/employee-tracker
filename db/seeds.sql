-- insert data into department
INSERT INTO department (name)
VALUES 
    ('Human Resources'),
    ('Accounting'),
    ('Marketing'),
    ('Information Technology');


-- insert into role
INSERT INTO role(title, salary, department_id)
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
    ('IT Manager', 80000.00, 4);

-- insert employees
-- INSERT INTO employee(first_name, last_name, role_id, manager_id)
-- VALUES
--     ('Jane', 'Doe', )



