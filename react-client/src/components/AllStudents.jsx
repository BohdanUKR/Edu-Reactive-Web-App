import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useParams } from 'react-router-dom';
import LoginPage from './LoginPage';
import Table from 'react-bootstrap/Table';
//import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
//
// this component displays a list of users
function AllStudents(props) {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "https://localhost:7049/api/StudentAPI/students";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:',result.data)
          //check if the user has logged in
          if(result.data.screen !== 'auth')
          {
            console.log('data in if:', result.data )
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
          setListError(true)
        });
      };  
    fetchData();
  }, []);

  const showDetail = (id) => {
    navigate('/editstudent/' + id);
  }

  return (
    <div>
      { data.length !== 0
        ?
        <div>
        <h3>List of Students</h3>
        <br></br>
        <Table striped="columns">
            <tbody>
            <tr>
                <th>Student number</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>City</th>
                <th>Phone number</th>
                <th>Program</th>
            </tr>
            {data.map((item, idx) => (
                <tr key={idx}>
                    <td>{item.studNumber}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.address}</td>
                    <td>{item.city}</td>
                    <td>{item.phone}</td>
                    <td>{item.program}</td>
                    <div className="center">
                      <Button variant='primary' onClick={() => { showDetail(item.studNumber) }}>Edit</Button>
                   </div>
                </tr>
            ))}
         </tbody>
        </Table>
        
        
    </div>
        : < LoginPage />
      }
    </div>

  );
}
//
export default AllStudents;