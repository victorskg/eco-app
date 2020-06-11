import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, ImageBackground } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import IBGEService from "../../services/IBGEService";

function Home() {
  const navigation = useNavigation();
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedState, setSelectedState] = useState("0");
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    IBGEService.getStates().then((response) =>
      setStates(
        response.data.map((s: any) => ({
          label: `${s.sigla} - ${s.nome}`,
          value: s.sigla,
        }))
      )
    );
  }, []);

  function findStateCities(state: string) {
    if (state !== "0") {
      IBGEService.getStateCities(state).then((response) => {
        setCities(
          response.data.map((city: any) => ({
            label: city.nome,
            value: city.nome,
          }))
        );
      });
    }
  }

  function handleStateChange(state: string) {
    setSelectedState(state);
    findStateCities(state);
  }

  function handleCityChange(city: string) {
    setSelectedCity(city);
  }

  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View>
        <RNPickerSelect
          style={{ viewContainer: styles.select }}
          placeholder={{ label: "Selecione um estado", value: "0" }}
          onValueChange={handleStateChange}
          value={selectedState}
          items={states}
        />
        <RNPickerSelect
          style={{ viewContainer: styles.select }}
          placeholder={{ label: "Selecione uma cidade", value: "0" }}
          onValueChange={handleCityChange}
          value={selectedCity}
          items={cities}
        />
      </View>

      <View style={styles.footer}>
        <RectButton
          style={styles.button}
          onPress={() =>
            navigation.navigate("Point", {
              selectedCity,
              selectedState,
            })
          }
        >
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" size={24} color="#FFF" />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    padding: 8,
  },

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

export default Home;
