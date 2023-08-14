using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web_Student_Courses_Platform.Models;

namespace Web_Student_Courses_Platform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseAPIController : ControllerBase
    {
        private readonly IDynamoDBContext _dynamoDBContext;

        public CourseAPIController(IDynamoDBContext dynamoDBContext)
        {
            _dynamoDBContext = dynamoDBContext;
        }

        [HttpPost]
        public async Task<IActionResult> createCourse(Course course)
        {
            var getcourse = await _dynamoDBContext.LoadAsync<Course>(course.CourseCode);
            if (getcourse != null)
            {
                return BadRequest($"Course with such code: {course.CourseCode} already exists!");
            }
            await _dynamoDBContext.SaveAsync(course);
            return Ok("Course Added! " + 200);
        }

        [HttpGet("courses")]
        public async Task<IActionResult> allCourses()
        {
            var courses = await _dynamoDBContext.ScanAsync<Course>(default).GetRemainingAsync();
            return Ok(courses);
        }

        /*[Route("api/[controller]/{courseCode}")]
        public async Task<IActionResult> getCourse(string courseCode)
        {
            var course = await _dynamoDBContext.LoadAsync<Course>(courseCode);
            if (course == null) return NotFound();
            return Ok(course);
        }*/

        [HttpGet("{courseCode}")]
        public async Task<IActionResult> getCourse(string courseCode)
        {
            var course = await _dynamoDBContext.LoadAsync<Course>(courseCode);
            if (course == null) return NotFound();
            return Ok(course);
        }

        [HttpPut("{courseCode}")]
        public async Task<IActionResult> updateCourse(string courseCode, Course course)
        {
            var getCourse = await _dynamoDBContext.LoadAsync<Course>(courseCode);
            if (getCourse != null)
            {
                getCourse.CourseCode = course.CourseCode;
                getCourse.CourseName = course.CourseName;
                getCourse.Section = course.Section;
                getCourse.Semester = course.Semester;
                await _dynamoDBContext.SaveAsync(getCourse);
            }
            return Ok("Course Updated! " + 200);
        }

        [HttpDelete("{courseCode}")]
        public async Task<IActionResult> deleteCourse(string courseCode)
        {
            var getCourse = await _dynamoDBContext.LoadAsync<Course>(courseCode);
            if (getCourse == null) return NotFound();
            await _dynamoDBContext.DeleteAsync(getCourse);
            return Ok("Course Deleted! " + 200);
        }
    }
}
