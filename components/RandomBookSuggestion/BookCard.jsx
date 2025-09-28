import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const BookCard = ({ item, isExpanded, toggleExpand }) => {
  const { title, authors, description, imageLinks } = item.volumeInfo;

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
        {authors && <Text style={styles.authors}>by {authors.join(", ")}</Text>}

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

export default BookCard;

const styles = StyleSheet.create({
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
