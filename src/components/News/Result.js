import React from "react";
import Card from "./Card";
import "../../css/result.css";
import notfound from "../../images/qwantnotfound.png";
import $ from "jquery";
import logo_infos from "../../images/informations.png";

class Result extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queryResult: [],
      toShow: "",
      categoryFilter: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { queryResult: props.items };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.checkScroll);
    console.log(this.stringToColour('zzzzz'))
    console.log(this.stringToColour('aaaaa'))
  }
  returnImg = data => {
    if (!data[0]) {
      return notfound;
    }
    return data[0].pict_big.url;
  };

  createMarkup = data => {
    /*
      Prends en argument une str qui la convertit en objet HTML. 
    */
    return { __html: data };
  };

  stringToColour = str => {
    /*
      Permet de convertir une str en code hexadecimal. Ce code sera utilisé par la suite pour les couleurs de fond de l'affichage des catégorie
    */
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = "#";
    for (let j = 0; j < 3; j++) {
      let value = (hash >> (j * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    
    return colour;
  };

  // Arrow to return to the top page

  // Make the user reset to top

  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // Keep track of the scroll state to diplay or hide the button

  checkScroll = () => {
    if (
      document.body.scrollTop > 1000 ||
      document.documentElement.scrollTop > 1000
    ) {
      $(".ScrollTop").show();
    } else {
      $(".ScrollTop").hide();
    }
  };

  setCategoryFilter = category => {
    this.setState({ categoryFilter: category });
  };

  render() {
    var toAppend;
    if (this.state.queryResult) {
      var i = 0;
      toAppend = this.props.items.map((row, index) => (
        <Card
          key={index}
          id={row._id}
          idmort={"cardnumber" + i++}
          title={row.title}
          url={row.url}
          category={row.category}
          date={row.date}
          desc={row.desc}
          domain={row.domain}
          imgFunc={this.returnImg}
          media={row.media}
          createMarkup={this.createMarkup}
          stringToColour={this.stringToColour}
          timeToStr={this.props.timeToStr}
          categoryFilter={this.state.categoryFilter}
          setCategoryFilter={this.setCategoryFilter.bind(this)}
        />
      ));
    }
    if (this.state.queryResult.length === 0) {
      toAppend = (
        <div>
          <img id="noinfos" src={logo_infos} alt="pas d'infos" />
          <p id="txtnoinfos">
            Aucun résultat trouvé, veuillez revoir votre recherche.
          </p>
        </div>
      );
    }

    return (
      <div>
        <div id="divbtncate">
          <button id="buttoncate" className="resetCategoryFilter">
            {$(".category").val()}
          </button>
        </div>
        <div id="formcard">
          <ol className="response">{toAppend}</ol>
        </div>
        <button
          id="myBtn"
          className="ScrollTop"
          onClick={() => {
            this.scrollToTop();
          }}
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 610.000000 434.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,434.000000) scale(0.100000,-0.100000)"
              fill="#65CEE7"
              stroke="none"
            >
              <path d="M2935 4224 c-47 -15 -131 -96 -1466 -1431 -1042 -1041 -1423 -1428 -1440 -1462 -17 -33 -25 -68 -27 -123 -7 -135 -16 -123 492 -632 285 -284 462 -454 489 -468 63 -32 166 -36 237 -9 52 19 118 83 938 901 l882 880 240 -243 c132 -133 244 -245 248 -249 4 -4 291 -289 637 -633 348 -346 648 -636 670 -648 58 -31 202 -32 261 0 23 12 229 210 488 468 495 494 497 496 497 614 1 68 -13 120 -47 171 -12 19 -656 668 -1431 1442 -1377 1376 -1409 1407 -1462 1422 -67 20 -140 19 -206 0z" />
            </g>
          </svg>
        </button>
      </div>
    );
  }
}
export default Result;
