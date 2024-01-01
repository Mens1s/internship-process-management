interface StepItem {
  title: string;
  description: string;
}

const getStepItems = (
  processStatus: string,
  isRejected: boolean,
  dictionary: any
): StepItem[] => {
  const defaultItems: StepItem[] = [
    {
      title: dictionary.student,
      description: dictionary.applied,
    },
    {
      title: dictionary.internshipCommision,
      description: isRejected
        ? dictionary.rejected
        : processStatus === "PRE1"
        ? dictionary.pending
        : dictionary.approved,
    },
    {
      title: dictionary.department,
      description:
        processStatus !== "PRE2" && processStatus !== "PRE1"
          ? dictionary.approved
          : dictionary.pending,
    },
    {
      title: dictionary.faculty,
      description: processStatus.includes("PRE")
        ? dictionary.pending
        : dictionary.approved,
    },
    {
      title: dictionary.deanery,
      description: processStatus.includes("PRE")
        ? dictionary.pending
        : dictionary.approved,
    },
  ];

  if (processStatus === "IN1") {
    defaultItems[1].description = dictionary.applicationApproved;
    defaultItems[2].description = dictionary.approved;
    defaultItems[3].description = dictionary.approved;
    defaultItems[4].description = dictionary.approved;
  }

  return defaultItems;
};

export { getStepItems };
