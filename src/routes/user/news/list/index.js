import React, { useState } from 'react'
import Search from 'Components/atoms/search'
import { truncate } from 'Util/helpers'
import pagination from 'Util/hooks/pagination'
import PaginationComponent from 'Components/atoms/paginationComponent'
import Api from 'Util/api'
import { useTranslation } from 'react-i18next'
import Loading from 'Components/atoms/loading'
import { search } from 'fast-fuzzy'
import { useHistory } from 'react-router-dom'

// eslint-disable-next-line import/no-absolute-path
import '../index.scss'

export default function NewsUser () {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('News')
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

    const res = search(query || '', originalData, { keySelector: (obj) => obj.strTitulo || '' })
    setContent(res)
  }

  const fetchNews = async () => {
    setLoading(true)
    const res = await Api.News.list()
    setContent(res[0])
    setOriginalData(res[0])
    setLoading(false)
  }

  useState(() => {
    fetchNews()
  }, [])

  const redirect = (elm) => {
    history.push(`/user/news/${elm.id}`)
  }

  return (
    <div className='news-content'>
      <h1 className='title'>{t('title')}</h1>

      <div className='news-header'>
        <div className='search-container'>
          <Search
            onChange={handleOnSearch}
            placeholder={t('search')}
          />
        </div>
      </div>

      <div className='news'>
        <Loading show={loading} />
        {list.map(elm => {
          return (
            <div key={elm.id} className='content'>
              <h1 onClick={() => redirect(elm)}>{elm.strTitulo}</h1>
              <div
                className='item'
                dangerouslySetInnerHTML={{ __html: truncate(elm.strDescricao, 1000) }}
              />
            </div>
          )
        })}
      </div>

      <PaginationComponent
        total={pages}
        current={page}
        onChange={setPage}
      />
    </div>
  )
}
