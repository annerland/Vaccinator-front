import React, { useEffect, useState } from 'react'
import Modal from 'Components/molecules/genericModal'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { path } from 'ramda'
import { useSelector } from 'react-redux'

const GetInfoVaccine = (props) => {
  const [vaccines, setVaccines] = useState([])
  const modal = useSelector(({ modals }) => modals.generic)

  useEffect(() => {
    const data = path(['body', 'data', 'vaccines'], modal)
    setVaccines(data)
  }, [modal])

  return (
    <Modal id='get-info-vaccine' height={400} width={532}>
      <div className='modal-container'>
        <h2 className='title'>Vacinas disponíveis</h2>
        {(vaccines || []).map(elm => {
          return (
            <div key={elm} className='info-content'>
              <div className='flex-content'>
                <p className='bold-text'>Nome:</p>
                <p>{elm.strNome}</p>
              </div>
              <div className='flex-content'>
                <p className='bold-text'>Data de aplicação:</p>
                <p>{elm.dtAplicacao}</p>
              </div>
            </div>)
        })}
      </div>
    </Modal>
  )
}

GetInfoVaccine.propTypes = {
  onChange: PropTypes.func
}

export default GetInfoVaccine
