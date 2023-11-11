import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Appbar } from 'react-native-paper'
import colors from '../../utils/constants/colors';
import MyContext from '../../store';

const Header = (props) => {
    const { back, navigation, options, route } = props;
    const { searchBarVisible, setSearchBarVisible } = useContext(MyContext);

    return (
        <Appbar.Header style={{ backgroundColor: colors.color1 }}>
            {/* geri butonu */}
            {back && <Appbar.BackAction onPress={() => { navigation.goBack() }} iconColor='white' />}

            {/* sayfa başlığı */}
            <Appbar.Content title={options.title} titleStyle={{ color: "white", fontWeight: "bold" }} />

            {/* arama ikonu */}
            {
                route.name == "cars" &&
                <Appbar.Action icon="magnify"
                    onPress={() => {
                        setSearchBarVisible(!searchBarVisible);
                    }}
                    iconColor='white' />
            }

        </Appbar.Header>
    )
}

export default Header

const styles = StyleSheet.create({})