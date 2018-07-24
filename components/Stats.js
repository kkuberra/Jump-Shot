import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Form, Body, Thumbnail, Button } from 'native-base';
import { PieChart } from 'react-native-svg-charts'
import { Actions } from 'react-native-router-flux'

const favoritesURL = 'http://localhost:3000/api/v1/favorites'

export default class PieChartWithDynamicSlices extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            stats: null,
            selectedSlice: {
                value: "",
                label: ""
            },
        }
    }

    addAndRedirect() {
        fetch(favoritesURL, {
                method: 'POST',
                body: JSON.stringify({
                    name: this.props.Player.FirstName + ' ' + this.props.Player.LastName,
                    player_id: this.props.Player.PlayerID,
                    image_url: this.props.Player.PhotoUrl
                }),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            .then(res => res.json())
            // .then(res => {
            //     let updatedFavorites = this.state.favorites
            //     updatedFavorites.push(res)
            //     this.setState({
            //         favorites: updatedFavorites
            //     })
            // })
            .then(Actions.favorites())
    }
    

    getStats = () => {
        return fetch("https://api.fantasydata.net/v3/nba/stats/JSON/PlayerSeasonStatsByPlayer/2018/" + this.props.Player/ {
            headers: {
                "Ocp-Apim-Subscription-Key": "7ab4f60ab975432aa99aa6d398b1fe2b"
            }
        })
        .then(results => results.json())
        .then(data => this.setState({
            stats: data
        }))
    }
    componentDidMount() {
        this.getStats()
    }
    
    render() {
        const {stats} = this.state
        if (!stats){
            return null;
        }

    

    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const keys = ['Assists %', 'Turn Over %', 'Three Pointers %', 'Two Pointers %', 'Field Goals %'];
    const values = [
        stats.AssistsPercentage,
        stats.TurnOversPercentage,
        stats.ThreePointersPercentage,
        stats.TwoPointersPercentage,
        stats.FieldGoalsPercentage
    ];
    const colors = ['#004358', '#1F8A70', '#BEDB39', '#FFE11A', '#FD7400']
    const data = keys.map((key, index) => {
        return {
          key,
          value: values[index],
          svg: { fill: colors[index] },
          arc: { outerRadius: (70 + values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
          onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })
        }
      })
    const deviceWidth = Dimensions.get('window').width
      console.log(this.props)
      const Player = this.props.Player 
      return (
          < View style = {
              {
                //   flex: 1,
                //   flexDirection: 'row',
                  justifyContent: 'center',
                //   alignItems: 'center',
              }
          } >
          
   
        
        <Text style={{ marginTop:25, marginLeft:100, marginBottom:50, fontSize: 25 }}><Thumbnail style={{ height:90 }} square source={{uri: Player.PhotoUrl}} />{Player.FirstName}  {Player.LastName}</Text>
     
        <PieChart
          style={{ height: '25%' }}
          outerRadius={'80%'}
          innerRadius={'45%'}
          data={data}
        />
            
        <Text
          onLayout={({ nativeEvent: { layout: { width } } }) => {
            this.setState({ labelWidth: width });
          }}
          style={{
            // position: 'center',
            left: deviceWidth / 2 - labelWidth / 2,
            textAlign: 'center',
            fontSize: 25,
            marginBottom: 100
          }}>
          {`${label} \n ${value}`}
        </Text>
    <View style = {
                    {
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // marginTop: 100
                    }
                }>
                <Button onPress = {() => this.addAndRedirect()} rounded style={{ padding: 20, height: 55 }}> <Text style={{ fontSize: 20, color: 'white' }}> Add to Favorites </Text> </Button>
                </View>
    </View>
    
            )

    };  
}