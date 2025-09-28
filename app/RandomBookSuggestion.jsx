import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const RandomBookSuggestion = () => {
  const [books, setBooks] = useState([]);
  const [expanded, setExpanded] = useState({}); // track expanded state per book

  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=fiction`
      );
      setBooks(res.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
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

  const renderBook = ({ item }) => {
    const { title, authors, description, imageLinks } = item.volumeInfo;
    const isExpanded = expanded[item.id] || false;

    return (
      <View style={styles.card}>
        {/* Book Cover */}
        {imageLinks?.thumbnail && (
          <Image
            source={{ uri: imageLinks.thumbnail }}
            style={styles.thumbnail}
          />
        )}

        {/* Book Info */}
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          {authors && (
            <Text style={styles.authors}>by {authors.join(", ")}</Text>
          )}

          {/* Description */}
          {isExpanded ? (
            <Text style={styles.description}>
              {description || "No description"}
            </Text>
          ) : (
            <Text style={styles.description} numberOfLines={2}>
              {description || "No description"}
            </Text>
          )}

          {/* Expand/Collapse Button */}
          <TouchableOpacity onPress={() => toggleExpand(item.id)}>
            <Text style={styles.toggle}>
              {isExpanded ? "↑ See less" : "↓ See more"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📚 Book Suggestions</Text>
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  authors: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 6,
    color: "#666",
  },
  description: {
    fontSize: 13,
    color: "#444",
    marginBottom: 6,
  },
  toggle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#007BFF",
  },
});
