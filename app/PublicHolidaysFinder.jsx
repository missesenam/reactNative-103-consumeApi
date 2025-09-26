import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function HolidaysFinder() {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  // holidays
  const [holidays, setHolidays] = useState([]);
  const router = useRouter();

  const findHolidays = async ({ year, country }) => {
    try {
      const res = await fetch(
        `https://date.nager.at/api/v3/publicholidays/${year}/${country}`
      );
      const data = await res.json();
      console.log(data);
      setHolidays(data);
      // 🚀 navigate and pass data
      router.push({
        pathname: "/HolidaysResults",
        params: { holidays: JSON.stringify(data) }, // must stringify
      });
    } catch (error) {
      console.error(error);
      alert("Failed to fetch holidays. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* App Intro */}
      <Text style={styles.title}>🌍 Public Holidays Finder</Text>
      <Text style={styles.subtitle}>
        Enter a country and year to see holidays
      </Text>

      {/* Country Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter country code (e.g., US)"
        value={country}
        onChangeText={setCountry}
      />

      {/* Year Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter year (e.g., 2025)"
        keyboardType="numeric"
        value={year}
        onChangeText={setYear}
      />

      {/* Button */}
      <Button
        title="Find Holidays"
        onPress={() => findHolidays({ year, country })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
