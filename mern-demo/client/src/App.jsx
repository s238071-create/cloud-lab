import { useEffect, useState } from "react";

function App() {

  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
  fetch(
    "http://localhost:5000/api/students"
  )
    .then(res => res.json())
    .then(data => setStudents(data))
    .catch(error => console.error(error));
}, []);

  const addStudent = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/students",
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

const updateStudent = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/students/${editingId}`,
      {
        method: "PUT",
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

    if (!response.ok) {
      throw new Error(data.error || "Cập nhật sinh viên thất bại");
    }

    alert("Cập nhật sinh viên thành công");

    setStudents(
      students.map(student =>
        student._id === editingId ? data : student
      )
    );

    setStudentId("");
    setName("");
    setEmail("");
    setEditingId(null);

  } catch (error) {
    console.error("PUT ERROR:", error);
    alert("Có lỗi xảy ra: " + error.message);
  }
};

const startEdit = (student) => {
  setEditingId(student._id);
  setStudentId(student.studentId);
  setName(student.name);
  setEmail(student.email);
};

const deleteStudent = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/students/${id}`,
      {
        method: "DELETE"
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Xóa sinh viên thất bại");
    }

    alert("Xóa sinh viên thành công");

    setStudents(
      students.filter(student => student._id !== id)
    );

  } catch (error) {
    console.error("DELETE ERROR:", error);
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


      <button onClick={editingId ? updateStudent : addStudent}>
   {editingId ? "Cập nhật sinh viên" : "Thêm sinh viên"}
</button>



      <h2>Danh sách sinh viên</h2>


      <table border="1">

        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>


        <tbody>

          {
            students.map(student => (

              <tr key={student._id}>

                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
  <button onClick={() => startEdit(student)}>
    Sửa
  </button>

  <button onClick={() => deleteStudent(student._id)}>
    Xóa
  </button>
</td>

              </tr>

            ))
          }

        </tbody>

      </table>


    </div>
  );
}

export default App;
