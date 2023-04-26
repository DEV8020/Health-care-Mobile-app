const AppendUpdatedFlagInList = (list) => {
  console.log(
    "5555555555555555555555555555555555555555555555555555555555555555"
  );
  const modifiedList = list.map((followData) => {
    //console.log({ ...followData, ...{ isFollowUpSynced: false } });
    return { ...followData, ...{ isFollowUpSynced: false } };
  });
  return modifiedList;
};

//console.log(followData)

export default AppendUpdatedFlagInList;
