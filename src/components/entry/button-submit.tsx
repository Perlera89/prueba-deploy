import { ThreeDots } from "react-loader-spinner";
import { Button } from "../ui/button";

interface ResetPasswordFormProps {
  isSubmiting: boolean;
  title: string;
  className?: string;
  isValid?: boolean;
  onSubmit?: () => void;
}

export default function SubmitButton({
  isSubmiting,
  title,
  className,
  isValid = true,
  onSubmit,
}: ResetPasswordFormProps) {
  return (
    <Button
      type="submit"
      className={className}
      disabled={isSubmiting || !isValid}
      onClick={onSubmit}
    >
      {isSubmiting ? (
        <ThreeDots
          visible={true}
          radius="9"
          color="currentColor"
          ariaLabel="three-dots-loading"
        />
      ) : (
        title
      )}
    </Button>
  );
}
