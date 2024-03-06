import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default class App extends Component {
  state = { progress: 0 };
  apikey = import.meta.env.VITE_API_KEY;

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color="rgb(59 130 246)"
            height={3}
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Routes>
            <Route
              path="/"
              element={<News key="general" apikey={this.apikey} category="general" setProgress={this.setProgress} />}
            />
            <Route
              path="/business"
              element={<News key="business" apikey={this.apikey} category="business" setProgress={this.setProgress} />}
            />
            <Route
              path="/entertainment"
              element={<News key="entertainment" apikey={this.apikey} category="entertainment" setProgress={this.setProgress} />}
            />
            <Route
              path="/health"
              element={<News key="health" apikey={this.apikey} category="health" setProgress={this.setProgress} />}
            />
            <Route
              path="/science"
              element={<News key="science" apikey={this.apikey} category="science" setProgress={this.setProgress} />}
            />
            <Route
              path="/sports"
              element={<News key="sports" apikey={this.apikey} category="sports" setProgress={this.setProgress} />}
            />
            <Route
              path="/technology"
              element={<News key="technology" apikey={this.apikey} category="technology" setProgress={this.setProgress} />}
            />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
