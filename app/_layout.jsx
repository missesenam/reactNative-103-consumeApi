import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

const LayoutLayout = ({ children }) => {
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    /* <Stack screenOptions={{ headerShown: false }} /> */
    // </SafeAreaView>
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
        },
        drawerLabelStyle: {
          fontWeight: "bold",
        },
        // header background
        headerStyle: {
          backgroundColor: "#ffffffff",
        },
        headerTintColor: "#000000ff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          justifyContent: "flex-end",
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="PublicHolidaysFinder"
        options={{
          drawerLabel: "Search Holidays",
          title: "Holydays finder",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="CheapFlightsTracker"
        options={{
          drawerLabel: "Cheap Flights",
          title: "Cheap Flights Tracker",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="airplane-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="RandomBookSuggestion"
        options={{
          drawerLabel: "Random Books",
          title: "Books",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default LayoutLayout;
