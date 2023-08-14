import React from "react";
import { ReactDOM,useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function SignUp()
{
  let navigate = useNavigate();
  const [student, setUser] = useState({ _id: '', studNumber: '', password: '', 
  firstName: '',lastName: '',address: '', city: '', phone: '', program: ''});
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "https://localhost:7049/api/StudentAPI/add";

  const saveStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { studNumber: student.studNumber, password: student.password, 
        firstName: student.firstName,lastName: student.lastName, address: student.address,city: student.city,phone: student.phone, program: student.program};
      //use promises
      axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/home')
      }).catch((error) => setShowLoading(false));
  };
  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setUser({...student, [e.target.name]: e.target.value});
  }

    return(
        <div>
            <h1>Sign Up to create account</h1>
            <Form onSubmit={saveStudent} method="POST">
                <Form.Group size="lg">
                    <Form.Label>Student Number:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="studNumber" id="studNumber" placeholder="Type your id" value={student.studNumber} onChange={onChange} required></Form.Control>
                    <br></br>
                    <Form.Label>Password:</Form.Label>
                    <br></br>
                    <Form.Control type="password" name="password" id="password" placeholder="Type your password" value={student.password} onChange={onChange} required></Form.Control>
                    <br></br>
                    <Form.Label>First Name:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="firstName" id="firstName" placeholder="First Name" value={student.firstName} onChange={onChange} required></Form.Control>
                    <br></br>
                    <Form.Label>Last Name:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="lastName" id="lastName" placeholder="Last Name" value={student.lastName} onChange={onChange} required></Form.Control>
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
                    <Button variant="dark" type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </div>
        )
}

export default SignUp;