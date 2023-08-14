import React from "react";
import { ReactDOM,useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddCourse()
{
  let navigate = useNavigate();
  const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', 
  section: '',semester: ''});
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "https://localhost:7049/api/CourseAPI";

  const saveCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { courseCode: course.courseCode, courseName: course.courseName, 
      section: course.section,semester: course.semester};
      //use promises
      axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/listall')
      }).catch((error) => setShowLoading(false));
  };
  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setCourse({...course, [e.target.name]: e.target.value});
  }

    return(
        <div>
            <h1>Add Course Page</h1>
            <Form onSubmit={saveCourse} method="POST">
                <Form.Group size="lg">
                    <Form.Label>Course Number:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Course code here" value={course.courseCode} onChange={onChange} required></Form.Control>
                    <br></br>
                    <Form.Label>Course Name:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="courseName" id="password" placeholder="Course name here" value={course.courseName} onChange={onChange} required></Form.Control>
                    <br></br>
                    <Form.Label>Section:</Form.Label>
                    <br></br>
                    <Form.Control type="text" name="section" id="section" placeholder="Course section here" value={course.section} onChange={onChange} required></Form.Control>
                    <br></br>
                    <Form.Label>Semester:</Form.Label>
                    <br></br>
                    <Form.Control type="number" name="semester" id="semester" placeholder="Your semester here" value={course.semester} onChange={onChange} required></Form.Control>
                    <br></br>
                    <br></br>
                    <Button variant="dark" type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </div>
        )
}

export default AddCourse;