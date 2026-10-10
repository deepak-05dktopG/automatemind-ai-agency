import RobotFigure from './RobotFigure'

export function Aura({ children, ...props }) {
  return (
    <RobotFigure name="Aura" color="#f20b94" accentColor="#ff79cc" content={children} {...props}>
      {(ids) => (
        <>
          <g>
            <path d="M110 54c-45 0-77 34-77 82 0 45 29 73 77 73s77-28 77-73c0-48-32-82-77-82Z" fill={`url(#${ids.body})`} stroke="var(--robot-accent)" strokeWidth="3" />
            <path d="M55 107c0-20 20-32 55-32s55 12 55 32v25c0 17-14 31-31 31H86c-17 0-31-14-31-31v-25Z" fill="var(--robot-face)" />
            <path d="M75 113c0-5 4-9 9-9 6 0 11 8 16 14-5 7-10 14-16 14-5 0-9-4-9-9m50-10c0-5 4-9 9-9 6 0 11 8 16 14-5 7-10 14-16 14-5 0-9-4-9-9" fill="#ff4eaa" stroke="#ff4eaa" strokeWidth="2" strokeLinejoin="round" />
            <path d="M55 168c-20 4-28 19-19 34 8 13 22 15 38 6l18-21-37-19Zm110 0c20 4 28 19 19 34-8 13-22 15-38 6l-18-21 37-19Z" fill={`url(#${ids.body})`} />
            <path d="M78 188c10 15 21 20 32 20s22-5 32-20" stroke="var(--robot-accent)" strokeWidth="9" strokeLinecap="round" />
            <path d="M78 216v11m64-11v11" stroke="var(--robot-color)" strokeWidth="17" strokeLinecap="round" />
            <path d="M44 190c9 13 19 15 31 7m101-7c-9 13-19 15-31 7" stroke="#ff9cdb" strokeWidth="3" strokeLinecap="round" />
          </g>
          <path d="m174 58 4-12m3 14 9-8m-4 17 11-2" stroke="#ff78ca" strokeWidth="3" strokeLinecap="round" />
          <path d="m47 85-5-10m-2 13-9-8" stroke="#ff7acb" strokeWidth="3" strokeLinecap="round" />
          <path d="M184 202c9 10 9 19 4 26" stroke="#ff5eb8" strokeWidth="2" strokeLinecap="round" opacity=".7" />
        </>
      )}
    </RobotFigure>
  )
}

export default Aura
