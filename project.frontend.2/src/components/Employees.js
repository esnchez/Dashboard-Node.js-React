import React, { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import { Table, Button } from 'semantic-ui-react'



function Employees(props) {

    const [error, setError] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);


    //const teamId = this.props.teamId

    useEffect(() => {
        fetch("http://localhost:3000/api/teams/" + 1)
            .then(res => res.json())
            .then(
                (result) => {
                    //   setIsLoaded(true);
                    setEmployees(result.data);
                },
                // Nota: es importante manejar errores aquí y no en 
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    //   setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const pulsar = () => {
        setShowForm(!showForm)
    }



    return (
        <div>
            <Table class="ui striped table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>DNI</th>
                        <th>Salary (€/year)</th>
                    </tr>
                </thead>
                <tbody> {
                    employees.map(item => (
                        <tr key={item.EmployeeId} class="center aligned">
                            <td>{item.Name}</td>
                            <td>{item.Surname}</td>
                            <td>{item.DNI}</td>
                            <td>{item.Salary}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div >
                <Button class="ui button" tabindex="0" onClick={pulsar}> 
                Add Employee
                </Button>
            </div>



            <div>
                {showForm && <EmployeeForm />
                }
            </div>
        </div>


    )
}

export default Employees