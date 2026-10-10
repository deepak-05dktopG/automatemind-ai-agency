import RobotFigure from './RobotFigure'

export function Orbi({ children, ...props }) {
  return (
    <RobotFigure name="Orbi" color="#f8b900" accentColor="#ffe66b" content={children} {...props}>
      {(ids) => (
        <>
          <g>
            <path d="M63 178c-24 0-34 17-28 34 5 15 24 20 43 12l12-19-27-27Zm94 0c24 0 34 17 28 34-5 15-24 20-43 12l-12-19 27-27Z" fill={`url(#${ids.body})`} />
            <path d="M110 54c-47 0-78 32-78 82 0 48 29 75 78 75s78-27 78-75c0-50-31-82-78-82Z" fill={`url(#${ids.body})`} stroke="var(--robot-accent)" strokeWidth="3" />
            <path d="M77 88c-15 9-22 21-22 38v8c0 16 13 29 29 29h52c16 0 29-13 29-29v-8c0-17-7-29-22-38-16-8-50-8-66 0Z" fill="var(--robot-face)" />
            <ellipse cx="85" cy="126" rx="7" ry="13" fill="#ffe7b0" />
            <ellipse cx="135" cy="126" rx="7" ry="13" fill="#ffe7b0" />
            <path d="M110 55V36" stroke="var(--robot-color)" strokeWidth="8" strokeLinecap="round" />
            <circle cx="110" cy="27" r="10" fill="var(--robot-color)" stroke="var(--robot-accent)" strokeWidth="3" />
            <path d="M75 205v19m70-19v19" stroke="var(--robot-color)" strokeWidth="17" strokeLinecap="round" />
            <path d="M64 183c-13 4-17 17-9 27m101-27c13 4 17 17 9 27" stroke="var(--robot-color)" strokeWidth="17" strokeLinecap="round" />
            <path d="m63 226 34-22h43l17 22c2 3 0 7-4 7H68c-5 0-8-4-5-7Z" fill="#19212c" stroke="#303d4b" strokeWidth="3" />
            <path d="m84 225 20-13h29" stroke="#788797" strokeWidth="2" strokeLinecap="round" />
          </g>
          <path d="m157 81 12-5m-9 13 13-1" stroke="#fff0a4" strokeWidth="3" strokeLinecap="round" />
          <path d="m181 57 7-7m-2 13 10-2" stroke="#ffe24d" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </RobotFigure>
  )
}

export default Orbi
