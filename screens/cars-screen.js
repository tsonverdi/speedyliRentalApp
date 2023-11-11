import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Car from '../components/home/car';
import { Searchbar } from 'react-native-paper';
import MyContext from '../store';
import Spacer from '../components/common/spacer';
import { getVehicles } from '../api/vehicle-service';


const CarsScreen = () => {
  const { searchBarVisible } = useContext(MyContext);
  const [carListOrj, setCarListOrj] = useState([]);
  const [carList, setCarList] = useState([]);

  const getData = async () => {
    const vehiclesResponse = await getVehicles();
    setCarList(vehiclesResponse.data);
    setCarListOrj(vehiclesResponse.data);
  }

  useEffect(() => {
    getData();
  }, [])


  handleSearch = (value) => {
    newList = carListOrj.filter((item) => item.model.toLowerCase().includes(value.toLowerCase()));
    setCarList(newList);
  }

  return (
    <View>

      {/* search kısmı */}
      {searchBarVisible &&
        <Searchbar
          placeholder='Search car..'
          style={{ marginHorizontal: 10, marginTop: 10 }}
          onChangeText={handleSearch}
        />
      }

      {/* arabalar listesi */}
      <FlatList
        data={carList}
        renderItem={(dataItem) => <Car data={dataItem.item} />}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: searchBarVisible ? 70 : 0 }}
      />

    </View>
  )
}

export default CarsScreen

const styles = StyleSheet.create({
})