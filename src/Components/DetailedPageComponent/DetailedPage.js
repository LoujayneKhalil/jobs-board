import React, { useContext } from "react";
import LogoError from "../../LogoError.png";
import "./DetailedPage.css";
import ThemeContext from "../../ThemeContext";
import { useParams } from "react-router-dom";

export default function DetailedPage({ jobs }) {
  const { theme } = useContext(ThemeContext);
  const { job_id } = useParams();
  const selectedCard = jobs.find((card) => card.job_id === job_id);

  return (
    <div>
      <div className="detailed-page-wrapper">
        <div className="container company-name p-0">
          <div
            className={`top-wrapper ${
              theme === "dark" ? "dark-page-mode" : "light-page-mode"
            }`}
          >
            <div className="logo-wrapper">
              <img
                className="col-auto company-logo"
                src={
                  selectedCard.thumbnail ? selectedCard.thumbnail : LogoError
                }
                alt="companyLogo"
              />
            </div>
            <div className="company-desc-title">
              <div className="d-flex flex-column">
                <h5>{selectedCard.company_name}</h5>
                <h6>{selectedCard.company_name}.com</h6>
              </div>
              <a
                className="company-url-btn"
                href={`${selectedCard.related_links[0].link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Company Site
              </a>
            </div>
          </div>
        </div>
        <div
          className={`description-wrapper m-fixed ${
            theme === "dark" ? "dark-page-mode" : "light-page-mode"
          }`}
        >
          <div className="container discription-header">
            <div className="row align-items-center">
              <div className="col-md-8 d-flex flex-column p-0">
                <ul className="d-flex mt-4 gap-4 p-0">
                  <li style={{ listStyle: "none" }}>
                    {selectedCard.detected_extensions.posted_at}
                  </li>
                  <li>{selectedCard.detected_extensions.schedule_type}</li>
                </ul>
                <h4>{selectedCard.title}</h4>
                <h5>{selectedCard.location}</h5>
              </div>
              <div className="col-md-4 d-flex justify-content-end">
                <a href="#apply" className="apply-btn" style={{textDecoration:'none'}}>Apply Now</a>
              </div>
            </div>
          </div>
          <div
            className={`detail-desc ${
              theme === "dark" ? "dark-page-mode" : "light-page-mode"
            }`}
            style={{ marginTop: "40px" }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `<p>${selectedCard.description}</p>`,
              }}
            ></div>
            <h5>Requirements</h5>
            <ul>
              <li>Morbi interdum mollis sapien. Sed</li>
              <li>Morbi interdum mollis sapien. Sed</li>
              <li>Morbi interdum mollis sapien. Sed</li>
              <li>Morbi interdum mollis sapien. Sed</li>
              <li>Morbi interdum mollis sapien. Sed</li>
              <li>Morbi interdum mollis sapien. Sed</li>
            </ul>
            <h5>What You Will Do</h5>
            <ol>
              <li>Morbi interdum mollis sapien. Sed</li>
              <li>Morbi interdum mollis sapien. Sed</li>
              <li>Morbi interdum mollis sapien. Sed</li>
              <li>Morbi interdum mollis sapien. Sed</li>
              <li>Morbi interdum mollis sapien. Sed</li>
              <li>Morbi interdum mollis sapien. Sed</li>
            </ol>
          </div>
        </div>
        <div
          className={`detail-footer d-flex justify-content-between ${
            theme === "dark" ? "dark-page-mode" : "light-page-mode"
          }`}
        >
          <div className="company-footer">
            <h5>{selectedCard.title}</h5>
            <h6
              style={{ fontWeight: "400", fontSize: "16px", color: "#6E8098" }}
            >
              {selectedCard.company_name}
            </h6>
          </div>
          <div className="col-md-4 col-12 d-flex justify-content-end">
            <a href="#apply " className="apply-btn" style={{textDecoration:'none'}}>Apply Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}
