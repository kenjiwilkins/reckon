const defaultClasses =
  'appearance-none w-full h-5 box-border border-none text-base focus-visible:outline-transparent';

function TextInput({
  type,
  value,
  onChange,
  classNames = defaultClasses,
  placeholder = '',
  autoCapitalize = 'off',
  autoCorrect = 'off',
  spellCheck = false,
  onFocus,
  onBlur
}: {
  type: string;
  value: string;
  onChange: Function;
  classNames?: string;
  placeholder?: string;
  autoCapitalize?: string;
  autoCorrect?: string;
  spellCheck?: boolean;
  onFocus?: Function;
  onBlur?: Function;
}) {
  return (
    <>
      {type === 'password' ? (
        <input
          type="password"
          name="password"
          className={classNames}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => onFocus && onFocus()}
          onBlur={() => onBlur && onBlur()}
        />
      ) : (
        <input
          type="email"
          name="email"
          className={classNames}
          placeholder={placeholder}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          spellCheck={spellCheck}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => onFocus && onFocus()}
          onBlur={() => onBlur && onBlur()}
        />
      )}
    </>
  );
}

export { TextInput };
