import clsx from 'clsx'
export default function Button({ variant='primary', size='md', className='', ...rest }) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors';
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2' };
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-600',
    outline: 'border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-700',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  return <button className={clsx(base, sizes[size], variants[variant], className)} {...rest} />
}
