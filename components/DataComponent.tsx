import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const CommentsSection = ({ password, loading, newComment, setNewComment, addComment }: any) => {
  const renderComment = ({ item }: any) => (
    <View style={styles.comment}>
      <Text style={styles.commentAuthor}>
        {item.createdBy?.name || item.userName}
      </Text>
      <Text style={styles.commentContent}>{item.content}</Text>
      <Text style={styles.commentDate}>
        {new Date(item.createdAt).toLocaleString()} {/* More detailed timestamp */}
      </Text>
    </View>
  );

  return (
    <View style={styles.commentsContainer}>
      <Text style={styles.sectionTitle}>Comments</Text>
      <View style={styles.tagsWrapper}>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : password?.comments?.length > 0 ? (
          <FlatList
            data={password.comments}
            renderItem={renderComment}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContainer}
          />
        ) : (
          <Text style={styles.noComments}>No comments yet.</Text>
        )}
      </View>

      <View style={styles.addCommentContainer}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          style={styles.input}
          placeholder="Add a new comment"
          multiline
          numberOfLines={2} // Set a maximum height
        />
        <TouchableOpacity
          onPress={addComment}
          style={styles.addButton}
        >
          <Text style={styles.postButtonText}>Post Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentsContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagsWrapper: {
    marginBottom: 16,
  },
  flatListContainer: {
    flexGrow: 1,
    gap: 5,
  },
  comment: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentContent: {
    marginVertical: 4,
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
  },
  noComments: {
    color: '#888',
    textAlign: 'center',
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 10,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommentsSection;
