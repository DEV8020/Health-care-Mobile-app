//Supervisor Menu Options API Child URL Keys...
const getFieldWorkerAPIChildURLKeys = () => {
  return {
    fieldWorkerGetFollowupsAPIKey:
      "fieldworker/getFollowUpsForFieldWorkerMobile/",
    // supervisorGetFieldWorkerListAPIKey: "supervisor/getFieldWorkers/",
    // supervisorGetFieldWorkerFollowUpListAPIKey:
    //   "supervisor/getFollowUpsForFieldWorker/",
    // supervisorGetUnassignedPatientsListAPIKey: "supervisor/unassignedPatients/",
    // supervisorAssignFollowUpAPIKey: "supervisor/assignFollowUp/",
    // supervisorGetFieldWorkerAssignedPatientsAPIKey:
    //   "supervisor/getPatientsByFieldWorker/",
    // supervisorUpdateFieldWorkerAPIKey: "supervisor/updateFieldWorker",
  };
};

const APIURLUtilities = {
  getFieldWorkerAPIChildURLKeys,
  //   getAPIChildURLKeys,
  //   getSuperAdminAPIChildURLKeys,
  //   getAdminAPIChildURLKeys,
  //   getFrontDeskAPIChildURLKeys,
  //   getDoctorAPIChildURLKeys,
  //   getSupervisorAPIChildURLKeys,
};

export default APIURLUtilities;
