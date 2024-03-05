import React, { Component } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  
  constructor() {
    super();
    this.state = { 
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <nav className="bg-red-500 py-2 text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4 md:justify-center lg:justify-between">
          <h1 className="text-3xl">News Monkey</h1>
          <button
            className="flex size-10 items-center justify-center rounded-full bg-white text-xl text-red-500 md:hidden"
            onClick={this.toggle}
          >
            <FaBars className={this.state.isOpen && "hidden"} />
            <FaXmark className={!this.state.isOpen && "hidden"} />
          </button>
          <ul
            className={`mt-2 w-full ${!this.state.isOpen && "hidden"} flex flex-col flex-wrap justify-center md:flex md:flex-row lg:mt-0 lg:w-auto`}
          >
          <li>
            <Link to="/" className={`block px-4 py-2 text-lg hover:bg-red-400 [&.active]:bg-red-400`}>
              general
            </Link>
          </li>
            <li>
              <Link
                to="/business"
                className="block px-4 py-2 text-lg hover:bg-red-400"
              >
                business
              </Link>
            </li>
            <li>
              <Link
                to="/entertainment"
                className="block px-4 py-2 text-lg hover:bg-red-400"
              >
                entertainment
              </Link>
            </li>
            <li>
              <Link
                to="/health"
                className="block px-4 py-2 text-lg hover:bg-red-400"
              >
                health
              </Link>
            </li>
            <li>
              <Link
                to="/science"
                className="block px-4 py-2 text-lg hover:bg-red-400"
              >
                science
              </Link>
            </li>
            <li>
              <Link
                to="/sports"
                className="block px-4 py-2 text-lg hover:bg-red-400"
              >
                sports
              </Link>
            </li>
            <li>
              <Link
                to="/technology"
                className="block px-4 py-2 text-lg hover:bg-red-400"
              >
                technology
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
