import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./Components/HomePageComponent/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailedPage from "./Components/DetailedPageComponent/DetailedPage";
import ThemeMode from "./ThemeMode";
import Header from "./Header.png";

function App() {
  const [data, setData] = React.useState({ data: [] });
  const [search, setSearch] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(0);
  const [location, setLocation] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFullTime,setFullTime] = React.useState('')

  const fetchData = async (
    searchUrl = "all",
    page = currentPage + 10,
    locationUrl = "",
  
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://serpapi.com/search.json?api_key=2a51adbd46b0008371dcf7e3be2fdb6f45119ae5d46aa847c7bb5bbfa3619fd8&start=${page}&location=${locationUrl}&engine=google_jobs&q=${searchUrl}&chips=employment_type:${isFullTime}`
      );
      if (!response.ok) {
        throw new Error("Error fetching URL");
      }
      const json = await response.json();
      setData({ data: [...data.data, ...json.jobs_results] });
      setCurrentPage((prevArr) => prevArr + 10);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const jobs = data.data;

  const loadMore = () => {
    fetchData(search, currentPage, location);
  };

  React.useEffect(() => {
    setData({ data: [] });
  }, [search,location, isFullTime]);

  React.useEffect(() => {
    if ((search !== "") & (currentPage === 0) & (data.data.length === 0)) {
      fetchData();
      setCurrentPage(0);
    }
  }, [data]);

  return (
    <Router>
      <div className="bg-header" style={{ position: "relative" }}>
        <img
          src={Header}
          alt="Header"
          style={{ width: "100%" }}
          className="header-img"
        />
        <div className="header-content d-flex justify-content-between align-items-center">
          <h1>devjobs</h1>
          <ThemeMode />
        </div>
      </div>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                jobs={jobs}
                setData={setData}
                data={data}
                setSearch={setSearch}
                search={search}
                fetchData={fetchData}
                loadMore={loadMore}
                currentPage={currentPage}
                isLoading={isLoading}
                setLocation={setLocation}
                location={location}
                setFullTime={setFullTime}
              />
            }
          />
          <Route path="/card/:job_id" element={<DetailedPage jobs={jobs} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
