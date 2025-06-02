import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Read = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  const baseUrl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}`)
        if (response.status !== 200) {
          throw new Error('Failed to fetch blogs')
        }
        setData(response.data)
      } catch (error) {
        setError(error.message || "Server interaction failed")
      }
    }
    fetchData()
  }, [])

  if (error) return <p className="text-red-500 text-center mt-4">Error: {error}</p>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Read Blogs</h1>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs available.</p>
      ) : (
        <div className="space-y-6">
          {data.map((blog) => (
            <div key={blog._id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-1">By <span className="font-medium">{blog.author}</span></p>
              <p className="text-gray-700 mb-3">{blog.content}</p>
              <p className="text-xs text-gray-400 text-right">
                {new Date(blog.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Read