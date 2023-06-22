import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./Components/HomePageComponent/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailedPage from "./Components/DetailedPageComponent/DetailedPage";
import ThemeMode from "./ThemeMode";
import Header from "./Header.png";

function App() {
  const [data, setData] = React.useState({data: []});
  const [search, setSearch] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(0);

  const fetchData = async (searchUrl = "all", page = currentPage) => {
    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://serpapi.com/search.json?api_key=f5815099ddd989764d296cd3f67cb91d83fd58ac0215846156d553cb1f3af3fb&start=${page}&engine=google_jobs&q=${searchUrl}`
      );
      if (!response.ok) {
        throw new Error("Error fetching URL");
      }
      const json = await response.json();

      setData({ data: [...json.jobs_results, ...data.data] });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const jobs = data.data;

  const loadMore = () => {
    setCurrentPage((prevArr) => prevArr + 10);
    fetchData(search);
    console.log(data)
  };

  React.useEffect(() => {
    fetchData();
  }, [search]);

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
