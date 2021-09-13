import React, { useEffect, useState } from "react";
import Companies from "./Companies";
import { Table } from 'semantic-ui-react'

import Teams from "./Teams"


export default function CompaniesList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [items, setItems] = useState([]);
  const [teams, setTeams] = useState([]);


  const [hideCompanies, setHideCompanies] = useState(true);

  const [companyId, setCompanyId] = useState(null);




  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:3000/api/companies")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])


  const pulsar = (id) => {
    setCompanyId(id)
    setHideCompanies(!hideCompanies)
    fetchTeams(id)
    
  }

  const fetchTeams = (id) => {
    return fetch(`http://localhost:3000/api/companies/${id}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        // setIsLoaded(true);
                        setTeams(result.data);
                        // setShowTeams(true)
                    },
                    (error) => {
                        //setIsLoaded(true);
                        setError(error);
                    })
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (

      <div>
        {hideCompanies &&

          <Table class="ui striped table">
            <thead>
              <tr >
                <th>Company Name</th>
                <th>Sector</th>
                <th>City </th>
                <th>Teams</th>
              </tr>
            </thead>
            <tbody> {
              items.map(item => (
                <tr key={item.CompanyId} class="center aligned">
                  <td>{item.Name}</td>
                  <td>{item.Sector}</td>
                  <td>{item.City}</td>
                  <td>
                    <button onClick={() => pulsar(item.CompanyId)}>
                      <i class="eye icon"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        }

        {<div>
          {<Teams teams={teams}/>}
        </div>}

      </div>



    )


  }

}
