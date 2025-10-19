import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import RecordExpense from './pages/RecordExpense'

export default function App(){
  return (
    <div className="app-container">
      <header className="topbar">
        <div className="logo">✅ SpendWise</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/record">Record</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/record" element={<RecordExpense/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </main>
    </div>
  )
}
