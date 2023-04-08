import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const FilterHeader = ({ selectedStatus, setSelectedStatus }) => {
  const handleFilterPress = (filterStatus) => {
    setSelectedStatus(filterStatus);
  };

  return (
    <View style={styles.filterHeader}>
      <TouchableOpacity
        style={[
          styles.filterOption,
          selectedStatus === "All" && styles.selectedFilterOption,
        ]}
        onPress={() => handleFilterPress("All")}
      >
        <Text
          style={[
            styles.filterOptionText,
            selectedStatus === "All" && styles.selectedFilterOptionText,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterOption,
          selectedStatus === "pending" && styles.selectedFilterOption,
        ]}
        onPress={() => handleFilterPress("pending")}
      >
        <Text
          style={[
            styles.filterOptionText,
            selectedStatus === "pending" && styles.selectedFilterOptionText,
          ]}
        >
          Pending
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterOption,
          selectedStatus === "completed" && styles.selectedFilterOption,
        ]}
        onPress={() => handleFilterPress("completed")}
      >
        <Text
          style={[
            styles.filterOptionText,
            selectedStatus === "completed" && styles.selectedFilterOptionText,
          ]}
        >
          Completed
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterOption,
          selectedStatus === "cancelled" && styles.selectedFilterOption,
        ]}
        onPress={() => handleFilterPress("cancelled")}
      >
        <Text
          style={[
            styles.filterOptionText,
            selectedStatus === "cancelled" && styles.selectedFilterOptionText,
          ]}
        >
          Cancelled
        </Text>
      </TouchableOpacity>
    </View>
  );
};

styles = StyleSheet.create({
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 400,
    height: 55,
  },
  filterOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#2B79E3",
    marginRight: 10,
    backgroundColor: "white",
   
  },
  selectedFilterOption: {
    backgroundColor: "#2B79E3",
  },
  filterOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2B79E3",
  },
  selectedFilterOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
export default FilterHeader;
