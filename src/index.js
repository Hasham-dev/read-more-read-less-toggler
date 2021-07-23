import React, { useEffect, useRef, useState } from 'react'
import { Paragraph, ReadMoreWrapper, Caret } from './styled/index'
import { BREAKPOINTS } from './styled/mediaQueries'

export const ReadMoreToggler = ({
  children,
  mobileBreakLines,
  desktopBreakLines,
  topGradient,
  bottomGradient,
  buttonColor
}) => {
  const [readMore, setReadMore] = useState(false)
  const [isParagraphExceed, setIsParagraphExceed] = useState(false)
  const paragraphRef = useRef()
  const isOverflow = isParagraphExceed && !readMore
  const [paragraphHeight, setParagraphHeight] = useState()
  const [childrenScrollHeight, setChildrenScrollHeight] = useState()
  const gradientColor = (topGradient && bottomGradient) ? `linear-gradient(to top,${topGradient},${bottomGradient})` : 'linear-gradient(to top,#FFFFFF,#25232363)'

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
    const definedMobileBreakLines = mobileBreakLines ?? 5
    const definedDesktopBreakLines = desktopBreakLines ?? 3
    const calculatedAcceptableLines = (isMobileBreakpoint ? definedMobileBreakLines : definedDesktopBreakLines)
    const calculatedParagraphHeight = calculatedAcceptableLines * lineHeight
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
      <ReadMoreWrapper onClick={toggleHandler} buttonColor={buttonColor}>
        <Caret collapse={isOverflow} />
        {readMore ? 'READ LESS' : 'READ MORE'}
      </ReadMoreWrapper>
    )

  return (
    <div>
      <Paragraph
        collapse={isOverflow}
        paragraphHeight={readMore ? `${childrenScrollHeight}px` : `${paragraphHeight}px`}
        gradientColor={isOverflow ? gradientColor : false}
        ref={paragraphRef}
      >
        {children}
      </Paragraph>
      <ReadMoreTextToggler />
    </div>
  )
}
