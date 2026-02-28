import { useState } from "react";

function App() {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    team: "",
    role: "",
    runs: "",
    wickets: "",
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.team) {
      alert("Please fill required fields");
      return;
    }

    if (editId) {
      const updatedPlayers = players.map((player) =>
        player.id === editId ? { ...player, ...formData } : player,
      );
      setPlayers(updatedPlayers);
      setEditId(null);
    } else {
      const newPlayer = {
        id: Date.now(),
        ...formData,
      };
      setPlayers([...players, newPlayer]);
    }

    setFormData({
      name: "",
      team: "",
      role: "",
      runs: "",
      wickets: "",
    });
  };

  const handleDelete = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const handleEdit = (player) => {
    setFormData(player);
    setEditId(player.id);
  };

  return (
    <div className="container">
      <h1>🏏 Cricket Player CRUD App</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          placeholder="Player Name"
          value={formData.name}
          onChange={handleChange}
        />

        <select name="team" value={formData.team} onChange={handleChange}>
          <option value="">Select Team</option>
          <option value="India">India</option>
          <option value="Nepal">Nepal</option>
          <option value="England">England</option>
          <option value="Australia">Australia</option>
        </select>

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="All-Rounder">All-Rounder</option>
          <option value="Wicketkeeper">Wicketkeeper</option>
        </select>

        <input
          name="runs"
          placeholder="Runs"
          value={formData.runs}
          onChange={handleChange}
        />

        <input
          name="wickets"
          placeholder="Wickets"
          value={formData.wickets}
          onChange={handleChange}
        />

        <button type="submit">{editId ? "Update Player" : "Add Player"}</button>
      </form>

      <div className="player-list">
        {players.length === 0 ? (
          <p>No players added yet.</p>
        ) : (
          players.map((player) => (
            <div key={player.id} className="card">
              <h3>{player.name}</h3>
              <p>
                <strong>Team:</strong> {player.team}
              </p>
              <p>
                <strong>Role:</strong> {player.role}
              </p>
              <p>
                <strong>Runs:</strong> {player.runs}
              </p>
              <p>
                <strong>Wickets:</strong> {player.wickets}
              </p>

              <div className="buttons">
                <button onClick={() => handleEdit(player)}>Edit</button>
                <button
                  onClick={() => handleDelete(player.id)}
                  className="delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
