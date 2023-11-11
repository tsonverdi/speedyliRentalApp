import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as Yup from "yup";
import { useFormik } from 'formik';
import Helper from '../components/common/helper';
import axios from 'axios';
import { getUser, login } from '../api/user-service';
import Toast from 'react-native-toast-message';
import * as SecureStore from "expo-secure-store";
import MyContext from '../store';

const LoginScreen = () => {
  const [isPassSecure, setIsPassSecure] = useState(true);
  const { setMyUser } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const initialValues = {
    email: "",
    password: ""
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  })

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      // login işlemi
      const response = await login(values);

      // tokenın cihazda tutulması
      await SecureStore.setItemAsync("token", response.data.token);

      // kullanıcı bilgileri çekilmesi
      const responseUser = await getUser();

      // merkezi state'e eklenmesi
      setMyUser(responseUser.data);

      setLoading(false);

      Toast.show({
        type: "success",
        text1: "Logged in successfully."
      });

    }
    catch (error) {
      setLoading(false);

      Toast.show({
        type: "error",
        text1: error.response.data.message
      });
    }

    // console.log(values);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View style={styles.container}>
      <TextInput
        label={"Email"}
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        style={styles.textInput}
        keyboardType='email-address'
      />

      <Helper input={formik.errors.email} />

      <TextInput
        label={"Password"}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        style={styles.textInput}
        secureTextEntry={isPassSecure}
        right={
          <TextInput.Icon
            icon={isPassSecure ? "eye-off-outline" : "eye-outline"}
            onPress={() => {
              setIsPassSecure(!isPassSecure);
            }}
          />
        }
      />

      <Helper input={formik.errors.password} />


      <Button
        mode='contained'
        style={styles.button}
        onPress={formik.handleSubmit}
        loading={loading}
        disabled={loading}
      >
        LOGIN
      </Button>

      <Button mode='outlined' style={styles.button} onPress={() => navigation.navigate("register")}>
        Create New Account
      </Button>

    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  textInput: {
    marginVertical: 10,
  },
  button: {
    marginTop: 30,
  }
})