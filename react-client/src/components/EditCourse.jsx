import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
//
// this component is used to edit a user
function EditCourse(props) {
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  let navigate = useNavigate();
  const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', 
  section: '',semester: ''});  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "https://localhost:7049/api/CourseAPI/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { courseCode: course.courseCode, courseName: course.courseName, 
        section: course.section, semester: course.semester };
    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/showcourse/' + data.courseCode)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setCourse({...course, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={updateCourse}>
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
          <Button variant="info" type="submit">
            Update
          </Button>
        </Form>
    </div>
  );
}
//
export default EditCourse;