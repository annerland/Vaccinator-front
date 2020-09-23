import React, { useState } from 'react'
import Search from 'Components/atoms/search'
import { truncate } from 'Util/helpers'
import pagination from 'Util/hooks/pagination'
import PaginationComponent from 'Components/atoms/paginationComponent'
import Api from 'Util/api'
import { useTranslation } from 'react-i18next'
import Loading from 'Components/atoms/loading'
import { useHistory } from 'react-router-dom'

// eslint-disable-next-line import/no-absolute-path
import '../index.scss'

export default function NewsUser () {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('News')
  const history = useHistory()
  const [
    page,
    pages,
    list,
    setPage,
    setContent
  ] = pagination(5)

  const fetchNews = async () => {
    setLoading(true)
    const res = await Api.News.list()
    setContent(res[0])
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
