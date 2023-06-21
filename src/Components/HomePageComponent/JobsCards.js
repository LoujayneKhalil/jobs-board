import React from "react";
import "../HomePageComponent/JobsCards.css";
import { useContext } from "react";
import ThemeContext from "../../ThemeContext";
import LogoError from "../../LogoError.png";
import { Link } from "react-router-dom";

export default function JobsCards({ data}) {
  const { theme } = useContext(ThemeContext);

  // Dummy data if the api is not working
  // const dummyData = [
  //   {
  //     job_id:1,
  //     title: "Software Engineer III",
  //     company_name: "Discord",
  //     location:'UK',
  //     detected_extensions: {
  //       posted_at: "5 days ago",
  //       schedule_type: "Contractor",
  //     },
  //   },
  //   {
  //     job_id:2,
  //     title: "Senior Software Engineer",
  //     company_name: "Amazon",
  //     location:'US',
  //     detected_extensions: {
  //       posted_at: "5 days ago",
  //       schedule_type: "Full Time",
  //     },
  //   },
  //   {
  //     job_id:3,
  //     title: "Junior Software Engineer ",
  //     company_name: "Google",
  //     location:'UK',
  //     detected_extensions: {
  //       posted_at: "3 days ago",
  //       schedule_type: "Full Time",
  //     },
  //   },
  //   {
  //     job_id:4,
  //     title: "Software Engineer",
  //     company_name: "ItWorx",
  //     location:'Egypt',
  //     detected_extensions: {
  //       posted_at: "10 days ago",
  //       schedule_type: "Part Time",
  //     },
  //   },
  // ];

  return (
    <div className="container-fluid p-0">
      <div className="row">
        {Array.isArray(data.data)
          ? data.data.map((item) => (
              <div
                key={item.job_id}
                className="col-lg-4 col-md-6"
                style={{ marginBottom: "60px" }}
              >
                <div
                  className={`card job-card h-100 border-0 ${
                    theme === "light" ? "light-card" : "dark-card"
                  }`}
                  style={{ padding: "0 32px" }}
                >
                  <div className="logo-container">
                    <img
                      src={item.thumbnail ? item.thumbnail : LogoError}
                      alt="Company Logo"
                      className="logo"
                    />
                  </div>

                  <div className="card-content d-flex flex-column justify-content-between h-100">
                    <ul className="d-flex p-0 mt-4">
                      <li style={{ listStyle: "none" }}>
                        {item.detected_extensions.posted_at}
                      </li>
                      <li>{item.detected_extensions.schedule_type}</li>
                    </ul>
                    <Link
                      key={item.job_id}
                      to={{ pathname: `/card/${item.job_id}` }}
                      style={{ textDecoration: "none" }}
                    >
                      <h4>{item.title}</h4>
                    </Link>
                    <h6>{item.company_name}</h6>
                    <h5>{item.location}</h5>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
