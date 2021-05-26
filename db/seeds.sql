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
    ('Jane', 'Doe', 1, 5),
    ('Mary', 'Jane', 1, 5),
    ('Trainer', 'One', 2, 5),
    ('Trainer', 'Two', 2, 5),
    ('Manager', 'HR', 3, 19),
    ('Accountant', 'One', 4, 10),
    ('Accountant', 'Two', 5, 10),
    ('AP Specialist', 'One', 6, 10),
    ('AP Specialist', 'Two', 7, 10),
    ('Manager', 'Accounting', 8, 19),
    ('Marketer', 'One', 9, 13),
    ('Marketer', 'Two', 10, 13),
    ('Manager', 'Marketing', 11, 19),
    ('Developer', 'One', 12, 17),
    ('Developer', 'Two', 13, 17),
    ('Manager', 'IT', 14, 19),
    ('CEO', 'Of All', 15, 19);


