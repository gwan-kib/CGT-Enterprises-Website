interface StaticFieldProps {
  id: string
  label: string
  multiline?: boolean
}

export function StaticField({
  id,
  label,
  multiline = false,
}: StaticFieldProps) {
  return (
    <div className="static-field">
      <label className="static-field__label" htmlFor={id}>
        {label}
      </label>
      {multiline ? (
        <textarea
          className="static-field__control static-field__control--textarea"
          id={id}
          placeholder="Placeholder"
          readOnly
          rows={5}
        />
      ) : (
        <input
          className="static-field__control"
          id={id}
          placeholder="Placeholder"
          readOnly
          type="text"
        />
      )}
    </div>
  )
}
