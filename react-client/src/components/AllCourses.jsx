import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
//
// this component displays a list of users
function AllCourses(props) {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "https://localhost:7049/api/CourseAPI/courses";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:',result.data)
          //check if the user has logged in
          //if(result.data.screen !== 'auth')
          //{
            console.log('data in if:', result.data )
            setData(result.data);
            setShowLoading(false);
          //}
        }).catch((error) => {
          console.log('error in fetchData:', error)
          setListError(true)
        });
      };  
    fetchData();
  }, []);

  const showDetail = (id) => {
    navigate('/showcourse/' + id);
  }


  return (
    <div>
      <div>
        <h2>List of Courses</h2>
        <br />
        <ListGroup>
          {data.map((item, idx) => (
            <ListGroup.Item key={idx} action onClick={() => { showDetail(item.courseCode) }}>{"Course code: "+item.courseCode+" ,"} {"Course Name: "+item.courseName+" ,"} {"Section: "+item.section+" ,"} {"Semester:"+item.semester}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
//
export default AllCourses;