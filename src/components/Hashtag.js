import React from "react";
import "../App.css";
import $ from "jquery";
import "../css/hashtags.css";

class Hashtag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag: []
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
  // Get Trend from qwant api

  getTrendQwantApi = () => {
    /*
      Permet de récuperer les mots les plus recherchés sur qwant en format json.
    */
    var url = "https://api.qwant.com/api/trend/get?locale=fr_FR";
    $.ajax({
      url: url,
      data: {
        lang: this.props.searchInfos.valueSelectorLangue //language
      },
      success: function(data) {
        this.setState({
          hashtag: data.data.social_trends
        });
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    });
  };

  // Search for the trending topic once clicked

  searchTrend(topic) {
    /*
      Permet d'actualiser les news avec la str rentré en argument
    */
    this.props.callbackSearch(topic);
  }
  trendInSearchBar(topic) {
    /*
      Permet de remplir la searchBar avec le contenu donné en argument
    */
    $(".SearchBar").val(topic);
  }
  render() {
    var i = 1;
    if (this.state.hashtag.length !== 0) {
      var buff = this.state.hashtag.map(hashtags => (
        <li key={hashtags.name + i}>
          <input
            id={"hashtag" + i++}
            value={hashtags.name}
            onClick={() => {
              this.searchTrend(hashtags.name);
              this.trendInSearchBar(hashtags.name);
            }}
            type="button"
          />
        </li>
      ));
    } else {
      this.getTrendQwantApi();
    }
    return (
      <div id="divhashtags">
        <ol id="hashtags">{buff}</ol>
      </div>
    );
  }
}

export default Hashtag;
