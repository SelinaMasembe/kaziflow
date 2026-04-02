import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    setLoading(true);
    await axios.post(`${API}/tasks`, { title, description: desc });
    setTitle(""); setDesc("");
    await fetchTasks();
    setLoading(false);
  };

  const toggleTask = async (task) => {
    await axios.put(`${API}/tasks/${task.id}`, { completed: !task.completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description || "");
  };

  const saveEdit = async (taskId) => {
    if (!editTitle.trim()) return;
    await axios.put(`${API}/tasks/${taskId}`, { title: editTitle, description: editDesc });
    setEditingId(null);
    fetchTasks();
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40, color: "#fff" }}>
          <h1 style={{ fontSize: 42, fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.5px", color: "#10b981" }}>
            KaziFlow ✓
          </h1>
          <p style={{ fontSize: 16, margin: 0, opacity: 0.9, color: "#e2e8f0" }}>Task Manager</p>
          {tasks.length > 0 && (
            <p style={{ fontSize: 13, margin: "8px 0 0 0", opacity: 0.8, color: "#cbd5e1" }}>
              {completedCount} of {tasks.length} completed
            </p>
          )}
        </div>

        {/* Add task form */}
        <div style={{
          background: "#1e293b",
          border: "1px solid #334155",
          padding: 24,
          borderRadius: 16,
          marginBottom: 24,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
        }}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
            placeholder="Enter task title"
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 10,
              border: "2px solid #334155",
              fontSize: 15,
              marginBottom: 12,
              boxSizing: "border-box",
              transition: "border-color 0.2s",
              outline: "none",
              background: "#0f172a",
              color: "#f1f5f9"
            }}
            onFocus={e => e.target.style.borderColor = "#10b981"}
            onBlur={e => e.target.style.borderColor = "#334155"}
          />
          <input
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Add a description (optional)"
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 10,
              border: "2px solid #334155",
              fontSize: 14,
              marginBottom: 16,
              boxSizing: "border-box",
              color: "#cbd5e1",
              transition: "border-color 0.2s",
              outline: "none",
              background: "#0f172a"
            }}
            onFocus={e => e.target.style.borderColor = "#10b981"}
            onBlur={e => e.target.style.borderColor = "#334155"}
          />
          <button
            onClick={addTask}
            disabled={loading || !title.trim()}
            style={{
              width: "100%",
              background: loading || !title.trim() ? "#475569" : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 600,
              cursor: loading || !title.trim() ? "not-allowed" : "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: loading || !title.trim() ? "none" : "0 10px 25px rgba(16, 185, 129, 0.4)"
            }}
            onMouseEnter={e => !loading && !title.trim() === false && (e.target.style.transform = "translateY(-2px)")}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            {loading ? "Adding..." : "+ Add Task"}
          </button>
        </div>

        {/* Task list */}
        <div>
          {tasks.length === 0 ? (
            <div style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "2px dashed rgba(16, 185, 129, 0.3)",
              borderRadius: 12,
              padding: 40,
              textAlign: "center",
              color: "#10b981"
            }}>
              <p style={{ fontSize: 18, margin: 0 }}>✨ No tasks yet</p>
              <p style={{ fontSize: 14, margin: "8px 0 0 0", opacity: 0.8 }}>Add one above to get started!</p>
            </div>
          ) : (
            tasks.map((task, idx) => (
              <div key={task.id} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: "16px 20px",
                borderRadius: 12,
                marginBottom: 12,
                background: task.completed
                  ? "rgba(16, 185, 129, 0.15)"
                  : "#1e293b",
                border: task.completed
                  ? "2px solid rgba(16, 185, 129, 0.5)"
                  : "2px solid #334155",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s ease",
                animation: `slideIn 0.3s ease-out ${idx * 0.05}s both`
              }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                  style={{
                    width: 20,
                    height: 20,
                    cursor: "pointer",
                    marginTop: 2,
                    accentColor: "#10b981"
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  {editingId === task.id ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <input
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        style={{
                          padding: "8px 12px",
                          borderRadius: 8,
                          border: "2px solid #10b981",
                          fontSize: 15,
                          fontWeight: 600,
                          outline: "none",
                          background: "#0f172a",
                          color: "#f1f5f9"
                        }}
                      />
                      <input
                        value={editDesc}
                        onChange={e => setEditDesc(e.target.value)}
                        placeholder="Add description"
                        style={{
                          padding: "8px 12px",
                          borderRadius: 8,
                          border: "2px solid #10b981",
                          fontSize: 13,
                          outline: "none",
                          background: "#0f172a",
                          color: "#cbd5e1"
                        }}
                      />
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => saveEdit(task.id)}
                          style={{
                            flex: 1,
                            padding: "8px 12px",
                            background: "#10b981",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                          onMouseEnter={e => e.target.style.background = "#059669"}
                          onMouseLeave={e => e.target.style.background = "#10b981"}
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={{
                            flex: 1,
                            padding: "8px 12px",
                            background: "#475569",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                          onMouseEnter={e => e.target.style.background = "#64748b"}
                          onMouseLeave={e => e.target.style.background = "#475569"}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{
                        fontSize: 15,
                        fontWeight: 600,
                        textDecoration: task.completed ? "line-through" : "none",
                        color: task.completed ? "#10b981" : "#f1f5f9",
                        wordBreak: "break-word",
                        cursor: "pointer",
                        padding: "4px 8px",
                        borderRadius: 6,
                        transition: "all 0.2s"
                      }}
                        onMouseEnter={e => e.target.style.background = "rgba(16, 185, 129, 0.15)"}
                        onMouseLeave={e => e.target.style.background = "transparent"}
                        onClick={() => startEdit(task)}
                        title="Click to edit"
                      >
                        {task.title}
                      </div>
                      {task.description && (
                        <div style={{
                          fontSize: 13,
                          color: task.completed ? "#6b7280" : "#cbd5e1",
                          marginTop: 6,
                          lineHeight: 1.4,
                          wordBreak: "break-word",
                          cursor: "pointer",
                          padding: "4px 8px",
                          borderRadius: 6,
                          transition: "all 0.2s"
                        }}
                          onMouseEnter={e => e.target.style.background = "rgba(16, 185, 129, 0.15)"}
                          onMouseLeave={e => e.target.style.background = "transparent"}
                          onClick={() => startEdit(task)}
                          title="Click to edit"
                        >
                          {task.description}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    background: "rgba(239, 68, 68, 0.2)",
                    border: "none",
                    cursor: "pointer",
                    color: "#ff6b6b",
                    fontSize: 20,
                    lineHeight: 1,
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    flexShrink: 0
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = "rgba(239, 68, 68, 0.4)";
                    e.target.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = "rgba(239, 68, 68, 0.2)";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}