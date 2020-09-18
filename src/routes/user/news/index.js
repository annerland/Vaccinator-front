import React, { useState } from 'react'
import Search from 'Components/atoms/search'
import Api from 'Util/api'

import './index.scss'

export default function NewsUser () {
  const [news, setNews] = useState([])

  const fetchNews = async () => {
    const res = await Api.News.list()
    setNews(res[0])
  }

  useState(() => {
    fetchNews()
  }, [])

  console.log(news)

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
        {news.map(elm => {
          return (
            <div key={elm.id} className='content'>
              <h1>{elm.strTitulo}</h1>
              <div
                className='item'
                dangerouslySetInnerHTML={{ __html: elm.strDescricao }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
