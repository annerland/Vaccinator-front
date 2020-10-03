import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import './index.scss'

const PaginationComponent = (props) => {
  const [pages, setPages] = useState([])

  function getPagesData () {
    const data = []

    if (props.current >= 3 && props.current <= props.total - 3) {
      data.push({ page: 1 })
      data.push({ page: props.total })

      return data
    } else {
      for (let i = 1; i <= props.total; i++) {
        data.push({ page: i, class: [i === props.current ? 'active' : ''] })
      }

      return data
    }
  }

  useEffect(() => {
    setPages(getPagesData())
  }, [props.current, props.total])

  const handleAction = (elm) => {
    props.onChange(elm.page)
  }

  const handleLeft = () => {
    if (props.current > 1) {
      props.onChange(props.current - 1)
    }
  }

  const handleRight = () => {
    if (props.current < props.total) {
      props.onChange(props.current + 1)
    }
  }

  if (props.total < 2) return null

  return (
    <div className='pagination'>
      <i className='icon-double-arrow-left' onClick={handleLeft} />
      {pages.map((elm, i) =>
        <div onClick={() => handleAction(elm)} key={i} className={Classnames('item', elm.class)}>
          {elm.page}
        </div>
      )}
      <i className='icon-double-arrow-right' onClick={handleRight} />
    </div>
  )
}

PaginationComponent.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number,
  onChange: PropTypes.func
}

PaginationComponent.defaultProps = {
  total: 1,
  current: 1
}

export default PaginationComponent
