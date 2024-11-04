import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_REGION: Region = {
  latitude: -17.792128,
  longitude: -50.919095,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const CheckinScreen = () => {
  const [initialRegion, setInitialRegion] = useState<Region>(DEFAULT_REGION);
  const [orderLocation, setOrderLocation] = useState<Region | null>(null);
  const [isDelivered, setIsDelivered] = useState(false); // Estado para verificar se a entrega foi concluída

  const fetchOrderData = async () => {
    try {
      // Substitua pela URL da sua API
      const response = await Axios.get("http://10.0.2.2:3000/checkin");
      const data = response.data;

      if (data.endereco) {
        fetchOrderLocation(data.endereco);
      } else {
        console.error("Endereço do pedido não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do pedido:", error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderLocation = async (endereco: string) => {
    try {
      const respostaGeocodificacao = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          endereco
        )}&components=locality:Rio%20Verde|administrative_area:GO&key=YOUR_GOOGLE_API_KEY`, // Substitua "YOUR_GOOGLE_API_KEY" pela chave de API válida
      );

      const geocodingData = respostaGeocodificacao.data;

      if (geocodingData.status === "OK" && geocodingData.results.length > 0) {
        const location = geocodingData.results[0].geometry.location;
        setOrderLocation({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        console.error("Erro ao geocodificar o endereço.");
      }
    } catch (error) {
      console.error("Erro ao buscar coordenadas:", error);
    }
  };

  const handleCheckIn = async () => {
    try {
      // Você pode querer incluir mais dados no corpo, dependendo da sua API
      const response = await Axios.post(
        "http://10.0.2.2:3000/concluir-entrega", // Atualize com a URL correta da sua API
        {
          // Dados que você precisa enviar, como ID da entrega ou outros
          message: "Check-in realizado."
        }
      );

      if (response.status === 200) {
        setIsDelivered(true); // Atualiza o estado para indicar que a entrega foi concluída
        Alert.alert("Check-in", "Check-in realizado com sucesso!");
      } else {
        Alert.alert("Erro", "Erro ao concluir a entrega.");
      }
    } catch (error) {
      console.error("Erro ao concluir a entrega:", error);
      Alert.alert("Erro", "Erro ao concluir a entrega.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={orderLocation || initialRegion}>
          {orderLocation && <Marker coordinate={orderLocation} />}
        </MapView>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Check-in" onPress={handleCheckIn} />
        {isDelivered && (
          <Text style={styles.successMessage}>Entrega concluída com sucesso!</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  successMessage: {
    marginTop: 20,
    fontSize: 18,
    color: "green",
    textAlign: "center",
  },
});

export default CheckinScreen;
