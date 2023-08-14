import React, { ReactDOM,useState,useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AllCourses from "./AllCourses";
import AddCourse from "./AddCourse";
import UpdateCourse from "./UpdateCourse";
import DropCourse from "./DropCourse";
import App from "../App";
//import { Navigate, useNavigate } from "react-router-dom";

function LoginPage()
{
  //const navigate = useNavigate();
  const [screen, setScreen] = useState('auth');
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(true);
  const [data, setData] = useState([]);
  const [student, setStudent] = useState({studNumber: '', password: ''});
  const apiUrl = "https://localhost:7049/api/StudentAPI/";
  //console.log(screen);

  //function handleCklick()
  //{
  //  navigate("/add");
  //}

  const authenticateStudent = async (event) => {
    //event.preventDefault();
    console.log('calling auth');
    console.log(studNumber);
    console.log(password);
    setScreen('');
    try 
    {
      const requestData = { student: { studNumber: student.studNumber, password: student.password } };
      await axios.get(apiUrl, requestData);
      console.log('results from courses:',requestData.data);
      setData(requestData.data);
      // Process the response
      console.log(requestData.data);
    } 
    catch (error) 
    {
      console.error("Axios Error:", error);
      if (error.response) {
        console.error("Response Data:", error.response);
      }
    }
  };

  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }
    // called when user clicks on Verify Cookie button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try 
    {
      //const res = await axios.get('http://localhost:5000/welcome',{ headers: {Authorization: `Bearer ${accessToken}` }});
      const res = await axios.get('http://localhost:5000/welcome');
      console.log(res.studNumber);
      //console.log(res.token);
      //setData(res.data);
    } 
    catch (e) 
    {
      console.log(e);
    }
  }
  //

  const deleteCookie = async () => {
    try 
    {
      await axios.get('http://localhost:5000/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  
   //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      //
      const res = await axios.get('http://localhost:5000/read_cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        //console.log(res.data.screen)
      }
    } 
    catch (e) 
    {
      //setScreen('auth');
      //navigate('/home');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
    verifyCookie();
  }, []); //only the first render


  //useEffect(() => {
    // Check if the user is logged in (after the page loads)
    // If they're not, redirect them to the homepage
    //if (screen == null) navigate('/home');
  //})

  return(
    <div>
      {screen === "auth"
      ?
      <div>
      <h1>Login Page</h1>
            <Form>
                <Form.Group size="lg">
                    <Form.Label>Student Number:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="studNumber" id="studNumber" placeholder="Type your id" value={student.studNumber} onChange={onChange} required></Form.Control>
                    <br></br>
                    <br></br>
                    <Form.Label>Password:</Form.Label>
                    <br></br>
                    <Form.Control type="password" name="password" id="password" placeholder="Type your password" value={student.password} onChange={onChange} required></Form.Control>
                    <br></br>
                    <br></br>
                    <Button variant="dark" type="Button" onClick={authenticateStudent}>Submit</Button>
                </Form.Group>
            </Form>
      </div>
      :
      <div>
        <h1>User Authenticated: {student.studNumber}</h1>
        <Button onClick={verifyCookie}>Verify</Button>
      </div>
      }

    </div>
  )
}

export default LoginPage;
