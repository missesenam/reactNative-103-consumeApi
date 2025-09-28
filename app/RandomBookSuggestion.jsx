import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/RandomBookSuggestion/BookCard"; // adjust path if needed

const RandomBookSuggestion = () => {
  const [books, setBooks] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [page, setPage] = useState(0); // pagination: start index
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // stop when no more books

  // 🔹 fetch books with pagination
  const fetchBooks = async () => {
    if (loading || !hasMore) return; // avoid duplicate requests

    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=fiction&startIndex=${page}&maxResults=10`
      );

      if (res.data.items && res.data.items.length > 0) {
        setBooks((prev) => [...prev, ...res.data.items]); // append new results
        setPage((prev) => prev + 10); // increase page by 10
      } else {
        setHasMore(false); // no more books available
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📚 Book Suggestions</Text>

      <FlatList
        data={books}
        renderItem={({ item }) => (
          <BookCard
            item={item}
            isExpanded={expanded[item.id] || false}
            toggleExpand={toggleExpand}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchBooks} // 🔹 load more when reaching end
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#333" /> : null
        }
      />
    </View>
  );
};

export default RandomBookSuggestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#333",
  },
});
