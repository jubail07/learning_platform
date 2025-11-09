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
                    return navigate(`/class/${id}/${response.class[0].classId}`, { replace: true })
                }

                const found = response.class.find(c => c.classId === classId)
                if (found) {
                    setSelectedVideo(found)
                } else {
                    navigate(`/class/${id}/${response.class[0].classId}`, { replace: true })
                }
            } catch (error) {
                console.log(error, 'error in fetch class')
            }
        }
        fetchclass()
    }, [id, classId, navigate])

    //  Function to mark as learned
    const markLearned = async (classId, status) => {
        try {
            const newLearned = !status
            const response = await fetch(`http://localhost:3000/user/${id}/learned/${classId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ learned: newLearned })
            })
            const data = await response.json()

            if (data.success) {
                setClasses(prev => ({
                    ...prev,
                    class: prev.class.map(c =>
                        c.classId === classId ? { ...c, learned: newLearned } : c
                    )
                }))
            }
        } catch (err) {
            console.error('Error marking as learned:', err)
        }
    }

    if (!classes || !selectedVideo) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <div className="dummy"></div>
            <div className='main-container'>
                <div className='p-5'>
                    <h1 className="text-center">{classes.course}</h1>
                    {/* <p className=''>{classes.description}</p> */}
                </div>
                <div className="learning-container">
                    <div className="w-75 border d-flex justify-content-center align-items-center">
                        {selectedVideo.classType === 'youtube' ? (
                            <iframe width="640" height="360" frameBorder="0" src={selectedVideo.classUrl} referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        ) : selectedVideo.classType === 'vimeo' ? (
                            <iframe title="vimeo-player" src={selectedVideo.classUrl} width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe>
                        ) : selectedVideo.classType === 'pdf' ? (
                            <iframe
                                src={selectedVideo.classUrl}
                                width="640"
                                height="360"
                                style={{ border: 'none' }}
                                title="PDF Viewer"
                            ></iframe>
                        ) : null}
                    </div>
                    <div className="video-list">
                        {classes.class.map((url, i) => (
                            <div key={url.classId} className="d-flex align-items-center justify-content-between mb-2">
                                <div
                                    className={`video-thumbnail ${classId === url.classId ? 'active' : ''}`}
                                    onClick={() => navigate(`/class/${id}/${url.classId}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span className='bg-transparent text-dark font-weight-bold'>
                                        Class {i + 1}
                                    </span>
                                </div>

                                <button
                                    onClick={() => markLearned(url.classId, url.learned)}
                                    className={`learn-toggle ${url.learned ? 'active' : ''}`}
                                >
                                    {url.learned && '✓'}
                                </button>
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
