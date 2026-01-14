import * as React from 'react'

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  JSX.IntrinsicElements['textarea']
>((props, ref) => (
  <textarea
    ref={ref}
    className="block w-full rounded-lg border-surface-300 bg-white/50 backdrop-blur-sm text-surface-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-colors duration-200 outline-none p-3"
    rows={5}
    {...props}
  />
))

export default TextArea
