import RobotFigure from './RobotFigure'

export function Echo({ children, ...props }) {
  return (
    <RobotFigure name="Echo" color="#20bd79" accentColor="#72f0ae" content={children} {...props}>
      {(ids) => (
        <>
          <g>
            <path d="M58 177c-22 1-32 18-23 35 8 14 26 17 44 7l10-20-31-22Zm104 0c22 1 32 18 23 35-8 14-26 17-44 7l-10-20 31-22Z" fill={`url(#${ids.body})`} />
            <path d="M77 57c-8-11-5-23 4-26 10-4 17 7 17 22m28 4c0-15 7-26 17-22 9 3 12 15 4 26" fill="var(--robot-color)" stroke="var(--robot-accent)" strokeWidth="3" />
            <path d="M110 49c-48 0-78 34-78 82 0 47 30 78 78 78s78-31 78-78c0-48-30-82-78-82Z" fill={`url(#${ids.body})`} stroke="var(--robot-accent)" strokeOpacity=".8" strokeWidth="3" />
            <path d="M53 116c4-23 25-37 57-37s53 14 57 37v12c0 18-14 32-32 32H85c-18 0-32-14-32-32v-12Z" fill="var(--robot-face)" />
            <path d="M73 119c6-11 17-12 25 0m24 0c8-12 19-11 25 0" stroke="#eafff2" strokeWidth="5" strokeLinecap="round" />
            <path d="M92 179c10 9 26 9 36 0" stroke="#063f2b" strokeWidth="4" strokeLinecap="round" />
            <circle cx="110" cy="183" r="4" fill="#063f2b" />
            <path d="M75 205v20m70-20v20" stroke="var(--robot-color)" strokeWidth="17" strokeLinecap="round" />
            <path d="M50 177c-13 2-19 14-13 25m146-25c13 2 19 14 13 25" stroke="var(--robot-color)" strokeWidth="15" strokeLinecap="round" />
            <path d="M68 185c13 11 27 15 42 15m42-15c-13 11-27 15-42 15" stroke="var(--robot-accent)" strokeOpacity=".75" strokeWidth="3" strokeLinecap="round" />
          </g>
          <path d="m174 57 5-11m3 13 8-8m-3 16 11-3" stroke="#73ffc0" strokeWidth="3" strokeLinecap="round" />
          <circle cx="190" cy="184" r="9" fill="#062c1c" stroke="#4be69a" strokeWidth="3" />
          <path d="M186 184h8m-4-4v8" stroke="#4be69a" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </RobotFigure>
  )
}

export default Echo
