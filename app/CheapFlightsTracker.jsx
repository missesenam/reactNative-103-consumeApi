import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CheapFlightsTracker = () => {
  const [flights, setFlights] = useState([]);

  const fetchFlight = async () => {
    try {
      const res = await axios.get(
        "https://iatrochemical-milagro-superfortunately.ngrok-free.dev/flights"
      );
      setFlights(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    fetchFlight();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {/* Route */}
      <Text style={styles.route}>
        ✈️ {item.from} → {item.to}
      </Text>

      {/* Airline & Price */}
      <Text style={styles.details}>Airline: {item.airline}</Text>
      <Text style={styles.details}>
        Price: ${item.price} {item.currency}
      </Text>

      {/* Date & Times */}
      <Text style={styles.details}>Date: {item.date}</Text>
      <Text style={styles.details}>
        Departure: {item.departureTime} | Arrival: {item.arrivalTime}
      </Text>

      {/* Duration, Stops, Class */}
      <Text style={styles.details}>
        Duration: {item.duration} | Stops: {item.stops}
      </Text>
      <Text style={styles.details}>Class: {item.class}</Text>

      {/* Baggage */}
      <Text style={styles.details}>Baggage: {item.baggage}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Check the Cheapest Flights</Text>
      <FlatList
        data={flights}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CheapFlightsTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingTop: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50",
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  route: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#2980b9",
  },
  details: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
});
