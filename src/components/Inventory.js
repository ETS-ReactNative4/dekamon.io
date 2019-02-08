import React from 'react'
import { connect } from 'react-redux'
import './Inventory.css'

class Inventory extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedProgramon: props.monsters[0],
    }
  }

  render() {
    const { monsters, close } = this.props
    const { selectedProgramon } = this.state

    return (
      <div className="Inventory x4s">
        <div className="Inventory-close" onClick={close}>
          ×
        </div>
        <div className="Inventory-programon y8s">
          <div className="Inventory-programon-monsters x8s">
            {monsters.map(programon => (
              <div
                key={programon.name}
                onClick={() => this.setState({ selectedProgramon: programon })}
                className={`Inventory-programon-monsters-item ${selectedProgramon === programon ? 'Inventory-programon-monsters-item_selected' : ''} y8 no-select`}
              >
                <img
                  className="Inventory-programon-monsters-item-avatar"
                  src={programon.avatarSource}
                  alt=""
                />
                <div className="Inventory-programon-monsters-item-name">
                  {programon.name}
                </div>
              </div>
            ))}
          </div>
          <div className="Inventory-programon-lead">
            {selectedProgramon.name}
          </div>
        </div>
        <div className="Inventory-inventory">
          Inventory
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  monsters: s.monsters,
})

export default connect(mapStateToProps)(Inventory)
