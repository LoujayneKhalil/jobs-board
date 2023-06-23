import React, { useContext } from "react";
import SearchBar from "../HomePageComponent/SearchBar";
import JobsCards from "../HomePageComponent/JobsCards";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import ThemeContext from "../../ThemeContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const searchIcon = {
  color: "#fff",
  backgroundColor: "#5964E0",
  height: "48px",
  width: "48px",
  p: "10px",
  borderRadius: "5px",
};

export default function HomePage({
  jobs,
  search,
  setSearch,
  fetchData,
  loadMore,
  currentPage,
  data,
  isLoading,
  setLocation,
  location,
  setFilteredData,
  filteredData,
}) {
  const { theme } = useContext(ThemeContext);
  const [isChecked, setIsChecked] = React.useState(false);




  const handleOnchange = (e) => {
    setSearch(e.target.value);
  };

  const handleLocationOnchange = (e) =>{
    setLocation(e.target.value)
  }

  const SearchOnclick = () => {
    fetchData(search, currentPage,location);
    console.log(search);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchData(search, currentPage,location);
    }
  };

   const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      setFilteredData(data);
      console.log(filteredData)
    } else {
      const filtered = data.data.filter((item) =>
            item.detected_extensions.schedule_type
              ? item.detected_extensions.schedule_type.includes("Full-time")
              : null
          );
      setFilteredData(filtered);
      console.log(filteredData)
    }
  };


  return (
    <div>
      <div
        className={`search-bar ${
          theme === "light" ? "search-light-bg" : "search-dark-bg"
        }`}
      >
        <SearchBar
          setSearch={setSearch}
          search={search}
          fetchData={fetchData}
          handleOnchange={handleOnchange}
          SearchOnclick={SearchOnclick}
          handleKeyPress={handleKeyPress}
          jobs={jobs}
          setLocation={setLocation}
          handleLocationOnchange={handleLocationOnchange}
          handleCheckboxChange={handleCheckboxChange}
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
            <IconButton onClick={SearchOnclick}>
              <SearchIcon sx={searchIcon} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="job-cards">
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <JobsCards data={data} filteredData={filteredData}/>
        )}
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ marginBottom: "100px" }}
      >
        <button
          className="load-more-btn"
          style={{ borderRadius: "5px" }}
          onClick={loadMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
