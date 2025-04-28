// Define the props expected by the Logo component
interface QRCodeProps {
  Logo: string;
}

// Functional component definition for Logo
export function Logo({ Logo }: QRCodeProps) {
  return (
    <div className="justify-center items-center border bg-white flex min-w-60 flex-col overflow-hidden w-[375px] px-[75px] py-[74px] rounded-2xl border-solid border-[#EAEAEA] max-md:px-5">
      <img
        src={Logo}
        className="aspect-[1] object-contain w-[161px] max-w-full"
        alt="QR Code"
      />
    </div>
  );
}
