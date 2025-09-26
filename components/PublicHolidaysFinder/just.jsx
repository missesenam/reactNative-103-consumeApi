import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

const PublicHolidaysFinder = () => {
  const [holidays, setHolidays] = useState([]);
  const [inputHoliday, setInputHoliday] = useState("");

  const getHolidays = async () => {
    const res = await fetch(
      "https://date.nager.at/api/v3/publicholidays/2025/AT"
    );
    const data = await res.json();
    console.log(data);
    setHolidays(data);
  };

  useEffect(() => {
    getHolidays();
  }, []);
  return (
    <View style={styles.container}>
      <Text>PublicHolidaysFinder</Text>
      <View style={{ padding: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Type something..."
          value={inputHoliday}
        />
      </View>
      <FlatList
        data={holidays}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.item}>{item.name}</Text>
            <Text style={styles.item}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PublicHolidaysFinder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f8f9fa",
  },
  input: {
    height: 50,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#4CAF50",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});
