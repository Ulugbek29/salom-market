import cls from "./styles.module.scss";

export default function TextInput({ name, placeholder, form, label, ...props }) {
  return (
    <div className={cls.wrapper} {...props}>
      <div className={cls.head}>
        <div className={cls.label}>{label}</div>
        <input
          type="text"
          className={cls.input}
          placeholder={placeholder}
          {...form.register(name, { required: "To'ldirilishi shart" })}
        />
      </div>
      {form.formState.errors?.[name] && <p className={cls.errorText}>{form.formState.errors?.[name]?.message}</p>}
    </div>
  );
}
