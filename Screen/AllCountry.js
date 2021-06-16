import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
export default class AllCountry extends React.Component {
  constructor() {
    super();
    this.state = {
      Countries: "",
      search: "",
      arData: [],
    };
  }
  Covid19Global = async () => {
    var link = "https://api.covid19api.com/summary";
    return fetch(link)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          Countries: responseJson.Countries,
        });
      });
  };
  componentDidMount = async () => {
    await this.Covid19Global();
    var array = [];
    for (var i in this.state.Countries) {
      array.push(this.state.Countries[i]);
    }
    await this.setState({
      arData: array,
    });
  };
  SearchFilterFunction = (text) => {
    const newData = this.state.arData.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.Country
        ? item.Country.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      Countries: newData,
      search: text,
    });
  };
  render() {
    return (
      <View
        style={{
          marginTop: 32,
        }}
      >
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Type Here..."
          value={this.state.search}
        />
        <FlatList
          data={this.state.Countries}
          renderItem={({ item }) => {
            var link =
              "https://www.countryflags.io/" +
              item.CountryCode +
              "/flat/64.png";
            return (
              <View style={styles.container}>
                <View style={styles.subcontainer}>
                  <Image
                    source={{ uri: link }}
                    style={{ width: 55, height: 55, marginLeft: 8 }}
                  ></Image>
                  <Text style={styles.text}>{item.Country}</Text>
                </View>
                <View style={styles.subcontainer2
                }>
                  <Text>Recovered Cases:{item.TotalRecovered}</Text>
                  <Text>Active Cases:{item.TotalConfirmed}</Text>
                  <Text>Deaths:{item.TotalDeaths}</Text>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subcontainer: {},
  text: {
    marginLeft: 10,
    fontSize: 20,
  },
  container: {
    flexDirection: "row",
    borderWidth: 7,
    width: 362,
    height: 100,
    borderRadius: 25,

    marginTop: 40,
  },
  subcontainer2: {
    marginLeft:65,
  },
});
