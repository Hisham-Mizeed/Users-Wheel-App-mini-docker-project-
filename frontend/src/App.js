import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const API = "http://localhost:3000";

  const fetchUsers = async () => {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!name.trim()) return;

    await fetch(`${API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    setName("");
    fetchUsers();
  };

  // 🎯 FIXED SPIN LOGIC
  const spinWheel = () => {
    if (users.length === 0 || spinning) return;

    setSpinning(true);

    const index = Math.floor(Math.random() * users.length);

    const anglePerItem = 360 / users.length;

    // 🎯 ALWAYS same direction + consistent speed
    const extraSpins = 6 * 360;

    const finalAngle =
      extraSpins + (360 - index * anglePerItem - anglePerItem / 2);

    setRotation((prev) => prev + finalAngle);

    setTimeout(() => {
      setSelected(users[index].name);
      setSpinning(false);
    }, 3500);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>

      <h1>🎡 Wheel</h1>

      {/* ADD USER */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add user"
          style={{ padding: "8px" }}
        />
        <button onClick={addUser} style={{ marginLeft: "10px" }}>
          Add
        </button>
      </div>

      {/* PUSH WHEEL DOWN (fix layout) */}
      <div style={{ marginTop: "40px" }} />

      {/* POINTER */}
      <div style={{ fontSize: "40px" }}>⬇️</div>

      {/* WHEEL */}
      <div
        style={{
          margin: "0 auto",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          position: "relative",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 3.5s cubic-bezier(0.12, 0.8, 0.2, 1)",
        }}
      >
        {/* SVG wheel (perfect 360 distribution) */}
        <svg width="360" height="360" viewBox="0 0 360 360">
          {users.map((u, i) => {
            const angle = (360 / users.length) * i;
            const nextAngle = (360 / users.length) * (i + 1);

            const x1 = 180 + 180 * Math.cos((Math.PI * angle) / 180);
            const y1 = 180 + 180 * Math.sin((Math.PI * angle) / 180);

            const x2 = 180 + 180 * Math.cos((Math.PI * nextAngle) / 180);
            const y2 = 180 + 180 * Math.sin((Math.PI * nextAngle) / 180);

            const largeArc = 0;

            const path = `
              M 180 180
              L ${x1} ${y1}
              A 180 180 0 ${largeArc} 1 ${x2} ${y2}
              Z
            `;

            return (
              <path
                key={u.id}
                d={path}
                fill={i % 2 === 0 ? "#4caf50" : "#2196f3"}
                stroke="#fff"
              />
            );
          })}
        </svg>

        {/* labels */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none"
          }}
        >
          {users.map((u, i) => {
            const angle = (360 / users.length) * i;

            return (
              <div
                key={u.id}
                style={{
                  position: "absolute",
                  transform: `rotate(${angle}deg) translate(120px)`,
                  transformOrigin: "center",
                  fontSize: "12px",
                  color: "white",
                  fontWeight: "bold",
                  width: "80px",
                  textAlign: "center"
                }}
              >
                {u.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* SPIN BUTTON (moved down properly) */}
      <div style={{ marginTop: "50px" }}>
        <button
          onClick={spinWheel}
          disabled={spinning}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          {spinning ? "Spinning..." : "Spin 🎯"}
        </button>
      </div>

      {/* RESULT */}
      {selected && (
        <h2 style={{ marginTop: "20px" }}>
          🎉 {selected}
        </h2>
      )}
    </div>
  );
}

export default App;