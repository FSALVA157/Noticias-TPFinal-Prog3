import React from 'react'

const Message = ({tipo='is-warning', mensaje='sin mensaje'}) => {
  return (
    <div className={`notification ${tipo}`} style={{display:'block'}}>
    <button className="delete"></button>
    <p>{mensaje}</p>
  </div>
  )
}

export default Message
