import PaymentMethodsSection from "./PaymentMethodsSection";

// Defining the PaymentMethod component that accepts 'userId' as a prop
const PaymentMethod = () => {
  return (
    <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <PaymentMethodsSection/>
          </div>
        </div>
    </div>
  );
};

export default PaymentMethod;