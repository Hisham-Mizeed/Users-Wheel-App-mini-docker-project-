import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [rotation, setRotation] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState(null);

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4CAF50",
    "#9C27B0",
    "#FF9800",
    "#00BCD4",
    "#E91E63"
  ];

  const fetchUsers = () => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add
  const addUser = async () => {
    if (!name) return;

    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    setName("");
    fetchUsers();
  };

  // Delete
  const deleteUser = async (id) => {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE"
    });

    fetchUsers();
  };

  // 🎡 Spin (FIXED LOGIC)
  const spinWheel = () => {
    if (users.length === 0) return;

    const angle = 360 / users.length;

    // 🎯 اختار الفائز الأول
    const randomIndex = Math.floor(Math.random() * users.length);

    // خلي السهم يقف في نص الجزء
    const targetAngle = randomIndex * angle + angle / 2;

    // لفات زيادة + التوجيه
    const spins = 6;
    const finalRotation =
      rotation +
      spins * 360 +
      (360 - targetAngle); // دي أهم سطر 🔥

    setRotation(finalRotation);

    setTimeout(() => {
      setWinnerIndex(randomIndex);

      const winnerName = users[randomIndex]?.name;

      const keep = window.confirm(
        `🎉 Winner: ${winnerName}\n\nOK = Keep\nCancel = Delete`
      );

      if (!keep) {
        deleteUser(users[randomIndex].id);
        setWinnerIndex(null);
      }
    }, 4500);
  };

  const angle = users.length ? 360 / users.length : 0;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>🎡 Users Wheel</h1>

      {/* Add */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={addUser}>Add</button>

      {/* Users */}
      <div style={{ marginTop: "20px" }}>
        {users.map(user => (
          <div key={user.id}>
            {user.name}
            <button
              onClick={() => deleteUser(user.id)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white"
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Pointer */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderTop: "30px solid black",
          margin: "20px auto"
        }}
      />

      {/* Wheel */}
      <div
        style={{
          margin: "0 auto",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          border: "6px solid black",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `rotate(${rotation}deg)`,
            transition: "transform 4.5s ease-out"
          }}
        >
          {/* 🟢 حالة 1 */}
          {users.length === 1 && (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: colors[0],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "20px"
              }}
            >
              {users[0].name}
            </div>
          )}

          {/* 🟢 حالة 2 */}
          {users.length === 2 &&
            users.map((user, i) => (
              <div
                key={user.id}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "50%",
                  top: i === 0 ? 0 : "50%",
                  background: colors[i],
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold"
                }}
              >
                {user.name}
              </div>
            ))}

          {/* 🟢 3+ */}
          {users.length > 2 &&
            users.map((user, index) => {
              const rotate = index * angle;
              const isWinner = index === winnerIndex;

              return (
                <div
                  key={user.id}
                  style={{
                    position: "absolute",
                    width: "50%",
                    height: "50%",
                    background: colors[index % colors.length],
                    transform: `rotate(${rotate}deg) skewY(${90 - angle}deg)`,
                    transformOrigin: "100% 100%"
                  }}
                >
                  {/* Highlight overlay */}
                  {isWinner && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(255,215,0,0.4)"
                      }}
                    />
                  )}

                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: `rotate(${angle / 2}deg)`,
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    {user.name}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Spin */}
      <button onClick={spinWheel} style={{ marginTop: "20px" }}>
        Spin 🎡
      </button>

      {/* Winner */}
      {winnerIndex !== null && (
        <h2 style={{ marginTop: "20px", color: "green" }}>
          🎉 Winner: {users[winnerIndex]?.name}
        </h2>
      )}
    </div>
  );
}

export default App;