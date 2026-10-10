import RobotFigure from './RobotFigure'

export function Link({ children, ...props }) {
  return (
    <RobotFigure name="Link" color="#ef3347" accentColor="#ff8490" content={children} {...props}>
      {(ids) => (
        <>
          <g>
            <path d="M60 175c-23 0-34 16-27 33 6 15 24 20 43 11l14-20-30-24Zm100 0c23 0 34 16 27 33-6 15-24 20-43 11l-14-20 30-24Z" fill={`url(#${ids.body})`} />
            <path d="M110 49c-47 0-78 34-78 82 0 47 29 77 78 77s78-30 78-77c0-48-31-82-78-82Z" fill={`url(#${ids.body})`} stroke="var(--robot-accent)" strokeWidth="3" />
            <path d="M53 104c0-22 21-36 57-36s57 14 57 36v24c0 18-14 32-32 32H85c-18 0-32-14-32-32v-24Z" fill="var(--robot-face)" />
            <path d="M73 119c5-11 15-13 24-3m26 0c9-10 19-8 24 3" stroke="#ffe4dd" strokeWidth="5" strokeLinecap="round" />
            <path d="M98 151c7 4 17 4 24 0" stroke="#ff7884" strokeWidth="3" strokeLinecap="round" />
            <path d="M110 50V34" stroke="var(--robot-color)" strokeWidth="8" strokeLinecap="round" />
            <circle cx="110" cy="24" r="11" fill="var(--robot-color)" stroke="var(--robot-accent)" strokeWidth="3" />
            <path d="M75 206v19m70-19v19" stroke="var(--robot-color)" strokeWidth="17" strokeLinecap="round" />
            <path d="M53 179c-12 2-17 13-12 23m138-23c12 2 17 13 12 23" stroke="var(--robot-color)" strokeWidth="17" strokeLinecap="round" />
            <path d="M86 188h48" stroke="#ff9da4" strokeOpacity=".75" strokeWidth="3" strokeLinecap="round" />
          </g>
          <path d="m179 77 7 3 4 7-3 7-7 3-7-3-4-7 3-7 7-3Z" stroke="#ff7884" strokeWidth="3" strokeLinejoin="round" />
          <path d="m179 84 5 5m0-5-5 5" stroke="#ff7884" strokeWidth="2" strokeLinecap="round" />
          <path d="m176 111 8 8m0-8-8 8" stroke="#ff8a94" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </RobotFigure>
  )
}

export default Link
