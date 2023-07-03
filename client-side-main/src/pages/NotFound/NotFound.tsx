import React, { useRef, useEffect } from 'react'
import gsap, { Linear } from 'gsap'
import './NotFoundStyles.css'

const NotFoundPage: React.FC = () => {
  const cogWheel1Ref = useRef<HTMLDivElement>(null)
  const cogWheel2Ref = useRef<HTMLDivElement>(null)
  const wrongParaRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const t1 = gsap.timeline()
    const t2 = gsap.timeline()
    const t3 = gsap.timeline()

    t1.to(cogWheel1Ref.current, {
      transformOrigin: '50% 50%',
      rotation: '+=360',
      repeat: -1,
      ease: Linear.easeNone,
      duration: 8,
    })

    t2.to(cogWheel2Ref.current, {
      transformOrigin: '50% 50%',
      rotation: '-=360',
      repeat: -1,
      ease: Linear.easeNone,
      duration: 8,
    })

    t3.fromTo(
      wrongParaRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        stagger: {
          repeat: -1,
          yoyo: true,
        },
      }
    )
  }, [])

  return (
    <div className="containerr">
      <h1 className="first-four">4</h1>
      <div className="cog-wheel1" ref={cogWheel1Ref}>
        <div className="cog1">
          <div className="top"></div>
          <div className="down"></div>
          <div className="left-top"></div>
          <div className="left-down"></div>
          <div className="right-top"></div>
          <div className="right-down"></div>
          <div className="left"></div>
          <div className="right"></div>
        </div>
      </div>

      <div className="cog-wheel2" ref={cogWheel2Ref}>
        <div className="cog2">
          <div className="top"></div>
          <div className="down"></div>
          <div className="left-top"></div>
          <div className="left-down"></div>
          <div className="right-top"></div>
          <div className="right-down"></div>
          <div className="left"></div>
          <div className="right"></div>
        </div>
      </div>

      <h1 className="second-four">4</h1>
      <p className="wrong-para" ref={wrongParaRef}>
        Uh Oh! Page not found!
      </p>
    </div>
  )
}

export default NotFoundPage
