import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
//
// this component is used to show a single user
function ShowCourse(props) {
  let navigate = useNavigate();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id);
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "https://localhost:7049/api/CourseAPI/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from courses:',result.data);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = (id) => {
   navigate('/editcourse/'+ id);
  };

  const deleteCourse = (id) => {
    setShowLoading(true);
    const course = { courseCode: data.courseCode, courseName: data.courseName, 
        section: data.section,semester: data.semester };
    axios.delete(apiUrl, course)
      .then((result) => {
        setShowLoading(false);
        navigate('/listall')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> 
      }    
        <h2>Course information: {data.courseCode}, {data.courseName}</h2>
        <p>Section: {data.section}</p>
        <p>Semester: {data.semester}</p>
        <p>
          <Button type="button" variant="primary" onClick={() => { editCourse(data.courseCode) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id) }}>Delete</Button>
        </p>
    </div>
  );
}
//
export default ShowCourse;
