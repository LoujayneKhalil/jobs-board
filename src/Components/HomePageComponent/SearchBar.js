import React, { useContext } from "react";
import "../HomePageComponent/SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThemeContext from "../../ThemeContext";

export default function SearchBar({isChecked, handleOnchange,handleKeyPress,SearchOnclick,filteringFullTime}) {
  const { theme } = useContext(ThemeContext);


  return (
    <div
      className={`d-flex align-items-center ${
        theme === "light" ? "search-light-mode" : "search-dark-mode"
      }`}
    >
      <div className="d-flex align-items-center">
        <SearchIcon sx={{ color: "#5964e0" }} className="search-icon"/>
        <input
          className={`filter-title ${
            theme === "light" ? "search-light-mode" : "search-dark-mode"
          }`}
          type="text"
          placeholder="Filter by title, companies, expertise…"
          onChange={handleOnchange}
          onKeyPress={handleKeyPress}

        />
      </div>
      <div className="d-flex align-items-center filter-location-wrapper">
        <LocationOnIcon
          sx={{ color: "#5964e0", ml: "20px" }}
          className={` ${
            theme === "light" ? "search-light-mode" : "search-dark-mode"
          }`}
        />
        <input
          className={`filter-location ${
            theme === "light" ? "search-light-mode" : "search-dark-mode"
          }`}
          type="text"
          placeholder="Filter by location…"
        />
      </div>
      <div
        className={`full-time-filter d-flex align-items-center justify-content-between  ${
          theme === "light" ? "search-light-mode" : "search-dark-mode"
        }`}
      >
        <div className="checkbox-wrapper-21">
          <label className="control control--checkbox">
            Full Time Only
            <input type="checkbox" checked={isChecked} onChange={filteringFullTime}/>
            <div
              style={{ borderRadius: "3px" }}
              className="control__indicator"
            ></div>
          </label>
        </div>
        <button className="search-btn" onClick={SearchOnclick} style={{ borderRadius: "5px" }}>
          Search
        </button>
      </div>
    </div>
  );
}
