import React, { useState } from 'react'
import Search from 'Components/atoms/search'
import { truncate } from 'Util/helpers'
import pagination from 'Util/hooks/pagination'
import PaginationComponent from 'Components/atoms/paginationComponent'
import Api from 'Util/api'
import Loading from 'Components/atoms/loading'

import './index.scss'

export default function NewsUser () {
  const [loading, setLoading] = useState(false)
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

  return (
    <div className='news-content'>
      <h1 className='title'>Notícias</h1>

      <div className='news-header'>
        <div className='search-container'>
          <Search
            placeholder='Pesquisar notícia'
          />
        </div>
      </div>

      <div className='news'>
        <Loading show={loading} />
        {list.map(elm => {
          return (
            <div key={elm.id} className='content'>
              <h1>{elm.strTitulo}</h1>
              <div
                className='item'
                dangerouslySetInnerHTML={{ __html: truncate(elm.strDescricao, 1200) }}
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
