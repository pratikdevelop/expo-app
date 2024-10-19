import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, TextInput, Button, HelperText, Menu } from 'react-native-paper';

const TagInput = ({ tags, onTagRemove, onTagAdd } :any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTags, setFilteredTags] = useState(tags);
  const [visible, setVisible] = useState(false);

  const onSearchChange = (text: string) => {
    setSearchTerm(text);
    if (text) {
      const filtered = tags.filter((tag: { name: string; }) => tag.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredTags(filtered);
    } else {
      setFilteredTags(tags);
    }
  };

  const createNewTag = () => {
    // Logic to create a new tag
    console.log('Create new tag logic here');
  };

  const handleTagSelect = (tag: any) => {
    onTagAdd(tag);
    setSearchTerm('');
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chipContainer}>
        {tags.map((tag: { _id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
          <Chip key={tag._id} onClose={() => onTagRemove(tag)}>
            {tag.name}
          </Chip>
        ))}
      </View>

      <TextInput
        label="Search Tags"
        value={searchTerm}
        onChangeText={onSearchChange}
        mode="outlined"
        style={styles.input}
        onFocus={() => setVisible(true)}
      />

      {visible && (
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={<Button onPress={() => setVisible(true)}>Select Tag</Button>}
        >
          {filteredTags.length > 0 ? (
            filteredTags.map((tag: { _id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
              <Menu.Item key={tag._id} onPress={() => handleTagSelect(tag)} title={tag.name} />
            ))
          ) : (
            <Menu.Item title="No matching tags found." />
          )}
          <Menu.Item onPress={createNewTag} title="Create new tag" />
        </Menu>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
});

export default TagInput;
