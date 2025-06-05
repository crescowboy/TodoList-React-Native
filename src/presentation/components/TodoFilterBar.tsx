import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type FilterType = 'all' | 'completed' | 'pending';

interface Props {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export default function TodoFilterBar({ filter, setFilter }: Props) {
  return (
    <View style={styles.filterBar}>
      <TouchableOpacity
        style={[styles.filterBtn, filter === 'all' && styles.filterBtnActive]}
        onPress={() => setFilter('all')}
      >
        <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>Todas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filterBtn, filter === 'pending' && styles.filterBtnActive]}
        onPress={() => setFilter('pending')}
      >
        <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>Pendientes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filterBtn, filter === 'completed' && styles.filterBtnActive]}
        onPress={() => setFilter('completed')}
      >
        <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>Completadas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#e3eafc',
    marginHorizontal: 4,
  },
  filterBtnActive: {
    backgroundColor: '#1976d2',
  },
  filterText: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#fff',
  },
});
