import React from 'react'
import { connect } from 'react-redux'
import './Inventory.css'

class Inventory extends React.Component {

  render() {
    const { programons, close } = this.props

    return (
      <div className="Inventory x4s">
        <div className="Inventory-close" onClick={close}>
          ×
        </div>
        <div className="Inventory-programon y8s">
          <div className="Inventory-programon-programons x8sb">
            {programons.map(programon => (
              <div className="Inventory-programon-programons-item y8" key={programon.name}>
                <img className="Inventory-programon-programons-item-avatar" src={programon.avatarSource} />
                <div className="Inventory-programon-programons-item-name">
                  {programon.name}
                </div>
              </div>
            ))}
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
