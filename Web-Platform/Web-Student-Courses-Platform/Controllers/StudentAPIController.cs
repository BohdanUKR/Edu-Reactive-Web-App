using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web_Student_Courses_Platform.Models;

namespace Web_Student_Courses_Platform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAPIController : ControllerBase
    {
        private readonly IDynamoDBContext _dynamoDBContext;

        public StudentAPIController(IDynamoDBContext dynamoDBContext)
        {
            _dynamoDBContext = dynamoDBContext;
        }

        //[HttpPost("{studNumber}/{password}")]
        [HttpGet]
        public async Task<IActionResult> authentication(string studNumber, string password)
        {
            var student = await _dynamoDBContext.LoadAsync<Student>(studNumber, password);
            if (student == null) return NotFound();
            if (studNumber != student.StudNumber || password != student.Password)
            {
                return BadRequest($"Invalid student id or password!");
            }
            return Ok(student);
        }

        [HttpGet("{studNumber}")]
        public async Task<IActionResult> getStudent(string studNumber)
        {
            var student = await _dynamoDBContext.LoadAsync<Student>(studNumber);
            if (student == null) return NotFound();
            return Ok(student);
        }

        [HttpGet("students")]
        public async Task<IActionResult> allStudents()
        {
            var students = await _dynamoDBContext.ScanAsync<Student>(default).GetRemainingAsync();
            return Ok(students);
        }

        [HttpPost("add")]
        public async Task<IActionResult> createStudent(Student student)
        {
            var getStudent = await _dynamoDBContext.LoadAsync<Student>(student.StudNumber, student.Password);
            if (getStudent != null)
            {
                return BadRequest($"Student with such student number {student.StudNumber} already exists");
            }
            await _dynamoDBContext.SaveAsync(student);
            return Ok("Student Added! " + 200);
        }

        [HttpPut("{studNumber}")]
        public async Task<IActionResult> updateStudent(string studNumber, Student student)
        {
            var getStudent = await _dynamoDBContext.LoadAsync<Student>(studNumber);
            if (getStudent != null)
            {
                getStudent.Password = student.Password;
                getStudent.Firstname = student.Firstname;
                getStudent.Lastname = student.Lastname;
                getStudent.Address = student.Address;
                getStudent.City = student.City;
                getStudent.Phone = student.Phone;
                getStudent.Program = student.Program;
                await _dynamoDBContext.SaveAsync(getStudent);
            }
            return Ok("Student Updated! " + 200);
        }

        [HttpDelete("{studNumber}")]
        public async Task<IActionResult> deleteStudent(string studNumber)
        {
            var getStudent = await _dynamoDBContext.LoadAsync<Student>(studNumber);
            if (getStudent == null) return NotFound();
            await _dynamoDBContext.DeleteAsync(getStudent);
            return Ok("Student Deleted! " + 200);
        }
    }
}
