export const getEnhancedColumns = (
  columns: any,
  windowWidth: number,
  dictionary: any
) => {
  return columns.map((column: any) => {
    const newColumn = { ...column };

    if (newColumn.title) {
      newColumn.title = dictionary[`${column.title}`];
    }

    if (newColumn.key === "actions") {
      newColumn.width = windowWidth >= 600 ? 140 : 75;
    }

    return newColumn;
  });
};
