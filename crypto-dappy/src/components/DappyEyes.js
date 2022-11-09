import React from 'react'

export default function Eyes({ color, outline, reflection }) {
  return (
    <>
      {/* Eye outline */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M360.968 167C316.238 167 278.111 195.299 263.52 234.972C248.928 195.299 210.802 167 166.065 167C108.734 167 62.2588 213.475 62.2588 270.807C62.2588 328.138 108.734 374.613 166.065 374.613C210.802 374.613 248.928 346.314 263.52 306.642C278.111 346.314 316.238 374.613 360.968 374.613C418.299 374.613 464.774 328.138 464.774 270.807C464.774 213.475 418.299 167 360.968 167Z"
        fill={outline}
      />
      {/* Right eye */}
      <path
        d="M130.708 210C106.104 210 91 231.473 91 249.08C91 287.156 134.377 322.505 165 345C195.623 322.497 239 287.156 239 249.08C239 231.471 223.903 210 199.292 210C185.549 210 173.804 220.934 165 231.315C156.188 220.933 144.452 210 130.708 210Z"
        fill={color} />
      {/* Right eye reflection */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M247.719 229.838C247.719 246.294 234.379 259.629 217.929 259.629C201.473 259.629 188.139 246.294 188.139 229.838C188.139 213.388 201.473 200.048 217.929 200.048C234.379 200.048 247.719 213.388 247.719 229.838Z"
        fill={reflection} />
      {/* Left eye */}
      <path
        d="M324.708 204C300.104 204 285 225.474 285 243.081C285 281.157 328.377 316.506 359 339.001C389.623 316.498 433 281.157 433 243.081C433 225.472 417.903 204 393.292 204C379.549 204 367.804 214.935 359 225.316C350.188 214.934 338.452 204 324.708 204Z"
        fill={color} />
      {/* Left eye reflection */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M441.719 223.839C441.719 240.295 428.379 253.63 411.929 253.63C395.473 253.63 382.139 240.295 382.139 223.839C382.139 207.389 395.473 194.049 411.929 194.049C428.379 194.049 441.719 207.389 441.719 223.839Z"
        fill={reflection} />
    </>
  )
}