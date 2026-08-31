import { Button } from "./Button";

interface FormSuccessProps {
  actionLabel: string;
  message: string;
  onAction: () => void;
}

export function FormSuccess({ actionLabel, message, onAction }: FormSuccessProps) {
  return (
    <div className="form-success" role="status">
      <span aria-hidden="true" className="form-success__icon material-symbols-rounded">
        check_circle
      </span>
      <p className="form-success__message">{message}</p>
      <Button onClick={onAction} type="button">
        {actionLabel}
      </Button>
    </div>
  );
}
