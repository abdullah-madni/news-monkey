import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [progress, setProgress] = useState(0);
  const apikey = import.meta.env.VITE_API_KEY;

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color="rgb(59 130 246)"
          height={3}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <News
                key="general"
                apikey={apikey}
                category="general"
                setProgress={setProgress}
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                key="business"
                apikey={apikey}
                category="business"
                setProgress={setProgress}
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                key="entertainment"
                apikey={apikey}
                category="entertainment"
                setProgress={setProgress}
              />
            }
          />
          <Route
            path="/health"
            element={
              <News
                key="health"
                apikey={apikey}
                category="health"
                setProgress={setProgress}
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                key="science"
                apikey={apikey}
                category="science"
                setProgress={setProgress}
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                key="sports"
                apikey={apikey}
                category="sports"
                setProgress={setProgress}
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                key="technology"
                apikey={apikey}
                category="technology"
                setProgress={setProgress}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
