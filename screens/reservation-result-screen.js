import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Title } from 'react-native-paper'
import colors from '../utils/constants/colors'
import { useNavigation } from '@react-navigation/native'

const ReservationResultScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container} gap={20}>

      <Avatar.Icon size={90} icon={"check-decagram"} />

      <Title style={styles.title}>Congratulations!</Title>
      <Text style={styles.text}>Your reservation created successfully. You can check it in your account page.</Text>

      <View>
        <Button
          mode='contained'
          onPress={() => {
            navigation.navigate("account-stack", { screen: "reservations" });
          }}
        >
          Go Reservations
        </Button>

        <Button
          mode='contained'
          style={styles.homeButton}
          onPress={() => {
            navigation.navigate("cars");
          }}
        >
          Go Home
        </Button>
      </View>

    </View>
  )
}

export default ReservationResultScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontWeight: "bold"
  },
  text: {
    textAlign: "center"
  },
  homeButton: {
    marginTop: 10,
    backgroundColor: colors.color2
  }
})