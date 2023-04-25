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
          selectedStatus === false && styles.selectedFilterOption,
        ]}
        onPress={() => handleFilterPress(false)}
      >
        <Text
          style={[
            styles.filterOptionText,
            selectedStatus === false && styles.selectedFilterOptionText,
          ]}
        >
          Pending
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterOption,
          selectedStatus === true && styles.selectedFilterOption,
        ]}
        onPress={() => handleFilterPress(true)}
      >
        <Text
          style={[
            styles.filterOptionText,
            selectedStatus === true && styles.selectedFilterOptionText,
          ]}
        >
          Completed
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
    </View>
  );
};

styles = StyleSheet.create({
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    width: 400,
    height: 65,
  },
  filterOption: {
    width: 110,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#2B79E3",
    marginRight: 10,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
  },
  selectedFilterOption: {
    backgroundColor: "#2B79E3",
  },
  filterOptionText: {
    textAlign: "center",
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
