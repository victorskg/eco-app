import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
} from "react-native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import { RectButton } from "react-native-gesture-handler";
import PointService from "../../services/PointService";
import IPoint from "../../models/point";
import * as MailComposer from "expo-mail-composer";

function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as { pointId: number };
  const [selectedPoint, setSelectedPoint] = useState<IPoint>();

  useEffect(() => {
    PointService.getPointById(routeParams.pointId).then((resp) =>
      setSelectedPoint(resp.data)
    );
  }, []);

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: "Interesse na coleta de resíduos",
      recipients: [selectedPoint?.email || "default@email.com"],
    });
  }

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${selectedPoint?.whatsapp}&text=Tenho interesse na coleta de resíduos`
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Icon
            name="arrow-left"
            size={20}
            color="#34cb79"
            onPress={() => navigation.goBack()}
          ></Icon>
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{
            uri: selectedPoint?.image,
          }}
        />
        <Text style={styles.pointName}>{selectedPoint?.name}</Text>
        <Text style={styles.pointItems}>
          {selectedPoint?.items.map((i) => i.title).join(", ")}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text
            style={styles.addressContent}
          >{`${selectedPoint?.city}, ${selectedPoint?.uf}`}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#FFF" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: "#322153",
    fontSize: 28,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
  },

  pointItems: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: "#322153",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },

  addressContent: {
    fontFamily: "Roboto_400Regular",
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#999",
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: "48%",
    backgroundColor: "#34CB79",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
  },
});

export default Detail;
