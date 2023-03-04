import clsx from 'clsx'

export const Input = ({className, ...props}: {className: string}) => {
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
