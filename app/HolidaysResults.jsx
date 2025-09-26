import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";

const PublicHolidaysFinder = () => {
  // put this on the same page as search holidays
  const { holidays } = useLocalSearchParams();
  const parsed = holidays ? JSON.parse(holidays) : [];

  return (
    <View style={styles.container}>
      <Text>🎉 Holidays</Text>
      <View style={{ padding: 20 }}></View>
      <FlatList
        data={parsed}
        keyExtractor={(item, index) => index.toString()}
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
