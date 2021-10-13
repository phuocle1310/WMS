import React from "react";
const Students = () => {
  const students = [
    { id: 1, name: "Kim Yến" },
    { id: 2, name: "Hữu Phước" },
  ];
  return (
    <div>
      {students.length > 0
        ? students.map((item) => {
            return <h1>{item.name}</h1>;
          })
        : "Danh sách rỗng"}
    </div>
  );
};
export default Students;
