import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import HolidaysResults from "../components/PublicHolidaysFinder/HolidaysResults";

export default function HolidaysFinder() {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [countries, setCountries] = useState([]);

  // Fetch countries from the API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://date.nager.at/api/v3/AvailableCountries"
        );
        const data = await res.json();
        setCountries(data);
        if (data.length > 0) setCountry(data[0].countryCode); // default selection
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const findHolidays = async ({ year, country }) => {
    try {
      const res = await fetch(
        `https://date.nager.at/api/v3/publicholidays/${year}/${country}`
      );
      const data = await res.json();
      setHolidays(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch holidays. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <Text style={styles.title}>🌍 Public Holidays Finder</Text>
        <Text style={styles.subtitle}>Select a country and enter a year</Text>

        {/* Country Dropdown */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={country}
            onValueChange={(value) => setCountry(value)}
            style={styles.picker}
          >
            {countries.map((c) => (
              <Picker.Item
                key={c.countryCode}
                label={c.name}
                value={c.countryCode}
              />
            ))}
          </Picker>
        </View>

        {/* Year Input */}
        <TextInput
          style={styles.input}
          placeholder="Year (e.g., 2025)"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />

        <Button
          title="Find Holidays"
          onPress={() => findHolidays({ year, country })}
        />
      </View>

      <View style={{ flex: 6 }}>
        <HolidaysResults holidays={holidays} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
});
