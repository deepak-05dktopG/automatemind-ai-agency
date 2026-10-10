import RobotFigure from './RobotFigure'

export function Mind({ children, ...props }) {
  return (
    <RobotFigure name="Mind" color="#f4e9d6" accentColor="#fffaf0" faceColor="#100e13" detailColor="#ffc657" content={children} {...props}>
      {(ids) => (
        <>
          <g>
            <path d="M60 163c-26 1-37 20-26 39 8 14 27 17 48 5l11-25-33-19Zm100 0c26 1 37 20 26 39-8 14-27 17-48 5l-11-25 33-19Z" fill={`url(#${ids.body})`} stroke="#fff4da" strokeWidth="3" />
            <path d="M110 41c-49 0-80 35-80 83 0 50 29 78 80 78s80-28 80-78c0-48-31-83-80-83Z" fill={`url(#${ids.body})`} stroke="#fffaf0" strokeWidth="4" />
            <path d="M55 93c0-25 20-42 55-42s55 17 55 42v36c0 20-15 35-35 35H90c-20 0-35-15-35-35V93Z" fill="var(--robot-face)" />
            <path d="M78 111c5-14 16-17 25-4m14 4c5-14 16-17 25-4" stroke="#fff0cd" strokeWidth="6" strokeLinecap="round" />
            <path d="M80 180c17-11 43-11 60 0v33c-18 11-42 11-60 0v-33Z" fill="#614215" stroke="#ffd375" strokeWidth="3" />
            <circle cx="110" cy="196" r="24" fill="#1b1207" stroke="#ffcf5b" strokeWidth="4" />
            <text x="110" y="205" fill="#ffdd8d" fontFamily="Georgia, serif" fontSize="25" textAnchor="middle">AM</text>
            <path d="M73 211v14m74-14v14" stroke="#eadbc1" strokeWidth="18" strokeLinecap="round" />
            <path d="M53 179c-12 2-17 13-12 23m138-23c12 2 17 13 12 23" stroke="#fff8e9" strokeWidth="16" strokeLinecap="round" />
            <path d="M42 207c11 7 20 5 27-3m109 3c-11 7-20 5-27-3" stroke="#ffd56b" strokeWidth="4" strokeLinecap="round" />
          </g>
          <path d="m110 24 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" fill="#ffd56b" />
          <path d="m184 86 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="#ffdb83" />
        </>
      )}
    </RobotFigure>
  )
}

export default Mind
