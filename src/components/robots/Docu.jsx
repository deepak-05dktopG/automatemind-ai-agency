import RobotFigure from './RobotFigure'

export function Docu({ children, ...props }) {
  return (
    <RobotFigure name="Docu" color="#773de0" accentColor="#b788ff" content={children} {...props}>
      {(ids) => (
        <>
          <g>
            <path d="M62 177c-23-1-34 16-26 33 6 14 25 19 44 10l13-20-31-23Zm96 0c23-1 34 16 26 33-6 14-25 19-44 10l-13-20 31-23Z" fill={`url(#${ids.body})`} />
            <path d="M110 47c-47 0-79 33-79 81 0 49 29 78 79 78s79-29 79-78c0-48-32-81-79-81Z" fill={`url(#${ids.body})`} stroke="var(--robot-accent)" strokeOpacity=".8" strokeWidth="3" />
            <path d="M55 105c0-21 20-35 55-35s55 14 55 35v22c0 17-13 30-30 30H85c-17 0-30-13-30-30v-22Z" fill="var(--robot-face)" />
            <ellipse cx="88" cy="116" rx="6" ry="10" fill="#f8f0ff" />
            <ellipse cx="132" cy="116" rx="6" ry="10" fill="#f8f0ff" />
            <path d="M82 177c18-8 38-8 56 0v41c-18 8-38 8-56 0v-41Z" fill="#171326" stroke="#a779ff" strokeWidth="3" />
            <path d="M94 189h22m-22 9h29m-29 9h18" stroke="#c5a5ff" strokeWidth="3" strokeLinecap="round" />
            <path d="m60 216 23-18m77 18-23-18" stroke="var(--robot-color)" strokeWidth="17" strokeLinecap="round" />
            <path d="M77 212v13m66-13v13" stroke="var(--robot-color)" strokeWidth="16" strokeLinecap="round" />
          </g>
          <path d="M175 52h18v25h-18z" fill="#160b27" stroke="#b65cff" strokeWidth="3" strokeLinejoin="round" />
          <path d="M179 60h10m-10 5h10m-10 5h7" stroke="#dfadff" strokeWidth="2" strokeLinecap="round" />
          <path d="m184 46 3-4 3 4" stroke="#d484ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M37 194c-9 15-4 27 7 32" stroke="#a97aff" strokeWidth="2" strokeLinecap="round" opacity=".7" />
        </>
      )}
    </RobotFigure>
  )
}

export default Docu
