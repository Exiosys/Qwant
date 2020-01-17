import React from "react";
import "../App.css";
import backgroundSearchBar from "../images/backgroundSearchBar.png";
import searchLogo from "../images/searchLogo.png";
import "../css/header.css";
import $ from "jquery";

class Header extends React.Component {
  handleChange = event => {
    /*
      Fonction qui va envoyer la requete avec comme la valeur de la searchbar
    */
    event.preventDefault();
    if ($(".SearchBar").val()) {
      this.props.callbackSearch($(".SearchBar").val());
    }
  };

  render() {
    return (
      <header>
        <img id="searchground" src={backgroundSearchBar} alt="" />
        <div id="divbar">
          <form onSubmit={this.handleChange}>
            <input
              className="SearchBar"
              id="SearchBar"
             
              type="text"
            />
            <button id="submitsearch" type="submit">
              <img id="srsh" src={searchLogo} alt="" />
              <svg
                id="icon-search"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>
        <ul id="formnav">
          <nav>
            <ul>
              <li>
                <a
                  href={
                    "https://www.qwant.com/?q=" +
                    $(".SearchBar").val() +
                    " &t=web"
                  }
                >
                  Web
                </a>
              </li>
              <li>
                <a href="localhost:3000" id="actuel">
                  Actualités
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://www.qwant.com/?q=" +
                    $(".SearchBar").val() +
                    "%20&t=images"
                  }
                >
                  Images
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://www.qwant.com/?q=" +
                    $(".SearchBar").val() +
                    "%20&t=shopping"
                  }
                >
                  Shopping
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://www.qwant.com/?q=" +
                    $(".SearchBar").val() +
                    "%20&t=social"
                  }
                >
                  Social
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://www.qwant.com/?q=" +
                    $(".SearchBar").val() +
                    "%20&t=videos"
                  }
                >
                  Vidéos
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://www.qwant.com/maps/?q=" + $(".SearchBar").val()
                  }
                >
                  Maps
                </a>
              </li>
              <li>
                <a href={0}>Plus</a>
              </li>
              <li>
                <a href={0}>Paramètre</a>
              </li>
            </ul>
          </nav>
        </ul>
      </header>
    );
  }
}
export default Header;
