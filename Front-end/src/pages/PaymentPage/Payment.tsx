import { PaymentForm } from "@/components/ui/PaymentForm.tsx";
import { LoginCarousel } from "@/components/auth/LoginCarousel";

const Payment = () => {
  return (
    <main className="bg-white flex flex-col overflow-hidden items-center justify-center px-[70px] py-[104px] max-md:px-5 max-md:py-[100px]">
      <div className="w-full max-w-[1234px] max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <section className="w-[55%] ml-5 max-md:w-full max-md:ml-0">
            <LoginCarousel />
          </section>

          <section className="w-[45%] max-md:w-full max-md:ml-0 items-center justify-center grid grid-cols-1">
          <h1 className="text-4xl font-semibold text-zinc-900 mb-15">Travelok<span className="text-[#8DB1D3]">è</span></h1>
            <div className="w-full max-md:max-w-full max-md:mt-10">
              <PaymentForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Payment;
