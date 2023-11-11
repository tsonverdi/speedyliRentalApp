import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Card, List } from 'react-native-paper'
import imgAbout from "../assets/about.jpg";
import colors from '../utils/constants/colors';
import about from "../utils/data/about.json";

const AboutScreen = () => {
  const callUs = () => {
    Linking.openURL("tel:+9056581585");
  }

  const visitWeb = () => {
    Linking.openURL("https://speedyli.com");
  }

  return (
    <ScrollView>
      <Card>
        <Card.Cover
          source={imgAbout}
          theme={{ roundness: 0 }}
        />

        {/* görsel ve butonlar */}
        <Card.Content style={styles.cardContent}>
          <Button mode='contained' onPress={callUs}>
            Call Us
          </Button>
          <Button mode='contained' onPress={visitWeb}>
            Visit Web
          </Button>
        </Card.Content>
      </Card>

      {/* maddeler */}
      <View style={styles.itemsList}>
        {about.map((item, index) => (<List.Item
          key={index}
          title={item.title}
          titleStyle={{fontWeight: "bold"}}
          description={item.desc}
          left={() => <List.Icon icon={"target"} color={colors.color1} />}
        />))}
      </View>

    </ScrollView>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  itemsList: {
    padding: 15
  }
})