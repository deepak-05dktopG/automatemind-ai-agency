import RobotFigure from './RobotFigure'

export function Craft({ children, ...props }) {
  return (
    <RobotFigure name="Craft" color="#08b7e9" accentColor="#7be7ff" content={children} {...props}>
      {(ids) => (
        <>
          <g>
            <path d="M63 178c-24-1-34 16-26 34 6 14 24 19 43 10l13-20-30-24Zm94 0c24-1 34 16 26 34-6 14-24 19-43 10l-13-20 30-24Z" fill={`url(#${ids.body})`} />
            <path d="M110 47c-47 0-78 33-78 81 0 49 29 78 78 78s78-29 78-78c0-48-31-81-78-81Z" fill={`url(#${ids.body})`} stroke="var(--robot-accent)" strokeWidth="3" />
            <path d="M51 105c0-20 17-32 35-32 12 0 20 4 24 10 4-6 12-10 24-10 18 0 35 12 35 32v25c0 18-15 32-33 32h-52c-18 0-33-14-33-32v-25Z" fill="var(--robot-face)" />
            <circle cx="85" cy="118" r="19" stroke="#b5f5ff" strokeWidth="4" />
            <circle cx="135" cy="118" r="19" stroke="#b5f5ff" strokeWidth="4" />
            <path d="M104 117h12m-58-4H45m130 0h-13" stroke="#b5f5ff" strokeWidth="4" strokeLinecap="round" />
            <circle cx="85" cy="118" r="7" fill="#9feaff" />
            <circle cx="135" cy="118" r="7" fill="#9feaff" />
            <path d="M99 153h22" stroke="#91edff" strokeWidth="3" strokeLinecap="round" />
            <path d="M80 209v17m60-17v17" stroke="var(--robot-color)" strokeWidth="17" strokeLinecap="round" />
            <path d="m52 214 25-21h65l26 21-7 11H59l-7-11Z" fill="#151c26" stroke="#344957" strokeWidth="3" />
            <path d="m82 216 14-12h39" stroke="#708b9a" strokeWidth="2" strokeLinecap="round" />
            <path d="M110 47V34" stroke="var(--robot-color)" strokeWidth="8" strokeLinecap="round" />
            <circle cx="110" cy="26" r="9" fill="var(--robot-color)" stroke="var(--robot-accent)" strokeWidth="3" />
          </g>
          <path d="m182 58 5-12m3 15 9-9m-4 18 12-3" stroke="#71eaff" strokeWidth="3" strokeLinecap="round" />
          <path d="m168 193 16 10m-8-18 17 8" stroke="#42d9ff" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </RobotFigure>
  )
}

export default Craft
