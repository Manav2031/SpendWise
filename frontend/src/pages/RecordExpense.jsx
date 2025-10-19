import React, { useState } from 'react'
import { api } from '../api'

export default function RecordExpense(){
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('misc')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try{
      await api.post('/transactions', { amount: Number(amount), category, note, userId: 'default-user' })
      setMessage('Saved ✓')
      setAmount('')
      setNote('')
    }catch(err){
      setMessage('Failed to save')
    }
  }

  return (
    <div className="record-page">
      <h2>Record Daily Expense</h2>
      <form onSubmit={submit} className="record-form">
        <label>Amount (₹)
          <input value={amount} onChange={e=>setAmount(e.target.value)} required />
        </label>
        <label>Category
          <select value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="misc">Misc</option>
            <option value="food">Food</option>
            <option value="coffee">Coffee</option>
            <option value="transport">Transport</option>
          </select>
        </label>
        <label>Note
          <input value={note} onChange={e=>setNote(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
      <div>{message}</div>
    </div>
  )
}
