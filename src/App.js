import React from "react";
import $ from "jquery";
import "./App.css";
import Header from "./components/Header";
import Hashtag from "./components/Hashtag";
import Result from "./components/News/Result";
import Sidebar from "./components/News/Sidebar";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], //Liste qui va contenir toutes les informations des cards
      valueInput: "", //String qui contient la valeur de la SearchBar
      sortDomain: "",
      sortOrder: "relevance",
      sortFreshness: "all",
      hashtags: [], //Liste qui va contenir les informations des hastags
      valueToSearch: {
        valueInput: "",
        valueInputNumber: "36", //String qui stock le parametre Count
        valueToSkip: 0 //String qui stock le parametre Offset
      },
      height: window.height //Int qui stock la hauteur de la fenetre, elle sera utilisée dans handleScroll()
    };

    $.ajaxSetup({
      headers: {
        "Client-ID": "CodeCamp",
        Token: "5dkCdp67D4a7zcOrSZrSqIqPmYZNf8Re"
      },
      method: "GET",
      dataType: "JSON"
    });
  }

  //lauch app
  componentDidMount() {
    this.getDataQwantApi("Actualités");
    window.addEventListener("scroll", this.handleScroll);
  }

  //events
  onChangeSearch = data => {
    /*
      Fonction qui va réinit valuetToSearch avant de faire une requete avec la valeur actuelle de la searchbar
    */
    let newToSearch = this.state.valueToSearch;
    newToSearch.valueInputNumber = "12";
    newToSearch.valueToSkip = 0;
    this.setState({
      valueToSearch: newToSearch,
      items: []
    });
    this.getDataQwantApi(data);
  };

  onChangeSortSource = domain => {
    /*
      Fonction qui va actualiser la valeur du sortDomain avec la valeur envoyée par la Sidebar.
      'domain' est une str qui prends comme valeur le nom d'un site exemple 'lemonde.fr'
    */

    if (domain === "all") domain = "";
    this.state.sortDomain = domain;
    this.setState({
      items: []
    });
    this.getDataQwantApi(this.state.valueInput);
  };

  onChangeSortOrder = order => {
    /* 
      Fonction qui va actualiser la valeur du sortOrder. 'order est une str qui prends comme
      valeur le nom du type de tri : 'relevance' ou 'freshness'
    */
    this.state.sortOrder = order;
    this.setState({
      items: []
    });
    this.getDataQwantApi(this.state.valueInput);
  };

  onChangeSortFreshness = freshness => {
    /*
      Fonction qui va actualiser la valeur du sortFreshness. 'freshness'est une str qui prends
      comme valeur le nom du type de tri, par exemple : 'hour', 'week' ou encore 'month'
    */

    this.state.sortFreshness = freshness;
    this.setState({
      items: []
    });
    this.getDataQwantApi(this.state.valueInput);
  };

  //Get data from qwant api
  getDataQwantApi = toSearch => {
    if (toSearch) {
      var url = "https://api.qwant.com/partners/v2/qwant/news";
      var sort = "";
      if (this.state.sortDomain) {
        sort = "site: " + this.state.sortDomain;
      }
      $.ajax({
        url: url,
        data: {
          q: toSearch + " " + sort, //query
          count: this.state.valueToSearch.valueInputNumber, //pagination
          order: this.state.sortOrder,
          freshness: this.state.sortFreshness,
          offset: this.state.valueToSearch.valueToSkip
        },
        success: function(data) {
          if (
            this.state.valueToSearch.valueToSkip !== undefined ||
            this.state.valueToSearch.valueToSkip > 0
          ) {
            let iniTab = this.state.items;
            let stableTab = iniTab.concat(data.result.items);
            this.setState({ items: stableTab });
          } else {
            this.setState({ items: data.result.items });
          }
          if (data.result.items.length !== 0) {
            if (
              data.result.filters &&
              data.result.items.length !== 0 &&
              Object.keys(data.result.filters.source.values).length !== 0
            ) {
              this.setState({
                valueInput: toSearch,
                sortSource: data.result.filters.source.values
              });
            } else {
              this.setState({
                valueInput: toSearch,
                sortSource: []
              });
            }
          }
        }.bind(this),
        error: function(err) {
          console.log(err);
        }
      });
    }
  };

  handleScroll = () => {
    /*
      Fonction qui va détecter si la heigth du dom affiché est proche du footer. Une fois atteint,
      on va actualiser valueToSkip qui correspond au offset de la requete API, puis on fait la requete.
      Enfin on laisse une seconde avant de remettre l'event scroll, ce qui permet d'éviter les spams 
      d'incrémentation de valueToSkip
    */

    /* Condition si il n'y a pas d'items et qu'on scroll en version responsive */
    if (this.state.items.length === 0) {
      return;
    }

    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight =
      Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      ) - 700; //700px pour permettre d'avoir les nouvelles request avant que l'user n'arrive au footer
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      window.removeEventListener("scroll", this.handleScroll);
      let tempToSearch = this.state.valueToSearch;
      tempToSearch.valueToSkip += 36;
      this.setState({ valueToSearch: tempToSearch });
      this.getDataQwantApi(this.state.valueInput);
      setTimeout(() => {
        window.addEventListener("scroll", this.handleScroll);
      }, 1000);
    }
  };

  timeToStr = time => {
    /*
      Cette fonction utilise les possibilités de moment. Elle retourne une string de type "il y a XX heures" à partir d'un timestamp en seconde Unix
    */

    return moment.unix(time).fromNow();
  };

  //render global app
  render() {
    return (
      <div className="App">
        <title>{this.state.valueInput} - Qwant actualité</title>
        <Header
          callbackSearch={this.onChangeSearch}
          categoryFilter={this.state.categoryFilter}
        />
        <Hashtag
          callbackSearch={this.onChangeSearch}
          searchInfos={this.state.valueToSearch}
        />
        <Sidebar
          sortSource={this.state.sortSource}
          callbackSource={this.onChangeSortSource}
          callbackOrder={this.onChangeSortOrder}
          callbackFreshness={this.onChangeSortFreshness}
        />
        <Result items={this.state.items} timeToStr={this.timeToStr} />
      </div>
    );
  }
}

export default App;
