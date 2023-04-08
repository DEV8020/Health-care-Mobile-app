import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

const FilterFollowups = ({ selectedStatus, setSelectedStatus }) => {
  const filterOptions = ["All", "pending", "completed", "cancelled"];

  return (
    <View style={styles.filterContainer}>
      <Picker
        selectedValue={selectedStatus}
        // style={{ backgroundColor: "white",borderTopRadius: 20, }}
        style={{ backgroundColor: "white", width:50, }}
        itemStyle={{ color: "blue", fontSize: 18, borderStartRadius: 20 }}
        onValueChange={(itemValue) => setSelectedStatus(itemValue)}
      >
        {filterOptions.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flex: 0.5,
    height: 10,
    width: "50%",
    marginTop: 20,
    left: 95,
  },

  filterPicker: {
    borderWidth: 1,
    borderColor: "#2797F0",
    borderRadius: 20,
    backgroundColor: "white",
  },
});

export default FilterFollowups;
