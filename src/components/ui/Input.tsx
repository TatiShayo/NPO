// ============================================
// Input Component — Reusable floating-label input
// ============================================



interface Option {
  value: string
  label: string
}

interface InputProps {
  label: string
  type?: string
  name: string
  value: string | number
  onChange: (event: any) => void
  required?: boolean
  placeholder?: string
  as?: 'input' | 'textarea' | 'select'
  options?: Option[]
  [key: string]: any
}

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  placeholder = ' ',  // Space for floating label :not(:placeholder-shown)
  as = 'input',
  options = [] as Option[],
  ...rest
}: InputProps) {
  const id = `input-${name}`

  const commonProps = {
    id,
    name,
    value,
    onChange,
    required,
    placeholder,
    ...rest,
  }

  return (
    <div className="floating-label-group">
      {as === 'textarea' ? (
        <textarea
          className="floating-label-textarea"
          {...commonProps}
        />
      ) : as === 'select' ? (
        <select
          className="floating-label-select"
          {...commonProps}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="floating-label-input"
          {...commonProps}
        />
      )}
      <label htmlFor={id} className="floating-label">
        {label}{required && ' *'}
      </label>
    </div>
  )
}
