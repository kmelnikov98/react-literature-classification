import React from 'react'
import "../styles/chip.css"

const Chip = ({ label }) => {
  return (
    <div>
        <div class="chip">
            <div class="chip-content"> { label } </div>
        </div>
    </div>
  )
}

export default Chip