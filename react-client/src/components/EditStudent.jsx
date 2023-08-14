import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
//
// this component is used to edit a user
function EditStudent(props) {
  // Get the userId param from the URL.
  let { id } = useParams();
  //const [data, setData] = useState({});
  console.log(id)
  let navigate = useNavigate();
  const [data, setData] = useState({});
  const [student, setStudent] = useState({ _id: '', studNumber: '', password: '', 
  firstname: '',lastname: '',address: '', city: '', phone: '', program: ''});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "https://localhost:7049/api/StudentAPI/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setStudent(result.data);
      setData(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { studNumber: student.studNumber, password: student.password, 
      firstname: student.firstname,lastname: student.lastname, address: student.address,city: student.city,phone: student.phone, program: student.program};
    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/users')
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  const deleteStudent = (id) => {
    setShowLoading(true);
    const data = { studNumber: student.studNumber, password: student.password, 
      firstname: student.firstname,lastname: student.lastname, address: student.address,city: student.city,phone: student.phone, program: student.program};
    axios.delete(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/users')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={updateStudent} method="POST">
                <Form.Group size="lg">
                    <Form.Label>Student Number:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="studNumber" id="studNumber" placeholder="Type your id" value={student.studNumber} onChange={onChange} readOnly></Form.Control>
                    <br></br>
                    <Form.Label>Password:</Form.Label>
                    <br></br>
                    <Form.Control type="password" name="password" id="password" placeholder="Type your password" value={student.password} onChange={onChange} required></Form.Control>
                    <br></br>
                    <Form.Label>First Name:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="firstname" id="firstname" placeholder="First Name" value={student.firstname} onChange={onChange} required></Form.Control>
                    <br></br>
                    <Form.Label>Last Name:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="lastname" id="lastname" placeholder="Last Name" value={student.lastname} onChange={onChange} required></Form.Control>
                    <br></br>
                    <Form.Label>Address:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="address" id="address" placeholder="Address" value={student.address} onChange={onChange} required></Form.Control>
                    <br></br>
                    <Form.Label>City:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="city" id="city" placeholder="City" value={student.city} onChange={onChange} required></Form.Control>
                    <br></br>
                    <Form.Label>Cell Number:</Form.Label>
                    <br></br>
                    <Form.Control type="number" name="phone" id="phone" placeholder="Number" value={student.phone} onChange={onChange} required></Form.Control>
                    <br></br>
                    <Form.Label>Program:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="program" id="program" placeholder="Program" value={student.program} onChange={onChange} required></Form.Control>
                    <br></br>
                    <br></br>            
                    <Button variant="dark" type="submit">Update</Button>
                    <Button variant='danger' onClick={() => { deleteStudent(data._id) }}>Delete</Button>
                </Form.Group>
            </Form>
    </div>
  );
}
//
export default EditStudent;