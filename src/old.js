import React, { Component } from "react";
import "./App.css";
import pertinence from "./images/pertinence.png";
import recent from "./images/recent2.png";
import all from "./images/all2.png";
import uneheure from "./images/-1h2.png";
import semaine from "./images/7J.png";
import journee from "./images/24h.png";
import mois from "./images/1mois.png";
import searchlogo from "./images/searchlogo.png";
import searchground from "./images/searchground.png";
import horloge from "./images/horloge.png";
const moment = require("moment");

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            hashtags: [],
            valueToSearch: {
                valueInput: "",
                valueInputNumber: "12",
                valueSelectorLangue: "fr_FR",
                valueSelectorOrder: "relevance"
            },
            height: window.height
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    /* --- FONCTIONS --- */

    onChangeOrder = event => {
        let newSearch = this.state.valueToSearch;
        newSearch.valueSelectorOrder = event.target.value;
        this.setState({ valueToSearch: newSearch });
        if (this.state.valueToSearch.valueInput.length > 0) this.getInfo();
        else this.getHashtag();
    };
    onChangeLangage = event => {
        let newSearch = this.state.valueToSearch;
        newSearch.valueSelectorLangue = event.target.value;
        this.setState({ valueToSearch: newSearch });
        if (this.state.valueToSearch.valueInput.length > 0) this.getInfo();
        else this.getHashtag();
    };
    onChangeNumber = event => {
        if (event.target.value >= 5) {
            let newSearch = this.state.valueToSearch;
            newSearch.valueInputNumber = event.target.value;
            this.setState({ valueToSearch: newSearch });
        }
        if (this.state.valueToSearch.valueInput.length > 0) this.getInfo();
        else this.getHashtag();
    };
    onChange = event => {
        let newSearch = this.state.valueToSearch;
        newSearch.valueInput = event.target.value;
        this.setState({ valueToSearch: newSearch });
        if (event.target.value.length > 0) this.getInfo(event.target.value);
        else this.getHashtag();
    };
    createMarkup = toUse => {
        return { __html: toUse };
    };
    getStrFromeTime = timestamp => {
        return moment.unix(timestamp).fromNow();
    };
    /* --- FONCTIONS --- */

    getInfo() {
        let url =
            "https://api.qwant.com/partners/v2/qwant/news?" +
            "q=" +
            this.state.valueToSearch.valueInput +
            "&locale=" +
            this.state.valueToSearch.valueSelectorLangue +
            "&count=" +
            this.state.valueToSearch.valueInputNumber +
            "&order=" +
            this.state.valueToSearch.valueSelectorOrder;
        fetch(url, {
            method: "get",
            headers: {
                "Client-ID": "CodeCamp",
                Host: "api.qwant.com",
                Token: "5dkCdp67D4a7zcOrSZrSqIqPmYZNf8Re"
            }
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                return data.result.items;
            })
            .then(data => {
                let text = data.map(info => {



                    return (
                        <div key={info._id}>
                            <li id={info._id}>
                                <div className="Card">
                                    <div className="img">
                                        <a href={info.url}>
                                            <img src={ReturnIMG()} alt={info.desc} />
                                        </a>
                                        <div id="div_category">{Returnbutton()}</div>
                                    </div>

                                    <a href={info.url}>
                                        <h1 className="Title">
                      <span
                          dangerouslySetInnerHTML={this.createMarkup(info.title)}
                      ></span>
                                        </h1>
                                    </a>
                                    <p
                                        className="Description"
                                        dangerouslySetInnerHTML={this.createMarkup(info.desc)}
                                    ></p>
                                    <img id="horloge" src={horloge} alt="Date de mise en ligne" />
                                    <p className="Source">
                                        {this.getStrFromeTime(info.date)} |
                                        <a href={"https://" + info.domain}>{info.domain}</a>
                                    </p>
                                </div>
                            </li>
                        </div>
                    );
                });
                this.setState({ items: text });
            });
    }
    getHashtag() {
        let url = "https://api.qwant.com/api/trend/get?locale=fr_FR";
        fetch(url, {
            method: "get",
            headers: {
                "Client-ID": "CodeCamp",
                Host: "api.qwant.com",
                Token: "5dkCdp67D4a7zcOrSZrSqIqPmYZNf8Re"
            }
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                return data.data;
            })
            .then(data => {
                var i = 0;
                let text = data.social_trends.map(info => {
                    function createMarkup(toUse) {
                        return { __html: toUse };
                    }
                    i++;
                    console.log(i);
                    return (
                        <li key={info.id}>
                            <h1 id={"hashtag" + i} className="Title">
                                <span dangerouslySetInnerHTML={createMarkup(info.name)}></span>
                            </h1>
                        </li>
                    );
                });
                this.setState({ hashtags: text });
            });
    }

    componentDidMount() {
        this.getHashtag();
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
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
            ) - 700;
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            console.log("off");
            window.removeEventListener("scroll", this.handleScroll);
            let tempToSearch = this.state.valueToSearch;
            tempToSearch.valueInputNumber =
                parseInt(tempToSearch.valueInputNumber) + 25;
            this.setState({ valueToSearch: tempToSearch });
            this.getInfo();
            const wait = setTimeout(() => {
                window.addEventListener("scroll", this.handleScroll);
            }, 1000);
            console.log("on");
        }
    }

    render() {
        const data = this.state.valueToSearch;
        return (
            <div>
                <img id="searchground" src={searchground} alt="Partie recherche" />
                <div id="divbar">
                    <input
                        className="SearchBar"
                        onChange={this.onChange}
                        value={data.valueInput}
                        type="text"
                    />
                    <img id="srsh" src={searchlogo} alt="Rechercher" />
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
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <div id="flex-row">
                    <ul id="hashtags">{this.state.hashtags}</ul>
                    <ol className="response">{this.state.items}</ol>
                    <form id="SlideBar">
                        <br />
                        <label id="Section">Trier par</label>
                        <br />
                        <table id="trierpar">
                            <tbody>
                            <tr>
                                <td>
                                    <button
                                        value="relevance"
                                        type="button"
                                        onClick={this.onChangeOrder}
                                    >
                      <span>
                        <img src={pertinence} alt="pertinence" />
                      </span>
                                        <b>Pertinence</b>
                                    </button>
                                </td>
                                <td>
                                    <button
                                        value="date"
                                        type="button"
                                        onClick={this.onChangeOrder}
                                    >
                      <span>
                        <img src={recent} alt="recent" />
                      </span>
                                        <b>Les plus récents</b>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <br />

                        <label id="Section">Période</label>
                        <br />
                        <table id="trierpar">
                            <tbody>
                            <tr>
                                <td>
                                    <button type="button">
                      <span>
                        <img src={all} alt="tout" />
                      </span>
                                        <b>Toutes</b>
                                    </button>
                                </td>
                                <td>
                                    <button type="button">
                      <span>
                        <img src={uneheure} alt="moins d'une heure" />
                      </span>
                                        <b>Moins d'1h</b>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button">
                      <span>
                        <img src={semaine} alt="moins d'une semaine" />
                      </span>
                                        <b>Moins d'1 semaine</b>
                                    </button>
                                </td>
                                <td>
                                    <button type="button">
                      <span>
                        <img src={journee} alt="moins d'un jour" />
                      </span>
                                        <b>Moins d'1 jour</b>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button">
                      <span>
                        <img src={mois} alt="moins d'un mois" />
                      </span>
                                        <b>Moins d'1 mois</b>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <select
                            className="Filter-Language"
                            onChange={this.onChangeLangage}
                            value={data.valueSelectorLangue}
                        >
                            <option value="fr_FR">Français</option>
                            <option value="en_EN">Anglais</option>
                            <option value="de_DE">Allemand</option>
                        </select>
                        <br />
                        <select
                            className="Filter-Pertinence"
                            onChange={this.onChangeOrder}
                            value={data.valueSelectorOrder}
                        >
                            <option value="relevance">Pertinence</option>
                            <option value="date">Date</option>
                        </select>
                    </form>
                </div>
            </div>
        );
    }
}
export default Background;
