import { BellIcon } from "lucide-react";

export function Bell({ props }: { props?: React.ComponentProps<typeof BellIcon> }) {
  return <BellIcon {...props} />;
}