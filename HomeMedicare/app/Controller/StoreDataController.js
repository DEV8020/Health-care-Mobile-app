import storeObj from "../Store/storeDataService";



const DATA = [
  {
    follow_up_id: "1",
    title: "Patient 1",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
    doctor_remark:"Check Sugar"
    
  },
  {
    follow_up_id: "2",
    title: "Patient 2",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
    doctor_remark:"Check Sugar"
  },
  {
    follow_up_id: "3",
    title: "Patient 3",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
    doctor_remark:"Check Sugar"
  },
  {
    follow_up_id: "4",
    title: "Patient 4",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
    doctor_remark:"Check Sugar"
  },
  {
    follow_up_id: "5",
    title: "Patient 5",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
    doctor_remark:"Check Sugar"
  },
  {
    follow_up_id: "6",
    title: "Patient 6",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
  },
  {
    follow_up_id: "7",
    title: "Patient 7",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
  },
  {
    follow_up_id: "8",
    title: "Patient 8",
    name: "ABC",
    address: "ABC",
    status: "pending",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
  },
  {
    follow_up_id: "9",
    title: "Patient 9",
    name: "ABC",
    address: "ABC",
    status: "completed",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
  },
  {
    follow_up_id: "10",
    title: "Patient 10",
    name: "ABC",
    address: "ABC",
    status: "completed",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
  },
  {
    follow_up_id: "11",
    title: "Patient 11",
    name: "ABC",
    address: "ABC",
    status: "cancelled",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
  },
  {
    follow_up_id: "12",
    title: "Patient 12",
    name: "ABC",
    address: "ABC",
    status: "completed",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
  },
  {
    follow_up_id: "13",
    title: "Patient 13",
    name: "ABC",
    address: "ABC",
    status: "cancelled",
    date: "03-04-2023",
    last_sync_date:"03-04-2023",
  },
];

const StoreDataController = () => {
  storeObj.storeData("Followups", DATA);

  storeObj.getData("Followups").then((data) => {
    if (data !== null) {
      console.log(data);
      return true;
    } else {
      console.log("empty");
      return false;
    }
  });
};
export default StoreDataController;
