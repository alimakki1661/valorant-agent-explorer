import { useEffect, useRef } from 'react'
import agentTips from '../data/agentTips'

function AgentDetails({ agent, onClose }) {
  const tips = agentTips[agent.displayName]
  const closeButtonRef = useRef(null)
  const openerRef = useRef(null)

  // Move keyboard focus into the popup when it opens, and hand it back to
  // whatever opened it (the agent card) when it closes.
  useEffect(() => {
    if (!openerRef.current) openerRef.current = document.activeElement
    closeButtonRef.current.focus()
    return () => openerRef.current?.focus()
  }, [])

  function closeFromBackdrop(event) {
    event.preventDefault() // stop the browser from moving focus on mousedown
    onClose()
  }

  useEffect(() => {
    function closeWithEscape(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeWithEscape)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', closeWithEscape)
      document.body.classList.remove('modal-open')
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={closeFromBackdrop}>
      <section
        className="agent-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="agent-name"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="close-button"
          type="button"
          onClick={onClose}
          aria-label="Close agent details"
        >
          ×
        </button>
        <div className="modal-hero">
          <img src={agent.fullPortraitV2 ?? agent.fullPortrait ?? agent.displayIcon} alt="" />
          <div>
            <p className="eyebrow">{agent.role?.displayName}</p>
            <h2 id="agent-name">{agent.displayName}</h2>
            <p>{agent.description}</p>
          </div>
        </div>
        <div className="ability-section">
          <p className="eyebrow">Ability kit</p>
          <div className="ability-list">
            {agent.abilities.map((ability) => (
              <article className="ability" key={`${ability.slot}-${ability.displayName}`}>
                <div className="ability-icon">
                  {ability.displayIcon ? <img src={ability.displayIcon} alt="" /> : <span>V</span>}
                </div>
                <div>
                  <h3>{ability.displayName}</h3>
                  <p>{ability.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        {tips && (
          <aside className="personal-tips" aria-labelledby="ali-take">
            <p className="eyebrow">Personal strategy</p>
            <h3 id="ali-take">Ali’s take</h3>
            {tips.map((item) => (
              <p key={item.ability}>
                <strong>{item.ability}:</strong> {item.tip}
              </p>
            ))}
          </aside>
        )}
      </section>
    </div>
  )
}

export default AgentDetails
