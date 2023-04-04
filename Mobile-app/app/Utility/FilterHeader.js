import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const FilterHeader = ({ setFilterStatus }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterPress = (filterStatus) => {
    setSelectedFilter(filterStatus);
    setFilterStatus(filterStatus);
  };

  return (
    <View style={styles.filterHeader}>
      <TouchableOpacity
        style={[
          styles.filterOption,
          selectedFilter === "All" && styles.selectedFilterOption,
        ]}
        onPress={() => handleFilterPress("All")}
      >
        <Text>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterOption,
          selectedFilter === "pending" && styles.selectedFilterOption,
        ]}
        onPress={() => handleFilterPress("pending")}
      >
        <Text>Pending</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterOption,
          selectedFilter === "completed" && styles.selectedFilterOption,
        ]}
        onPress={() => handleFilterPress("completed")}
      >
        <Text>Completed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterOption,
          selectedFilter === "cancelled" && styles.selectedFilterOption,
        ]}
        onPress={() => handleFilterPress("cancelled")}
      >
        <Text>Cancelled</Text>
      </TouchableOpacity>
    </View>
  );
};

styles = StyleSheet.create({
    
});
export default FilterHeader;
