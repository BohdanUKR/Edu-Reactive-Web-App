import React from "react";
import { ReactDOM,useState } from "react";


function HomePage()
{
    return(
        <div>
            <h2 className="display-4">Welcome to Our Course-Student Registration Platform! </h2>
            <p className="lead">
            • Discover the future of seamless education management with our advanced Course/Student Registration platform. Designed to simplify administrative tasks and enhance the student experience, our platform provides a comprehensive solution for educational institutions of all sizes. Whether you're a school, college, or training center, our platform empowers you to efficiently manage courses, student registrations, and academic records in one centralized hub.
            </p>
            <small className="text-muted"><h6 className="display-4">Key features:</h6></small>
            <p className="lead">
            • Effortless Course Management: Easily create, edit, and organize courses of varying disciplines and levels. Streamline curriculum planning, scheduling, and resource allocation with intuitive tools designed to optimize your educational offerings.
            </p>
            <p className="lead">
            • Personalized Student Profiles: Every student gets a dedicated profile to track their academic journey. From enrolled courses to completed assignments, our platform helps students stay organized and engaged. With full access and management their profile.
            </p>
        </div>
        )
}

export default HomePage;