import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const HolidaysResults = ({ holidays }) => {
  // if (!holidays.length) {
  //   return null; // don't render anything if empty
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎉 Holidays</Text>
      <FlatList
        data={holidays}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default HolidaysResults;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  listContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    paddingBottom: 50,
  },
  item: {
    backgroundColor: "#fff", // white card
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // android shadow
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2a2a2a",
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
});
