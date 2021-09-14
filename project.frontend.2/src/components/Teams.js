import React, { useEffect, useState } from "react";

import { Table } from 'semantic-ui-react'
import Employees from "./Employees";


export default function Teams(props) {
    const [error, setError] = useState(null);

    const [items, setItems] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [teamId, setTeamId] = useState(null);



    const [showTeams, setShowTeams] = useState(false);


    useEffect(() => {
        setItems(props.teams)

        if (!props.teams.length == 0) {
            setShowTeams(true)
        }
        if (!employees.length == 0){
            setShowTeams(false)
        }
    }, [props.teams,props.teams.length,employees.length])

    const fetchEmployees = (id) => {
        return fetch(`http://localhost:3000/api/teams/${id}`)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setEmployees(result.data);
                        },
                        (error) => {
                            setError(error);
                        })
      }
  



    const trigger = (id) => {
        setShowTeams(!showTeams)
        fetchEmployees(id)
        setTeamId(id)
    
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else {
        return (
            <div> {showTeams &&
                <Table className="ui striped table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Employees</th>
                        </tr>
                    </thead>
                    <tbody>{
                        items.map(item => (
                            <tr key={item.TeamId} className="center aligned">
                                <td>{item.Name}</td>
                                <td>{item.Type}</td>
                                <td >
                                    <button onClick={() => trigger(item.TeamId)}>
                                        <i className="eye icon"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>}

                <div>
                    {<Employees employees={employees} teamId = {teamId}/>}
                </div>


            </div>




        );
    }
}