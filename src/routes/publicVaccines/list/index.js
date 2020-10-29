import React, { useState, useEffect } from 'react'
import Search from 'Components/atoms/search'
import ListItem from 'Components/atoms/listItem'
import CreateVaccineModal from 'Modals/createVaccine'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { truncate } from 'Util/helpers'
import { search } from 'fast-fuzzy'
import Loading from 'Components/atoms/loading'
import pagination from 'Util/hooks/pagination'
import PaginationComponent from 'Components/atoms/paginationComponent'
import Api from 'Util/api'

import './index.scss'

export default function PublicVaccines () {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('Vaccines')
  const [originalData, setOriginalData] = useState([])
  const history = useHistory()
  const [
    page,
    pages,
    list,
    setPage,
    setContent
  ] = pagination(5)

  const handleOnSearch = (query) => {
    if (!query) return setContent(originalData)
    if (query === null) return ''

    const res = search(query || '', originalData, { keySelector: (obj) => obj.strNome || '' })
    setContent(res)
  }

  const reorder = (data = []) => {
    const safeLow = (str = '') => {
      if (str === null) return ''
      return str.toLowerCase()
    }

    return data.sort((a, b) => {
      if (safeLow(a.strNome) < safeLow(b.strNome)) return -1
      if (safeLow(a.strNome) > safeLow(b.strNome)) return 1
      return 0
    })
  }

  useEffect((query) => {
    handleOnSearch(query)
  }, [])

  const fetchVaccine = async () => {
    setLoading(true)
    const res = await Api.Vaccine.list(1)
    setContent(reorder(res.vacinas))
    setOriginalData(res.vacinas)
    setLoading(false)
  }

  useEffect(() => {
    fetchVaccine()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [pages])

  const redirect = (elm) => {
    history.push(`/vaccines/${elm.id}`)
  }

  const redirectHome = () => {
    history.push('/')
  }

  return (
    <div className='vaccines-content'>
      <div className='back'>
        <i onClick={redirectHome} className='icon-arrow-back' />
        <p onClick={redirectHome}>Back</p>
      </div>

      <h1 className='title-public'>{t('title')}</h1>

      <div className='vaccines-header'>
        <div className='search-container'>
          <Search
            placeholder={t('search')}
            onChange={handleOnSearch}
          />
        </div>
      </div>

      <Loading show={loading} />
      {list.map(elm =>
        <ListItem
          key={elm.id}
          onClick={() => redirect(elm)}
          name={elm.strNome}
          description={truncate(elm.strSobre, 70)}
        />
      )}
      <PaginationComponent
        total={pages}
        current={page}
        onChange={setPage}
      />
      <CreateVaccineModal onChange={fetchVaccine} />
    </div>
  )
}
