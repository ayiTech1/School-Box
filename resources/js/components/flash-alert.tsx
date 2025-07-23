import { Alert, AlertDescription } from '@/components/ui/alert';

interface FlashAlertProps {
  show: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export default function FlashAlert({
  show,
  successMessage,
  errorMessage,
}: FlashAlertProps) {
  if (!show || (!successMessage && !errorMessage)) return null;

  const isSuccess = Boolean(successMessage);

  return (
    <Alert
      variant="default"
      className={`${isSuccess ? 'bg-green-800' : 'bg-red-800'} ml-auto max-w-md text-white`}
    >
      <AlertDescription className="text-white">
        {isSuccess ? 'Success!' : 'Error!'} {successMessage || errorMessage}
      </AlertDescription>
    </Alert>
  );
}
