import React, { useState } from 'react'
import Api from 'Util/api'
import Loading from 'Components/atoms/loading'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'
// eslint-disable-next-line import/no-absolute-path
import '../index.scss'

export default function ShowNews () {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('News')
  const [news, setNews] = useState([])
  const params = useParams()
  const history = useHistory()

  const fetchNews = async () => {
    setLoading(true)
    const res = await Api.News.getOne(params.id)
    setNews(res.noticia)
    setLoading(false)
  }

  useState(() => {
    fetchNews()
  }, [])

  const redirectHome = () => {
    history.push('/user/news')
  }

  return (
    <div className='news-content'>
      <div className='back'>
        <i onClick={redirectHome} className='icon-arrow-back' />
        <p onClick={redirectHome}>Back</p>
      </div>
      <h1 className='title'>{t('title')}</h1>

      <div className='news'>
        <Loading show={loading} />
        <div className='content'>
          <h1>{news.strTitulo}</h1>
          <div
            className='item'
            dangerouslySetInnerHTML={{ __html: news.strDescricao }}
          />
        </div>
      </div>
    </div>
  )
}
