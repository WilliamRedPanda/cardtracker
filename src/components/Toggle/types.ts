export interface ToggleOption<T extends string = string> {
  label: string;
  value: T;
}

export interface ToggleProps<T extends string = string> {
  options: [ToggleOption<T>, ToggleOption<T>];
  value: T;
  onChange: (value: T) => void;
}
