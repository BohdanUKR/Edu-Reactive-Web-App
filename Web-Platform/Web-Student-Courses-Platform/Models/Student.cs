using Amazon.DynamoDBv2.DataModel;

namespace Web_Student_Courses_Platform.Models
{
    [DynamoDBTable("Students")]
    public class Student
    {
        [DynamoDBHashKey("studNumber")]
        public string? StudNumber { get; set; }
        [DynamoDBProperty("password")]
        public string? Password { get; set; }
        [DynamoDBProperty("firstName")]
        public string? Firstname { get; set; }
        [DynamoDBProperty("lastName")]
        public string? Lastname { get; set; }
        [DynamoDBProperty("address")]
        public string? Address { get; set; }
        [DynamoDBProperty("city")]
        public string? City { get; set; }
        [DynamoDBProperty("phone")]
        public long? Phone { get; set; }
        [DynamoDBProperty("program")]
        public string? Program { get; set; }

        public Student(string studNumber, string password, string firstName, string lastName, string address, string city, int phone, string program)
        {
            StudNumber = studNumber;
            Password = password;
            Firstname = firstName;
            Lastname = lastName;
            Address = address;
            City = city;
            Phone = phone;
            Program = program;
        }

        public Student()
        {

        }
    }
}
