import RobotFigure from './RobotFigure'

export function Nova({ children, ...props }) {
  return (
    <RobotFigure name="Nova" color="#087aff" accentColor="#56b3ff" content={children} {...props}>
      {(ids) => (
        <>
          <g>
            <path d="M65 174c-24 0-37 18-31 37 5 16 23 23 42 16l16-15-27-38Zm90 0c24 0 37 18 31 37-5 16-23 23-42 16l-16-15 27-38Z" fill={`url(#${ids.body})`} />
            <path d="M48 187c-12 3-18 16-12 27 5 9 15 11 24 7m124-34c12 3 18 16 12 27-5 9-15 11-24 7" stroke="var(--robot-accent)" strokeWidth="5" strokeLinecap="round" />
            <path d="M50 205c-3 15 4 24 16 26l8-11m96-15c3 15-4 24-16 26l-8-11" fill="var(--robot-color)" />
            <path d="M110 42c-51 0-83 36-83 87 0 46 31 77 83 77s83-31 83-77c0-51-32-87-83-87Z" fill={`url(#${ids.body})`} stroke="var(--robot-accent)" strokeOpacity=".7" strokeWidth="3" />
            <path d="M110 70c-34 0-57 18-57 44v15c0 19 15 34 34 34h46c19 0 34-15 34-34v-15c0-26-23-44-57-44Z" fill="var(--robot-face)" />
            <path d="M78 119c5-13 17-16 25-5m14 5c5-13 17-16 25-5" stroke="#fff7ef" strokeWidth="5" strokeLinecap="round" />
            <path d="M97 183h26" stroke="var(--robot-accent)" strokeWidth="5" strokeLinecap="round" />
            <circle cx="110" cy="183" r="11" fill={`url(#${ids.sparkle})`} />
            <path d="M98 209v16m24-16v16" stroke="var(--robot-color)" strokeWidth="18" strokeLinecap="round" />
            <path d="M92 226h12m24 0h12" stroke="var(--robot-accent)" strokeWidth="4" strokeLinecap="round" />
          </g>
          <g fill="none" stroke="#148cff" strokeWidth="3" strokeLinecap="round">
            <path d="m38 58-9-9m17 4-2-13m-16 30-12-2" />
            <path d="M185 184c17 12 19 27 11 39" opacity=".8" />
          </g>
          <circle cx="196" cy="219" r="8" fill="var(--robot-face)" stroke="#148cff" strokeWidth="3" />
          <path d="M193 219h6m-3-3v6" stroke="#148cff" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </RobotFigure>
  )
}

export default Nova
