import React, { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import { Table, Button } from 'semantic-ui-react'



function Employees(props) {


    const [items, setItems] = useState([]);
    const [teamId, setTeamId] = useState(null);


    const [showEmployees, setShowEmployees] = useState(false);
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        setTeamId(props.teamId)
        if (items.length == 0) {
            setItems(props.employees)
        }
        if (!props.employees.length == 0) {
            setShowEmployees(true)
        }
    },[props.teamId,items.length,props.employees,props.employees.length])


    //API Post Calls to DB, tables employees and teams_employees

    const postEmployee = (employee) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        };
        fetch(process.env.REACT_APP_API_POST_EMPLOYEE, requestOptions)
            .then(response => response.json())
            .then(response => postEmployeeToTeam(response.data.insertId))
    }

    const postEmployeeToTeam = (employeeId) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ TeamId: teamId, EmployeeId: employeeId })
        };
        fetch(process.env.REACT_APP_API_POST_PIVOT, requestOptions)
            .then(response => response.json())
    }

    ///

    const trigger = () => {
        setShowForm(!showForm)
    }

    const addEmployee = (employee) => {
        if (!employee.Name || !employee.Surname || !employee.DNI || !employee.Salary) {
            return;
        }

        //send to API (above)
        postEmployee(employee)

        //Update front-end with new employee
        const newEmployeesArray = [employee, ...items];
        setItems(newEmployeesArray);
    };



    return (
        <div>
            {showEmployees &&

                <div>
                    <Table className="ui striped table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>DNI</th>
                                <th>Salary (€/year)</th>
                            </tr>
                        </thead>
                        <tbody>{
                            items.map(item => (
                                <tr key={item.EmployeeId} className="center aligned">
                                    <td>{item.Name}</td>
                                    <td>{item.Surname}</td>
                                    <td>{item.DNI}</td>
                                    <td>{item.Salary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div >
                        <Button className="ui button" tabIndex="0" onClick={trigger}>
                            Add Employee
                        </Button>
                    </div>

                </div>
            }

            <div>
                {showForm && <EmployeeForm onSubmit={addEmployee} />
                }
            </div>

        </div>

    )
}

export default Employees