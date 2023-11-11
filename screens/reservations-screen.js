import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/account/profile-card'
import Spacer from '../components/common/spacer'
import { ActivityIndicator, DataTable } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { getReservations } from '../api/reservation-service'
import Toast from 'react-native-toast-message'
import moment from 'moment'
import colors from '../utils/constants/colors'

const ReservationsScreen = () => {
  const navigation = useNavigation();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const response = await getReservations();
      setReservations(response.data.content);

      setLoading(false);
    }
    catch (error) {
      setLoading(false);

      Toast.show({
        type: "error",
        text1: error.response.data.message
      });
    }
  }

  useEffect(() => {
    loadData();
  }, []);


  return (
    <ScrollView style={styles.container}>
      {/* profil card */}
      <ProfileCard page={"reservations"} />
      <Spacer />

      {/* content */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Car</DataTable.Title>
          <DataTable.Title>Pickup Location</DataTable.Title>
          <DataTable.Title>Pickup Date</DataTable.Title>
        </DataTable.Header>


        {loading ? (
          <ActivityIndicator
            animating={true}
            color={colors.color1}
            style={styles.loading} size={50} />) :
          reservations.length == 0 ?
            <Text style={styles.emptyText}>
              You don't have any reservations yet.
              {"\n"}You can create a reservation by selecting a car from the home page.
            </Text> :
            (
              reservations.map((item) => (
                <DataTable.Row
                  key={item.id}
                  onPress={() => navigation.navigate("reservation-details", { reservation: item })}
                >
                  <DataTable.Cell>
                    <Text>{item.car.model}</Text>
                  </DataTable.Cell>

                  <DataTable.Cell>
                    {item.pickUpLocation}
                  </DataTable.Cell>

                  <DataTable.Cell>
                    {moment(item.pickUpTime).format("ll")}
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            )}



      </DataTable>

    </ScrollView >
  )
}

export default ReservationsScreen

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  loading: {
    marginTop: 20
  },
  emptyText: {
    marginTop: 20,
    textAlign: "center"
  }
})