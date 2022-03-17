import React, { useEffect, useRef, useState } from 'react'
import { Paragraph, ReadMoreWrapper, Caret } from './styled/index'
import { BREAKPOINTS } from './styled/mediaBreakPoints'

export const ReadMoreToggler = ({
  children,
  mobileBreakLines,
  desktopBreakLines,
  topGradient,
  bottomGradient,
  buttonColor,
  readMoreText="Read more",
  readLessText="Read less"
}) => {
  const [readMore, setReadMore] = useState(false)
  const [isParagraphExceed, setIsParagraphExceed] = useState(false)
  const paragraphRef = useRef()
  const isOverflow = isParagraphExceed && !readMore
  const [paragraphCollapseHeight, setParagraphCollapseHeight] = useState()
  const [paragraphScrollHeight, setParagraphScrollHeight] = useState()
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
    setParagraphCollapseHeight(calculatedParagraphHeight)
    const scrollHeight = paragraphRef.current?.scrollHeight
    setParagraphScrollHeight(scrollHeight)
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

  const ReadMoreButton = () =>
    isParagraphExceed && (
      <ReadMoreWrapper onClick={toggleHandler} buttonColor={buttonColor}>
        <Caret collapse={isOverflow} />
        {readMore ? readLessText : readMoreText}
      </ReadMoreWrapper>
    )

  return (
    <div>
      <Paragraph
        collapse={isOverflow}
        paragraphHeight={readMore ? `${paragraphScrollHeight}px` : `${paragraphCollapseHeight}px`}
        gradientColor={isOverflow ? gradientColor : false}
        ref={paragraphRef}
      >
        {children}
      </Paragraph>
      <ReadMoreButton />
    </div>
  )
}
