import React from 'react'
import { connect } from 'react-redux'
import './Inventory.css'

class Inventory extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedProgramon: props.programons[0],
    }
  }

  render() {
    const { programons, close } = this.props
    const { selectedProgramon } = this.state

    return (
      <div className="Inventory x4s">
        <div className="Inventory-close" onClick={close}>
          ×
        </div>
        <div className="Inventory-programon y8s">
          <div className="Inventory-programon-programons x8s">
            {programons.map(programon => (
              <div
                key={programon.name}
                onClick={() => this.setState({ selectedProgramon: programon })}
                className={`Inventory-programon-programons-item ${selectedProgramon === programon ? 'Inventory-programon-programons-item_selected' : ''} y8 no-select`}
              >
                <img
                  className="Inventory-programon-programons-item-avatar"
                  src={programon.avatarSource}
                  alt=""
                />
                <div className="Inventory-programon-programons-item-name">
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

const mapsStateToProps = s => ({
  programons: s.programons,
})

export default connect(mapsStateToProps)(Inventory)
