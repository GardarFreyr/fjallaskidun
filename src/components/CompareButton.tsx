import { Check } from 'lucide-react'
import { useCompare } from '../lib/compare'

export function CompareButton({ slug, name, className = '' }: { slug: string; name: string; className?: string }) {
  const { isSelected, isFull, toggle } = useCompare()
  const selected = isSelected(slug)
  const disabled = isFull && !selected
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`${selected ? 'Taka úr samanburði' : 'Bæta í samanburð'}: ${name}`}
      title={disabled ? 'Hægt er að bera saman allt að 3 ferðir' : undefined}
      className={`inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${
        selected ? 'border-ice bg-ice text-charcoal' : 'border-[#c3cbcf] bg-snow text-charcoal hover:border-charcoal'
      } ${className}`}
    >
      <span className="inline-flex size-[18px] items-center justify-center rounded border-[1.5px] border-current" aria-hidden="true">
        {selected && <Check size={12} strokeWidth={3} />}
      </span>
      {selected ? 'Í samanburði' : disabled ? 'Hámark 3 ferðir' : 'Bera saman'}
    </button>
  )
}
