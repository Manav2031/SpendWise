import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Dashboard(){
  const [txs, setTxs] = useState([])
  const [analysis, setAnalysis] = useState(null)
  const [agentResult, setAgentResult] = useState(null)

  useEffect(()=>{
    fetchData()
  },[])

  async function fetchData(){
    try{
      const t = await api.get('/transactions?userId=default-user')
      setTxs(t.data)
      const a = await api.get('/transactions/analysis?userId=default-user')
      setAnalysis(a.data)
      const ar = await api.post('/agent/run', { userId: 'default-user' })
      setAgentResult(ar.data.result)
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <section>
        <h3>Recent expenses</h3>
        <ul>
          {txs.slice(0,10).map(tx => (
            <li key={tx._id}>₹{tx.amount} — {tx.category} — {new Date(tx.date).toLocaleString()}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Analysis</h3>
        {analysis ? (
          <div>
            <p>Total last 30 days: ₹{analysis.totalLast30Days}</p>
            <p>Recommended monthly save: ₹{analysis.recommendedMonthlySave}</p>
            <p>Top leak: {analysis.topLeak ? `${analysis.topLeak.category} — ₹${analysis.topLeak.amount}` : 'N/A'}</p>
            <ul>
              {analysis.quickWins.map((q,i)=>(<li key={i}>{q}</li>))}
            </ul>
          </div>
        ) : <p>Loading analysis...</p>}
      </section>
      <section>
        <h3>Agent Proposal</h3>
        {agentResult ? (
          <div>
            <p>{agentResult.proposal.message}</p>
            <p>Actions:</p>
            <ul>
              {agentResult.actions.map((a,i)=>(<li key={i}>{a.type} — {a.reason || a.suggestion || ''}</li>))}
            </ul>
          </div>
        ) : <p>Loading agent...</p>}
      </section>
    </div>
  )
}
