using Amazon.DynamoDBv2.DataModel;

namespace Web_Student_Courses_Platform.Models
{
    [DynamoDBTable("Courses")]
    public class Course
    {
        [DynamoDBHashKey("courseCode")]
        public string? CourseCode { get; set; }
        [DynamoDBProperty("courseName")]
        public string? CourseName { get; set; }
        [DynamoDBProperty("section")]
        public string? Section { get; set; }
        [DynamoDBProperty("semester")]
        public int? Semester { get; set; }

        public Course(string courseCode, string courseName, string section, int semester)
        {
            CourseCode = courseCode;
            CourseName = courseName;
            Section = section;
            Semester = semester;
        }

        public Course()
        {

        }
    }
}
