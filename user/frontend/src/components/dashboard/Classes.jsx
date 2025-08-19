import { useParams, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import '../../public/dashboard.css'

function Classes() {
    const { id, classId } = useParams()
    const navigate = useNavigate()
    const [classes, setClasses] = useState(null)
    const [selectedVideo, setSelectedVideo] = useState(null)

    useEffect(() => {
        const fetchclass = async () => {
            try {
                const request = await fetch(`http://localhost:3000/user/${id}`)
                const response = await request.json()

                setClasses(response)

                if (!classId) {
                    return navigate(`/class/${id}/${response.classUrl[0].classId}`, { replace: true })
                }

                const found = response.classUrl.find(c => c.classId === classId)
                if (found) {
                    setSelectedVideo(found)
                } else {
                    navigate(`/class/${id}/${response.classUrl[0].classId}`, { replace: true })
                }
                console.log(response)
            } catch (error) {
                console.log(error, 'error in fetch class')
            }
        }
        fetchclass()
    }, [id, classId, navigate])

    if (!classes || !selectedVideo) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <div className="dummy"></div>
            <div className='main-container'>
                {/* <div className='p-5'>
                    <h1 className="text-center">{classes.course}</h1>
                    <p className=''>{classes.description}</p>
                </div> */}
                <div className="learning-container">
                    <div className="w-75 d-flex justify-content-center align-items-center">
                        {selectedVideo.classType === 'youtube' ? (
                            <iframe width="640" height="360" frameborder="0" src={selectedVideo.url} referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        ) : selectedVideo.classType === 'vimeo' ? (
                            <iframe title="vimeo-player" src={selectedVideo.url} width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe>
                        ) : selectedVideo.classType === 'pdf' ? (
                            <iframe
                                src={selectedVideo.url}
                                width="640"
                                height="360"
                                style={{ border: 'none' }}
                                title="PDF Viewer"
                            ></iframe>
                        ) : null}
                    </div>
                    <div className="video-list">
                        {classes.classUrl.map((url, i) => (
                            <div key={url.classId} className='video-thumbnail' onClick={() => navigate(`/class/${id}/${url.classId}`)}
                            >
                                <p className='bg-transparent text-dark font-weight-bold'>class {i + 1}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <p className='font-weight-bold'>{classes.description}</p>

            </div>
        </>
    )
}

export default Classes
