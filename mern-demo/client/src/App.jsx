import { useEffect, useState } from "react";

function App() {

  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
  fetch(
    "https://expert-happiness-jr4v5wvr4r6w25jw9-5000.app.github.dev/api/students"
  )
    .then(res => res.json())
    .then(data => setStudents(data))
    .catch(error => console.error(error));
}, []);

  const addStudent = async () => {
  try {
    const response = await fetch(
      "https://expert-happiness-jr4v5wvr4r6w25jw9-5000.app.github.dev/api/students",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          studentId: studentId,
          name: name,
          email: email
        })
      }
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("DATA:", data);

    if (!response.ok) {
      throw new Error(data.error || "Thêm sinh viên thất bại");
    }

    alert("Thêm sinh viên thành công");

    setStudentId("");
    setName("");
    setEmail("");

    // cập nhật danh sách ngay
    setStudents([...students, data]);

  } catch (error) {
    console.error("POST ERROR:", error);
    alert("Có lỗi xảy ra: " + error.message);
  }
};




  return (
    <div>

      <h1>Quản lý sinh viên</h1>


      <h2>Thêm sinh viên</h2>

      <input
        type="text"
        placeholder="MSSV"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <br/><br/>


      <input
        type="text"
        placeholder="Họ tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br/><br/>


      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br/><br/>


      <button onClick={addStudent}>
  Thêm sinh viên
</button>



      <h2>Danh sách sinh viên</h2>


      <table border="1">

        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
          </tr>
        </thead>


        <tbody>

          {
            students.map(student => (

              <tr key={student._id}>

                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>

              </tr>

            ))
          }

        </tbody>

      </table>


    </div>
  );
}

export default App;