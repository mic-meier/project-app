import clsx from 'clsx'
import {InputHTMLAttributes} from 'react'

export const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={clsx(
        'border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg',
      )}
      {...props}
    />
  )
}

export default Input
