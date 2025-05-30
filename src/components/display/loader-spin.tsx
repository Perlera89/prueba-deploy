import { ThreeDots } from "react-loader-spinner";

export default function LoaderSpin({ title }: { title?: string }) {
  return (
    <div className="flex gap-1 items-center">
      <p>{title}</p>
      <ThreeDots
        visible={true}
        radius="9"
        color="currentColor"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}
