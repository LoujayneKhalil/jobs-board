import React, { useContext } from "react";
import SearchBar from "../HomePageComponent/SearchBar";
import JobsCards from "../HomePageComponent/JobsCards";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import ThemeContext from "../../ThemeContext";

const searchIcon = {
  color: "#fff",
  backgroundColor: "#5964E0",
  height: "48px",
  width: "48px",
  p: "10px",
  borderRadius: "5px",
};

export default function HomePage({ jobs, search, setSearch, fetchData,loadMore,currentPage,data}) {
  const { theme } = useContext(ThemeContext);
  const [fullTimeFilter, setFullTimeFilter] =React.useState(data.data);
  const [isChecked, setIsChecked] = React.useState(false);


  const handleOnchange = (e) => {
    setSearch(e.target.value);
  };

  const SearchOnclick = () => {
    fetchData(search,currentPage);
    console.log(search)

  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchData(search,currentPage);
    }
  };

  function filteringFullTime() {
    setIsChecked(!isChecked)
    if(!isChecked){
      setFullTimeFilter(data);
      console.log(fullTimeFilter)

    }else {
      const filtedData = jobs.filter((item)=>item.detected_extensions.schedule_type?item.detected_extensions.schedule_type.includes('Full-time'):null)
      setFullTimeFilter(filtedData)
      console.log(filtedData)
    }
  }


  return (
    <div>
      <div
        className={`search-bar ${
          theme === "light" ? "search-light-bg" : "search-dark-bg"
        }`}
      >
        <SearchBar
          filteringFullTime={filteringFullTime}
          setSearch={setSearch}
          search={search}
          fetchData={fetchData}
          handleOnchange={handleOnchange}
          SearchOnclick={SearchOnclick}
          handleKeyPress={handleKeyPress}
          fullTimeFilter={fullTimeFilter}
          setFullTimeFilter={setFullTimeFilter}
          jobs={jobs}
          isChecked={isChecked}
        />
      </div>

      <div className="small-search">
        <div className="responsive-search-bar">
          <SearchIcon sx={{ color: "#5964e0" }} />
          <input
            className={`filter-title-responsive ${
              theme === "light" ? "search-light-mode" : "search-dark-mode"
            }`}
            type="text"
            placeholder="Filter by title…"
            onChange={handleOnchange}
            onKeyPress={handleKeyPress}
          />
          <div>
            <IconButton>
              <FilterAltIcon className="filter-icon" />
            </IconButton>
            <IconButton  onClick={SearchOnclick}>
              <SearchIcon sx={searchIcon}/>
            </IconButton>
          </div>
        </div>
      </div>
      <div className="job-cards">
        <JobsCards jobs={jobs} fullTimeFilter={fullTimeFilter} data={data}/>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ marginBottom: "100px" }}
      >
        <button className="load-more-btn" style={{ borderRadius: "5px" }} onClick={loadMore}>
          Load More
        </button>
      </div>
    </div>
  );
}
