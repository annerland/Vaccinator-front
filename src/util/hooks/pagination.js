import { useState, useCallback, useEffect } from 'react'
import { path } from 'ramda'

export default function usePagination (iniOffset = 6, array = [], order = true) {
  const [content, setContent] = useState(array)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [list, setList] = useState([])
  const [offset, setOffset] = useState(6)

  useEffect(() => {
    setOffset(iniOffset)
  }, [iniOffset])

  useEffect(() => {
    setPages(Math.ceil(path(['length'], content) / offset))
    updateList()
  }, [content, offset])

  useEffect(() => {
    updateList()
  }, [page])

  const updateList = useCallback(() => {
    const p = page - 1

    let data = [...(content || [])]

    // if (order) {
    //   data = data.sort((a, b) => {
    //     return new Date(b.created_at) - new Date(a.created_at)
    //   })
    // }

    setList(data.slice((p * offset), (p * offset) + offset))
  }, [page, content, offset])

  return [
    page,
    pages,
    list,
    setPage,
    setContent,
    setOffset
  ]
}
