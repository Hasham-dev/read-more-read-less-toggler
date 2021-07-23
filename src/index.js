import React, { useEffect, useRef, useState } from 'react'
import { Paragraph, ReadMoreWrapper, Caret } from './styled/index'
import { BREAKPOINTS } from './styled/mediaQueries'

export const ReadMoreToggler = ({ children }) => {
  const [readMore, setReadMore] = useState(false)
  const [isParagraphExceed, setIsParagraphExceed] = useState(false)
  const paragraphRef = useRef()
  const isOverflow = isParagraphExceed && !readMore
  const [paragraphHeight, setParagraphHeight] = useState()
  const [childrenScrollHeight, setChildrenScrollHeight] = useState()

  const toggleHandler = () => {
    setReadMore(!readMore)
  }

  const calculateHeight = () => {
    // dynamically set the current div line-height
    const elementStyle = window.getComputedStyle(paragraphRef.current)
    const calculatedLineHeight = elementStyle.getPropertyValue('line-height')

    // remove px from line-height value
    const lineHeight = parseInt(calculatedLineHeight, 10)

    // isoverflow calculations
    const isMobileBreakpoint = window.innerWidth < BREAKPOINTS.mobile
    const calculatedParagraphHeight = (isMobileBreakpoint ? 5 : 3) * lineHeight
    setParagraphHeight(calculatedParagraphHeight)
    const scrollHeight = paragraphRef.current?.scrollHeight
    setChildrenScrollHeight(scrollHeight)
    const isParagraphHeightGreater = calculatedParagraphHeight < scrollHeight
    setIsParagraphExceed(isParagraphHeightGreater)
  }

  useEffect(() => {
    window.addEventListener('resize', calculateHeight)
    calculateHeight()

    // to remove event listner on unmount
    return () => {
      window.removeEventListener('resize', calculateHeight)
    }
    // eslint-disable-next-line
  }, []);

  const ReadMoreTextToggler = () =>
    isParagraphExceed && (
      <ReadMoreWrapper onClick={toggleHandler}>
        <Caret collapse={isOverflow} />
        {readMore ? 'READ LESS' : 'READ MORE'}
      </ReadMoreWrapper>
    )

  return (
    <div>
      <Paragraph
        collapse={isOverflow}
        paragraphHeight={readMore ? `${childrenScrollHeight}px` : `${paragraphHeight}px`}
        ref={paragraphRef}
      >
        {children}
      </Paragraph>
      <ReadMoreTextToggler />
    </div>
  )
}
