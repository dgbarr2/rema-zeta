import React from "react"

const SvgLatexHalf = props => (
    <svg width="76pt" height="296pt" viewBox="0 0 76 296" {...props}>
      <defs>
        <symbol overflow="visible" id="latexHalf_svg__a">
          <path d="M42.188-91.813c0-3.453 0-3.734-3.313-3.734-8.89 9.172-21.516 9.172-26.11 9.172v4.453c2.876 0 11.344 0 18.797-3.734v74.328c0 5.156-.437 6.875-13.343 6.875h-4.594V0c5.031-.438 17.5-.438 23.25-.438 5.734 0 18.219 0 23.234.438v-4.453h-4.593c-12.907 0-13.328-1.578-13.328-6.875zm0 0" />
        </symbol>
        <symbol overflow="visible" id="latexHalf_svg__b">
          <path d="M18.219-11.047l15.203-14.781c22.39-19.797 31-27.547 31-41.89 0-16.36-12.922-27.829-30.422-27.829-16.203 0-26.828 13.203-26.828 25.969 0 8.031 7.172 8.031 7.61 8.031 2.437 0 7.452-1.719 7.452-7.61 0-3.718-2.578-7.452-7.593-7.452-1.157 0-1.438 0-1.875.14 3.296-9.328 11.046-14.64 19.375-14.64 13.047 0 19.218 11.625 19.218 23.39 0 11.485-7.172 22.813-15.062 31.703L8.75-5.313C7.172-3.734 7.172-3.438 7.172 0h53.234l4.016-24.969h-3.594c-.719 4.313-1.719 10.625-3.156 12.782-1 1.14-10.469 1.14-13.625 1.14zm0 0" />
        </symbol>
      </defs>
      <use xlinkHref="#latexHalf_svg__a" x={1.707} y={97.246} />
      <path
        d="M1.707 158.43h71.727"
        fill="none"
        strokeWidth={5.7312}
        stroke={props.colordgb}
        strokeMiterlimit={10}
      />
      <use xlinkHref="#latexHalf_svg__b" x={1.707} y={292.711} />
    </svg>
  );
  
  export default SvgLatexHalf;