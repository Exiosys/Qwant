import React from "react";
import PropTypes from "prop-types";
import horloge from "../../images/horloge.png";
import "../../css/card.css";
import notfound from "../../images/qwantnotfound.png";
import $ from "jquery";
import share from "../../images/share.png";
import facebook from "../../images/fb.png";
import twitter from "../../images/twt.png";
import copy from "../../images/cpy.png";
import whatsapp from "../../images/wapp.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/perspective.css";
import tippy from "tippy.js";

class Card extends React.Component {
  constructor(props) {
    super(props);

    //set data items to state for future use
    this.state = {
      id: this.props.id,
      title: this.props.title,
      category: this.props.category,
      url: this.props.url,
      date: this.props.date,
      desc: this.props.desc,
      domain: this.props.domain,
      media: this.props.media,
      idmort: this.props.idmort
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.addToolTip();
  }

  img = () => {
    return this.props.imgFunc(this.state.media);
  };

  createMarkup = data => {
    return this.props.createMarkup(data);
  };

  addToolTip() {
    tippy(document.querySelectorAll(".it"), {
      content: "Partager",
      placement: "bottom",
      animation: "perspective",
      delay: [100, 100]
    });
  }

  categoryButton = () => {
    let category = this.state.category;
    if (category) {
      let color = this.props.stringToColour(category);
      let style = {
        background: color,
        boxShadow: "0px 0px 8px" + color
      };
      return (
        <p style={style} id="category">
          {category}
        </p>
      );
    }
  };

  Shareit = e => {
    var classe = $(e.target).attr("class");
    classe = classe.split(" ");
    console.log(classe[0]);
    $(document).ready(function() {
      $("#" + classe).animate(
        {
          height: "toggle"
        },
        650
      );
    });
  };

  render() {
    if (
      this.props.categoryFilter !== "" &&
      this.props.categoryFilter !== this.state.category
    ) {
      return null;
    } else {
      return (
        <div key={this.state.id}>
          <li>
            <div id={this.state.idmort} className="Card">
              <div className="img">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={this.state.url}
                >
                  <img src={this.img()} alt={notfound} />
                </a>
                <div
                  id="div_category"
                  value={this.state.category}
                  onClick={() => {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    this.props.setCategoryFilter(this.state.category);
                    $(".resetCategoryFilter").text(this.state.category + " x");
                    $(".resetCategoryFilter").css(
                      "background-color",
                      this.props.stringToColour(this.state.category)
                    );
                    $(".resetCategoryFilter").css(
                      "box-shadow",
                      "0px 0px 6px " +
                        this.props.stringToColour(this.state.category)
                    );
                    $(".resetCategoryFilter").show();
                    $(".resetCategoryFilter").click(() => {
                      this.props.setCategoryFilter("");
                      $(".resetCategoryFilter").hide();
                    });
                  }}
                >
                  {this.categoryButton(this.props.category)}
                </div>
              </div>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={this.state.url}
              >
                <h1 className="Title">
                  <span
                    dangerouslySetInnerHTML={this.createMarkup(
                      this.state.title
                    )}
                  />
                </h1>
              </a>
              <p
                className="Description"
                dangerouslySetInnerHTML={this.createMarkup(this.state.desc)}
              />
              <img id="horloge" src={horloge} alt="Date de mise en ligne" />
              <p className="Source">
                {this.props.timeToStr(this.state.date)} |
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={"https://" + this.state.domain}
                >
                  {this.state.domain}
                </a>
              </p>
              <img
                id="shareit"
                className={this.state.id + " it"}
                onClick={this.Shareit}
                alt="partage"
                src={share}
              />
              <div className="sharepart" id={this.state.id}>
                <ul>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={
                        "https://www.facebook.com/sharer/sharer.php?u=" +
                        this.state.url +
                        "%2F&amp;src=sdkpreparse"
                      }
                    >
                      <button>
                        <img id="social" src={facebook} alt="facebook"></img>
                      </button>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={
                        "https://twitter.com/intent/tweet?url=" +
                        this.state.url +
                        "&text=Regardez ce que j'ai trouvé : &hashtags=Qwant,actu"
                      }
                    >
                      <button>
                        <img id="social" src={twitter} alt="facebook"></img>
                      </button>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href={
                        "https://wa.me/?text=Regarde ce que j'ai trouvé ! %0D%0A" +
                        this.state.url
                      }
                      rel="noopener noreferrer"
                    >
                      <button>
                        <img id="social" src={whatsapp} alt="whatsapp"></img>
                      </button>
                    </a>
                  </li>
                  <li>
                    <CopyToClipboard text={this.state.url}>
                      <button>
                        <img id="social" src={copy} alt="copy"></img>
                      </button>
                    </CopyToClipboard>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </div>
      );
    }
  }
}

//validate props
Card.propTypes = {
  items: PropTypes.object
};

export default Card;
